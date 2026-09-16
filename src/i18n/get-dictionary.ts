import { notFound } from "next/navigation";

import { isLocale, type Locale } from "./config";
import { ar, type Dictionary } from "./dictionaries/ar";
import { en } from "./dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = { ar, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Resolve the `[lang]` param or 404. */
export async function resolveLocale(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return lang;
}

export type { Dictionary };
