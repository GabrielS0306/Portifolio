import type { Metadata } from "next";
import Link from "next/link";
import styles from "./not-found.module.css";
import button from "@/components/ui/Button.module.css";

export const metadata: Metadata = {
    title: "Página não encontrada",
};

export default function NotFound() {
    return (
        <main className={`container ${styles.notFound}`}>
            <p className={styles.code} aria-hidden="true">
                404
            </p>
            <h1>Página não encontrada.</h1>
            <p className={styles.lead}>
                O endereço que você acessou não existe ou foi movido. Que tal voltar ao início ou dar uma
                olhada nos meus projetos?
            </p>

            <div className={styles.actions}>
                <Link className={`${button.btn} ${button.primary}`} href="/">
                    Voltar ao início
                </Link>
                <Link className={`${button.btn} ${button.ghost}`} href="/#projetos">
                    Ver projetos
                </Link>
            </div>
        </main>
    );
}
