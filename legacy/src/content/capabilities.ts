import type { Capability } from "@/types";

/**
 * WEBCRAFT — CAPABILITIES
 *
 * Four things we build, one line each.
 *
 * ─── WHY FOUR AND NOT SIX, AND WHY THIS REPLACED SERVICES ────────────────
 * This section and the Services section were answering the same question
 * twice on one page. Services listed ten orderable offerings in three named
 * stages; this listed six product types. Between them they cost about 220
 * words and two full screens, and a visitor had to read both before reaching
 * a single reason to hire us.
 *
 * Services is gone from the homepage. What a stranger actually needs to know
 * here is "can you build the thing I need" — four categories answer that in
 * about eight seconds, and the ten `/services/[slug]` routes (still linked
 * from the footer, and from three of the four rows below) carry the detail
 * for the people who came looking for it from a search result.
 *
 * ─── THE HONESTY LINE ────────────────────────────────────────────────────
 * Every entry is a business outcome, never a technology, and nothing here
 * claims a shipped example that does not exist. The drawings beside them are
 * captioned as sketches, not as work.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const capabilities: Capability[] = [
  {
    id: "websites",
    kicker: "WEBSITES",
    title: "مواقع الشركات",
    description: "موقع بيشرح شغلك ويخلّي الزائر يعرف يعمل إيه بعد كده.",
    icon: "Building2",
    screen: "site-landing",
    href: "/services/business-websites",
  },
  {
    id: "ecommerce",
    kicker: "E-COMMERCE",
    title: "متاجر إلكترونية",
    description: "كتالوج وسلة وطلبات، ولوحة تحكم بتدير منها المتجر كله.",
    icon: "ShoppingBag",
    screen: "shop-storefront",
    href: "/services/ecommerce-websites",
  },
  {
    id: "web-apps",
    kicker: "WEB APPS",
    title: "أنظمة ومنصّات",
    description: "لوحات تحكم وحجوزات وبوابات عملاء وأنظمة تشغيل داخلية.",
    icon: "Gauge",
    screen: "ops-analytics",
  },
  {
    id: "seo",
    kicker: "SEO & PERFORMANCE",
    title: "ظهور وسرعة",
    description: "بنية تقنية سليمة وسرعة تحميل وترتيب أحسن في جوجل.",
    icon: "TrendingUp",
    screen: "fin-analytics",
    href: "/services/seo-optimization",
  },
];
