import type { AccentKey, Industry, Project } from "@/types";

/**
 * WEBCRAFT — PORTFOLIO
 *
 * Three real, shipped, publicly reachable products. Every `liveUrl` below was
 * opened and returned 200 before it was written here.
 *
 * ─── THE RULE THIS FILE LIVES BY ─────────────────────────────────────────
 * Everything written here is either (a) verifiable in ten seconds by opening
 * the live URL, or (b) taken off the project's own mark. There are no client
 * names, no metrics, no percentages, no "increased conversions by …", and no
 * challenge/solution narrative, because none of that has been supplied yet.
 *
 * The feature lists are descriptions of screens that exist. If a line here
 * cannot be pointed at on the live site, it does not belong in this file.
 *
 * When real numbers and a real narrative arrive, they go into the optional
 * `problem` / `solution` / `results` blocks on `CaseStudy` and the case-study
 * page starts rendering them with no component change.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * ─── SCREENSHOTS ─────────────────────────────────────────────────────────
 * Sources live in `public/images/work/*.png` (raw captures, full browser
 * chrome). The files referenced below are the processed versions produced by
 * `node scripts/prep-screenshots.mjs`, which crops the browser chrome off,
 * resizes to 1600px and encodes WebP. Nothing is stretched, recoloured or
 * composited — the crop removes only the browser, never the interface.
 *
 * Two raw captures are deliberately NOT published:
 *   • `Reports.png`   — real Egyptian national ID cards, full names, addresses
 *   • `detailsAd.png` — a real end user's name and email address
 * Both are live user data from حاجتي ضاعت. Putting either on a public
 * marketing page would be a privacy breach regardless of how good it looks.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const projects: Project[] = [
  /* ========================================================================
     01 — BAY3
     ====================================================================== */
  {
    slug: "bay3",
    title: "Bay3",
    titleLatin: "BAY3",
    script: "latin",
    industry: "ecommerce",

    summary: "متجر إلكتروني كامل، من الكتالوج للسلة للوحة تحكم التاجر.",

    services: ["ecommerce-websites", "website-design", "website-development"],

    cover: {
      src: "/images/work/bay3/storefront.webp",
      alt: "الصفحة الرئيسية لمتجر Bay3 — بانر العروض وشريط التنقل والبحث في المنتجات",
      width: 1600,
      height: 773,
      blurDataURL:
        "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADQAQCdASoOAAcAA4BaJZQAAuQ6goLoQAD9AgHmiMIecsqjuAfantICfcLMhuekJ29V1ZEBqvYbfMXPTU+ooAAA",
    },

    liveUrl: "https://bay3.vercel.app/products",

    featured: true,
    order: 1,
    accent: "lime",
    display: "lead",

    caseStudy: {
      projectType: "متجر إلكتروني كامل + لوحة تحكم للتاجر",

      overview: [
        "متجر إلكتروني كامل من الواجهة للوحة التحكم. العميل بيدخل يتصفّح، يفلتر، يفتح المنتج، يختار اللون والمقاس، ويضيفه للسلة من غير ما يسيب الصفحة اللي هو فيها.",
        "والتاجر من ناحيته عنده لوحة تحكم مستقلة بيدير منها الكتالوج والمخزون والطلبات والكوبونات والشحن والمرتجعات والعملاء، وبيشوف فيها المبيعات مقسّمة حسب الحالة والتصنيف.",
      ],

      features: [
        {
          title: "كتالوج ببحث وفلترة وترتيب",
          detail:
            "بحث بالاسم أو الـSKU، فلترة بالسعر والتقييم والتوفّر، وترتيب حسب التوصية.",
        },
        {
          title: "صفحة منتج بألوان وفيرنتس",
          detail:
            "معرض صور، اختيار اللون والفيرنت، التقييمات، والإضافة للسلة من نفس الشاشة.",
        },
        {
          title: "لوحة تحكم للتاجر",
          detail:
            "المنتجات، المخزون، الطلبات، الكوبونات، الشحن، المرتجعات، العملاء ورسايل التواصل.",
        },
        {
          title: "تقارير ومبيعات",
          detail:
            "الطلبات حسب الحالة، المبيعات حسب التصنيف، وآخر الطلبات والعملاء الجدد.",
        },
        {
          title: "مراجعات المنتجات",
          detail: "تقييمات العملاء بتتراجع وتتقبل أو تتشال من لوحة التحكم.",
        },
        {
          title: "عربي وإنجليزي + وضع ليلي",
          detail: "تبديل اللغة والثيم من شريط التنقل في الواجهة واللوحة.",
        },
      ],

      gallery: [
        {
          image: {
            src: "/images/work/bay3/catalog.webp",
            alt: "صفحة المنتجات في Bay3 — فلترة بالسعر والتقييم والتوفّر مع شبكة منتجات",
            width: 1600,
            height: 773,
            blurDataURL:
              "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAACQAQCdASoOAAcAA4BaJZwAAZO5vgAA/vcnpZvok0XJsF1+FaFCXvM9jWRwKb0NbY/Y8EJP/yNJsZFfi/VWYKrgAAA=",
          },
          caption: "الكتالوج: بحث، فلترة وترتيب.",
          span: "full",
        },
        {
          image: {
            src: "/images/work/bay3/product.webp",
            alt: "صفحة تفاصيل المنتج في Bay3 — معرض صور واختيار اللون والفيرنت",
            width: 1600,
            height: 773,
            blurDataURL:
              "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAACwAQCdASoOAAcAA4BaJZQAAm1mI0VAAO+5A8dtUWRKUKQj7ljGA4yjMbuKOolhcfAFHQR6hvOM4DlGAUkiGWAA",
          },
          caption: "المنتج بيفتح فوق الكتالوج، مش في صفحة جديدة.",
          span: "half",
        },
        {
          image: {
            src: "/images/work/bay3/admin-dashboard.webp",
            alt: "لوحة تحكم Bay3 — الإيرادات والطلبات والمخزون والمهام اليومية",
            width: 1600,
            height: 773,
            blurDataURL:
              "data:image/webp;base64,UklGRioAAABXRUJQVlA4IB4AAAAwAQCdASoOAAcAA4BaJaQAA3AA/vR8KbZti7h3aAA=",
          },
          caption: "لوحة التحكم: اللي محتاج انتباه النهارده في أول شاشة.",
          span: "half",
        },
        {
          image: {
            src: "/images/work/bay3/admin-products.webp",
            alt: "إدارة المنتجات في لوحة تحكم Bay3 — جدول بالتصنيف والماركة والسعر والمخزون",
            width: 1600,
            height: 773,
            blurDataURL:
              "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACwAQCdASoOAAcAA4BaJaQAAp1TWNgAAP73EyI80kPMt0PJhoAAAA==",
          },
          caption: "إدارة الكتالوج والمخزون.",
          span: "half",
        },
        {
          image: {
            src: "/images/work/bay3/admin-analytics.webp",
            alt: "تقارير Bay3 — الطلبات حسب الحالة والمبيعات حسب التصنيف",
            width: 1600,
            height: 773,
            blurDataURL:
              "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAABwAQCdASoOAAcAA4BaJaVnyAGIAAD+9ER0Kzt01J8qT5DURl+gAA==",
          },
          caption: "الطلبات حسب الحالة، والمبيعات حسب التصنيف.",
          span: "half",
        },
        {
          image: {
            src: "/images/work/bay3/admin-reviews.webp",
            alt: "مراجعات العملاء في لوحة تحكم Bay3 — قبول أو حذف التقييمات",
            width: 1600,
            height: 773,
            blurDataURL:
              "data:image/webp;base64,UklGRiwAAABXRUJQVlA4ICAAAAAwAQCdASoOAAcAA4BaJaQAA3AA/vRwcFan0gFobG6AAA==",
          },
          caption: "مراجعة تقييمات العملاء قبل ما تظهر.",
          span: "full",
        },
      ],
    },

    seo: {
      title: "Bay3 — متجر إلكتروني بلوحة تحكم",
      description:
        "متجر إلكتروني كامل بنيناه في ويب كرافت: كتالوج بفلترة، صفحة منتج بألوان وفيرنتس، سلة وطلبات، ولوحة تحكم للتاجر. افتح الموقع وجرّبه بنفسك.",
    },
  },

  /* ========================================================================
     02 — حاجتي ضاعت
     ====================================================================== */
  {
    slug: "hajaty-day3a",
    title: "حاجتي ضاعت",
    titleLatin: "HAJATY DAY3A",
    script: "ar",
    industry: "platform",

    summary: "منصة بتجمع اللي ضاع منه حاجة واللي لقاها على نفس الشاشة.",

    services: ["website-design", "website-development"],

    cover: {
      src: "/images/work/hajaty-day3a/home.webp",
      alt: "الصفحة الرئيسية لمنصة حاجتي ضاعت — نشر بلاغ مفقود أو بلاغ وجد والبحث في البلاغات",
      width: 1600,
      height: 773,
      blurDataURL:
        "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAACwAQCdASoOAAcAA4BaJYwAAu186iKAAP73JrPGENrqNquSrzl2eTXt4gkCH3sUtLC4AAAA",
    },

    liveUrl: "https://hajata-day3a.vercel.app/",

    featured: true,
    order: 2,
    accent: "violet",
    display: "wide",

    caseStudy: {
      projectType: "منصة مفقودات وموجودات بحسابات مستخدمين",

      overview: [
        "منصة بتجمع طرفين على نفس الشاشة: حد ضاع منه حاجة، وحد لقى حاجة. الاتنين بينشروا بلاغ، والبلاغات بتتنظّم بتصنيف ومحافظة ومنطقة وتاريخ عشان الوصول يبقى بالبحث مش بالصدفة.",
        "لكل مستخدم حساب وملف فيه نقاط ثقة وعدد بلاغاته، وفيه بلاغات بتتنشر ومعاها مكافأة لمن يرشد عنها.",
      ],

      features: [
        {
          title: "بلاغ مفقود وبلاغ وجد",
          detail: "المسارين واضحين من أول شاشة، كل واحد بزرّه المستقل.",
        },
        {
          title: "بحث وتصفّح البلاغات",
          detail: "بحث نصّي في البلاغات، وعرض بالشبكة أو بالقائمة مع فلترة.",
        },
        {
          title: "تصنيفات ومناطق",
          detail: "كل بلاغ متصنّف ومربوط بمحافظة ومنطقة وتاريخ الحادثة.",
        },
        {
          title: "حسابات ونقاط ثقة",
          detail: "ملف لكل مستخدم فيه نقاط الثقة وعدد البلاغات وتاريخ العضوية.",
        },
        {
          title: "مكافآت على البلاغات",
          detail: "صاحب البلاغ يقدر يحطّ مكافأة تظهر على البلاغ نفسه.",
        },
        {
          title: "وضع ليلي",
          detail: "تبديل الثيم من شريط التنقل.",
        },
      ],

      gallery: [
        {
          image: {
            src: "/images/work/hajaty-day3a/home.webp",
            alt: "الصفحة الرئيسية لمنصة حاجتي ضاعت — نشر بلاغ مفقود أو بلاغ وجد والبحث في البلاغات",
            width: 1600,
            height: 773,
            blurDataURL:
              "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAACwAQCdASoOAAcAA4BaJYwAAu186iKAAP73JrPGENrqNquSrzl2eTXt4gkCH3sUtLC4AAAA",
          },
          caption: "المسارين — «نشر بلاغ مفقود» و«نشر بلاغ وجد» — في أول شاشة.",
          span: "full",
        },
      ],
    },

    seo: {
      title: "حاجتي ضاعت — منصة مفقودات وموجودات",
      description:
        "منصة للإبلاغ عن المفقودات والموجودات بتصنيفات ومناطق وحسابات مستخدمين، من تنفيذ ويب كرافت. افتح المنصة وجرّبها بنفسك.",
    },
  },

  /* ========================================================================
     03 — الخبر الجديد
     ====================================================================== */
  {
    slug: "alkhabar-aljadid",
    title: "الخبر الجديد",
    titleLatin: "AL-KHABAR AL-JADEED",
    script: "ar",
    industry: "news",

    summary: "موقع إخباري بتمانية أقسام مستقلة وشريط عاجل وبحث.",

    services: ["website-design", "website-development"],

    cover: {
      src: "/images/work/alkhabar-aljadid/home.webp",
      alt: "الصفحة الرئيسية لموقع الخبر الجديد — الشعار وأقسام الموقع والخبر الرئيسي",
      width: 1600,
      height: 715,
      blurDataURL:
        "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAADwAQCdASoOAAYAA4BaJZQAAsZM+7+ycgAA/vi6M0ErqZuoIyA07ZvjopVP7Y2NBsIOCvqZBOzOhXGEBWSh+hAAAAA=",
    },

    liveUrl: "https://alkhabaraljadid.com/",

    featured: true,
    order: 3,
    accent: "paper",
    display: "compact",

    caseStudy: {
      projectType: "موقع إخباري متعدّد الأقسام",

      overview: [
        "موقع إخباري بأقسام مستقلة — مصر، السعودية، عرب وعالم، رياضة، اقتصاد، تعليم، تقنية ومنوعات — وكل قسم ليه شبكته الخاصة على الصفحة الرئيسية.",
        "الصفحة مبنية عشان تستوعب كم كبير من الأخبار من غير ما تتلخبط: خبر رئيسي كبير، شريط أخبار عاجلة، وأعمدة جانبية للأكثر قراءة والمنشورات الموصى بها والكلمات المفتاحية.",
      ],

      features: [
        {
          title: "أقسام متعددة",
          detail: "مصر، السعودية، عرب وعالم، رياضة، اقتصاد، تعليم، تقنية ومنوعات.",
        },
        {
          title: "شريط أخبار عاجلة",
          detail: "شريط مستقل أسفل الخبر الرئيسي بيعرض آخر العاجل.",
        },
        {
          title: "خبر رئيسي بتنقّل",
          detail: "الخبر الأهم في المقدّمة مع أسهم للتنقّل بين الأخبار البارزة.",
        },
        {
          title: "كلمات مفتاحية",
          detail: "بلوك كلمات مفتاحية بيربط الأخبار المتقاربة ببعضها.",
        },
        {
          title: "منشورات موصى بها",
          detail: "عمود جانبي بيقترح قراءات تانية جوه نفس السياق.",
        },
        {
          title: "بحث في الموقع",
          detail: "بحث من شريط التنقل الرئيسي.",
        },
      ],

      gallery: [
        {
          image: {
            src: "/images/work/alkhabar-aljadid/home.webp",
            alt: "الصفحة الرئيسية لموقع الخبر الجديد — الشعار وأقسام الموقع والخبر الرئيسي",
            width: 1600,
            height: 715,
            blurDataURL:
              "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAADwAQCdASoOAAYAA4BaJZQAAsZM+7+ycgAA/vi6M0ErqZuoIyA07ZvjopVP7Y2NBsIOCvqZBOzOhXGEBWSh+hAAAAA=",
          },
          caption: "الأقسام والخبر الرئيسي وشريط العاجل.",
          span: "full",
        },
        {
          image: {
            src: "/images/work/alkhabar-aljadid/sections.webp",
            alt: "قسم عرب وعالم في موقع الخبر الجديد مع عمود جانبي للكلمات المفتاحية",
            width: 1600,
            height: 773,
            blurDataURL:
              "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAACQAQCdASoOAAcAA4BaJaQAApKgvdAA/vgR7f+PPOsTNNsOg7NotCHESu7oHdUanE9bQCkgAAA=",
          },
          caption: "كل قسم بشبكته، والكلمات المفتاحية على الجنب.",
          span: "half",
        },
        {
          image: {
            src: "/images/work/alkhabar-aljadid/regional.webp",
            alt: "قسم السعودية والمنشورات الموصى بها في موقع الخبر الجديد",
            width: 1600,
            height: 773,
            blurDataURL:
              "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAADQAQCdASoOAAcAA4BaJZwAAq8uBmAsAAD+9Vm9fmVWf58Se1GRn5g/0YfkuKuePU6BLlsDzNDzsaHuzSgEJ8QY7lqWyM0FATzkQMRsTiAAAA==",
          },
          caption: "المنشورات الموصى بها والأكثر قراءة.",
          span: "half",
        },
      ],
    },

    seo: {
      title: "الخبر الجديد — موقع إخباري متعدّد الأقسام",
      description:
        "موقع إخباري بأقسام مستقلة وشريط عاجل وكلمات مفتاحية، من تنفيذ ويب كرافت. افتح الموقع وشوفه شغّال.",
    },
  },
];

/* ==========================================================================
   CATEGORIES
   --------------------------------------------------------------------------
   Doubles as the portfolio filter set. `kicker` is the Latin label for the
   pixel face, which has no Arabic glyphs.
   ========================================================================== */

export const industries: {
  id: Industry;
  label: string;
  kicker: string;
}[] = [
  { id: "medical", label: "عيادات ومراكز طبية", kicker: "MEDICAL" },
  { id: "restaurant", label: "مطاعم وكافيهات", kicker: "FOOD" },
  { id: "real-estate", label: "عقارات", kicker: "REAL ESTATE" },
  { id: "ecommerce", label: "متاجر إلكترونية", kicker: "E-COMMERCE" },
  { id: "platform", label: "منصّات ومنتجات رقمية", kicker: "PLATFORM" },
  { id: "news", label: "أخبار ومحتوى", kicker: "NEWS & CONTENT" },
  { id: "corporate", label: "شركات ومؤسسات", kicker: "CORPORATE" },
  { id: "startup", label: "مشاريع ناشئة", kicker: "STARTUP" },
  { id: "local-business", label: "شغل محلي", kicker: "LOCAL" },
  { id: "other", label: "مجالات تانية", kicker: "OTHER" },
];

/** Arabic label for an industry id. */
export function industryLabel(id: Industry): string {
  return industries.find((industry) => industry.id === id)?.label ?? "";
}

/** Latin kicker for an industry id — for pixel-face tags. */
export function industryKicker(id: Industry): string {
  return industries.find((industry) => industry.id === id)?.kicker ?? "";
}

/* ==========================================================================
   SELECTORS
   ========================================================================== */

/** Featured projects for the homepage grid, in manual sort order. */
export const featuredProjects: Project[] = projects
  .filter((project) => project.featured)
  .sort((a, b) => a.order - b.order);

/** Everything, newest first — the `/work` index. */
export const allProjects: Project[] = [...projects].sort(
  (a, b) => (b.year ?? 0) - (a.year ?? 0) || a.order - b.order,
);

/** Projects with a written case study — the only ones with a `/work/[slug]` route. */
export const caseStudyProjects: Project[] = projects.filter(
  (project) => project.caseStudy !== undefined,
);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * The host + path a visitor would see in their address bar, e.g.
 * `bay3.vercel.app/products`.
 *
 * The portfolio renders each screenshot inside a browser frame carrying this
 * string, which is the cheapest way to say "this is a real site you can open"
 * — and it is derived from the same `liveUrl` the button navigates to, so the
 * frame can never advertise an address the button does not go to.
 */
export function displayUrl(href: string): string {
  try {
    const url = new URL(href);
    const path = url.pathname.replace(/\/$/, "");
    return `${url.host}${path}`;
  } catch {
    return href;
  }
}

/* --------------------------------------------------------------------------
   ACCENT FALLBACK
   --------------------------------------------------------------------------
   Used by the showcase for its bloom colour. Kept here rather than in the
   component so the palette decision stays next to the content that drives it.
   -------------------------------------------------------------------------- */

export const accentOrder: AccentKey[] = ["lime", "violet", "paper"];
