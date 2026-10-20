import Reveal from "../ui/Reveal";
import CopyEmailButton from "../ui/CopyEmailButton";
import { siteConfig, socialLinks } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";
import styles from "./Contact.module.css";

export default function Contact({ dict }: { dict: Dictionary }) {
    return (
        <section id="contato" className={`container ${styles.contact}`}>
            <Reveal>
                <h2>{dict.contact.title}</h2>
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
            </Reveal>
        </section>
    );
}
