"use client";

import { useEffect, useRef, useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import ThemeToggle from "../ui/ThemeToggle";
import { useActiveSection } from "@/hooks/useActiveSection";

const sections = ["projetos", "sobre", "contato"];

export default function Header() {
    const activeSection = useActiveSection(sections);
    const navRef = useRef<HTMLElement>(null);
    const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
    const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const activeLink = linkRefs.current[activeSection];
        const nav = navRef.current;

        if (activeLink && nav) {
            const linkRect = activeLink.getBoundingClientRect();
            const navRect = nav.getBoundingClientRect();

            setIndicator({
                left: linkRect.left - navRect.left,
                width: linkRect.width,
                opacity: 1,
            });
        } else {
            setIndicator((prev) => ({ ...prev, opacity: 0 }));
        }
    }, [activeSection]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="site-header">
            <div className="container nav">
                <a href="#top" className="logo">gabriel<span>.</span></a>

                <nav ref={navRef} className="nav-desktop">
                    <a
                        href="#projetos"
                        ref={(el) => { linkRefs.current["projetos"] = el; }}
                        className={activeSection === "projetos" ? "active" : ""}
                    >
                        Projetos
                    </a>
                    <a
                        href="#sobre"
                        ref={(el) => { linkRefs.current["sobre"] = el; }}
                        className={activeSection === "sobre" ? "active" : ""}
                    >
                        Sobre
                    </a>
                    <a
                        href="#contato"
                        ref={(el) => { linkRefs.current["contato"] = el; }}
                        className={activeSection === "contato" ? "active" : ""}
                    >
                        Contato
                    </a>
                    <span
                        className="nav-indicator"
                        style={{ left: indicator.left, width: indicator.width, opacity: indicator.opacity }}
                    />
                    <ThemeToggle />
                </nav>

                <div className="nav-mobile-controls">
                    <ThemeToggle />
                    <button
                        className="menu-toggle"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <FaXmark size={20} /> : <FaBars size={20} />}
                    </button>
                </div>
            </div>

            <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
                <a href="#projetos" onClick={closeMenu} className={activeSection === "projetos" ? "active" : ""}>
                    Projetos
                </a>
                <a href="#sobre" onClick={closeMenu} className={activeSection === "sobre" ? "active" : ""}>
                    Sobre
                </a>
                <a href="#contato" onClick={closeMenu} className={activeSection === "contato" ? "active" : ""}>
                    Contato
                </a>
            </div>
        </header>
    )
}