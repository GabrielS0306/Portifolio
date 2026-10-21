import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { resumeFiles } from "@/lib/site";
import { locales } from "@/lib/i18n";

describe("lib/site", () => {
    it.each(locales)("curriculo em %s existe em public/ e e PDF", (locale) => {
        const file = resumeFiles[locale];

        expect(file).toMatch(/\.pdf$/);
        expect(
            fs.existsSync(path.join(process.cwd(), "public", file)),
            `arquivo nao encontrado: public${file}`,
        ).toBe(true);
    });
});
