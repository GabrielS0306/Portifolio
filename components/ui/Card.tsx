import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaCode } from "react-icons/fa";
// import Image from "next/image";

interface Cardprops {
    titulo: string;
    description: string;
    tecone: string;
    tectwo: string;
    tectree: string;
    linkdemo?: string;
    linkcode?: string;
}

export default function Card({titulo, description, tecone, tectwo, tectree, linkdemo, linkcode} : Cardprops) {
    return (
        <article className="card">
            {/* <Image src="" alt="Não tem imagem no momento" />  */}

            <h3>{titulo}</h3>
            <p>{description}</p>

            <div className="tags">
                <span>{tecone}</span>
                <span>{tectwo}</span>
                <span>{tectree}</span>
            </div>

            <div className="links">
                <a href={linkdemo} target="_blank" rel="noopener noreferrer" aria-label="Demo Sistema de Gestão de Vendas">
                    <FaArrowUpRightFromSquare size={15} />
                    Demo
                </a>

                <a href={linkcode} target="_blank" rel="noopener noreferrer" aria-label="Código Sistema de Gestão de Vendas">
                    <FaCode size={18} />
                    Código
                </a>
            </div>
        </article>
    )
}