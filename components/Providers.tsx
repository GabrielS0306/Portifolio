"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            {/* Desativa animacoes de movimento para quem usa "reduzir movimento" no sistema */}
            <MotionConfig reducedMotion="user">
                {children}
            </MotionConfig>
        </ThemeProvider>
    );
}
