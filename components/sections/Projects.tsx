import Card from "../ui/Card";
import Reveal from "../ui/Reveal";
import ViewAllLink from "../ui/ViewAllLink";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/caseStudies";
import type { Dictionary, Locale } from "@/lib/i18n";
import styles from "./Projects.module.css";

interface ProjectsProps {
    lang: Locale;
    dict: Dictionary;
    // "featured": resumo na home, com link para a pagina; "page": titulo principal da pagina /projetos
    variant?: "featured" | "page";
}

const FEATURED_LIMIT = 3;

export default function Projects({ lang, dict, variant = "page" }: ProjectsProps) {
    const t = dict.projects;
    const featured = variant === "featured";
    const list = featured ? projects.slice(0, FEATURED_LIMIT) : projects;
    const Title = featured ? "h2" : "h1";

    return (
        <section id="projetos" className={`container ${styles.projects}`}>
            <div className={styles.sectionHead}>
                <div>
                    <Title>{featured ? t.title : t.pageTitle}</Title>
                    <p>{t.subtitle}</p>
                </div>
                {featured && <ViewAllLink href={`/${lang}/projetos`}>{t.viewAll}</ViewAllLink>}
            </div>

            <div className={styles.grid}>
                {list.map((project, i) => (
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
