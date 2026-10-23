import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Contact from "@/components/sections/Contact";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import styles from "../sectionPage.module.css";

export async function generateMetadata({ params }: PageProps<"/[lang]/contato">): Promise<Metadata> {
    const { lang } = await params;
    if (!hasLocale(lang)) return {};

    const t = getDictionary(lang).contact;
    return pageMetadata(lang, "/contato", t.title, t.text);
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contato">) {
    const { lang } = await params;
    if (!hasLocale(lang)) notFound();

    return (
        <main className={styles.page}>
            <Contact lang={lang} dict={getDictionary(lang)} />
        </main>
    );
}
