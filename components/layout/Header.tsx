"use client";

import { useEffect, useRef, useState } from "react";
import ThemeToggle from "../ui/ThemeToggle";
import { useActiveSection } from "@/hooks/useActiveSection";

const sections = ["projetos", "sobre", "contato"];

export default function Header() {
    const activeSection = useActiveSection(sections);
    const navRef = useRef<HTMLElement>(null);
    const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
    const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

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

    return (
        <header className="site-header">
            <div className="container nav">
                <a href="#top" className="logo">gabriel<span>.</span></a>
                <nav ref={navRef}>
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
            </div>
        </header>
    )
}