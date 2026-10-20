import type { Locale } from "@/lib/i18n";

export interface Project {
    // Identificador unico; sera usado na URL das paginas de projeto
    slug: string;
    title: Record<Locale, string>;
    description: Record<Locale, string>;
    tech: string[];
    demoUrl?: string;
    codeUrl?: string;
    // Caminho relativo a partir da pasta public
    image?: string;
    status?: "concluido" | "em-desenvolvimento";
}

export const projects: Project[] = [
    {
        slug: "sistema-barbearia",
        title: { pt: "Sistema de Barbearia", en: "Barbershop System" },
        description: {
            pt: "Sistema completo para barbearias com painel de controle intuitivo, agendamento online, gestão de barbeiros e relatórios financeiros em tempo real, proporcionando mais organização, praticidade e controle para otimizar a rotina do negócio.",
            en: "Complete system for barbershops with an intuitive dashboard, online booking, barber management and real-time financial reports, bringing more organization, convenience and control to optimize the business routine.",
        },
        tech: ["PHP", "MySQL", "Tailwind CSS"],
        demoUrl: "https://barb-system.rf.gd/barbearia/login",
        codeUrl: "https://github.com/GabrielS0306/sistema_barbearia",
        image: "/images/sistema_barbearia.png",
    },
    {
        slug: "skillflow",
        title: { pt: "SkillFlow", en: "SkillFlow" },
        description: {
            pt: "Plataforma pessoal de aprendizado que permite organizar estudos em trilhas, acompanhar o progresso, registrar anotações, salvar recursos e monitorar sessões de estudo.",
            en: "Personal learning platform for organizing studies into tracks, tracking progress, taking notes, saving resources and monitoring study sessions.",
        },
        tech: ["Laravel", "React", "Tailwind CSS"],
        demoUrl: "https://skillflow-8ixd.onrender.com/login",
        codeUrl: "https://github.com/GabrielS0306/skillflow",
        image: "/images/SkillFlow_dashboard.png",
    },
    {
        slug: "app-tarefas",
        title: { pt: "App de Tarefas Colaborativo", en: "Collaborative Task App" },
        description: {
            pt: "Aplicação completa com controle de permissões por usuário, sincronização em tempo real e armazenamento seguro de dados na nuvem.",
            en: "Complete application with per-user permission control, real-time sync and secure cloud data storage.",
        },
        tech: ["TypeScript", "Express", "MongoDB"],
        status: "em-desenvolvimento",
    },
];
