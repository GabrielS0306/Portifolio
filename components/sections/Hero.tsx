import fs from "fs";
import path from "path";
import { FaDownload } from "react-icons/fa6";
import AnimatedTagline from "./AnimatedTagline";
import Reveal from "../ui/Reveal";

function hasResume() {
    const resumePath = path.join(process.cwd(), "public", "curriculo.pdf");
    return fs.existsSync(resumePath);
}

export default function Hero() {
    const showResumeButton = hasResume();

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
                    {showResumeButton && (
                        <a className="btn ghost" href="/curriculo.pdf" download>
                            <FaDownload size={14} />
                            Baixar CV
                        </a>
                    )}
                </div>
            </Reveal>
        </section>
    )
}
