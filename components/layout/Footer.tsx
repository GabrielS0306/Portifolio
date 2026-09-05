import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa6";
import BackToTop from "../ui/BackToTop";
import CopyEmailButton from "../ui/CopyEmailButton";

const footerLinks = [
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

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container footer-inner">
                <a href="#top" className="footer-logo">
                    gabriel<span>.</span>
                </a>

                <div className="footer-links">
                    {footerLinks.map(({ label, href, icon: Icon, external }) => (
                        <a
                            key={label}
                            href={href}
                            className="footer-icon"
                            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            aria-label={label}
                        >
                            <Icon size={16} />
                        </a>
                    ))}

                    <CopyEmailButton email="gabrieldossantosnunes91@gmail.com" className="footer-icon" />
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Gabriel. Feito com carinho e código.</p>
                    <BackToTop />
                </div>
            </div>
        </footer>
    )
}