import type { Metadata } from "next";
import { ogLocale, type Locale } from "@/lib/i18n";

// Metadados comuns das paginas que existem nos dois idiomas com o mesmo caminho (ex.: /pt/sobre e /en/sobre)
export function pageMetadata(lang: Locale, path: string, title: string, description: string): Metadata {
    return {
        title,
        description,
        alternates: {
            canonical: `/${lang}${path}`,
            languages: { "pt-BR": `/pt${path}`, en: `/en${path}` },
        },
        openGraph: { title, description, url: `/${lang}${path}`, locale: ogLocale[lang] },
    };
}
