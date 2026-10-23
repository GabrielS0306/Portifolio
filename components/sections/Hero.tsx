import Link from "next/link";
import { FaDownload } from "react-icons/fa6";
import AnimatedTagline from "../ui/AnimatedTagline";
import Reveal from "../ui/Reveal";
import styles from "./Hero.module.css";
import button from "../ui/Button.module.css";
import type { Dictionary, Locale } from "@/lib/i18n";
import { resumeFiles } from "@/lib/site";

interface HeroProps {
    lang: Locale;
    dict: Dictionary;
}

export default function Hero({ lang, dict }: HeroProps) {
    const t = dict.hero;

    return (
        <section className={`container ${styles.hero}`}>
            <Reveal>
                <span className={styles.statusBadge}>
                    <span className={styles.statusDot} />
                    {t.status}
                </span>

                <p className={styles.eyebrow}>{t.eyebrow}</p>
                <h1>
                    {t.titleStart} <AnimatedTagline words={t.taglineWords} suffix="," /> {t.titleEnd}
                </h1>

                <p className={styles.lead}>{t.lead}</p>

                <div className={styles.heroActions}>
                    <Link className={`${button.btn} ${button.primary}`} href={`/${lang}/projetos`}>
                        {t.viewProjects}
                    </Link>
                    <Link className={`${button.btn} ${button.ghost}`} href={`/${lang}/contato`}>
                        {t.contactMe}
                    </Link>
                    <a className={`${button.btn} ${button.ghost}`} href={resumeFiles[lang]} download>
                        <FaDownload size={14} />
                        {t.downloadCv}
                    </a>
                </div>
            </Reveal>
        </section>
    );
}
