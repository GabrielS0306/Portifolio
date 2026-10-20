import { FaDownload } from "react-icons/fa6";
import AnimatedTagline from "../ui/AnimatedTagline";
import Reveal from "../ui/Reveal";
import styles from "./Hero.module.css";

// Caminho do currículo em /public. Defina como "/curriculo.pdf" ao adicionar o arquivo.
const RESUME_PATH: string | null = null;

export default function Hero() {
    return (
        <section className={`container ${styles.hero}`}>
            <Reveal>
                <span className={styles.statusBadge}>
                    <span className={styles.statusDot} />
                    Disponível para novos projetos
                </span>

                <p className={styles.eyebrow}>Desenvolvedor Full-Stack</p>
                <h1>
                    Eu desenvolvo <AnimatedTagline suffix="," /> do front{"\u2011"}end ao back{"\u2011"}end.
                </h1>

                <p className={styles.lead}>
                    Olá, eu sou Gabriel. Estudante de programação e amante de tecnologia, focado em construir
                    soluções web com interfaces modernas, APIs robustas e bancos de dados bem estruturados.
                </p>

                <div className={styles.heroActions}>
                    <a className={`${styles.btn} ${styles.primary}`} href="#projetos">Ver projetos</a>
                    <a className={`${styles.btn} ${styles.ghost}`} href="#contato">Falar comigo</a>
                    {RESUME_PATH && (
                        <a className={`${styles.btn} ${styles.ghost}`} href={RESUME_PATH} download>
                            <FaDownload size={14} />
                            Baixar CV
                        </a>
                    )}
                </div>
            </Reveal>
        </section>
    )
}
