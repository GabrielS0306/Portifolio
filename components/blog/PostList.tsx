import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { htmlLang } from "@/lib/i18n";
import { formatPostDate, type PostMeta } from "@/lib/blog";
import styles from "./PostList.module.css";

interface PostListProps {
    posts: PostMeta[];
    lang: Locale;
    dict: Dictionary;
    headingLevel?: "h2" | "h3";
}

export default function PostList({ posts, lang, dict, headingLevel: Heading = "h2" }: PostListProps) {
    const t = dict.blog;

    return (
        <ul className={styles.list}>
            {posts.map((post) => (
                <li key={post.slug}>
                    <article className={styles.item}>
                        <p className={styles.meta}>
                            <time dateTime={post.date}>{formatPostDate(post.date, htmlLang[lang])}</time>
                            <span aria-hidden="true">·</span>
                            <span>
                                {post.readingMinutes} {t.readingTime}
                            </span>
                            {post.draft && <span className={styles.draft}>{t.draft}</span>}
                        </p>
                        <Heading className={styles.title}>
                            <Link href={`/${lang}/blog/${post.slug}`}>{post.title}</Link>
                        </Heading>
                        <p className={styles.summary}>{post.summary}</p>
                        {post.tags.length > 0 && (
                            <ul className={styles.tags} aria-label="Tags">
                                {post.tags.map((tag) => (
                                    <li key={tag}>{tag}</li>
                                ))}
                            </ul>
                        )}
                    </article>
                </li>
            ))}
        </ul>
    );
}
