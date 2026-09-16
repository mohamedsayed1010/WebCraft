import type { ClientLogo, Testimonial } from "@/types";

/**
 * WEBCRAFT — SOCIAL PROOF
 *
 * ⚠️  AWAITING REAL CLIENT QUOTES. Both arrays are intentionally empty.
 *
 * Do not seed these with invented quotes. Fabricated testimonials are unlawful
 * advertising in most markets including Egypt, they are the first thing a
 * careful buyer verifies, and — the practical argument — a wall of unfamiliar
 * logos with no case study behind them reads as weakness rather than strength.
 *
 * ─── WHAT RENDERS WHILE THIS IS EMPTY ────────────────────────────────────
 * The Testimonials section does not vanish. It renders a designed empty state
 * that says plainly that the space belongs to clients and is not filled yet.
 *
 * That is a deliberate bet, and it is the honest one: a visitor who reads
 * «المكان ده لعملائنا، ولسه مامليناهوش» learns that we would rather show
 * nothing than show something invented — which is itself a trust signal, and a
 * rarer one than a row of five-star cards nobody believes.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * ─── HOW TO COLLECT THESE PROPERLY ───────────────────────────────────────
 * Ask at the moment of maximum goodwill: about a week after launch, right
 * after the client says something positive unprompted.
 *
 * Do not ask «ممكن تكتبلي رأيك؟» — you will get «شغل ممتاز، ربنا يوفقكم»,
 * which is worth nothing. Ask three questions instead and quote the answers:
 *
 *   1. كنت في إيه قبل ما تكلّمنا؟
 *   2. كنت قلقان من إيه قبل ما توافق؟
 *   3. إيه اللي اتغيّر بعد ما الموقع نزل؟
 *
 * Answer 2 is the valuable one. It names the exact objection your next
 * prospect is having right now, in a customer's voice instead of yours.
 *
 * Get written permission to publish name, role, company and photo. A quote
 * attributed to «م. ك. — صاحب شركة» is worth close to nothing, because that is
 * what a fabricated one would look like too.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const testimonials: Testimonial[] = [];

/** Featured quotes for the homepage carousel. */
export const featuredTestimonials: Testimonial[] = testimonials.filter(
  (testimonial) => testimonial.featured,
);

/** Look up a quote by id — used by case studies to pull the matching voice. */
export function getTestimonial(id: string): Testimonial | undefined {
  return testimonials.find((testimonial) => testimonial.id === id);
}

/** Template — exported separately so it can never render by accident. */
export const testimonialTemplate: Testimonial = {
  id: "client-name",
  quote:
    "اقتباس محدد بيذكر نتيجة حقيقية. التحديد هو اللي بيخلّيه مصدّق — «التليفون بدأ يرن» بتشتغل أحسن ألف مرة من «شغل احترافي ومميز».",
  author: "الاسم بالكامل",
  role: "المسمى الوظيفي",
  company: "اسم الشركة",
  avatar: {
    src: "/images/testimonials/client-name.webp",
    alt: "الاسم بالكامل — المسمى الوظيفي في اسم الشركة",
    width: 200,
    height: 200,
  },
  projectSlug: undefined,
  rating: 5,
  featured: true,
};

/**
 * Logo wall under the hero.
 *
 * Only add logos you have permission to display. Six recognisable logos beat
 * twenty unknown ones. With fewer than four the wall reads as thin, so the
 * section falls back to the promise strip in `content/process.ts` instead —
 * that fallback is automatic, driven by the length check below.
 */
export const clientLogos: ClientLogo[] = [];

/** The wall only earns its space at four logos or more. */
export const showLogoWall = clientLogos.length >= 4;
