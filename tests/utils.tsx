import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { LocaleProvider } from "@/components/LocaleProvider";
import { getDictionary, type Locale } from "@/lib/i18n";

// Renderiza dentro do LocaleProvider, como acontece no layout do site
export function renderWithLocale(ui: ReactElement, lang: Locale = "pt") {
    return render(
        <LocaleProvider lang={lang} dict={getDictionary(lang)}>
            {ui}
        </LocaleProvider>,
    );
}
