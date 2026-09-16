import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, locales } from "@/i18n/config";

/**
 * LOCALE ROUTING
 *
 *   /en, /en/...   → served as-is (English, LTR)
 *   /ar, /ar/...   → 308 to the clean URL, so Arabic has exactly one address
 *   everything else → rewritten internally to /ar/... (Arabic, RTL, default)
 *
 * Arabic is intentionally NOT negotiated from Accept-Language: the brief is
 * that every first visit opens in Arabic, and the visitor switches explicitly.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const prefixed = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (prefixed && prefixed !== defaultLocale) return NextResponse.next();

  // Metadata image routes are generated per [lang] and referenced by their
  // prefixed URL in og:image — serve them directly rather than redirecting.
  if (prefixed === defaultLocale && /\/(opengraph|twitter)-image/.test(pathname)) {
    return NextResponse.next();
  }

  if (prefixed === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Next internals and anything that looks like a file.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
