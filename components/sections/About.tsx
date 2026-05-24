import Skills from "../ui/Skills"

export default function About() {
    return (
        <div id="sobre">
            <h2>Sobre mim</h2>

            <p>
                Estou em formação para atuar como desenvolvedor full-stack, criando aplicações web
                completas com foco em qualidade de código, experiência do usuário e performance.
            </p>
            <p>
                Atualmente, estudo arquitetura de software, autenticação, integração entre sistemas e
                boas práticas para construir produtos escaláveis e de fácil manutenção.
            </p>

            <Skills />
        </div>
    )
}