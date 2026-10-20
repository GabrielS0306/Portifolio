import { FaDownload } from "react-icons/fa6";
import AnimatedTagline from "./AnimatedTagline";
import Reveal from "../ui/Reveal";

// Caminho do currículo em /public. Defina como "/curriculo.pdf" ao adicionar o arquivo.
const RESUME_PATH: string | null = null;

export default function Hero() {
    return (
        <section className="hero container">
            <Reveal>
                <span className="status-badge">
                    <span className="status-dot" />
                    Disponível para novos projetos
                </span>

                <p className="eyebrow">Desenvolvedor Full-Stack</p>
                <h1>
                    Eu desenvolvo <AnimatedTagline suffix="," /> do front{"\u2011"}end ao back{"\u2011"}end.
                </h1>

                <p className="lead">
                    Olá, eu sou Gabriel. Estudante de programação e amante de tecnologia, focado em construir
                    soluções web com interfaces modernas, APIs robustas e bancos de dados bem estruturados.
                </p>

                <div className="hero-actions">
                    <a className="btn primary" href="#projetos">Ver projetos</a>
                    <a className="btn ghost" href="#contato">Falar comigo</a>
                    {RESUME_PATH && (
                        <a className="btn ghost" href={RESUME_PATH} download>
                            <FaDownload size={14} />
                            Baixar CV
                        </a>
                    )}
                </div>
            </Reveal>
        </section>
    )
}
