"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import { LocaleProvider } from "./LocaleProvider";
import type { Dictionary, Locale } from "@/lib/i18n";

interface ProvidersProps {
    lang: Locale;
    dict: Dictionary;
    children: ReactNode;
}

export default function Providers({ lang, dict, children }: ProvidersProps) {
    return (
        <LocaleProvider lang={lang} dict={dict}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
                {/* Desativa animacoes de movimento para quem usa "reduzir movimento" no sistema */}
                <MotionConfig reducedMotion="user">{children}</MotionConfig>
            </ThemeProvider>
        </LocaleProvider>
    );
}
