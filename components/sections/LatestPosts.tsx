import PostList from "../blog/PostList";
import ViewAllLink from "../ui/ViewAllLink";
import { getAllPosts } from "@/lib/blog";
import type { Dictionary, Locale } from "@/lib/i18n";
import styles from "./LatestPosts.module.css";

const LIMIT = 3;

export default function LatestPosts({ lang, dict }: { lang: Locale; dict: Dictionary }) {
    const posts = getAllPosts().slice(0, LIMIT);
    if (posts.length === 0) return null;

    const t = dict.blog;

    return (
        <section id="blog" className={`container ${styles.latest}`}>
            <div className={styles.head}>
                <h2>{t.latest}</h2>
                <ViewAllLink href={`/${lang}/blog`}>{t.viewAll}</ViewAllLink>
            </div>
            <PostList posts={posts} lang={lang} dict={dict} headingLevel="h3" />
        </section>
    );
}
