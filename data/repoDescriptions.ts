import type { Locale } from "@/lib/i18n/config";

/**
 * Traducoes opcionais das descricoes dos repositorios exibidos na secao "Atividade no GitHub".
 * A API do GitHub so devolve a descricao original, entao aqui da para fornecer o texto em
 * cada idioma. Chave: nome exato do repositorio. Sem entrada para o idioma da pagina, vale
 * a descricao do proprio GitHub.
 */
export const repoDescriptions: Record<string, Partial<Record<Locale, string>>> = {
    Portifolio: {
        pt: "Meu portfólio pessoal, em português e inglês, feito com Next.js, TypeScript e CSS Modules.",
        en: "My personal portfolio, in Portuguese and English, built with Next.js, TypeScript and CSS Modules.",
    },
    FinanFlow: {
        en: "Personal finance management platform for tracking income and expenses, analyzing spending and planning goals, with a modern, intuitive and responsive interface built with React, TypeScript and Tailwind CSS.",
    },
    sistema_escolar: {
        en: "School management system (ASP.NET Core backend + React/TypeScript frontend) with grades, attendance, disciplinary records and role-based permissions.",
    },
    "contract-flow": {
        en: "Contract and software license management system built with React, TypeScript, NestJS and MongoDB.",
    },
    skillflow: {
        en: "Personal platform for organizing learning tracks, taking notes and tracking progress — Laravel, React, Inertia.js and Tailwind.",
    },
};
