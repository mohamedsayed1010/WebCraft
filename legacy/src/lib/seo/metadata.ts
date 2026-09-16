import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { SeoFields } from "@/types";
import { absoluteUrl } from "@/lib/utils";

/**
 * WEBCRAFT — METADATA BUILDER
 *
 * Every route builds its metadata through this function. Centralising it means
 * canonical URLs, OG tags and Twitter cards can never be forgotten on a new
 * page — the commonest and most expensive SEO mistake on agency sites.
 */

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,

  formatDetection: { telephone: false, address: false, email: false },

  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.shortDescription,
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.shortDescription,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

interface BuildMetadataArgs extends SeoFields {
  /** Route path, e.g. "/services/seo-optimization". Sets the canonical URL. */
  path: string;
  /** "article" for case studies, "website" for everything else. */
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Build page metadata.
 *
 * A canonical URL is always emitted. Case-study and service pages can be
 * reached through more than one internal path (filters, cross-links), and
 * without a canonical those become duplicate-content signals.
 */
export function buildMetadata({
  title,
  description,
  keywords,
  ogImage,
  noIndex,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
}: BuildMetadataArgs): Metadata {
  const url = absoluteUrl(path);

  /**
   * ─── WHY `images` IS USUALLY ABSENT ────────────────────────────────────
   * This used to write `images: [siteConfig.ogImage]` on every page, and
   * `siteConfig.ogImage` points at `/images/og/default.png` — a file that has
   * never existed. Every OG and Twitter tag on the site advertised a 404, so
   * a link pasted into WhatsApp rendered as a grey rectangle. On a site whose
   * primary conversion path is WhatsApp, that was the most expensive broken
   * thing in the project.
   *
   * `src/app/opengraph-image.tsx` and its Twitter twin now generate a real,
   * branded card for every route. Next only applies those when a page has not
   * declared its own `images`, so this builder must stay silent unless a page
   * genuinely has a bespoke card to point at. Passing `ogImage` still wins,
   * which is what a future per-case-study card will use.
   * ──────────────────────────────────────────────────────────────────────
   */
  const images = ogImage
    ? [{ url: ogImage, width: 1200, height: 630, alt: title }]
    : undefined;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      ...(images ? { images } : {}),
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}
