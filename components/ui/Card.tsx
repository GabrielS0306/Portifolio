"use client";

import { useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaCode } from "react-icons/fa";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { techIcons } from "@/lib/techIcons";
import { useLocale } from "../LocaleProvider";
import styles from "./Card.module.css";

// Recebe titulo e descricao ja no idioma da pagina
type CardProps = Omit<Project, "slug" | "title" | "description"> & {
    title: string;
    description: string;
};

export default function Card({
    title,
    description,
    tech,
    demoUrl,
    codeUrl,
    image,
    status = "concluido",
}: CardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const t = useLocale().dict.projects;

    return (
        <article className={styles.card}>
            <div className={styles.media}>
                {image ? (
                    <>
                        {!imageLoaded && <div className={styles.skeleton} />}
                        <Image
                            src={image}
                            alt={`${t.imageAlt} ${title}`}
                            width={400}
                            height={350}
                            style={{ objectFit: "cover" }}
                            onLoad={() => setImageLoaded(true)}
                            className={`${styles.image} ${imageLoaded ? styles.loaded : ""}`}
                        />
                    </>
                ) : (
                    <div className={styles.placeholder}>
                        <span>{t.placeholder}</span>
                    </div>
                )}

                {status === "em-desenvolvimento" && (
                    <span className={styles.badgeStatus}>{t.inProgress}</span>
                )}
            </div>

            <h3>{title}</h3>
            <p>{description}</p>

            <div className={styles.tags}>
                {tech.map((tag) => {
                    const Icon = techIcons[tag];
                    return (
                        <span key={tag}>
                            {Icon && <Icon size={12} />}
                            {tag}
                        </span>
                    );
                })}
            </div>

            <div className={styles.links}>
                {demoUrl && (
                    <a
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t.demo} ${title}`}
                    >
                        <FaArrowUpRightFromSquare size={15} />
                        {t.demo}
                    </a>
                )}

                {codeUrl && (
                    <a
                        href={codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t.code} ${title}`}
                    >
                        <FaCode size={18} />
                        {t.code}
                    </a>
                )}
            </div>
        </article>
    );
}
