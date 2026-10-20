import { describe, expect, it } from "vitest";
import { formatRelativeDate, getLanguageColor, summarizeRepos, type GitHubRepo } from "@/lib/github";

function repo(overrides: Partial<GitHubRepo>): GitHubRepo {
    return {
        name: "repo",
        html_url: "https://github.com/user/repo",
        description: null,
        language: "TypeScript",
        fork: false,
        archived: false,
        pushed_at: "2026-01-01T00:00:00Z",
        ...overrides,
    };
}

describe("summarizeRepos", () => {
    it("ignora forks, arquivados e o repositorio de README do perfil", () => {
        const summary = summarizeRepos(
            [
                repo({ name: "proprio" }),
                repo({ name: "um-fork", fork: true }),
                repo({ name: "antigo", archived: true }),
                repo({ name: "User" }),
            ],
            "user",
        );

        expect(summary.totalRepos).toBe(1);
        expect(summary.recent.map((r) => r.name)).toEqual(["proprio"]);
    });

    it("ordena os recentes pelo ultimo push e limita a quantidade", () => {
        const summary = summarizeRepos(
            [
                repo({ name: "a", pushed_at: "2026-01-01T00:00:00Z" }),
                repo({ name: "c", pushed_at: "2026-03-01T00:00:00Z" }),
                repo({ name: "b", pushed_at: "2026-02-01T00:00:00Z" }),
            ],
            "user",
            2,
        );

        expect(summary.recent.map((r) => r.name)).toEqual(["c", "b"]);
        expect(summary.totalRepos).toBe(3);
    });

    it("calcula a proporcao de linguagens ignorando repositorios sem linguagem", () => {
        const summary = summarizeRepos(
            [
                repo({ name: "a", language: "TypeScript" }),
                repo({ name: "b", language: "TypeScript" }),
                repo({ name: "c", language: "PHP" }),
                repo({ name: "d", language: "Python" }),
                repo({ name: "e", language: null }),
            ],
            "user",
        );

        expect(summary.languages).toEqual([
            { name: "TypeScript", count: 2, percent: 50, color: getLanguageColor("TypeScript") },
            { name: "PHP", count: 1, percent: 25, color: getLanguageColor("PHP") },
            { name: "Python", count: 1, percent: 25, color: getLanguageColor("Python") },
        ]);
    });

    it("lida com lista vazia", () => {
        expect(summarizeRepos([], "user")).toEqual({ totalRepos: 0, languages: [], recent: [] });
    });
});

describe("getLanguageColor", () => {
    it("usa uma cor neutra para linguagens desconhecidas", () => {
        expect(getLanguageColor("Linguagem Inventada")).toBe("#8b949e");
    });
});

describe("formatRelativeDate", () => {
    const now = Date.parse("2026-10-20T12:00:00Z");

    it.each([
        ["2026-10-20T11:59:30Z", "agora mesmo"],
        ["2026-10-20T09:00:00Z", "há 3 horas"],
        ["2026-10-19T12:00:00Z", "ontem"],
        ["2026-10-15T12:00:00Z", "há 5 dias"],
        ["2026-09-20T12:00:00Z", "mês passado"],
        ["2024-10-20T12:00:00Z", "há 2 anos"],
    ])("%s -> %s", (date, expected) => {
        expect(formatRelativeDate(date, "pt", now)).toBe(expected);
    });

    it.each([
        ["2026-10-20T11:59:30Z", "just now"],
        ["2026-10-19T12:00:00Z", "yesterday"],
        ["2026-10-15T12:00:00Z", "5 days ago"],
    ])("em ingles: %s -> %s", (date, expected) => {
        expect(formatRelativeDate(date, "en", now)).toBe(expected);
    });
});
