import { describe, expect, it } from "vitest";
import { pickLocale } from "@/lib/i18n/negotiate";

describe("pickLocale", () => {
    it("usa o cookie quando ele e valido, ignorando o navegador", () => {
        expect(pickLocale("en", "pt-BR,pt;q=0.9")).toBe("en");
        expect(pickLocale("pt", "en-US,en;q=0.9")).toBe("pt");
    });

    it("ignora cookie invalido", () => {
        expect(pickLocale("fr", "en-US")).toBe("en");
    });

    it.each([
        ["pt-BR,pt;q=0.9,en;q=0.8", "pt"],
        ["en-US,en;q=0.9", "en"],
        ["en-GB", "en"],
        ["pt-PT", "pt"],
        // Respeita a ordem de preferencia (q), nao a ordem do texto
        ["en;q=0.5,pt-BR;q=0.9", "pt"],
        // Idioma nao suportado primeiro: usa o proximo suportado
        ["fr-FR,fr;q=0.9,en;q=0.8", "en"],
    ])("Accept-Language %s -> %s", (header, expected) => {
        expect(pickLocale(undefined, header)).toBe(expected);
    });

    it.each([null, "", "fr-FR,de;q=0.8", "*"])(
        "cai no portugues quando nao ha idioma suportado (%s)",
        (header) => {
            expect(pickLocale(undefined, header)).toBe("pt");
        },
    );

    it("nao confunde prefixos parecidos", () => {
        // "enx" nao e "en"; so "en" ou "en-XX" contam
        expect(pickLocale(undefined, "enx")).toBe("pt");
    });
});
