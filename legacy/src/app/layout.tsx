import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";

import { fontVariables } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { defaultMetadata } from "@/lib/seo/metadata";
import { AppProviders } from "@/providers";

import "./globals.css";

/**
 * ROOT LAYOUT — the document shell.
 *
 * Owns four things and nothing else: the html element and its direction, the
 * font variables, the global providers, and the metadata defaults. Chrome
 * (header, footer, navigation) belongs to the `(marketing)` route group, so a
 * future route group — a client portal, a bare landing page with no nav — can
 * opt out of it entirely.
 */

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // Matches --color-ink-900 so mobile browser chrome blends into the page
  // instead of framing it in white.
  themeColor: "#0B0B0B",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /**
     * `dir="rtl"` here rather than on a wrapper div is what makes the whole
     * layout system work. Every logical property downstream — `ms-*`, `me-*`,
     * `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start` — resolves against this
     * one attribute. Set it on a div instead and the fixed-position elements
     * (header, floating WhatsApp button, cursor) escape it and silently mirror
     * to the wrong side.
     *
     * `suppressHydrationWarning` covers the class the preloader adds to <html>
     * before React hydrates.
     */
    <html
      lang={siteConfig.language}
      dir="rtl"
      className={fontVariables}
      suppressHydrationWarning
    >
      <body>
        <AppProviders>
          {children}

          {/*
            Form feedback. Positioned bottom-left because in an RTL layout the
            bottom-*right* is where the floating WhatsApp button lives, and a
            toast covering the primary conversion CTA is a self-inflicted
            wound. `dir="rtl"` is passed explicitly — sonner does not inherit
            document direction on its portal.
          */}
          <Toaster
            position="bottom-left"
            dir="rtl"
            closeButton
            toastOptions={{
              style: {
                background: "var(--color-ink-800)",
                border: "1px solid var(--color-border-strong)",
                color: "var(--color-fg)",
                fontFamily: "var(--font-sans)",
              },
            }}
          />
        </AppProviders>
      </body>
    </html>
  );
}
