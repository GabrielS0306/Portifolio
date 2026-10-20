"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa6";
import { useLocale } from "../LocaleProvider";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const t = useLocale().dict.theme;

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
            aria-label={isDark ? t.toLight : t.toDark}
        >
            {isDark ? <FaSun size={15} /> : <FaMoon size={15} />}
        </button>
    );
}
