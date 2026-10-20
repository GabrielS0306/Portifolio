import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";
import { techIcons } from "@/lib/techIcons";
import { locales } from "@/lib/i18n";

describe("data/projects", () => {
    it("tem slugs unicos e validos para URL", () => {
        const slugs = projects.map((p) => p.slug);
        expect(new Set(slugs).size).toBe(slugs.length);
        for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    });

    it.each(projects)("$slug: tem titulo e descricao em todos os idiomas", ({ title, description }) => {
        for (const locale of locales) {
            expect(title[locale]?.trim(), `titulo sem traducao: ${locale}`).toBeTruthy();
            expect(description[locale]?.trim(), `descricao sem traducao: ${locale}`).toBeTruthy();
        }
    });

    it.each(projects)("$slug: toda tecnologia tem icone em lib/techIcons", ({ tech }) => {
        for (const t of tech) {
            expect(techIcons, `tecnologia sem icone: "${t}"`).toHaveProperty([t]);
        }
    });

    it.each(projects.filter((p) => p.image))("$slug: imagem existe em public/", ({ image }) => {
        const file = path.join(process.cwd(), "public", image!);
        expect(fs.existsSync(file), `arquivo nao encontrado: public${image}`).toBe(true);
    });

    it.each(projects)("$slug: links sao URLs absolutas", ({ demoUrl, codeUrl }) => {
        for (const url of [demoUrl, codeUrl].filter(Boolean)) {
            expect(url).toMatch(/^https:\/\//);
        }
    });
});
