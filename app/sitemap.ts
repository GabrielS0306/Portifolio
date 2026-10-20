import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { locales } from "@/lib/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
    return locales.map((lang) => ({
        url: `${siteConfig.url}/${lang}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 1,
        alternates: {
            languages: {
                "pt-BR": `${siteConfig.url}/pt`,
                en: `${siteConfig.url}/en`,
            },
        },
    }));
}
