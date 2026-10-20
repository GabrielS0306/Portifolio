import Hero from "../sections/Hero";
import Projects from "../sections/Projects";
import About from "../sections/About";
import Contact from "../sections/Contact";
import GitHubActivity from "../sections/GitHubActivity";

export default function Container() {
    return (
        <main>
            <Hero />
            <Projects />
            <GitHubActivity />
            <About />
            <Contact />
        </main>
    );
}
