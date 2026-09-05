import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa6";
import Reveal from "../ui/Reveal";
import CopyEmailButton from "../ui/CopyEmailButton";

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

                    <CopyEmailButton
                        email="gabrieldossantosnunes91@gmail.com"
                        className="contact-pill"
                        labelClassName="contact-pill-label"
                        iconClassName="contact-pill-icon"
                    />
                </div>
            </Reveal>
        </section>
    )
}