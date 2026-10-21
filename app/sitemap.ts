import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { locales } from "@/lib/i18n/config";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/caseStudies";

// Uma entrada por idioma para cada pagina, apontando para as versoes nos outros idiomas
function entries(path: string, priority: number): MetadataRoute.Sitemap {
    return locales.map((lang) => ({
        url: `${siteConfig.url}/${lang}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority,
        alternates: {
            languages: {
                "pt-BR": `${siteConfig.url}/pt${path}`,
                en: `${siteConfig.url}/en${path}`,
            },
        },
    }));
}

export default function sitemap(): MetadataRoute.Sitemap {
    const projectPages = projects
        .filter((project) => caseStudies[project.slug])
        .flatMap((project) => entries(`/projetos/${project.slug}`, 0.8));

    return [...entries("", 1), ...projectPages];
}
