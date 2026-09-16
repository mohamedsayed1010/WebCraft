import type { NextConfig } from "next";

/**
 * WebCraft — Next.js configuration
 *
 * Philosophy: the site is static-first. Everything that can be rendered at
 * build time is rendered at build time; the only server surface is the
 * contact Route Handler. Perceived speed is part of the premium feel.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Typed routes were catching broken internal links at build time, but every
  // nav/footer href on this site is a plain string coming out of the content
  // layer (`config/navigation.ts`), which typed routes cannot narrow — it
  // rejected the whole navigation system rather than any real broken link.
  // Re-enable once the content layer types its hrefs as `Route`.
  typedRoutes: false,

  images: {
    // AVIF first, WebP fallback. Portfolio covers are the heaviest assets
    // on the site, so this materially moves LCP.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [400, 640, 828, 1080, 1280, 1600, 1920, 2560],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    remotePatterns: [
      // Add a CMS / DAM host here when the content layer moves off-repo.
    ],
  },

  experimental: {
    // Tree-shake barrel imports from icon + animation packages.
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      {
        // Fingerprinted texture/font assets never change — cache them hard.
        source: "/textures/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  /**
   * The previous site's ten service URLs, and its /about + /faq routes, are
   * already indexed. Each maps permanently to its closest new page so neither
   * rankings nor shared links break. Mirrors `legacyServiceRedirects` in
   * `src/content/services.ts`.
   */
  async redirects() {
    const services: Record<string, string> = {
      "website-design": "ui-ux-design",
      "website-development": "frontend-development",
      "website-redesign": "ui-ux-design",
      "website-audit": "seo",
      "seo-optimization": "seo",
      "landing-pages": "frontend-development",
      "business-websites": "frontend-development",
      "corporate-websites": "frontend-development",
      "ecommerce-websites": "ecommerce-development",
    };
    return [
      ...Object.entries(services).flatMap(([from, to]) => [
        { source: `/services/${from}`, destination: `/services/${to}`, permanent: true },
        { source: `/en/services/${from}`, destination: `/en/services/${to}`, permanent: true },
      ]),
      { source: "/services/website-maintenance", destination: "/services", permanent: true },
      { source: "/en/services/website-maintenance", destination: "/en/services", permanent: true },
    ];
  },
};

export default nextConfig;
