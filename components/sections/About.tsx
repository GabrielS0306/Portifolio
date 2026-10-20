import Skills from "../ui/Skills";
import type { Dictionary } from "@/lib/i18n";
import styles from "./About.module.css";

export default function About({ dict }: { dict: Dictionary }) {
    const t = dict.about;

    return (
        <section id="sobre" className={`container ${styles.about}`}>
            <div className={styles.description}>
                <h2>{t.title}</h2>
                {t.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                ))}

                <div className={styles.stats}>
                    {t.stats.map((stat) => (
                        <div key={stat.label} className={styles.stat}>
                            <span className={styles.statValue}>{stat.value}</span>
                            <span className={styles.statLabel}>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <Skills groupTitles={t.skillGroups} />
        </section>
    );
}
