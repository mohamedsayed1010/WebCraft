/**
 * WEBCRAFT — SECTION COPY
 *
 * Every headline and kicker on the homepage, in one file.
 *
 * ─── THE RULE THIS FILE NOW LIVES BY ─────────────────────────────────────
 * The homepage carried roughly 1,200 words across ten sections and ran to
 * fourteen thousand pixels. It read as a long freelancer landing page: a
 * stranger had to *read* their way to the work instead of seeing it.
 *
 * Every string here now has to survive one question — does removing it cost
 * us understanding, trust, differentiation or a conversion? If not, it is
 * gone, and it is not replaced with a shorter sentence. Most sections lost
 * their lead paragraph entirely: a section whose heading and content already
 * say what it is does not need a sentence introducing itself.
 *
 * The work is the argument. Copy is what gets out of its way.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * ─── STRUCTURE OF A SECTION HEADER ───────────────────────────────────────
 *   index    "01"        pixel face, Latin/numeric only
 *   kicker   "WORK"      pixel face, Latin only — Silkscreen has no Arabic
 *   title    Arabic      the actual heading, Noto Kufi
 *   lead     Arabic      optional, and now usually absent
 * ─────────────────────────────────────────────────────────────────────────
 */

export const heroCopy = {
  /**
   * Latin, and deliberately so. Three words in the pixel face say
   * "design and development studio" faster than an Arabic sentence does,
   * and the bilingual lockup is the brand's own construction — WEB / CRAFT
   * over ويب كرافت. It also frees the Arabic below it to be the pitch rather
   * than a job description.
   */
  eyebrow: "WEB DESIGN & DEVELOPMENT STUDIO",

  /**
   * Two lines, and the break between them is doing the work.
   *
   * Line one hands the reader a compliment they already believe about
   * themselves. Line two is the gap that costs them money. A visitor who
   * nods at the first line has already agreed to the premise of the second,
   * which is the whole pitch delivered in six words.
   *
   * LOCKED. This is the brand statement — do not replace it with generic
   * agency language.
   */
  headline: {
    lineOne: "شغلك كويس.",
    lineTwo: "خلّي موقعك يقول كده.",
  },

  /**
   * One line. Names the two things we make and the one reason it matters,
   * then stops.
   *
   * The previous version added «وتحوّل الزائر لعميل» — a second promise on
   * top of the first, in a place where the reader has already decided
   * whether to keep scrolling. The hero's job is to be understood in five
   * seconds, not to make the whole case.
   */
  lead: "بنصمّم وبنبني مواقع ومنصّات رقمية تخلّي شغلك يظهر بشكل أقوى.",

  /** See work first. The portfolio is the strongest asset we have. */
  primaryCta: "شوف شغلنا",
  /** The fast path — opens WhatsApp with the opener already written. */
  secondaryCta: "ابدأ مشروعك",
};

export const sectionCopy = {
  /**
   * ─── ORDER ─────────────────────────────────────────────────────────────
   *   01 WORK          proof, before anything is claimed
   *   02 CAPABILITIES  the range that three websites do not show on their own
   *   03 CONCEPT LAB   what we build when nobody is paying us
   *   04 WHY US        the five reasons, one line each
   *   05 PROCESS       what happens if you say yes
   *   06 ABOUT         who you are dealing with
   *   07 FAQ           the last objections
   *   08 CONTACT       the ask
   *
   * ─── WHAT CAME OUT, AND WHY ────────────────────────────────────────────
   * SERVICES is no longer on this page. It was a catalogue of ten offerings
   * sitting between the visitor and the reasons to hire us, and Capabilities
   * already answers the only question it was really being asked — "can you
   * build the thing I need". All ten `/services/[slug]` routes are intact and
   * still linked from the footer and Capabilities; they are search landing
   * pages, and that is a different job from a homepage section.
   *
   * CONCEPT LAB moved up from sixth to third. It was placed far from WORK so
   * that unbuilt concepts could not borrow credit from shipped ones — but the
   * labelling on it is emphatic enough to carry that on its own, and the two
   * sections together are what actually answer "what can these people build".
   * Capability, then evidence of capability, then the reasons to buy.
   *
   * ORDER IS LOAD-BEARING — it must match `sectionAnchors` in
   * `config/navigation.ts` and the render order in `app/(marketing)/page.tsx`.
   * ───────────────────────────────────────────────────────────────────────
   */
  work: {
    index: "01",
    kicker: "SELECTED WORK",
    title: "شغل شغّال دلوقتي.",
    /** The only lead that survived. It is the proof claim, in nine words. */
    lead: "تلات مشاريع حقيقية، كل واحد فيهم أونلاين ولينكه تحته.",
    emptyTitle: "الشغل في الطريق",
    emptyLead:
      "بنجهّز دراسات الحالة دلوقتي بإذن العملاء. مابنحطّش شغل مش بتاعنا ولا أرقام مالهاش مصدر.",
  },

  capabilities: {
    index: "02",
    kicker: "CAPABILITIES",
    title: "مواقع، متاجر، ومنتجات رقمية.",
  },

  /**
   * THE LABEL IS THE COPY.
   *
   * The heading says «تصوّري» before the visitor reaches a single drawing,
   * and every panel repeats it. If you are shortening this section, that is
   * not the part to shorten — see the warning at the head of
   * `content/concepts.ts`.
   */
  lab: {
    index: "03",
    kicker: "CONCEPT LAB",
    title: "شغل تصوّري من عندنا",
    lead: "أفكار وتجارب بنصمّمها وبنبنيها عشان نستكشف شكل المنتجات الرقمية الجاية.",
  },

  whyUs: {
    index: "04",
    kicker: "WHY WEBCRAFT",
    title: "ليه ويب كرافت",
  },

  process: {
    index: "05",
    kicker: "PROCESS",
    title: "بنشتغل إزاي",
  },

  about: {
    index: "06",
    kicker: "ABOUT",
    title: "مين ورا ويب كرافت",
  },

  faq: {
    index: "07",
    kicker: "FAQ",
    title: "أسئلة بتتسأل كتير",
  },

  contact: {
    index: "08",
    kicker: "START",
    title: "عندك مشروع يستاهل موقع أقوى؟",
    lead: "ابعتلنا تفاصيل بسيطة عن مشروعك ونرجعلك بخطوة واضحة.",
  },

  /* Kept for the standalone routes. Not rendered on the homepage. */
  caseStudy: {
    index: "01",
    kicker: "CASE STUDY",
    title: "مشروع بالتفصيل",
    lead: "الفرق بين معرض صور ودراسة حالة إن دي بتقولك ليه اتاخد كل قرار.",
  },

  /**
   * TESTIMONIALS — not on the homepage, and not anywhere else.
   *
   * There are no verified testimonials, and an empty «مكان لعملائنا» block is
   * worse than no block: it tells a visitor nobody has hired us. The section
   * component and this copy stay in the project so the moment a real quote
   * with a name, a role and written permission arrives it can be composed
   * back in. See `content/testimonials.ts`.
   */
  testimonials: {
    index: "—",
    kicker: "CLIENTS",
    title: "كلام العملاء",
    lead: "أهم حاجة ممكن تتقال عن شغلنا مش إحنا اللي بنقولها.",
    emptyTitle: "المكان ده لعملائنا",
    emptyLead:
      "لسه مامليناهوش. لما تيجي آراء حقيقية بأسماء وصور وإذن مكتوب، هتلاقيها هنا.",
  },
} as const;

/* ==========================================================================
   SHARED UI STRINGS
   --------------------------------------------------------------------------
   Buttons, labels and states that appear in more than one section. Collected
   here so the same action never gets two different names on the same page —
   «شوف المشروع» in one card and «عرض التفاصيل» in the next is a small
   inconsistency that reads as carelessness.
   ========================================================================== */

export const ui = {
  whatsapp: "تواصل معنا",
  whatsappCta: "تواصل معنا على واتساب",
  whatsappLong: "تحتاج مساعدة؟ تحدث معنا",

  viewProject: "شوف المشروع",
  viewLive: "شوف الموقع",
  aboutMore: "اعرف أكتر",
  readCase: "تفاصيل المشروع",
  viewAll: "كل الأعمال",
  allServices: "كل الخدمات",
  allFaqs: "كل الأسئلة",
  learnMore: "اعرف أكتر",
  backHome: "ارجع للرئيسية",
  backToWork: "كل الأعمال",

  soon: "قريباً",
  liveNow: "شغّال دلوقتي",

  /** Cursor labels — short enough to fit inside a 96px circle. */
  cursorView: "شوف",
  cursorOpen: "افتح",
  cursorDrag: "اسحب",

  menu: "القايمة",
  close: "اقفل",
  scrollHint: "انزل",

  /** Skip link — the first thing a keyboard user reaches. */
  skipToContent: "تخطّي للمحتوى",

  /** Preloader. Rendered before anything else, so it must be short. */
  loading: "بنجهّز",
} as const;

/* ==========================================================================
   CONTACT FORM
   --------------------------------------------------------------------------
   The form itself is no longer on the homepage — the final CTA is one
   question and one WhatsApp button, and the form lives at `/contact` for the
   minority who prefer to send detail in one go. See `sections/final-cta`.
   ========================================================================== */

export const contactCopy = {
  formTitle: "أو ابعتلنا التفاصيل",
  formLead: "خمس خانات، بتاخد دقيقتين.",

  fields: {
    name: { label: "اسمك", placeholder: "الاسم بالكامل" },
    email: { label: "الإيميل", placeholder: "name@example.com" },
    phone: { label: "رقم الموبايل", placeholder: "01xxxxxxxxx", hint: "اختياري" },
    company: { label: "اسم الشركة أو المشروع", hint: "اختياري" },
    service: { label: "محتاج إيه؟", placeholder: "اختار الخدمة" },
    budget: { label: "الميزانية التقريبية", hint: "اختياري — بتساعدنا نرشّحلك الأنسب" },
    message: {
      label: "احكيلنا",
      placeholder: "شغلك إيه، ومحتاج الموقع يعمل إيه، وفيه موقع حالي ولا لأ؟",
    },
  },

  budgetOptions: [
    "لسه مش محدد",
    "أقل من ٢٠ ألف جنيه",
    "٢٠ — ٥٠ ألف جنيه",
    "٥٠ — ١٠٠ ألف جنيه",
    "أكتر من ١٠٠ ألف جنيه",
  ],

  /** The single largest button on the site. */
  whatsappCta: "ابدأ مشروعك",

  submit: "ابعت الرسالة",
  submitting: "بنبعت...",

  successTitle: "وصلتنا",
  successBody: "هنرد عليك في نفس يوم الشغل. لو الموضوع مستعجل، الواتساب أسرع.",

  errorTitle: "مابعتّش",
  errorBody: "حصلت مشكلة عندنا. جرّب تاني، أو كلّمنا على الواتساب على طول.",

  /** Sits beside the form on `/contact`. The path for people who hate forms. */
  asideTitle: "أسرع طريقة توصلنا",
  asideBody: "ابعت رسالة على الواتساب وهتلاقي رد في نفس اليوم.",
} as const;
