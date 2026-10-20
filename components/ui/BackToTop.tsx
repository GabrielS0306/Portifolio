"use client";

import { FaArrowUp } from "react-icons/fa6";
import { useLocale } from "../LocaleProvider";
import styles from "./BackToTop.module.css";

export default function BackToTop() {
    const label = useLocale().dict.footer.backToTop;

    const scrollToTop = (e: React.MouseEvent) => {
        e.preventDefault();
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    };

    return (
        <a href="#top" className={styles.backToTop} onClick={scrollToTop} aria-label={label}>
            {label} <FaArrowUp size={12} />
        </a>
    );
}
