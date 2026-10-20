export interface Project {
    title: string;
    description: string;
    tech: string[];
    demoUrl?: string;
    codeUrl?: string;
    // Caminho relativo a partir da pasta public
    image?: string;
    status?: "concluido" | "em-desenvolvimento";
}

export const projects: Project[] = [
    {
        title: "Sistema de Barbearia",
        description: "Sistema completo para barbearias com painel de controle intuitivo, agendamento online, gestão de barbeiros e relatórios financeiros em tempo real, proporcionando mais organização, praticidade e controle para otimizar a rotina do negócio.",
        tech: ["PHP", "MySQL", "Tailwind CSS"],
        demoUrl: "https://barb-system.rf.gd/barbearia/login",
        codeUrl: "https://github.com/GabrielS0306/sistema_barbearia",
        image: "/images/sistema_barbearia.png",
    },
    {
        title: "SkillFlow",
        description: "Plataforma pessoal de aprendizado que permite organizar estudos em trilhas, acompanhar o progresso, registrar anotações, salvar recursos e monitorar sessões de estudo.",
        tech: ["Laravel", "React", "Tailwind CSS"],
        demoUrl: "https://skillflow-8ixd.onrender.com/login",
        codeUrl: "https://github.com/GabrielS0306/skillflow",
        image: "/images/SkillFlow_dashboard.png",
    },
    {
        title: "App de Tarefas Colaborativo",
        description: "Aplicação completa com controle de permissões por usuário, sincronização em tempo real e armazenamento seguro de dados na nuvem.",
        tech: ["TypeScript", "Express", "MongoDB"],
        status: "em-desenvolvimento",
    },
];
