import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/**
 * robots.txt — any origin that isn't the real production site blocks crawlers,
 * so preview deployments never compete with production in search results.
 */
export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url;
  const isProduction = process.env.NODE_ENV === "production" && !base.includes("localhost");

  if (!isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
