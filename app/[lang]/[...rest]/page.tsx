import { notFound } from "next/navigation";

// Qualquer caminho inexistente dentro de /pt ou /en cai aqui e mostra a 404 do idioma
export default function CatchAll() {
    notFound();
}
