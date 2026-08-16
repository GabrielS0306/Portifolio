import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaCode } from "react-icons/fa";
import Image from "next/image";

interface Cardprops {
  titulo: string;
  description: string;
  tecone: string;
  tectwo: string;
  tectree: string;
  linkdemo?: string;
  linkcode?: string;
  src?: string; // Tornou-se opcional
}

export default function Card({titulo, description, tecone, tectwo, tectree, linkdemo, linkcode, src}: Cardprops) {
  // Verifica se o src é válido (não está vazio e não é "#")
  const hasValidImage = Boolean(src && src !== "#" && src.trim() !== "");

  return (
    <article className="card">
      {hasValidImage ? (
        <Image
          src={src as string}
          alt={`Imagem do projeto ${titulo}`}
          width={400}
          height={350}
        />
      ) : (
        /* Placeholder visual para projetos sem imagem */
        <div className="flex h-[200px] w-full items-center justify-center bg-gray-800 text-gray-400 object-cover">
          <span>Sem imagem disponível</span>
        </div>
      )}

      <h3>{titulo}</h3>
      <p>{description}</p>

      <div className="tags">
        <span>{tecone}</span>
        <span>{tectwo}</span>
        <span>{tectree}</span>
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