import { siteConfig } from "@/lib/site";
import { htmlLang, type Locale } from "@/lib/i18n/config";

// Apenas os campos da API do GitHub que o site usa
export interface GitHubRepo {
    name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    fork: boolean;
    archived: boolean;
    pushed_at: string;
}

export interface LanguageShare {
    name: string;
    count: number;
    percent: number;
    color: string;
}

export interface GitHubSummary {
    totalRepos: number;
    languages: LanguageShare[];
    recent: GitHubRepo[];
}

// Cores oficiais do GitHub (linguist) para as linguagens mais comuns
const languageColors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    PHP: "#4f5d95",
    Python: "#3572a5",
    "C#": "#178600",
    Java: "#b07219",
    HTML: "#e34c26",
    CSS: "#663399",
    Go: "#00add8",
    Rust: "#dea584",
};

const FALLBACK_COLOR = "#8b949e";

export function getLanguageColor(language: string) {
    return languageColors[language] ?? FALLBACK_COLOR;
}

export function summarizeRepos(repos: GitHubRepo[], login: string, recentCount = 4): GitHubSummary {
    // Ignora forks, arquivados e o repositorio especial de README do perfil
    const own = repos
        .filter((repo) => !repo.fork && !repo.archived && repo.name.toLowerCase() !== login.toLowerCase())
        .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at));

    const counts = new Map<string, number>();
    for (const repo of own) {
        if (repo.language) counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
    }

    const withLanguage = [...counts.values()].reduce((sum, n) => sum + n, 0);
    const languages = [...counts.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([name, count]) => ({
            name,
            count,
            percent: Math.round((count / withLanguage) * 100),
            color: getLanguageColor(name),
        }));

    return {
        totalRepos: own.length,
        languages,
        recent: own.slice(0, recentCount),
    };
}

const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 365 * 24 * 60 * 60],
    ["month", 30 * 24 * 60 * 60],
    ["week", 7 * 24 * 60 * 60],
    ["day", 24 * 60 * 60],
    ["hour", 60 * 60],
    ["minute", 60],
];

const justNow: Record<Locale, string> = { pt: "agora mesmo", en: "just now" };

export function formatRelativeDate(date: string, locale: Locale = "pt", now = Date.now()) {
    const relativeTime = new Intl.RelativeTimeFormat(htmlLang[locale], { numeric: "auto" });
    const seconds = Math.round((Date.parse(date) - now) / 1000);

    for (const [unit, size] of units) {
        if (Math.abs(seconds) >= size) {
            return relativeTime.format(Math.round(seconds / size), unit);
        }
    }

    return justNow[locale];
}

export async function getGitHubSummary(): Promise<GitHubSummary | null> {
    const login = siteConfig.githubUser;
    const headers: HeadersInit = {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    };

    // Opcional: um token aumenta o limite da API de 60 para 5.000 requisicoes por hora
    if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${login}/repos?per_page=100&sort=pushed`, {
            headers,
            next: { revalidate: 3600 },
        });

        if (!response.ok) return null;

        const repos: GitHubRepo[] = await response.json();
        return summarizeRepos(repos, login);
    } catch {
        // Sem rede ou API fora do ar: a secao simplesmente nao aparece
        return null;
    }
}
