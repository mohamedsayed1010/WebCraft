/**
 * WEBCRAFT — SITE FACTS
 *
 * The single source of truth for every contact channel and anything emitted
 * into structured data. Only WebCraft's official, published channels live
 * here — nothing is invented, and a channel with no official account simply
 * does not exist in this file rather than being faked or left as a stub.
 */
export const siteConfig = {
  name: "WebCraft",
  nameAr: "ويب كرافت",

  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),

  contact: {
    email: "support.webcraft.eg@gmail.com",
    /** E.164, for tel: links. */
    phone: "+201214126396",
    /** Shown as written locally; `phone` is what the link dials. */
    phoneDisplay: "01214126396",
    /** Same line on WhatsApp. */
    whatsapp: "https://wa.me/201214126396",
    location: { city: { ar: "القاهرة", en: "Cairo" }, country: "EG" },
  },

  socials: {
    tiktok: "https://www.tiktok.com/@0webcraft?_r=1&_t=ZS-99mLi8gQBda",
    facebook: "https://www.facebook.com/share/18vKoHVACS/",
    instagram: "https://www.instagram.com/webcraft.eg_?stkn=aWhtMTJqNXJmNm9p",
  },

  analytics: {
    plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "",
  },
} as const;

/** Keys of the official accounts above — drives the brand glyph lookup. */
export type SocialKey = keyof typeof siteConfig.socials;

/**
 * Rendered order for the social row in the contact section and the footer.
 * Platform names are the brands' own, so they are not translated.
 */
export const socialLinks: { key: SocialKey; label: string; href: string }[] = [
  { key: "tiktok", label: "TikTok", href: siteConfig.socials.tiktok },
  { key: "facebook", label: "Facebook", href: siteConfig.socials.facebook },
  { key: "instagram", label: "Instagram", href: siteConfig.socials.instagram },
];

export const features = {
  smoothScroll: true,
  customCursor: true,
} as const;
