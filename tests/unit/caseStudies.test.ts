import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { caseStudies } from "@/data/caseStudies";
import { projects } from "@/data/projects";
import { locales } from "@/lib/i18n";

const entries = Object.entries(caseStudies);

describe("data/caseStudies", () => {
    it("so tem estudos de caso para projetos que existem", () => {
        const slugs = projects.map((p) => p.slug);
        for (const [slug] of entries) expect(slugs).toContain(slug);
    });

    it.each(entries)("%s: tem conteudo completo em todos os idiomas", (_slug, { content }) => {
        for (const locale of locales) {
            const c = content[locale];
            expect(c.role.trim(), `papel sem traducao: ${locale}`).toBeTruthy();
            expect(c.context.length).toBeGreaterThan(0);
            expect(c.highlights.length).toBeGreaterThan(0);
            expect(c.decisions.length).toBeGreaterThan(0);
            expect(c.learnings.length).toBeGreaterThan(0);
        }

        // Os idiomas tem a mesma estrutura, so muda o texto
        const [base, ...others] = locales.map((locale) => content[locale]);
        for (const other of others) {
            expect(other.highlights).toHaveLength(base.highlights.length);
            expect(other.decisions).toHaveLength(base.decisions.length);
            expect(other.learnings).toHaveLength(base.learnings.length);
            expect(other.next?.length).toBe(base.next?.length);
        }
    });

    it.each(entries)("%s: imagens da galeria existem e tem descricao", (_slug, { gallery = [] }) => {
        for (const shot of gallery) {
            expect(fs.existsSync(path.join(process.cwd(), "public", shot.src)), shot.src).toBe(true);
            for (const locale of locales) expect(shot.alt[locale]?.trim()).toBeTruthy();
        }
    });
});
