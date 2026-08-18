"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa6";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="theme-toggle" aria-hidden="true" />;
    }

    const isDark = theme === "dark";

    return (
        <button
            className="theme-toggle"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
        >
            {isDark ? <FaSun size={15} /> : <FaMoon size={15} />}
        </button>
    );
}