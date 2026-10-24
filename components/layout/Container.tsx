import Hero from "../sections/Hero";
import Projects from "../sections/Projects";
import About from "../sections/About";
import Contact from "../sections/Contact";
import GitHubActivity from "../sections/GitHubActivity";
import Timeline from "../sections/Timeline";
import LatestPosts from "../sections/LatestPosts";
import type { Dictionary, Locale } from "@/lib/i18n";

interface ContainerProps {
    lang: Locale;
    dict: Dictionary;
}

export default function Container({ lang, dict }: ContainerProps) {
    return (
        <main>
            <Hero lang={lang} dict={dict} />
            <Projects lang={lang} dict={dict} />
            <GitHubActivity lang={lang} dict={dict} />
            <About dict={dict} />
            <Timeline dict={dict} />
            <LatestPosts lang={lang} dict={dict} />
            <Contact dict={dict} />
        </main>
    );
}
