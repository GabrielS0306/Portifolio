"use client";

import { useEffect, useRef, useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import ThemeToggle from "../ui/ThemeToggle";
import { useActiveSection } from "@/hooks/useActiveSection";
import { navItems } from "@/lib/site";
import styles from "./Header.module.css";

const sections = navItems.map((item) => item.id);

export default function Header() {
    const activeSection = useActiveSection(sections);
    const navRef = useRef<HTMLElement>(null);
    const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
    const menuButtonRef = useRef<HTMLButtonElement>(null);
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

    useEffect(() => {
        if (!menuOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setMenuOpen(false);
                menuButtonRef.current?.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={styles.siteHeader}>
            <div className={`container ${styles.nav}`}>
                <a href="#top" className={styles.logo}>gabriel<span>.</span></a>

                <nav ref={navRef} className={styles.navDesktop}>
                    {navItems.map(({ id, label }) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            ref={(el) => { linkRefs.current[id] = el; }}
                            className={activeSection === id ? styles.active : ""}
                        >
                            {label}
                        </a>
                    ))}
                    <span
                        className={styles.navIndicator}
                        style={{ left: indicator.left, width: indicator.width, opacity: indicator.opacity }}
                    />
                    <ThemeToggle />
                </nav>

                <div className={styles.navMobileControls}>
                    <ThemeToggle />
                    <button
                        ref={menuButtonRef}
                        type="button"
                        className={styles.menuToggle}
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                    >
                        {menuOpen ? <FaXmark size={20} /> : <FaBars size={20} />}
                    </button>
                </div>
            </div>

            {/* inert impede que os links do menu fechado recebam foco pelo teclado */}
            <nav
                id="mobile-menu"
                aria-label="Menu principal"
                className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}
                inert={!menuOpen}
            >
                {navItems.map(({ id, label }) => (
                    <a key={id} href={`#${id}`} onClick={closeMenu} className={activeSection === id ? styles.active : ""}>
                        {label}
                    </a>
                ))}
            </nav>
        </header>
    )
}