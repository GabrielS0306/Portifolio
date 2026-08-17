import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaCode } from "react-icons/fa";
import {
  SiPhp,
  SiMysql,
  SiTailwindcss,
  SiReact,
  SiTypescript,
  SiExpress,
  SiMongodb,
  SiLaravel,
} from "react-icons/si";
import { IconType } from "react-icons";
import Image from "next/image";

interface Cardprops {
  titulo: string;
  description: string;
  tech: string[];
  linkdemo?: string;
  linkcode?: string;
  src?: string;
  status?: "concluido" | "em-desenvolvimento";
}

// Mapa de tech → ícone. Cobre as techs que você usa hoje nos 3 projetos.
const techIcons: Record<string, IconType> = {
  PHP: SiPhp,
  MySQL: SiMysql,
  TailwindCSS: SiTailwindcss,
  "Tailwind CSS": SiTailwindcss,
  React: SiReact,
  TypeScript: SiTypescript,
  Express: SiExpress,
  MongoDB: SiMongodb,
  Laravel: SiLaravel,
};

export default function Card({ titulo, description, tech, linkdemo, linkcode, src, status = "concluido" }: Cardprops) {
  const hasValidImage = Boolean(src && src !== "#" && src.trim() !== "");

  return (
    <article className="card">
      <div className="card-media">
        {hasValidImage ? (
          <Image
            src={src as string}
            alt={`Imagem do projeto ${titulo}`}
            width={400}
            height={350}
            style={{ objectFit: "cover" }}
            priority
          />
        ) : (
          <div className="card-placeholder">
            <span>Preview em construção</span>
          </div>
        )}

        {status === "em-desenvolvimento" && (
          <span className="badge-status">Em Desenvolvimento</span>
        )}
      </div>

      <h3>{titulo}</h3>
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
        {linkdemo && linkdemo !== "#" && (
          <a href={linkdemo} target="_blank" rel="noopener noreferrer" aria-label={`Demo ${titulo}`}>
            <FaArrowUpRightFromSquare size={15} />
            Demo
          </a>
        )}

        {linkcode && linkcode !== "#" && (
          <a href={linkcode} target="_blank" rel="noopener noreferrer" aria-label={`Código ${titulo}`}>
            <FaCode size={18} />
            Código
          </a>
        )}
      </div>
    </article>
  );
}