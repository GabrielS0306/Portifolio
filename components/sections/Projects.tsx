import Card from "../ui/Card";
import Reveal from "../ui/Reveal";
import { projects } from "@/data/projects";
import styles from "./Projects.module.css";

export default function Projects() {
    return (
        <section id="projetos" className={`container ${styles.projects}`}>
            <div className={styles.sectionHead}>
                <h2>Projetos em destaque</h2>
                <p>Projetos com foco em arquitetura full-stack, integração e entrega de valor.</p>
            </div>

            <div className={styles.grid}>
                {projects.map((project, i) => (
                    <Reveal key={project.title} delay={i * 0.1}>
                        <Card {...project} />
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
