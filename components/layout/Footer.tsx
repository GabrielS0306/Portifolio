import Link from "next/link";
import BackToTop from "../ui/BackToTop";
import CopyEmailButton from "../ui/CopyEmailButton";
import { siteConfig, socialLinks } from "@/lib/site";
import type { Dictionary, Locale } from "@/lib/i18n";
import styles from "./Footer.module.css";

interface FooterProps {
    lang: Locale;
    dict: Dictionary;
}

export default function Footer({ lang, dict }: FooterProps) {
    return (
        <footer className={styles.siteFooter}>
            <div className={`container ${styles.footerInner}`}>
                <Link href={`/${lang}`} className={styles.footerLogo}>
                    gabriel<span>.</span>
                </Link>

                <div className={styles.footerLinks}>
                    {socialLinks.map(({ label, href, icon: Icon }) => (
                        <a
                            key={label}
                            href={href}
                            className={styles.footerIcon}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                        >
                            <Icon size={16} />
                        </a>
                    ))}

                    <CopyEmailButton email={siteConfig.email} className={styles.footerIcon} />
                </div>

                <div className={styles.footerBottom}>
                    <p>
                        &copy; {new Date().getFullYear()} Gabriel. {dict.footer.madeWith}
                    </p>
                    <BackToTop />
                </div>
            </div>
        </footer>
    );
}
