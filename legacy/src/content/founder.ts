import { siteConfig } from "@/config/site";
import type { Founder } from "@/types";

/**
 * WEBCRAFT — FOUNDER
 *
 * The brief was precise: use the photo naturally, build trust, show LinkedIn
 * and Facebook professionally, and do not make the page about the person. That
 * is a structural instruction, not a tonal one, and it shapes the model:
 *
 *   • The story is written for the reader's benefit, not as a CV. Every
 *     paragraph lands closer to «وعشان كده ده بيفرق معاك».
 *   • Experience is stated plainly. A founder who is straightforward about how
 *     long they have been doing this reads as more trustworthy than one hiding
 *     behind «سنوات من الخبرة الواسعة» — and this audience has usually been
 *     burned by the second kind.
 *   • Every badge links to its issuing body. A badge nobody can verify is
 *     decoration, and a visitor who checks one and finds nothing has learned
 *     something worse than if it had never been there.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * ⚠️  THE PHOTO IS NOT IN THE PROJECT YET.
 *
 *     Save it to exactly:  public/images/founder/portrait.webp
 *
 *       · 1200 × 1500 (4:5 portrait)
 *       · plain dark background, so it sits inside the brand
 *       · eye-line in the upper third
 *
 *     Until that file exists the Founder section renders a branded placeholder
 *     frame — `hasFounderPhoto` below is the switch, and the section reads it.
 *     Nothing breaks and nothing looks unfinished; the moment the file lands it
 *     appears with no code change.
 *
 * ⚠️  `name`, the story copy, and the social URLs are DRAFTS. The story is
 *     written in the right shape and voice so you can react to it rather than
 *     face a blank page — but it is your story, and it must be yours before it
 *     ships. Everything marked CONFIRM is a claim a client can check.
 * ─────────────────────────────────────────────────────────────────────────
 */

/**
 * Flip to `true` once the portrait file is in place.
 *
 * This is a manual switch rather than a filesystem check on purpose: the
 * Founder section is a server component, and probing `public/` at render time
 * would put an fs call on the request path of the homepage to answer a
 * question whose answer changes roughly once in the life of the site.
 */
export const hasFounderPhoto = false;

export const founder: Founder = {
  name: "", // NEEDS REAL VALUE — falls back to «مؤسس ويب كرافت» while empty
  role: "المؤسس والمصمم الأساسي", // CONFIRM

  photo: {
    src: "/images/founder/portrait.webp",
    alt: "", // filled from `name` by the section when empty
    width: 1200,
    height: 1500,
  },

  /** One sentence. Positioning, not biography. */
  intro:
    "بشتغل مع أصحاب البيزنس اللي عندهم شغل كويس وموقع مش بيوصّله.", // CONFIRM

  /**
   * THE HOMEPAGE VERSION — one line, and that is the whole point.
   *
   * It was two sentences, and before that the full three-paragraph `story`.
   * Both are good writing and both are still in the project — `/about`
   * renders the long one. Neither belongs here.
   *
   * This block sits one screen from the ask. At that point in a conversion
   * page a founder's essay is not read, it is scrolled past, and it takes the
   * FAQ and the contact section with it. One line answers the only question
   * being asked — who am I dealing with — and «اعرف أكتر» carries anyone who
   * wants the rest.
   */
  shortStory: [
    "بنشتغل مع أصحاب المشاريع اللي عندهم شغل يستاهل يظهر بشكل أقوى.",
  ],

  /**
   * DRAFT — three paragraphs, in the structure that works for this audience:
   *   1. The problem you kept seeing clients suffer.
   *   2. What you decided to do differently because of it.
   *   3. What that means for the person reading, concretely.
   *
   * Deliberately avoids the origin-story cliché («من وأنا صغير وأنا بحب
   * الكمبيوتر»). The reader is deciding whether to trust you with money, not
   * reading a profile piece.
   */
  story: [
    "بدأت ويب كرافت بعد ما شفت نفس المشهد بيتكرّر: صاحب شغل محترم، بيقدّم خدمة كويسة فعلاً، وعنده موقع بيخسّره زباين كل يوم. يا إما بطيء، يا إما مالوش شكل، يا إما الزائر بيدخله ومش عارف يعمل إيه بعد كده.",
    "المشكلة في أغلب الحالات مكانتش تقنية. كانت إن اللي عمل الموقع ماسألش الأول: مين اللي هيدخل هنا، وعايزينه يعمل إيه. فقرّرت إن ده يبقى أول سؤال في كل مشروع، وإن كل قرار في التصميم يبقى ليه سبب أقدر أشرحه.",
    "عملياً ده معناه إنك هتعرف السعر والمواعيد مكتوبين قبل ما حاجة تبدأ، هتشوف الشغل أول بأول مش في الآخر، وهتستلم موقع باسمك انت بكل بياناته. ولو احتجت حاجة بعد الإطلاق، فيه حد بيرد.",
  ],

  /**
   * Verifiable facts, and only those.
   *
   * The two entries that used to sit here with empty values — a delivered
   * project count and a sector count — were placeholders waiting on numbers
   * nobody had. `publishedCredentials` filtered them out, so they rendered as
   * nothing; they are removed rather than left as a to-do that reads as a
   * gap. Three true facts beat four with a hole in them.
   */
  credentials: [
    { label: "خبرة", value: "3+ سنين" }, // CONFIRM
    { label: "التخصص", value: "تصميم وتطوير مواقع" },
  ],

  /**
   * Trust badges. Every one needs an `href` to the issuing body.
   *
   * Left empty rather than seeded with plausible-looking certifications:
   * an unverifiable badge is the single fastest way to lose the exact
   * enterprise lead this section is built to win. Add them as you actually
   * earn them.
   */
  badges: [],

  socials: {
    linkedin: siteConfig.socials.linkedin,
    facebook: siteConfig.socials.facebook,
    email: siteConfig.contact.email,
  },
};

/** Display name with a safe fallback, so the section never renders a blank. */
export const founderName = founder.name || "مؤسس ويب كرافت";

/** Alt text with a safe fallback — never ships an empty alt on a real photo. */
export const founderPhotoAlt =
  founder.photo.alt || `${founderName} — ${founder.role} في ويب كرافت`;

/** Only render credentials that carry a real value. */
export const publishedCredentials = founder.credentials.filter(
  (credential) => credential.value.length > 0,
);
