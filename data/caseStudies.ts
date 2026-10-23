import type { Locale } from "@/lib/i18n";

export interface CaseStudyContent {
    // Papel no projeto, ex.: "Projeto individual · full-stack"
    role: string;
    // Paragrafos de abertura: o que e o projeto e qual problema resolve
    context: string[];
    highlights: string[];
    decisions: { title: string; text: string }[];
    learnings: string[];
    next?: string[];
}

export interface CaseStudy {
    gallery?: { src: string; width: number; height: number; alt: Record<Locale, string> }[];
    content: Record<Locale, CaseStudyContent>;
}

// Chave = slug do projeto em data/projects.ts
export const caseStudies: Record<string, CaseStudy> = {
    "sistema-barbearia": {
        gallery: [
            {
                src: "/images/projects/sistema-barbearia/barbeiro.png",
                width: 1365,
                height: 679,
                alt: {
                    pt: "Agenda do barbeiro filtrada por data, com status de cada atendimento",
                    en: "Barber schedule filtered by date, showing each appointment's status",
                },
            },
            {
                src: "/images/projects/sistema-barbearia/agendamento.png",
                width: 1365,
                height: 670,
                alt: {
                    pt: "Tela de agendamento com escolha de barbeiro, serviço, data e horário",
                    en: "Booking screen to choose barber, service, date and time",
                },
            },
        ],
        content: {
            pt: {
                role: "Projeto individual · back-end, front-end e banco de dados",
                context: [
                    "Aplicação web para gerenciar agendamentos, clientes e barbeiros, com três perfis: o cliente agenda e paga online, o barbeiro acompanha a própria agenda e o administrador tem uma visão geral do negócio.",
                    "O objetivo foi praticar back-end em PHP sem depender de framework: roteamento, autenticação, segurança e integrações com serviços externos foram escritos do zero.",
                ],
                highlights: [
                    "Agendamento online com horários disponíveis em tempo real, via AJAX consumindo a própria API REST",
                    "Pagamento por PIX com QR Code gerado dinamicamente e código copia-e-cola",
                    "Comprovantes, agendas do dia e relatórios por período em PDF",
                    "E-mails de confirmação, cancelamento e lembrete 24 horas antes do horário",
                    "Notificações push no navegador com Web Push API e Service Worker",
                    "Histórico de alterações de cada agendamento, exibido ao cliente como uma linha do tempo",
                ],
                decisions: [
                    {
                        title: "MVC sem framework",
                        text: "Roteador próprio, controllers, models e acesso a dados com PDO e prepared statements. Escrever essas peças à mão mostrou o que frameworks como o Laravel resolvem por baixo dos panos.",
                    },
                    {
                        title: "Segurança em camadas",
                        text: "Proteção CSRF em todos os formulários, senhas com hash, middleware de autenticação por papel, JWT na API REST, rate limiting com headers X-RateLimit-* e logout automático por inatividade.",
                    },
                    {
                        title: "Banco modelado para as regras do negócio",
                        text: "Nove tabelas, incluindo a relação N:N entre barbeiros e serviços, horários de funcionamento por dia da semana e o histórico de alterações dos agendamentos.",
                    },
                    {
                        title: "Testes e logs",
                        text: "Testes com PHPUnit para paginação, CSRF, PIX e logger, além de um sistema de logs que o administrador consulta pelo próprio painel.",
                    },
                ],
                learnings: [
                    "Como funcionam por dentro o roteamento, os middlewares e a sessão de um framework web.",
                    "Transformar regras reais em código: disponibilidade de horários, cancelamento com reembolso e bloqueio de alterações em agendamentos finalizados.",
                    "Integrar serviços externos (SMTP, cron e push) sem que uma falha neles derrube o fluxo principal.",
                ],
            },
            en: {
                role: "Solo project · back end, front end and database",
                context: [
                    "Web application to manage appointments, customers and barbers, with three roles: customers book and pay online, barbers follow their own schedule and the admin gets an overview of the business.",
                    "The goal was to practice PHP back-end development without a framework: routing, authentication, security and third-party integrations were all written from scratch.",
                ],
                highlights: [
                    "Online booking with real-time availability, using AJAX on top of the app's own REST API",
                    "PIX payments with a dynamically generated QR code and copy-and-paste code",
                    "Receipts, daily schedules and period reports as PDF",
                    "Confirmation and cancellation emails, plus a reminder 24 hours before the appointment",
                    "Browser push notifications with the Web Push API and a Service Worker",
                    "Change history for each appointment, shown to the customer as a timeline",
                ],
                decisions: [
                    {
                        title: "MVC without a framework",
                        text: "Custom router, controllers, models and data access with PDO prepared statements. Writing these pieces by hand showed what frameworks like Laravel solve under the hood.",
                    },
                    {
                        title: "Layered security",
                        text: "CSRF protection on every form, hashed passwords, role-based authentication middleware, JWT on the REST API, rate limiting with X-RateLimit-* headers and automatic logout on inactivity.",
                    },
                    {
                        title: "Database shaped by business rules",
                        text: "Nine tables, including a many-to-many relation between barbers and services, opening hours per weekday and the appointment change history.",
                    },
                    {
                        title: "Tests and logs",
                        text: "PHPUnit tests for pagination, CSRF, PIX and the logger, plus a logging system the admin can browse from the dashboard.",
                    },
                ],
                learnings: [
                    "How routing, middleware and sessions work inside a web framework.",
                    "Turning real rules into code: time-slot availability, cancellation with refunds and locking finished appointments.",
                    "Integrating external services (SMTP, cron and push) so that a failure in them doesn't break the main flow.",
                ],
            },
        },
    },
    skillflow: {
        content: {
            pt: {
                role: "Projeto individual · full-stack e deploy",
                context: [
                    "Aprender por conta própria costuma ficar espalhado entre cadernos, favoritos do navegador, vídeos salvos e listas soltas. O SkillFlow junta esse fluxo em um só lugar: planejar, estudar, anotar, guardar referências, concluir e acompanhar o progresso.",
                    "Cada trilha representa um objetivo maior e se divide em tópicos, que acumulam anotações, recursos, dependências e sessões de estudo cronometradas.",
                ],
                highlights: [
                    "Trilhas e tópicos com progresso calculado automaticamente",
                    "Dependências entre tópicos com validação de ciclo e bloqueio de conclusão",
                    "Sessões de estudo cronometradas, com apenas uma sessão ativa por vez",
                    "Dashboard com tempo estudado, sequência de dias consecutivos e gráfico dos últimos 7 dias",
                    "Anotações fixáveis, consultadas em um painel lateral, com busca global",
                ],
                decisions: [
                    {
                        title: "Laravel + React com Inertia.js",
                        text: "Em vez de uma API REST separada, os controllers do Laravel entregam os dados direto para páginas React. O resultado é uma SPA sem duplicar rotas, validação e autenticação.",
                    },
                    {
                        title: "Dependências como grafo",
                        text: "Antes de salvar uma dependência entre tópicos, o sistema verifica se ela criaria um ciclo. Tópicos com pré-requisitos pendentes não podem ser concluídos nem receber sessões de estudo.",
                    },
                    {
                        title: "Dados isolados por usuário",
                        text: "Policies do Laravel garantem que cada pessoa só acessa as próprias trilhas, tópicos e anotações.",
                    },
                    {
                        title: "Deploy com Docker",
                        text: "Publicado no Render com Dockerfile multi-stage, usando PostgreSQL no Supabase. Para isso, o banco foi migrado de MySQL para PostgreSQL.",
                    },
                ],
                learnings: [
                    "Aplicar conceitos de grafos, como a detecção de ciclos, em uma regra de negócio real.",
                    "Montar uma imagem Docker de produção e publicar uma aplicação Laravel fora do ambiente local.",
                    "Pensar no produto antes do código: o que torna a ferramenta útil no dia a dia de quem estuda.",
                ],
                next: ["Visualização em árvore ou grafo do mapa de dependências entre tópicos"],
            },
            en: {
                role: "Solo project · full stack and deployment",
                context: [
                    "Self-directed learning tends to get scattered across notebooks, browser bookmarks, saved videos and loose to-do lists. SkillFlow brings that flow into one place: plan, study, take notes, save references, finish and track progress.",
                    "Each track represents a bigger goal and is split into topics, which collect notes, resources, dependencies and timed study sessions.",
                ],
                highlights: [
                    "Tracks and topics with automatically calculated progress",
                    "Dependencies between topics with cycle validation and completion locking",
                    "Timed study sessions, with only one active session at a time",
                    "Dashboard with time studied, daily streak and a chart of the last 7 days",
                    "Pinnable notes, opened in a side drawer, with global search",
                ],
                decisions: [
                    {
                        title: "Laravel + React with Inertia.js",
                        text: "Instead of a separate REST API, Laravel controllers pass data straight to React pages. The result is an SPA without duplicating routes, validation and authentication.",
                    },
                    {
                        title: "Dependencies as a graph",
                        text: "Before saving a dependency between topics, the app checks whether it would create a cycle. Topics with pending prerequisites can't be completed or receive study sessions.",
                    },
                    {
                        title: "Per-user data isolation",
                        text: "Laravel Policies ensure each person can only access their own tracks, topics and notes.",
                    },
                    {
                        title: "Docker deployment",
                        text: "Deployed on Render with a multi-stage Dockerfile, using PostgreSQL on Supabase. This required migrating the database from MySQL to PostgreSQL.",
                    },
                ],
                learnings: [
                    "Applying graph concepts, such as cycle detection, to a real business rule.",
                    "Building a production Docker image and deploying a Laravel app beyond the local environment.",
                    "Thinking about the product before the code: what makes the tool useful in a learner's daily routine.",
                ],
                next: ["Tree or graph view of the topic dependency map"],
            },
        },
    },
    "sistema-escolar": {
        content: {
            pt: {
                role: "Projeto individual · API, interface e banco de dados",
                context: [
                    "Sistema de gestão escolar que centraliza informações acadêmicas, administrativas e disciplinares: notas, frequência, ocorrências, conselho de classe, comunicados e documentos.",
                    "É composto por uma API em ASP.NET Core e uma interface em React com TypeScript, com uma área diferente para cada papel: administração, coordenação, professores, alunos, responsáveis e funcionários.",
                ],
                highlights: [
                    "Um mesmo usuário pode ter vários perfis e escolhe com qual entrar depois do login",
                    "Notas por bimestre com cálculo automático da situação: aprovado, em recuperação ou reprovado",
                    "Importação de notas e frequência por planilha (.xlsx e .csv), com relatório de erros por linha",
                    "Conselho de classe aberto automaticamente para quem reprova em três ou mais disciplinas, com votação dos professores",
                    "Chamada em lote por turma, ocorrências e comunicados com público-alvo",
                    "Fotos de perfil e documentos guardados no Supabase Storage, com bucket privado para documentos",
                ],
                decisions: [
                    {
                        title: "Arquitetura em camadas",
                        text: "O back-end é dividido em Api, Infrastructure e Domain, com dependências em uma única direção. O Domain não conhece Entity Framework nem ASP.NET, o que mantém as regras de negócio isoladas.",
                    },
                    {
                        title: "Autenticação própria com JWT",
                        text: "JWT com um claim por papel e senhas com BCrypt, sem ASP.NET Identity. Uma política de fallback exige autenticação em toda a API, e cada ação sensível verifica o papel de quem chama.",
                    },
                    {
                        title: "Perfis em vez de um campo de papel",
                        text: "Os dados pessoais ficam no usuário, e cada perfil (aluno, professor, coordenador…) é uma entidade própria com seus dados específicos, como a matrícula do aluno.",
                    },
                    {
                        title: "Contratos e segredos",
                        text: "A API sempre trafega DTOs, espelhados em tipos TypeScript no front-end. Os segredos ficam em User Secrets e nunca no repositório.",
                    },
                ],
                learnings: [
                    "Organizar um back-end maior em camadas, com responsabilidades bem separadas.",
                    "Implementar autenticação e autorização sem depender de uma biblioteca pronta.",
                    "Traduzir regras acadêmicas reais, como médias, recuperação e conselho de classe, em código testável.",
                ],
                next: [
                    "Dashboards de coordenação, responsáveis e funcionários",
                    "Telas de conselho de classe e de comunicados",
                    "Integração com a plataforma governamental de frequência",
                ],
            },
            en: {
                role: "Solo project · API, interface and database",
                context: [
                    "School management system that brings academic, administrative and disciplinary information together: grades, attendance, disciplinary records, class councils, announcements and documents.",
                    "It's made of an ASP.NET Core API and a React + TypeScript interface, with a different area for each role: admins, coordinators, teachers, students, guardians and staff.",
                ],
                highlights: [
                    "One user can hold several roles and picks which one to use after logging in",
                    "Term grades with automatic status: passed, in recovery or failed",
                    "Grade and attendance import from spreadsheets (.xlsx and .csv), with a per-row error report",
                    "Class council opened automatically for students failing three or more subjects, with teacher voting",
                    "Bulk attendance per class, disciplinary records and targeted announcements",
                    "Profile photos and documents stored in Supabase Storage, with a private bucket for documents",
                ],
                decisions: [
                    {
                        title: "Layered architecture",
                        text: "The back end is split into Api, Infrastructure and Domain, with dependencies flowing one way. The Domain knows nothing about Entity Framework or ASP.NET, keeping business rules isolated.",
                    },
                    {
                        title: "Custom JWT authentication",
                        text: "JWT with one claim per role and BCrypt-hashed passwords, without ASP.NET Identity. A fallback policy requires authentication across the whole API, and each sensitive action checks the caller's role.",
                    },
                    {
                        title: "Profiles instead of a role column",
                        text: "Personal data lives on the user, and each profile (student, teacher, coordinator…) is its own entity with specific data, such as the student's enrollment number.",
                    },
                    {
                        title: "Contracts and secrets",
                        text: "The API always exchanges DTOs, mirrored as TypeScript types on the front end. Secrets live in User Secrets and never in the repository.",
                    },
                ],
                learnings: [
                    "Organizing a larger back end in layers with clearly separated responsibilities.",
                    "Implementing authentication and authorization without relying on an off-the-shelf library.",
                    "Turning real academic rules, such as averages, recovery and class councils, into testable code.",
                ],
                next: [
                    "Dashboards for coordinators, guardians and staff",
                    "Class council and announcement screens",
                    "Integration with the government attendance platform",
                ],
            },
        },
    },
};
