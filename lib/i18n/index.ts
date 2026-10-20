import type { Locale } from "./config";
import { en } from "./dictionaries/en";
import { pt, type Dictionary } from "./dictionaries/pt";

export * from "./config";
export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export function getDictionary(locale: Locale): Dictionary {
    return dictionaries[locale];
}
