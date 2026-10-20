"use client";

import { usePathname, useRouter } from "next/navigation";
import { LOCALE_COOKIE, otherLocale } from "@/lib/i18n/config";
import { useLocale } from "../LocaleProvider";
import { FlagBR, FlagUS } from "./Flags";
import styles from "./LanguageToggle.module.css";

const ONE_YEAR = 60 * 60 * 24 * 365;

// Mostra a bandeira do OUTRO idioma: em portugues aparece a dos EUA, em ingles a do Brasil
export default function LanguageToggle() {
    const { lang, dict } = useLocale();
    const pathname = usePathname() ?? `/${lang}`;
    const router = useRouter();
    const target = otherLocale(lang);

    const switchLanguage = () => {
        // Guarda a escolha para o proxy usar nas proximas visitas a "/"
        document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=${ONE_YEAR}; samesite=lax`;

        const targetPath = pathname.replace(new RegExp(`^/${lang}(?=/|$)`), `/${target}`);
        // Mantem a secao atual (ex.: #projetos) ao trocar de idioma
        router.push(targetPath + window.location.hash);
    };

    return (
        <button
            type="button"
            className={styles.languageToggle}
            onClick={switchLanguage}
            aria-label={dict.language.switch}
            title={dict.language.switch}
            lang={target === "pt" ? "pt-BR" : "en"}
        >
            <span className={styles.flag}>{target === "en" ? <FlagUS /> : <FlagBR />}</span>
        </button>
    );
}
