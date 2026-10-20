import Card from "../ui/Card";
import Reveal from "../ui/Reveal";
import { projects } from "@/data/projects";

export default function Projects() {
    return (
        <section id="projetos" className="container">
            <div className="section-head">
                <h2>Projetos em destaque</h2>
                <p>Projetos com foco em arquitetura full-stack, integração e entrega de valor.</p>
            </div>

            <div className="grid">
                {projects.map((project, i) => (
                    <Reveal key={project.title} delay={i * 0.1}>
                        <Card {...project} />
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
