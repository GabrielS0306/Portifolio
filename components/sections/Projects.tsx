import Card from "../ui/Card";

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
                    description="Sistema completo para barbearias com painel de controle intuitivo, agendamento online, gestão de barbeiros e relatórios financeiros em tempo real, proporcionando mais organização, praticidade e controle para otimizar a rotina do negócio."
                    tecone="PHP"
                    tectwo="MySQL"
                    tectree="TailwindCSS"
                    linkdemo="https://barb-system.rf.gd/barbearia/login"
                    linkcode="https://github.com/GabrielS0306/sistema_barbearia"
                    src="/images/sistema_barbearia.png" // Caminho relativo a partir da pasta public
                />

                <Card 
                    titulo="SkillFlow"
                    description="Plataforma pessoal de aprendizado que permite organizar estudos em trilhas, acompanhar o progresso, registrar anotações, salvar recursos e monitorar sessões de estudo."
                    tecone="Laravel"
                    tectwo="React"
                    tectree="Tailwind CSS"
                    linkdemo="https://skillflow-8ixd.onrender.com/login"
                    linkcode="https://github.com/GabrielS0306/skillflow"
                    src="/images/SkillFlow_dashboard.png" 
                />

                <Card 
                    titulo="App de Tarefas Colaborativo"
                    description="Aplicação completa com controle de permissões por usuário, sincronização em tempo real e armazenamento seguro de dados na nuvem."
                    tecone="TypeScript"
                    tectwo="Express"
                    tectree="MongoDB"
                    linkdemo="#"
                    linkcode="#"
                    src=""
                />
            </div>
        </section>
    );
}