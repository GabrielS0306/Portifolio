export const pt = {
    meta: {
        title: "Gabriel — Desenvolvedor Full-Stack",
        description: "Portfolio profissional com foco em desenvolvimento full-stack, projetos e contato.",
        ogDescription:
            "Portfólio com projetos em PHP, Laravel, React e Next.js. Confira meus trabalhos e entre em contato.",
    },
    nav: {
        projects: "Projetos",
        about: "Sobre",
        contact: "Contato",
        mainMenu: "Menu principal",
        openMenu: "Abrir menu",
        closeMenu: "Fechar menu",
    },
    theme: {
        toLight: "Ativar tema claro",
        toDark: "Ativar tema escuro",
    },
    language: {
        // Rotulo escrito no idioma de destino, para quem nao le portugues entender
        switch: "Switch to English",
    },
    hero: {
        status: "Disponível para novos projetos",
        eyebrow: "Desenvolvedor Full-Stack",
        titleStart: "Eu desenvolvo",
        titleEnd: "do front‑end ao back‑end.",
        taglineWords: ["aplicações completas", "APIs escaláveis", "interfaces intuitivas"],
        lead: "Olá, eu sou Gabriel. Estudante de programação e amante de tecnologia, focado em construir soluções web com interfaces modernas, APIs robustas e bancos de dados bem estruturados.",
        viewProjects: "Ver projetos",
        contactMe: "Falar comigo",
        downloadCv: "Baixar CV",
    },
    projects: {
        title: "Projetos em destaque",
        subtitle: "Projetos com foco em arquitetura full-stack, integração e entrega de valor.",
        imageAlt: "Imagem do projeto",
        placeholder: "Preview em construção",
        inProgress: "Em Desenvolvimento",
        demo: "Demo",
        code: "Código",
    },
    github: {
        title: "Atividade no GitHub",
        subtitle: "Repositórios atualizados recentemente, direto da API do GitHub.",
        publicRepos: "Repositórios públicos",
        languages: "Linguagens",
        languagesChart: "Distribuição de linguagens",
        updated: "atualizado",
        justNow: "agora mesmo",
        viewProfile: "Ver perfil completo",
    },
    about: {
        title: "Sobre mim",
        paragraphs: [
            "Estou em formação para atuar como desenvolvedor full-stack, criando aplicações web completas com foco em qualidade de código, experiência do usuário e performance.",
            "Atualmente, estudo arquitetura de software, autenticação, integração entre sistemas e boas práticas para construir produtos escaláveis e de fácil manutenção.",
        ],
        stats: [
            { value: "3+", label: "Projetos desenvolvidos" },
            { value: "2+", label: "Anos em formação" },
            { value: "8+", label: "Tecnologias no dia a dia" },
        ],
        skillGroups: {
            frontend: "Front-End",
            backend: "Back-End",
            database: "Banco de Dados",
            tools: "Ferramentas",
        },
    },
    contact: {
        title: "Vamos trabalhar juntos?",
        text: "Me chama no LinkedIn, GitHub, Instagram ou por e-mail para conversarmos sobre projetos e oportunidades.",
        email: "E-mail",
        copyEmail: "Copiar e-mail",
        emailCopied: "E-mail copiado",
        copied: "Copiado!",
    },
    footer: {
        madeWith: "Feito com carinho e código.",
        backToTop: "Voltar ao topo",
    },
    notFound: {
        title: "Página não encontrada.",
        lead: "O endereço que você acessou não existe ou foi movido. Que tal voltar ao início ou dar uma olhada nos meus projetos?",
        home: "Voltar ao início",
        projects: "Ver projetos",
    },
};

export type Dictionary = typeof pt;
