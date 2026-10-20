import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, locales } from "@/lib/i18n/config";
import { pickLocale } from "@/lib/i18n/negotiate";

// Redireciona URLs sem idioma (ex.: "/" ou "/qualquer-coisa") para /pt ou /en
export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const hasLocale = locales.some(
        (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
    );
    if (hasLocale) return;

    const locale = pickLocale(
        request.cookies.get(LOCALE_COOKIE)?.value,
        request.headers.get("accept-language"),
    );

    request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    // Ignora arquivos internos do Next, da Vercel e qualquer caminho com extensao (imagens, robots.txt...)
    matcher: ["/((?!_next|_vercel|api|.*\\..*).*)"],
};
