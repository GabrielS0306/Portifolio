import Reveal from "../ui/Reveal";
import CopyEmailButton from "../ui/CopyEmailButton";
import { siteConfig, socialLinks } from "@/lib/site";

export default function Contact() {
    return (
        <section id="contato" className="container contact">
            <Reveal>
                <h2>Vamos trabalhar juntos?</h2>
                <p>Me chama no LinkedIn, GitHub, Instagram ou por e-mail para conversarmos sobre projetos e oportunidades.</p>

                <div className="contact-links">
                    {socialLinks.map(({ label, href, icon: Icon }) => (
                        <a
                            key={label}
                            href={href}
                            className="contact-pill"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                        >
                            <span className="contact-pill-icon">
                                <Icon size={18} />
                            </span>
                            <span className="contact-pill-label">{label}</span>
                        </a>
                    ))}

                    <CopyEmailButton
                        email={siteConfig.email}
                        className="contact-pill"
                        labelClassName="contact-pill-label"
                        iconClassName="contact-pill-icon"
                    />
                </div>
            </Reveal>
        </section>
    )
}