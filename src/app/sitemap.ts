import type { MetadataRoute } from "next";

import { projects } from "@/content/projects";
import { serviceSlugs } from "@/content/services";
import { locales } from "@/i18n/config";
import { absoluteLocaleUrl, languageAlternates } from "@/lib/seo/metadata";

/**
 * Sitemap derived from the content layer, one entry per page per language,
 * each carrying hreflang alternates for its translation.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/work", priority: 0.9 },
    { path: "/contact", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/faq", priority: 0.6 },
    ...serviceSlugs.map((slug) => ({ path: `/services/${slug}`, priority: 0.85 })),
    ...projects.map((p) => ({ path: `/work/${p.slug}`, priority: 0.75 })),
  ];

  return pages.flatMap(({ path, priority }) =>
    locales.map((locale) => ({
      url: absoluteLocaleUrl(locale, path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
