import Skills from "../ui/Skills"

const stats = [
    { value: "3+", label: "Projetos desenvolvidos" },
    { value: "2+", label: "Anos em formação" },
    { value: "8+", label: "Tecnologias no dia a dia" },
];

export default function About() {
    return (
        <div id="sobre" className="container about">
            <div id="description">
                <h2>Sobre mim</h2>
                <p>
                    Estou em formação para atuar como desenvolvedor full-stack, criando aplicações web
                    completas com foco em qualidade de código, experiência do usuário e performance.
                </p>
                <p>
                    Atualmente, estudo arquitetura de software, autenticação, integração entre sistemas e
                    boas práticas para construir produtos escaláveis e de fácil manutenção.
                </p>

                <div className="about-stats">
                    {stats.map((stat) => (
                        <div key={stat.label} className="about-stat">
                            <span className="about-stat-value">{stat.value}</span>
                            <span className="about-stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <Skills />
        </div>
    )
}