import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "@/components/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
    variable: "--font-space-grotesk",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: "Gabriel — Desenvolvedor Full-Stack",
        template: `%s | ${siteConfig.name}`,
    },
    description: "Portfolio profissional com foco em desenvolvimento full-stack, projetos e contato.",
    openGraph: {
        title: "Gabriel — Desenvolvedor Full-Stack",
        description:
            "Portfólio com projetos em PHP, Laravel, React e Next.js. Confira meus trabalhos e entre em contato.",
        url: siteConfig.url,
        siteName: siteConfig.name,
        locale: "pt_BR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Gabriel — Desenvolvedor Full-Stack",
        description: "Portfólio com projetos em PHP, Laravel, React e Next.js.",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="pt-BR"
            className={spaceGrotesk.variable}
            data-scroll-behavior="smooth"
            suppressHydrationWarning
        >
            <body id="top">
                <Providers>
                    <Header />
                    {children}
                    <Footer />
                </Providers>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
