"use client";

import { createContext, ReactNode, useContext } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";

interface LocaleContextValue {
    lang: Locale;
    dict: Dictionary;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ lang, dict, children }: LocaleContextValue & { children: ReactNode }) {
    return <LocaleContext.Provider value={{ lang, dict }}>{children}</LocaleContext.Provider>;
}

// Usado pelos Client Components; Server Components recebem o dicionario por props
export function useLocale() {
    const value = useContext(LocaleContext);
    if (!value) throw new Error("useLocale precisa estar dentro de <LocaleProvider>");
    return value;
}
