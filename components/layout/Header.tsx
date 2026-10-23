"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaXmark } from "react-icons/fa6";
import ThemeToggle from "../ui/ThemeToggle";
import LanguageToggle from "../ui/LanguageToggle";
import { useLocale } from "../LocaleProvider";
import { navItems } from "@/lib/site";
import styles from "./Header.module.css";

// showBlog: o link do blog so aparece quando existe algum post publicado
export default function Header({ showBlog = false }: { showBlog?: boolean }) {
    const { lang, dict } = useLocale();
    const pathname = usePathname() ?? "";
    // Itens do menu como paginas; o blog entra no fim quando ha post publicado
    const links = [
        ...navItems.map(({ path, key }) => ({ href: `/${lang}/${path}`, label: dict.nav[key] })),
        ...(showBlog ? [{ href: `/${lang}/blog`, label: dict.nav.blog }] : []),
    ];
    // Ativo na propria pagina e nas internas (ex.: /pt/projetos/skillflow marca "Projetos")
    const activeHref =
        links.find(({ href }) => pathname === href || pathname.startsWith(`${href}/`))?.href ?? "";
    const navRef = useRef<HTMLElement>(null);
    const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const activeLink = linkRefs.current[activeHref];
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
    }, [activeHref]);

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
                <Link href={`/${lang}`} className={styles.logo}>
                    gabriel<span>.</span>
                </Link>

                <nav ref={navRef} className={styles.navDesktop}>
                    {links.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            ref={(el) => {
                                linkRefs.current[href] = el;
                            }}
                            className={activeHref === href ? styles.active : ""}
                            aria-current={activeHref === href ? "page" : undefined}
                        >
                            {label}
                        </Link>
                    ))}
                    <span
                        className={styles.navIndicator}
                        style={{ left: indicator.left, width: indicator.width, opacity: indicator.opacity }}
                    />
                    <div className={styles.toggles}>
                        <ThemeToggle />
                        <LanguageToggle />
                    </div>
                </nav>

                <div className={styles.navMobileControls}>
                    <ThemeToggle />
                    <LanguageToggle />
                    <button
                        ref={menuButtonRef}
                        type="button"
                        className={styles.menuToggle}
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
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
                aria-label={dict.nav.mainMenu}
                className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}
                inert={!menuOpen}
            >
                {links.map(({ href, label }) => (
                    <Link
                        key={href}
                        href={href}
                        onClick={closeMenu}
                        className={activeHref === href ? styles.active : ""}
                        aria-current={activeHref === href ? "page" : undefined}
                    >
                        {label}
                    </Link>
                ))}
            </nav>
        </header>
    );
}
