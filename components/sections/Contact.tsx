import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa6";
import "./Contact.css";

export default function Contact() {
    return (
        <section id="contato" className="container contact">
            <h2>Vamos trabalhar juntos?</h2>
            <p>Me chama no LinkedIn, GitHub ou por e-mail para conversarmos sobre projetos e oportunidades.</p>

            <div className="hero-actions">
                <a className="btn primary" href="https://www.linkedin.com/in/gabriel-dos-santos-nunes-713a2a312/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin size={20}/>
                    LinkedIn
                </a>

                <a className="btn ghost" href="https://github.com/GabrielS0306" target="_blank" rel="noopener noreferrer">
                    <FaGithub size={20}/>
                    GitHub
                </a>

                <a className="btn ghost email-btn" href="mailto:gabrieldossantosnunes91@gmail.com" aria-label="Enviar e-mail para Gabriel">
                    <FaEnvelope size={18} />
                    E-mail
                </a>
            </div>
        </section>
    )
}