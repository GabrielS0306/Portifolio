import Skills from "../ui/Skills"
import styles from "./About.module.css";

const stats = [
    { value: "3+", label: "Projetos desenvolvidos" },
    { value: "2+", label: "Anos em formação" },
    { value: "8+", label: "Tecnologias no dia a dia" },
];

export default function About() {
    return (
        <section id="sobre" className={`container ${styles.about}`}>
            <div className={styles.description}>
                <h2>Sobre mim</h2>
                <p>
                    Estou em formação para atuar como desenvolvedor full-stack, criando aplicações web
                    completas com foco em qualidade de código, experiência do usuário e performance.
                </p>
                <p>
                    Atualmente, estudo arquitetura de software, autenticação, integração entre sistemas e
                    boas práticas para construir produtos escaláveis e de fácil manutenção.
                </p>

                <div className={styles.stats}>
                    {stats.map((stat) => (
                        <div key={stat.label} className={styles.stat}>
                            <span className={styles.statValue}>{stat.value}</span>
                            <span className={styles.statLabel}>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <Skills />
        </section>
    )
}