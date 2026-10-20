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

// O next-themes injeta um <script> inline que aplica o tema antes da primeira pintura.
// Quando o layout e montado no navegador (troca de idioma, pagina 404), o React 19 avisa
// que scripts criados no cliente nunca executam. Nesse momento o tema ja foi aplicado,
// entao no cliente o script vira um "bloco de dados" (type nao-JS), que o React aceita
// sem aviso. No servidor ele continua executavel, como precisa ser.
const themeScriptProps = {
    type: typeof window === "undefined" ? "text/javascript" : "text/plain",
};

export default function Providers({ lang, dict, children }: ProvidersProps) {
    return (
        <LocaleProvider lang={lang} dict={dict}>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem={false}
                scriptProps={themeScriptProps}
            >
                {/* Desativa animacoes de movimento para quem usa "reduzir movimento" no sistema */}
                <MotionConfig reducedMotion="user">{children}</MotionConfig>
            </ThemeProvider>
        </LocaleProvider>
    );
}
