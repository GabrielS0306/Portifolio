import "./Hero.css"

export default function Hero() {
    return (
        <section className="hero container reveal">
            <p className="eyebrow">Desenvolvedor Full-Stack</p>
            <h1>Eu desenvolvo aplicações completas, do front-end ao back-end.</h1>

            <p className="lead">
                Olá, eu sou Gabriel. Estudante de programação e amante de tecnologia, focado em construir
                soluções web com interfaces modernas, APIs robustas e bancos de dados bem estruturados.
            </p>

            <div className="hero-actions">
                <a className="btn primary" href="#projetos">Ver projetos</a>
                <a className="btn ghost" href="#contato">Falar comigo</a>
            </div>
        </section>
    )
}