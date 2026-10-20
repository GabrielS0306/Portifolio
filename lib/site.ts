import type { IconType } from "react-icons";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa6";

export const siteConfig = {
    url: "https://portifolio-theta-eight-99.vercel.app",
    name: "Gabriel dev",
    email: "gabrieldossantosnunes91@gmail.com",
    githubUser: "GabrielS0306",
};

interface SocialLink {
    label: string;
    href: string;
    icon: IconType;
}

export const socialLinks: SocialLink[] = [
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/gabriel-dos-santos-nunes-713a2a312/",
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

// id = ancora da secao; key = chave do rotulo em dictionary.nav
export const navItems = [
    { id: "projetos", key: "projects" },
    { id: "sobre", key: "about" },
    { id: "contato", key: "contact" },
] as const;
