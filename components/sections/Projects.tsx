import Card from "../ui/Card"

export default function Projects() {
    return (
        <section id="projetos" className="container reveal">
            <div className="section-head">
                <h2>Projetos em destaque</h2>
                <p>Projetos com foco em arquitetura full-stack, integração e entrega de valor.</p>
            </div>

            <div className="grid">
                <Card 
                    titulo="Sistema de Barbearia"
                    description="Sistema completo para barbearias com painel de controle intuitivo, agendamento online, gestão de barbeiros e relatórios financeiros em tempo real."
                    tecone="PHP"
                    tectwo="MySQL"
                    tectree="TailwindCSS"
                    linkdemo="https://barb-system.rf.gd/barbearia/login"
                    linkcode="https://github.com/GabrielS0306/sistema_barbearia"
                />

                <Card 
                    titulo="Plataforma de Agendamentos"
                    description="Plataforma completa com interface responsiva, sistema de agendamentos em tempo real e painel administrativo para gestão de horários, serviços e clientes."
                    tecone="Next.JS"
                    tectwo="Prisma"
                    tectree="MySQL"
                    linkdemo="#"
                    linkcode="#"
                />

                <Card 
                    titulo="App de Tarefas Colaborativo"
                    description="Aplicação completa com controle de permissões por usuário, sincronização em tempo real e armazenamento seguro de dados na nuvem."
                    tecone="TypeScript"
                    tectwo="Express"
                    tectree="MongoDB"
                    linkdemo="#"
                    linkcode="#"
                />
            </div>
        </section>
    )
}