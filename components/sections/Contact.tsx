import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import Reveal from "../ui/Reveal";
import CopyEmailButton from "../ui/CopyEmailButton";
import ContactForm from "../ui/ContactForm";
import { siteConfig, socialLinks } from "@/lib/site";
import type { Dictionary, Locale } from "@/lib/i18n";
import button from "../ui/Button.module.css";
import styles from "./Contact.module.css";

interface ContactProps {
    lang: Locale;
    dict: Dictionary;
    // "cta": convite na home, com botao para a pagina; "page": pagina /contato com o formulario
    variant?: "cta" | "page";
}

export default function Contact({ lang, dict, variant = "page" }: ContactProps) {
    const cta = variant === "cta";
    const Title = cta ? "h2" : "h1";

    return (
        <section id="contato" className={`container ${styles.contact}`}>
            <Reveal className={cta ? styles.ctaLayout : styles.layout}>
                <div className={styles.intro}>
                    <Title>{dict.contact.title}</Title>
                    <p>{dict.contact.text}</p>

                    <div className={styles.contactLinks}>
                        {socialLinks.map(({ label, href, icon: Icon }) => (
                            <a
                                key={label}
                                href={href}
                                className={styles.pill}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                            >
                                <span className={styles.pillIcon}>
                                    <Icon size={18} />
                                </span>
                                <span className={styles.pillLabel}>{label}</span>
                            </a>
                        ))}

                        <CopyEmailButton
                            email={siteConfig.email}
                            className={styles.pill}
                            labelClassName={styles.pillLabel}
                            iconClassName={styles.pillIcon}
                        />
                    </div>
                </div>

                {cta ? (
                    <Link href={`/${lang}/contato`} className={`${button.btn} ${button.primary}`}>
                        {dict.hero.contactMe}
                        <FaArrowRight size={13} aria-hidden="true" />
                    </Link>
                ) : (
                    <ContactForm />
                )}
            </Reveal>
        </section>
    );
}
