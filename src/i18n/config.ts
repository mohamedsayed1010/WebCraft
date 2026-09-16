/**
 * WEBCRAFT — LOCALES
 *
 * Arabic is the default and primary experience. It lives at clean, unprefixed
 * URLs (`/`, `/work/bay3`) while English lives under `/en`. `src/proxy.ts`
 * rewrites unprefixed requests to the `[lang]=ar` route internally, so the
 * visitor never sees `/ar` in the address bar.
 *
 * Everything that needs to know about languages — direction, OG locale, URL
 * shape — reads from this one file.
 */

export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

export const localeMeta: Record<
  Locale,
  { dir: "rtl" | "ltr"; htmlLang: string; ogLocale: string; label: string; short: string }
> = {
  ar: { dir: "rtl", htmlLang: "ar-EG", ogLocale: "ar_EG", label: "العربية", short: "ع" },
  en: { dir: "ltr", htmlLang: "en", ogLocale: "en_US", label: "English", short: "EN" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Build an internal href for a locale.
 *
 *   localePath("ar", "/work/bay3") → "/work/bay3"
 *   localePath("en", "/work/bay3") → "/en/work/bay3"
 *   localePath("en", "/#work")     → "/en#work"
 */
export function localePath(locale: Locale, path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return normalized;
  if (normalized === "/") return `/${locale}`;
  if (normalized.startsWith("/#")) return `/${locale}${normalized.slice(1)}`;
  return `/${locale}${normalized}`;
}

/**
 * Strip any locale prefix → the locale-neutral path. The default locale is
 * stripped too: during prerender `usePathname()` reports the internal `/ar/...`
 * route, while the browser reports the clean URL — both must agree or the
 * server HTML and the client hydrate differently.
 */
export function stripLocale(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }
  return pathname || "/";
}

/** Which locale a browser pathname belongs to. */
export function localeFromPathname(pathname: string): Locale {
  for (const locale of locales) {
    if (locale === defaultLocale) continue;
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) return locale;
  }
  return defaultLocale;
}
