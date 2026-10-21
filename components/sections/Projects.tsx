import Card from "../ui/Card";
import Reveal from "../ui/Reveal";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/caseStudies";
import type { Dictionary, Locale } from "@/lib/i18n";
import styles from "./Projects.module.css";

interface ProjectsProps {
    lang: Locale;
    dict: Dictionary;
}

export default function Projects({ lang, dict }: ProjectsProps) {
    return (
        <section id="projetos" className={`container ${styles.projects}`}>
            <div className={styles.sectionHead}>
                <h2>{dict.projects.title}</h2>
                <p>{dict.projects.subtitle}</p>
            </div>

            <div className={styles.grid}>
                {projects.map((project, i) => (
                    <Reveal key={project.slug} delay={i * 0.1}>
                        <Card
                            {...project}
                            title={project.title[lang]}
                            description={project.description[lang]}
                            href={caseStudies[project.slug] && `/${lang}/projetos/${project.slug}`}
                        />
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
