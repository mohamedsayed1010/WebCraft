import type { NavItem, SocialLink } from "@/types";
import { siteConfig } from "./site";

/**
 * WEBCRAFT — NAVIGATION
 *
 * Six primary items, plus a WhatsApp CTA that is not part of this list — it is
 * a separate, permanently visible affordance rendered on the opposite end of
 * the bar. Keeping it out of `mainNav` is deliberate: it must never be treated
 * as "one more link" by the scroll-spy or the mobile drawer.
 *
 * ─── WHAT CAME OUT, AND WHY ──────────────────────────────────────────────
 * «آراء العملاء» is gone. There are no verified testimonials yet, and a nav
 * item is a promise: a visitor who taps it and lands on «لسه مامليناهوش» has
 * been told, in the most prominent element on the page, that nobody has hired
 * us. The section is out of the homepage too — see `content/copy.ts`.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * The primary items are homepage anchors rather than routes. The homepage is
 * the pitch, told in one continuous scroll, and sending someone to a separate
 * page mid-argument loses them. The standalone routes (/work, /about,
 * /services, /faq, /contact) exist for search engines, for direct links, and
 * for the detail the homepage deliberately no longer carries.
 *
 * URL slugs stay ASCII. Percent-encoded Arabic paths (%D8%A7%D9%84%D8%AE…)
 * are legal but they break when pasted into WhatsApp, get mangled by link
 * previews, and are unreadable in analytics.
 */
export const mainNav: NavItem[] = [
  { label: "الرئيسية", href: "/#hero", description: "أول الصفحة" },
  { label: "أعمالنا", href: "/#work", description: "شغل شغّال على الأرض" },
  { label: "إيه اللي بنبنيه", href: "/#capabilities", description: "مواقع ومتاجر ومنتجات" },
  { label: "خدماتنا", href: "/#services", description: "اللي بنعمله" },
  { label: "عن ويب كرافت", href: "/#about", description: "إحنا مين" },
  { label: "كلّمنا", href: "/#contact", description: "ابدأ مشروعك" },
];

/**
 * Homepage section anchors. Drives the scroll-spy indicator and the mobile
 * quick-jump list.
 *
 * `index` is rendered in the pixel face, so it is Latin/numeric by
 * construction — Silkscreen carries no Arabic glyphs. `kicker` is the Latin
 * label that sits beside it; the Arabic section title lives in the section
 * component itself, not here.
 *
 * ORDER IS LOAD-BEARING. It must match the render order in
 * `app/(marketing)/page.tsx` and the indices in `content/copy.ts`, or the
 * scroll-spy will highlight the wrong item.
 */
export const sectionAnchors = [
  { id: "hero", label: "الرئيسية", index: "00", kicker: "START" },
  { id: "work", label: "أعمالنا", index: "01", kicker: "WORK" },
  { id: "capabilities", label: "إيه اللي بنبنيه", index: "02", kicker: "CAPABILITIES" },
  { id: "services", label: "خدماتنا", index: "03", kicker: "SERVICES" },
  { id: "why-us", label: "ليه ويب كرافت", index: "04", kicker: "WHY US" },
  { id: "process", label: "بنشتغل إزاي", index: "05", kicker: "PROCESS" },
  { id: "lab", label: "شغل تصوّري", index: "06", kicker: "CONCEPT LAB" },
  { id: "about", label: "عن ويب كرافت", index: "07", kicker: "ABOUT" },
  { id: "faq", label: "الأسئلة الشائعة", index: "08", kicker: "FAQ" },
  { id: "contact", label: "كلّمنا", index: "09", kicker: "CONTACT" },
] as const;

export type SectionId = (typeof sectionAnchors)[number]["id"];

/**
 * Turn a homepage anchor into something that works from anywhere.
 *
 * On the homepage `/#services` should scroll, not navigate. On `/work/foo` the
 * same link has to go home first. Next's Link handles the second case
 * correctly on its own, but the smooth-scroll layer needs to know which case
 * it is in, so the decision is made here rather than in three components.
 */
export function isHomeAnchor(href: string): boolean {
  return href.startsWith("/#");
}

/** The bare fragment id from a `/#anchor` href, or null if it is a real route. */
export function anchorId(href: string): string | null {
  return isHomeAnchor(href) ? href.slice(2) : null;
}

/* ==========================================================================
   FOOTER
   --------------------------------------------------------------------------
   Deliberately richer than the header. The header is a funnel and every extra
   link measurably dilutes the one that matters; the footer is where the
   service pages get their internal links, which is what makes them rank.
   ========================================================================== */

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "الخدمات",
    items: [
      { label: "تصميم مواقع", href: "/services/website-design" },
      { label: "برمجة وتنفيذ", href: "/services/website-development" },
      { label: "تطوير موقع قديم", href: "/services/website-redesign" },
      { label: "متاجر إلكترونية", href: "/services/ecommerce-websites" },
      { label: "تحسين الظهور في جوجل", href: "/services/seo-optimization" },
      { label: "كل الخدمات", href: "/services" },
    ],
  },
  {
    title: "ويب كرافت",
    items: [
      { label: "أعمالنا", href: "/work" },
      { label: "عن الشركة", href: "/about" },
      { label: "بنشتغل إزاي", href: "/#process" },
      { label: "الأسئلة الشائعة", href: "/faq" },
      { label: "كلّمنا", href: "/contact" },
    ],
  },
];

/**
 * Only rendered when the corresponding URL is set in site config. A social
 * icon linking to "" lands the visitor on the homepage again, which reads as
 * a broken site — worse than having no icon at all.
 */
export const socialLinks: SocialLink[] = (
  [
    { label: "LinkedIn", href: siteConfig.socials.linkedin, icon: "Linkedin" },
    { label: "Facebook", href: siteConfig.socials.facebook, icon: "Facebook" },
    { label: "Instagram", href: siteConfig.socials.instagram, icon: "Instagram" },
    { label: "Behance", href: siteConfig.socials.behance, icon: "Dribbble" },
  ] satisfies SocialLink[]
).filter((link) => link.href.length > 0);
