import type { Metadata, Viewport } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { Cursor } from "@/components/motion/cursor";
import { RevealScript } from "@/components/motion/reveal-script";

import { JsonLd } from "@/components/seo/json-ld";
import { fontVariables } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { localeMeta, locales } from "@/i18n/config";
import { getDictionary, resolveLocale } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo/metadata";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { AppProviders } from "@/providers";

import "../globals.css";

/**
 * ROOT LAYOUT — one per language.
 *
 * `lang` and `dir` live on <html>, so every logical utility (ps-*, me-*,
 * start-*, text-start) and every fixed element (header, WhatsApp button,
 * cursor) resolves against the right direction with no per-component logic.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#EAF0FF",
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return {
    ...buildMetadata({ locale, path: "/" }),
    title: { default: dict.meta.homeTitle, template: dict.meta.titleTemplate },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const { dir, htmlLang } = localeMeta[locale];

  return (
    <html lang={htmlLang} dir={dir} className={fontVariables} suppressHydrationWarning>
      <body>
        <AppProviders>
          <JsonLd data={organizationSchema(locale)} />
          <JsonLd data={websiteSchema(locale)} />

          <a href="#main" className="sr-only-focusable">
            {dict.common.skip}
          </a>

          <SiteHeader locale={locale} nav={dict.nav} common={dict.common} />
          <main id="main">{children}</main>
          <SiteFooter locale={locale} dict={dict} />

          <WhatsAppFloat href={siteConfig.contact.whatsapp} label={`${dict.common.whatsapp} ${dict.common.newTab}`} />
          <Cursor />
        </AppProviders>
        <RevealScript />
      </body>
    </html>
  );
}
