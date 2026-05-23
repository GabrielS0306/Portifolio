import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaCode } from "react-icons/fa";

interface Cardprops {
    titulo: string;
    paragrafo: string;
    tecone: string;
    tectwo: string;
    tectree: string;
}

export default function Card({titulo, paragrafo, tecone, tectwo, tectree} : Cardprops) {
    return (
        <article className="card">
            {/* <img src="" alt="Não tem imagem no momento" /> */}

            <h3>{titulo}</h3>
            <p>{paragrafo}</p>

            <div className="tags">
                <span>{tecone}</span>
                <span>{tectwo}</span>
                <span>{tectree}</span>
            </div>

            <div className="links">
                <a href="#" aria-label="Demo Sistema de Gestão de Vendas">
                    <FaArrowUpRightFromSquare size={15} />
                    Demo
                </a>

                <a href="#" aria-label="Código Sistema de Gestão de Vendas">
                    <FaCode size={18} />
                    Código
                </a>
            </div>
        </article>
    )
}