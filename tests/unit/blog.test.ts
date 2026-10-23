import { afterEach, describe, expect, it, vi } from "vitest";
import { formatPostDate, getAllPosts, parsePost, showDrafts } from "@/lib/blog";

const post = (frontmatter: string, body = "") => `---\n${frontmatter}\n---\n${body}`;
const validFrontmatter = 'title: "Meu post"\nsummary: "Resumo"\ndate: "2026-11-05"';

describe("parsePost", () => {
    it("le o frontmatter e aplica os padroes", () => {
        const meta = parsePost("meu-post", post(validFrontmatter, "Texto."));

        expect(meta).toMatchObject({
            slug: "meu-post",
            title: "Meu post",
            summary: "Resumo",
            date: "2026-11-05",
            tags: [],
            draft: false,
            readingMinutes: 1,
        });
    });

    it("falha com mensagem clara quando o frontmatter esta errado", () => {
        expect(() => parsePost("quebrado", post('title: "Sem data"\nsummary: "x"'))).toThrow(
            /content\/blog\/quebrado\.mdx/,
        );
        expect(() => parsePost("data", post('title: "x"\nsummary: "x"\ndate: "05/11/2026"'))).toThrow();
    });

    it("gera os ids dos titulos como o rehype-slug, ignorando blocos de codigo", () => {
        const body = [
            "## Introdução",
            "### Usando `fetch` e [links](https://x.dev)",
            "```bash",
            "## isto e um comentario, nao um titulo",
            "```",
            "## Introdução",
            "#### Nivel 4 nao entra no indice",
        ].join("\n");

        expect(parsePost("p", post(validFrontmatter, body)).headings).toEqual([
            { depth: 2, text: "Introdução", id: "introdução" },
            { depth: 3, text: "Usando fetch e links", id: "usando-fetch-e-links" },
            { depth: 2, text: "Introdução", id: "introdução-1" },
        ]);
    });

    it("calcula o tempo de leitura a 200 palavras por minuto", () => {
        const body = Array.from({ length: 1000 }, () => "palavra").join(" ");
        expect(parsePost("p", post(validFrontmatter, body)).readingMinutes).toBe(5);
    });
});

describe("rascunhos", () => {
    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it("aparecem fora de producao ou com SHOW_DRAFTS", () => {
        vi.stubEnv("NODE_ENV", "production");
        expect(showDrafts()).toBe(false);

        vi.stubEnv("SHOW_DRAFTS", "true");
        expect(showDrafts()).toBe(true);

        vi.stubEnv("NODE_ENV", "development");
        vi.stubEnv("SHOW_DRAFTS", "");
        expect(showDrafts()).toBe(true);
    });

    it("ficam fora da lista publicada", () => {
        const published = getAllPosts({ includeDrafts: false });
        expect(published.every((p) => !p.draft)).toBe(true);
        expect(getAllPosts({ includeDrafts: true }).length).toBeGreaterThanOrEqual(published.length);
    });
});

describe("posts em content/blog", () => {
    // Valida o frontmatter de todos os posts de verdade, para o erro aparecer no teste e nao so no build
    it("tem frontmatter valido e slugs de URL", () => {
        for (const p of getAllPosts({ includeDrafts: true })) {
            expect(p.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
        }
    });

    it("ficam do mais novo para o mais antigo", () => {
        const dates = getAllPosts({ includeDrafts: true }).map((p) => p.date);
        expect(dates).toEqual([...dates].sort().reverse());
    });
});

describe("formatPostDate", () => {
    it("mostra o dia do frontmatter sem deslocar pelo fuso", () => {
        expect(formatPostDate("2026-11-05", "pt-BR")).toBe("5 de novembro de 2026");
        expect(formatPostDate("2026-11-05", "en")).toBe("November 5, 2026");
    });
});
