"use client";

import { useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaCode } from "react-icons/fa";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { techIcons } from "@/lib/techIcons";

export default function Card({ title, description, tech, demoUrl, codeUrl, image, status = "concluido" }: Project) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article className="card">
      <div className="card-media">
        {image ? (
          <>
            {!imageLoaded && <div className="card-skeleton" />}
            <Image
              src={image}
              alt={`Imagem do projeto ${title}`}
              width={400}
              height={350}
              style={{ objectFit: "cover" }}
              onLoad={() => setImageLoaded(true)}
              className={`card-image ${imageLoaded ? "loaded" : ""}`}
            />
          </>
        ) : (
          <div className="card-placeholder">
            <span>Preview em construção</span>
          </div>
        )}

        {status === "em-desenvolvimento" && (
          <span className="badge-status">Em Desenvolvimento</span>
        )}
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      <div className="tags">
        {tech.map((t) => {
          const Icon = techIcons[t];
          return (
            <span key={t}>
              {Icon && <Icon size={12} />}
              {t}
            </span>
          );
        })}
      </div>

      <div className="links">
        {demoUrl && (
          <a href={demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Demo ${title}`}>
            <FaArrowUpRightFromSquare size={15} />
            Demo
          </a>
        )}

        {codeUrl && (
          <a href={codeUrl} target="_blank" rel="noopener noreferrer" aria-label={`Código ${title}`}>
            <FaCode size={18} />
            Código
          </a>
        )}
      </div>
    </article>
  );
}
