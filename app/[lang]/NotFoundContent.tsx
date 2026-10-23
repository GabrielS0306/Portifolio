"use client";

import Link from "next/link";
import styles from "./not-found.module.css";
import button from "@/components/ui/Button.module.css";
import { useLocale } from "@/components/LocaleProvider";
import { siteConfig } from "@/lib/site";

export default function NotFoundContent() {
    const { lang, dict } = useLocale();

    return (
        <main className={`container ${styles.notFound}`}>
            {/* A 404 e montada no cliente, entao o titulo da aba e definido aqui (React 19 o move para o <head>) */}
            <title>{`404 | ${siteConfig.name}`}</title>
            <p className={styles.code} aria-hidden="true">
                404
            </p>
            <h1>{dict.notFound.title}</h1>
            <p className={styles.lead}>{dict.notFound.lead}</p>

            <div className={styles.actions}>
                <Link className={`${button.btn} ${button.primary}`} href={`/${lang}`}>
                    {dict.notFound.home}
                </Link>
                <Link className={`${button.btn} ${button.ghost}`} href={`/${lang}/projetos`}>
                    {dict.notFound.projects}
                </Link>
            </div>
        </main>
    );
}
