import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { locales } from "@/lib/i18n/config";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/caseStudies";
import { getAllPosts } from "@/lib/blog";

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

    // Os posts sao escritos em portugues: entra so a versao de /pt, que e a canonica
    const posts = getAllPosts({ includeDrafts: false });
    const blogPages: MetadataRoute.Sitemap =
        posts.length === 0
            ? []
            : [
                  ...entries("/blog", 0.7),
                  ...posts.map((post) => ({
                      url: `${siteConfig.url}/pt/blog/${post.slug}`,
                      lastModified: new Date(post.date),
                      changeFrequency: "yearly" as const,
                      priority: 0.6,
                  })),
              ];

    return [...entries("", 1), ...projectPages, ...blogPages];
}
