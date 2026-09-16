import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { defaultLocale, localeMeta, localePath, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

/** Absolute URL for a locale-neutral path in a given locale. */
export function absoluteLocaleUrl(locale: Locale, path = "/"): string {
  const localized = localePath(locale, path);
  return `${siteConfig.url}${localized === "/" ? "" : localized}` || siteConfig.url;
}

/** hreflang map for a locale-neutral path — Arabic doubles as x-default. */
export function languageAlternates(path = "/"): Record<string, string> {
  const map: Record<string, string> = {};
  for (const locale of locales) map[localeMeta[locale].htmlLang] = absoluteLocaleUrl(locale, path);
  map["x-default"] = absoluteLocaleUrl(defaultLocale, path);
  return map;
}

interface PageMetaArgs {
  locale: Locale;
  /** Locale-neutral path, e.g. "/work/bay3". */
  path: string;
  title?: string;
  description?: string;
  type?: "website" | "article";
  /** When true the title is used verbatim (no template). */
  absoluteTitle?: boolean;
  image?: { url: string; width: number; height: number; alt: string };
}

/**
 * Every route builds metadata here: canonical per language, hreflang
 * alternates for both, localized OG/Twitter tags.
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
  absoluteTitle,
  image,
}: PageMetaArgs): Metadata {
  const dict = getDictionary(locale);
  const url = absoluteLocaleUrl(locale, path);
  const finalTitle = title ?? dict.meta.homeTitle;
  const finalDescription = description ?? dict.meta.description;
  const other = locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale);

  return {
    metadataBase: new URL(siteConfig.url),
    title: absoluteTitle || !title ? { absolute: finalTitle } : finalTitle,
    description: finalDescription,
    applicationName: siteConfig.name,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type,
      url,
      siteName: dict.meta.siteName,
      title: finalTitle,
      description: finalDescription,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: other,
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      ...(image ? { images: [image.url] } : {}),
    },
    formatDetection: { telephone: false, address: false, email: false },
  };
}
