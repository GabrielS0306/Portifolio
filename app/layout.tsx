import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portifolio-theta-eight-99.vercel.app"),
  title: "Gabriel dev",
  description: "Portfolio profissional com foco em desenvolvimento full-stack, projetos e contato.",
  openGraph: {
    title: "Gabriel — Desenvolvedor Full-Stack",
    description: "Portfólio com projetos em PHP, Laravel, React e Next.js. Confira meus trabalhos e entre em contato.",
    url: "https://portifolio-theta-eight-99.vercel.app",
    siteName: "Gabriel dev",
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
      className={`${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          </ThemeProvider>
      </body>
    </html>
  );
}