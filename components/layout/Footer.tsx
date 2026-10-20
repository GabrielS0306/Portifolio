import BackToTop from "../ui/BackToTop";
import CopyEmailButton from "../ui/CopyEmailButton";
import { siteConfig, socialLinks } from "@/lib/site";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container footer-inner">
                <a href="#top" className="footer-logo">
                    gabriel<span>.</span>
                </a>

                <div className="footer-links">
                    {socialLinks.map(({ label, href, icon: Icon }) => (
                        <a
                            key={label}
                            href={href}
                            className="footer-icon"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                        >
                            <Icon size={16} />
                        </a>
                    ))}

                    <CopyEmailButton email={siteConfig.email} className="footer-icon" />
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Gabriel. Feito com carinho e código.</p>
                    <BackToTop />
                </div>
            </div>
        </footer>
    )
}
