import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { formatPostDate, getAllPosts } from "@/lib/blog";
import { getDictionary, hasLocale, htmlLang, ogLocale } from "@/lib/i18n";
import styles from "./post.module.css";

export function generateStaticParams() {
    return getAllPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

function getEntry(slug: string) {
    const posts = getAllPosts();
    const index = posts.findIndex((post) => post.slug === slug);
    if (index === -1) return null;
    // A lista vem do mais novo para o mais antigo
    return { post: posts[index], newer: posts[index - 1], older: posts[index + 1] };
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
    const { lang, slug } = await params;
    const entry = getEntry(slug);
    if (!hasLocale(lang) || !entry) return {};

    const { post } = entry;
    return {
        title: post.title,
        description: post.summary,
        // O texto e o mesmo nas duas versoes (escrito em portugues), entao a original e a de /pt
        alternates: { canonical: `/pt/blog/${slug}` },
        robots: post.draft ? { index: false } : undefined,
        openGraph: {
            title: post.title,
            description: post.summary,
            url: `/${lang}/blog/${slug}`,
            locale: ogLocale[lang],
            type: "article",
            publishedTime: post.date,
            tags: post.tags,
        },
    };
}

export default async function PostPage({ params }: PageProps<"/[lang]/blog/[slug]">) {
    const { lang, slug } = await params;
    const entry = getEntry(slug);
    if (!hasLocale(lang) || !entry) notFound();

    const t = getDictionary(lang).blog;
    const { post, newer, older } = entry;
    const { default: Content } = await import(`@/content/blog/${slug}.mdx`);

    return (
        <main className={`container ${styles.page}`}>
            <Link href={`/${lang}/blog`} className={styles.back}>
                <FaArrowLeft size={12} aria-hidden="true" />
                {t.back}
            </Link>

            <header className={styles.header}>
                <p className={styles.meta}>
                    <time dateTime={post.date}>{formatPostDate(post.date, htmlLang[lang])}</time>
                    <span aria-hidden="true">·</span>
                    <span>
                        {post.readingMinutes} {t.readingTime}
                    </span>
                    {post.draft && <span className={styles.draft}>{t.draft}</span>}
                </p>
                <h1 lang={htmlLang.pt}>{post.title}</h1>
                <p className={styles.summary} lang={htmlLang.pt}>
                    {post.summary}
                </p>
                {post.tags.length > 0 && (
                    <ul className={styles.tags} aria-label="Tags">
                        {post.tags.map((tag) => (
                            <li key={tag}>{tag}</li>
                        ))}
                    </ul>
                )}
                {t.portugueseOnly && <p className={styles.notice}>{t.portugueseOnly}</p>}
            </header>

            <div className={styles.layout}>
                {post.headings.length > 1 && (
                    <nav className={styles.toc} aria-label={t.toc}>
                        <p className={styles.tocTitle}>{t.toc}</p>
                        <ol>
                            {post.headings.map((heading) => (
                                <li key={heading.id} data-depth={heading.depth}>
                                    <a href={`#${heading.id}`}>{heading.text}</a>
                                </li>
                            ))}
                        </ol>
                    </nav>
                )}

                {/* O conteudo e sempre em portugues, mesmo na versao /en do site */}
                <article className={styles.prose} lang={htmlLang.pt}>
                    <Content />
                </article>
            </div>

            {(newer || older) && (
                <nav className={styles.pager} aria-label={t.otherPosts}>
                    {older && (
                        <Link href={`/${lang}/blog/${older.slug}`} rel="prev">
                            <span>
                                <FaArrowLeft size={11} aria-hidden="true" /> {t.previous}
                            </span>
                            <strong>{older.title}</strong>
                        </Link>
                    )}
                    {newer && (
                        <Link href={`/${lang}/blog/${newer.slug}`} rel="next" className={styles.pagerNext}>
                            <span>
                                {t.following} <FaArrowRight size={11} aria-hidden="true" />
                            </span>
                            <strong>{newer.title}</strong>
                        </Link>
                    )}
                </nav>
            )}
        </main>
    );
}
