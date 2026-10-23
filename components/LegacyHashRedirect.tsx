"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { legacySectionPaths } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

// Antes as secoes eram ancoras da home (/pt#sobre); links antigos ja compartilhados vao para a pagina nova.
// O # nunca chega ao servidor, por isso o redirecionamento so pode acontecer no navegador.
export default function LegacyHashRedirect({ lang }: { lang: Locale }) {
    const router = useRouter();

    useEffect(() => {
        const section = window.location.hash.slice(1);
        if ((legacySectionPaths as readonly string[]).includes(section)) {
            router.replace(`/${lang}/${section}`);
        }
    }, [lang, router]);

    return null;
}
