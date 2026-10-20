import Hero from "../sections/Hero";
import Projects from "../sections/Projects";
import About from "../sections/About";
import Contact from "../sections/Contact";

export default function Container() {
    return (
        <main>
            <Hero />
            <Projects />
            <About />
            <Contact />
        </main>
    );
}
