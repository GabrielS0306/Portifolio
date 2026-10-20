import { FaDownload } from "react-icons/fa6";
import AnimatedTagline from "../ui/AnimatedTagline";
import Reveal from "../ui/Reveal";
import styles from "./Hero.module.css";
import button from "../ui/Button.module.css";
import type { Dictionary } from "@/lib/i18n";

// Caminho do currículo em /public. Defina como "/curriculo.pdf" ao adicionar o arquivo.
const RESUME_PATH: string | null = null;

export default function Hero({ dict }: { dict: Dictionary }) {
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
                    <a className={`${button.btn} ${button.primary}`} href="#projetos">
                        {t.viewProjects}
                    </a>
                    <a className={`${button.btn} ${button.ghost}`} href="#contato">
                        {t.contactMe}
                    </a>
                    {RESUME_PATH && (
                        <a className={`${button.btn} ${button.ghost}`} href={RESUME_PATH} download>
                            <FaDownload size={14} />
                            {t.downloadCv}
                        </a>
                    )}
                </div>
            </Reveal>
        </section>
    );
}
