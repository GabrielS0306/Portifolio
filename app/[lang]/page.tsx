import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import { getDictionary, hasLocale } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
    const { lang } = await params;
    if (!hasLocale(lang)) notFound();

    return <Container lang={lang} dict={getDictionary(lang)} />;
}
