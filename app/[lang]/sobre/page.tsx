import type { Metadata } from "next";
import { notFound } from "next/navigation";
import About from "@/components/sections/About";
import Timeline from "@/components/sections/Timeline";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import styles from "../sectionPage.module.css";

export async function generateMetadata({ params }: PageProps<"/[lang]/sobre">): Promise<Metadata> {
    const { lang } = await params;
    if (!hasLocale(lang)) return {};

    const t = getDictionary(lang).about;
    return pageMetadata(lang, "/sobre", t.title, t.paragraphs[0]);
}

export default async function AboutPage({ params }: PageProps<"/[lang]/sobre">) {
    const { lang } = await params;
    if (!hasLocale(lang)) notFound();

    const dict = getDictionary(lang);

    return (
        <main className={styles.page}>
            <About dict={dict} />
            <Timeline dict={dict} />
        </main>
    );
}
