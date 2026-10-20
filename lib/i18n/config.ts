export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

// Cookie que guarda o idioma escolhido no botao, para as proximas visitas
export const LOCALE_COOKIE = "NEXT_LOCALE";

// Valor do atributo lang do <html>
export const htmlLang: Record<Locale, string> = {
    pt: "pt-BR",
    en: "en",
};

// Formato usado pelo Open Graph
export const ogLocale: Record<Locale, string> = {
    pt: "pt_BR",
    en: "en_US",
};

export function hasLocale(value: string | undefined | null): value is Locale {
    return locales.includes(value as Locale);
}

export function otherLocale(locale: Locale): Locale {
    return locale === "pt" ? "en" : "pt";
}
