import Hero from "../sections/Hero";
import Projects from "../sections/Projects";
import LatestPosts from "../sections/LatestPosts";
import Contact from "../sections/Contact";
import LegacyHashRedirect from "../LegacyHashRedirect";
import type { Dictionary, Locale } from "@/lib/i18n";

interface ContainerProps {
    lang: Locale;
    dict: Dictionary;
}

// A home e um resumo: cada bloco leva a pagina completa (/projetos, /blog, /contato)
export default function Container({ lang, dict }: ContainerProps) {
    return (
        <main>
            <LegacyHashRedirect lang={lang} />
            <Hero lang={lang} dict={dict} />
            <Projects lang={lang} dict={dict} variant="featured" />
            <LatestPosts lang={lang} dict={dict} />
            <Contact lang={lang} dict={dict} variant="cta" />
        </main>
    );
}
