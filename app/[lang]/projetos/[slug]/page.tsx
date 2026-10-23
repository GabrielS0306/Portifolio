import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaArrowRight, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaCode } from "react-icons/fa";
import TechTags from "@/components/ui/TechTags";
import { caseStudies } from "@/data/caseStudies";
import { projects } from "@/data/projects";
import { getDictionary, hasLocale, ogLocale } from "@/lib/i18n";
import buttonStyles from "@/components/ui/Button.module.css";
import styles from "./page.module.css";

// So existem paginas para projetos com estudo de caso; os demais slugs viram 404
const projectsWithCaseStudy = projects.filter((project) => caseStudies[project.slug]);

export function generateStaticParams() {
    return projectsWithCaseStudy.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

function getEntry(slug: string) {
    const index = projectsWithCaseStudy.findIndex((project) => project.slug === slug);
    if (index === -1) return null;
    return { index, project: projectsWithCaseStudy[index], caseStudy: caseStudies[slug] };
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projetos/[slug]">): Promise<Metadata> {
    const { lang, slug } = await params;
    const entry = getEntry(slug);
    if (!hasLocale(lang) || !entry) return {};

    const { project } = entry;
    const title = project.title[lang];
    const description = project.description[lang];
    const path = `/projetos/${slug}`;

    return {
        title,
        description,
        alternates: {
            canonical: `/${lang}${path}`,
            languages: { "pt-BR": `/pt${path}`, en: `/en${path}` },
        },
        openGraph: {
            title,
            description,
            url: `/${lang}${path}`,
            locale: ogLocale[lang],
            type: "article",
            ...(project.image && { images: [{ url: project.image, alt: title }] }),
        },
    };
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projetos/[slug]">) {
    const { lang, slug } = await params;
    const entry = getEntry(slug);
    if (!hasLocale(lang) || !entry) notFound();

    const dict = getDictionary(lang);
    const t = dict.caseStudy;
    const { index, project, caseStudy } = entry;
    const content = caseStudy.content[lang];
    const title = project.title[lang];

    // Navegacao circular: o anterior do primeiro e o ultimo, e vice-versa
    const total = projectsWithCaseStudy.length;
    const previous = projectsWithCaseStudy[(index - 1 + total) % total];
    const following = projectsWithCaseStudy[(index + 1) % total];

    return (
        <main className={`container ${styles.page}`}>
            <Link href={`/${lang}/projetos`} className={styles.back}>
                <FaArrowLeft size={12} aria-hidden="true" />
                {t.back}
            </Link>

            <header className={styles.header}>
                {project.status === "em-desenvolvimento" && (
                    <span className={styles.status}>{dict.projects.inProgress}</span>
                )}
                <h1>{title}</h1>
                <p className={styles.lead}>{project.description[lang]}</p>

                <dl className={styles.meta}>
                    <div>
                        <dt>{t.role}</dt>
                        <dd>{content.role}</dd>
                    </div>
                    <div>
                        <dt>{t.stack}</dt>
                        <dd>
                            <TechTags tech={project.tech} />
                        </dd>
                    </div>
                </dl>

                <div className={styles.actions}>
                    {project.demoUrl && (
                        <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${buttonStyles.btn} ${buttonStyles.primary}`}
                        >
                            <FaArrowUpRightFromSquare size={14} aria-hidden="true" />
                            {dict.projects.demo}
                        </a>
                    )}
                    {project.codeUrl && (
                        <a
                            href={project.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${buttonStyles.btn} ${buttonStyles.ghost}`}
                        >
                            <FaCode size={16} aria-hidden="true" />
                            {dict.projects.code}
                        </a>
                    )}
                </div>
            </header>

            {project.image && (
                <div className={styles.cover}>
                    <Image
                        src={project.image}
                        alt={`${dict.projects.imageAlt} ${title}`}
                        fill
                        priority
                        sizes="(max-width: 1100px) 100vw, 1040px"
                        style={{ objectFit: "cover", objectPosition: "top" }}
                    />
                </div>
            )}

            <section className={styles.section} aria-labelledby="sobre-projeto">
                <h2 id="sobre-projeto">{t.about}</h2>
                {content.context.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                ))}
            </section>

            <section className={styles.section} aria-labelledby="funcionalidades">
                <h2 id="funcionalidades">{t.highlights}</h2>
                <ul className={styles.checklist}>
                    {content.highlights.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </section>

            <section className={styles.section} aria-labelledby="decisoes">
                <h2 id="decisoes">{t.decisions}</h2>
                <div className={styles.decisions}>
                    {content.decisions.map((decision) => (
                        <article key={decision.title} className={styles.decision}>
                            <h3>{decision.title}</h3>
                            <p>{decision.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            {caseStudy.gallery && (
                <section className={styles.section} aria-labelledby="telas">
                    <h2 id="telas">{t.gallery}</h2>
                    <div className={styles.gallery}>
                        {caseStudy.gallery.map((shot) => (
                            <figure key={shot.src}>
                                <Image
                                    src={shot.src}
                                    alt={shot.alt[lang]}
                                    width={shot.width}
                                    height={shot.height}
                                    sizes="(max-width: 1100px) 100vw, 1040px"
                                />
                                <figcaption>{shot.alt[lang]}</figcaption>
                            </figure>
                        ))}
                    </div>
                </section>
            )}

            <section className={styles.section} aria-labelledby="aprendizados">
                <h2 id="aprendizados">{t.learnings}</h2>
                <ul className={styles.bullets}>
                    {content.learnings.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </section>

            {content.next && (
                <section className={styles.section} aria-labelledby="proximos-passos">
                    <h2 id="proximos-passos">{t.next}</h2>
                    <ul className={styles.bullets}>
                        {content.next.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </section>
            )}

            {total > 1 && (
                <nav className={styles.pager} aria-label={t.otherProjects}>
                    <Link href={`/${lang}/projetos/${previous.slug}`} rel="prev">
                        <span>
                            <FaArrowLeft size={11} aria-hidden="true" /> {t.previous}
                        </span>
                        <strong>{previous.title[lang]}</strong>
                    </Link>
                    <Link
                        href={`/${lang}/projetos/${following.slug}`}
                        rel="next"
                        className={styles.pagerNext}
                    >
                        <span>
                            {t.following} <FaArrowRight size={11} aria-hidden="true" />
                        </span>
                        <strong>{following.title[lang]}</strong>
                    </Link>
                </nav>
            )}
        </main>
    );
}
