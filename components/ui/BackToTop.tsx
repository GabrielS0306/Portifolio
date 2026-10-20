"use client";

import { FaArrowUp } from "react-icons/fa6";
import styles from "./BackToTop.module.css";

export default function BackToTop() {
    const scrollToTop = (e: React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <a href="#top" className={styles.backToTop} onClick={scrollToTop} aria-label="Voltar ao topo">
            Voltar ao topo <FaArrowUp size={12} />
        </a>
    );
}
