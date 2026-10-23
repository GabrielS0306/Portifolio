import type { IconType } from "react-icons";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa6";
import type { Locale } from "@/lib/i18n/config";

export const siteConfig = {
    url: "https://portifolio-theta-eight-99.vercel.app",
    name: "Gabriel dev",
    email: "devgabrielsantos91@gmail.com",
    githubUser: "GabrielS0306",
};

// Curriculo em /public para cada idioma do site
export const resumeFiles: Record<Locale, string> = {
    pt: "/resume/Curriculo_Gabriel_Nunes_PT.pdf",
    en: "/resume/Resume_Gabriel_Nunes_EN.pdf",
};

interface SocialLink {
    label: string;
    href: string;
    icon: IconType;
}

export const socialLinks: SocialLink[] = [
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/gabriel-dos-santos-nunes/",
        icon: FaLinkedin,
    },
    {
        label: "GitHub",
        href: `https://github.com/${siteConfig.githubUser}`,
        icon: FaGithub,
    },
    {
        label: "Instagram",
        href: "https://instagram.com/biel_.0834",
        icon: FaInstagram,
    },
];

// path = pagina dentro do idioma (/pt/projetos); key = chave do rotulo em dictionary.nav
export const navItems = [
    { path: "projetos", key: "projects" },
    { path: "sobre", key: "about" },
    { path: "contato", key: "contact" },
] as const;

// Secoes que eram ancoras da home (/pt#projetos) e viraram paginas; links antigos sao redirecionados
export const legacySectionPaths = ["projetos", "sobre", "contato"] as const;
