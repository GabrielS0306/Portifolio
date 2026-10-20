import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";
import { techIcons } from "@/lib/techIcons";

describe("data/projects", () => {
    it("tem titulos unicos", () => {
        const titles = projects.map((p) => p.title);
        expect(new Set(titles).size).toBe(titles.length);
    });

    it.each(projects)("$title: toda tecnologia tem icone em lib/techIcons", ({ tech }) => {
        for (const t of tech) {
            expect(techIcons, `tecnologia sem icone: "${t}"`).toHaveProperty([t]);
        }
    });

    it.each(projects.filter((p) => p.image))("$title: imagem existe em public/", ({ image }) => {
        const file = path.join(process.cwd(), "public", image!);
        expect(fs.existsSync(file), `arquivo nao encontrado: public${image}`).toBe(true);
    });

    it.each(projects)("$title: links sao URLs absolutas", ({ demoUrl, codeUrl }) => {
        for (const url of [demoUrl, codeUrl].filter(Boolean)) {
            expect(url).toMatch(/^https:\/\//);
        }
    });
});
