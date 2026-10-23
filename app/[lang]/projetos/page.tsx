import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Projects from "@/components/sections/Projects";
import GitHubActivity from "@/components/sections/GitHubActivity";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import styles from "../sectionPage.module.css";

export async function generateMetadata({ params }: PageProps<"/[lang]/projetos">): Promise<Metadata> {
    const { lang } = await params;
    if (!hasLocale(lang)) return {};

    const t = getDictionary(lang).projects;
    return pageMetadata(lang, "/projetos", t.pageTitle, t.subtitle);
}

export default async function ProjectsPage({ params }: PageProps<"/[lang]/projetos">) {
    const { lang } = await params;
    if (!hasLocale(lang)) notFound();

    const dict = getDictionary(lang);

    return (
        <main className={styles.page}>
            <Projects lang={lang} dict={dict} />
            <GitHubActivity lang={lang} dict={dict} />
        </main>
    );
}
