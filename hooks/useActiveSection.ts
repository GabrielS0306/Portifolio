"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function useActiveSection(sectionIds: string[]) {
    const pathname = usePathname();
    // Guarda em qual pagina a secao foi vista: o Header vive no layout e nao remonta ao trocar de rota,
    // entao sem isso a secao ativa da home continuaria marcada no blog
    const [active, setActive] = useState({ pathname, id: "" });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActive({ pathname, id: entry.target.id });
                    }
                });
            },
            {
                rootMargin: "-40% 0px -55% 0px",
                threshold: 0,
            },
        );

        // Refeito a cada rota: ao voltar para a home as secoes sao elementos novos
        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [sectionIds, pathname]);

    return active.pathname === pathname ? active.id : "";
}
