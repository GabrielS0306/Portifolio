"use client";

import { FaArrowUp } from "react-icons/fa6";

export default function BackToTop() {
    const scrollToTop = (e: React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <a href="#top" className="footer-top" onClick={scrollToTop} aria-label="Voltar ao topo">
            Voltar ao topo <FaArrowUp size={12} />
        </a>
    );
}
