import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostList from "@/components/blog/PostList";
import { getAllPosts } from "@/lib/blog";
import { getDictionary, hasLocale } from "@/lib/i18n";
import styles from "./blog.module.css";

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">): Promise<Metadata> {
    const { lang } = await params;
    if (!hasLocale(lang)) return {};

    const t = getDictionary(lang).blog;
    return {
        title: t.title,
        description: t.subtitle,
        alternates: {
            canonical: `/${lang}/blog`,
            languages: { "pt-BR": "/pt/blog", en: "/en/blog" },
        },
    };
}

export default async function BlogPage({ params }: PageProps<"/[lang]/blog">) {
    const { lang } = await params;
    if (!hasLocale(lang)) notFound();

    const dict = getDictionary(lang);
    const t = dict.blog;
    const posts = getAllPosts();

    return (
        <main className={`container ${styles.page}`}>
            <header className={styles.header}>
                <h1>{t.title}</h1>
                <p>{t.subtitle}</p>
                {t.portugueseOnly && <p className={styles.notice}>{t.portugueseOnly}</p>}
            </header>

            {posts.length > 0 ? (
                <PostList posts={posts} lang={lang} dict={dict} />
            ) : (
                <p className={styles.empty}>{t.empty}</p>
            )}
        </main>
    );
}
