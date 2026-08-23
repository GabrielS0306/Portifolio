import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from "react-icons/fa6";
import Reveal from "../ui/Reveal";

const contactLinks = [
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/gabriel-dos-santos-nunes-713a2a312/",
        icon: FaLinkedin,
        external: true,
    },
    {
        label: "GitHub",
        href: "https://github.com/GabrielS0306",
        icon: FaGithub,
        external: true,
    },
    {
        label: "Instagram",
        href: "https://instagram.com/biel_.0834",
        icon: FaInstagram,
        external: true,
    },
    {
        label: "E-mail",
        href: "mailto:gabrieldossantosnunes91@gmail.com",
        icon: FaEnvelope,
        external: false,
    },
];

export default function Contact() {
    return (
        <section id="contato" className="container contact">
            <Reveal>
                <h2>Vamos trabalhar juntos?</h2>
                <p>Me chama no LinkedIn, GitHub, Instagram ou por e-mail para conversarmos sobre projetos e oportunidades.</p>

                <div className="contact-links">
                    {contactLinks.map(({ label, href, icon: Icon, external }) => (
                        <a
                            key={label}
                            href={href}
                            className="contact-pill"
                            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            aria-label={label}
                        >
                            <span className="contact-pill-icon">
                                <Icon size={18} />
                            </span>
                            <span className="contact-pill-label">{label}</span>
                        </a>
                    ))}
                </div>
            </Reveal>
        </section>
    )
}