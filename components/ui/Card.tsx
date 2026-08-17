import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaCode } from "react-icons/fa";
import Image from "next/image";

interface Cardprops {
  titulo: string;
  description: string;
  tech: string[];
  linkdemo?: string;
  linkcode?: string;
  src?: string; // Tornou-se opcional
  status?: "concluido" | "em-desenvolvimento";
}

export default function Card({ titulo, description, tech, linkdemo, linkcode, src, status = "concluido" }: Cardprops) {
  // Verifica se o src é válido (não está vazio e não é "#")
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
          />
        ) : (
          /* Placeholder visual para projetos sem imagem */
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
        {tech.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>

      <div className="links">
        {linkdemo && linkdemo !== "#" && (
          <a
            href={linkdemo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Demo ${titulo}`}
          >
            <FaArrowUpRightFromSquare size={15} />
            Demo
          </a>
        )}

        {linkcode && linkcode !== "#" && (
          <a
            href={linkcode}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Código ${titulo}`}
          >
            <FaCode size={18} />
            Código
          </a>
        )}
      </div>
    </article>
  );
}