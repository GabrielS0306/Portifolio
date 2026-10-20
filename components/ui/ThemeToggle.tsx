"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa6";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className={styles.themeToggle} aria-hidden="true" />;
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            type="button"
            className={styles.themeToggle}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
        >
            {isDark ? <FaSun size={15} /> : <FaMoon size={15} />}
        </button>
    );
}