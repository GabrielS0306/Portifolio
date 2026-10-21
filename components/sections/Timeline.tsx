import Reveal from "../ui/Reveal";
import type { Dictionary } from "@/lib/i18n";
import styles from "./Timeline.module.css";

export default function Timeline({ dict }: { dict: Dictionary }) {
    const t = dict.timeline;

    return (
        <section id="trajetoria" className={`container ${styles.timeline}`}>
            <div className={styles.sectionHead}>
                <h2>{t.title}</h2>
                <p>{t.subtitle}</p>
            </div>

            <ol className={styles.list}>
                {t.items.map((item, i) => (
                    <li key={item.title} className={styles.item} data-current={item.current || undefined}>
                        <Reveal delay={i * 0.1}>
                            <div className={styles.meta}>
                                <span className={styles.period}>{item.period}</span>
                                {item.current && <span className={styles.badge}>{t.current}</span>}
                            </div>
                            <h3 className={styles.title}>{item.title}</h3>
                            <p className={styles.place}>{item.place}</p>
                            <p className={styles.description}>{item.description}</p>
                        </Reveal>
                    </li>
                ))}
            </ol>
        </section>
    );
}
