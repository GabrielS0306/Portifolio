import { defaultLocale, hasLocale, locales, type Locale } from "./config";

/**
 * Escolhe o idioma da visita: primeiro o cookie (escolha feita no botao),
 * depois o header Accept-Language do navegador e, por fim, o idioma padrao.
 */
export function pickLocale(cookie: string | undefined, acceptLanguage: string | null): Locale {
    if (hasLocale(cookie)) return cookie;

    if (acceptLanguage) {
        const preferences = acceptLanguage
            .split(",")
            .map((part) => {
                const [tag, ...params] = part.trim().split(";");
                const q = params.find((p) => p.trim().startsWith("q="));
                return { tag: tag.toLowerCase(), q: q ? Number(q.trim().slice(2)) : 1 };
            })
            .filter(({ tag, q }) => tag && !Number.isNaN(q) && q > 0)
            .sort((a, b) => b.q - a.q);

        for (const { tag } of preferences) {
            const match = locales.find((locale) => tag === locale || tag.startsWith(`${locale}-`));
            if (match) return match;
        }
    }

    return defaultLocale;
}
