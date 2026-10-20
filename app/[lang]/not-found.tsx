import NotFoundContent from "./NotFoundContent";

// Limitacao do Next 16: com o layout raiz em um segmento dinamico ([lang]), a 404 nao e
// renderizada no servidor; o HTML inicial vem vazio e o navegador monta a pagina (com
// header, footer e idioma) logo em seguida. O status continua 404 e a pagina recebe
// noindex, entao nao ha impacto em SEO. A alternativa (global-not-found) e experimental
// e nao tem acesso ao idioma nem ao layout.
export default function NotFound() {
    return <NotFoundContent />;
}
