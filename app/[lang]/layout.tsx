import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { DM_Serif_Display, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "@/components/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getDictionary, hasLocale, htmlLang, locales, ogLocale, otherLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
    variable: "--font-space-grotesk",
    subsets: ["latin"],
});

// Fonte dos titulos principais e dos numeros em destaque; so existe no peso 400
const dmSerifDisplay = DM_Serif_Display({
    variable: "--font-dm-serif",
    subsets: ["latin"],
    weight: "400",
});

// Gera /pt e /en no build; qualquer outro valor de [lang] vira 404
export function generateStaticParams() {
    return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
    const { lang } = await params;
    if (!hasLocale(lang)) return {};

    const dict = getDictionary(lang);

    return {
        metadataBase: new URL(siteConfig.url),
        title: {
            default: dict.meta.title,
            template: `%s | ${siteConfig.name}`,
        },
        description: dict.meta.description,
        alternates: {
            canonical: `/${lang}`,
            languages: {
                "pt-BR": "/pt",
                en: "/en",
                "x-default": "/",
            },
        },
        openGraph: {
            title: dict.meta.title,
            description: dict.meta.ogDescription,
            url: `/${lang}`,
            siteName: siteConfig.name,
            locale: ogLocale[lang],
            alternateLocale: ogLocale[otherLocale(lang)],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: dict.meta.title,
            description: dict.meta.ogDescription,
        },
    };
}

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
    const { lang } = await params;
    if (!hasLocale(lang)) notFound();

    const dict = getDictionary(lang);

    return (
        <html
            lang={htmlLang[lang]}
            className={`${spaceGrotesk.variable} ${dmSerifDisplay.variable}`}
            data-scroll-behavior="smooth"
            suppressHydrationWarning
        >
            <body id="top">
                <Providers lang={lang} dict={dict}>
                    <Header showBlog={getAllPosts().length > 0} />
                    {children}
                    <Footer lang={lang} dict={dict} />
                </Providers>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
