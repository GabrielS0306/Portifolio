import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { z } from "zod";

export const BLOG_DIR = path.join(process.cwd(), "content", "blog");

const WORDS_PER_MINUTE = 200;

// Formato do cabecalho (frontmatter) de cada post; um campo errado quebra o build com a mensagem do Zod
const frontmatterSchema = z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    date: z.iso.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
});

export interface PostHeading {
    depth: 2 | 3;
    text: string;
    id: string;
}

export interface PostMeta extends z.infer<typeof frontmatterSchema> {
    slug: string;
    readingMinutes: number;
    headings: PostHeading[];
}

// Rascunhos aparecem em desenvolvimento e nos testes E2E (SHOW_DRAFTS=true), nunca no site publicado
export function showDrafts() {
    return process.env.NODE_ENV !== "production" || process.env.SHOW_DRAFTS === "true";
}

// Remove a marcacao inline para chegar ao texto que o rehype-slug usa ao gerar o id
function plainText(markdown: string) {
    return markdown
        .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/[`*_~]/g, "")
        .trim();
}

export function parsePost(slug: string, source: string): PostMeta {
    const { data, content } = matter(source);
    const result = frontmatterSchema.safeParse(data);
    if (!result.success) {
        throw new Error(
            `Frontmatter invalido em content/blog/${slug}.mdx:\n${z.prettifyError(result.error)}`,
        );
    }

    const slugger = new GithubSlugger();
    const headings: PostHeading[] = [];
    let words = 0;
    let inCode = false;

    for (const line of content.split(/\r?\n/)) {
        if (/^\s*(```|~~~)/.test(line)) {
            inCode = !inCode;
            continue;
        }

        words += line.split(/\s+/).filter(Boolean).length;
        if (inCode) continue;

        const heading = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
        if (!heading) continue;

        // Todo titulo passa pelo slugger para os ids repetidos ganharem sufixo igual ao do rehype-slug
        const text = plainText(heading[2]);
        const id = slugger.slug(text);
        const depth = heading[1].length;
        if (depth === 2 || depth === 3) headings.push({ depth, text, id });
    }

    return {
        ...result.data,
        slug,
        readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
        headings,
    };
}

export function getAllPosts({ includeDrafts = showDrafts() } = {}): PostMeta[] {
    if (!fs.existsSync(BLOG_DIR)) return [];

    return fs
        .readdirSync(BLOG_DIR)
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => {
            const slug = file.replace(/\.mdx$/, "");
            return parsePost(slug, fs.readFileSync(path.join(BLOG_DIR, file), "utf8"));
        })
        .filter((post) => includeDrafts || !post.draft)
        .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export function getPost(slug: string) {
    return getAllPosts().find((post) => post.slug === slug) ?? null;
}

// Datas do frontmatter sao dias (sem hora); UTC evita mostrar o dia anterior em fusos negativos
export function formatPostDate(date: string, locale: string) {
    return new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(new Date(date));
}
