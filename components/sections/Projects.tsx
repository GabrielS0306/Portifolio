import Card from "../ui/Card"
import "./Projects.css"

export default function Projects() {
    return (
        <section id="projetos" className="container reveal">
            <div className="section-head">
                <h2>Projetos em destaque</h2>
                <p>Projetos com foco em arquitetura full-stack, integração e entrega de valor.</p>
            </div>

            <div className="grid">
                <Card 
                    titulo="Sistema de Gestão de Vendas"
                    paragrafo="Sistema completo com dashboard intuitivo, autenticação segura de usuários e API robusta para geração de relatórios em tempo real."
                    tecone="React"
                    tectwo="Node.js"
                    tectree="Postgress SQL"
                />

                <Card 
                    titulo="Plataforma de Agendamentos"
                    paragrafo="Plataforma completa com interface responsiva, sistema de agendamentos em tempo real e painel administrativo para gestão de horários, serviços e clientes."
                    tecone="Next.JS"
                    tectwo="Prisma"
                    tectree="MySQL"
                />

                <Card 
                    titulo="App de Tarefas Colaborativo"
                    paragrafo="Aplicação completa com controle de permissões por usuário, sincronização em tempo real e armazenamento seguro de dados na nuvem."
                    tecone="TypeScript"
                    tectwo="Express"
                    tectree="MongoDB"
                />
            </div>
        </section>
    )
}