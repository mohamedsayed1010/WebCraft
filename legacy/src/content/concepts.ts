import type { ConceptProject } from "@/types";

/**
 * WEBCRAFT — CONCEPT LAB
 *
 * Four self-initiated product directions, and the single most dangerous file
 * on the site.
 *
 * ─── READ THIS BEFORE EDITING ────────────────────────────────────────────
 * Nothing here is client work. Nothing here shipped. Nothing here has a user,
 * a revenue figure, a launch date or a name attached to it, and no entry may
 * ever acquire one — the moment a concept carries a client, it stops being a
 * concept and becomes a claim we cannot support.
 *
 * The `ConceptProject` type is built to enforce that: there is no `client`
 * field, no `liveUrl`, no `results`, no `year`. You cannot imply a commercial
 * history here without first changing the type, which is exactly the amount
 * of friction that decision deserves.
 *
 * The section that renders these carries «مشروع تصوّري — تجريبي» on every
 * single card, above the picture, in the reader's own language. If you are
 * changing that component, that label is not decoration and it is not
 * removable.
 *
 * ─── WHY THEY EXIST ──────────────────────────────────────────────────────
 * The portfolio proves we ship: three live URLs a stranger can open. What it
 * cannot prove is *range* — all three are public-facing websites, and a
 * visitor who needs an operations system reads three websites and leaves.
 *
 * These four are the honest way to answer that: original directions, designed
 * by us, drawn by us, and labelled as what they are. An agency showing its own
 * unbuilt work under a «CONCEPT» banner is a completely normal and completely
 * truthful thing; the same work presented as a delivered project is fraud.
 *
 * ─── THE SCREENS ARE DRAWINGS ────────────────────────────────────────────
 * `screen` keys into the registry in `components/graphics/concept-screens.tsx`
 * — every one of them is CSS and SVG we wrote. There is not a single
 * screenshot, stock image or borrowed interface anywhere in this section, and
 * that is not a stylistic choice. See the head of `ui-fragments.tsx`.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const concepts: ConceptProject[] = [
  {
    id: "finora",
    index: "01",
    title: "فينورا",
    titleLatin: "FINORA",
    kicker: "FINTECH",
    discipline: "لوحة تحكم مالية",
    summary: "رصيد وحركات وكروت وتحويلات في واجهة واحدة واضحة.",
    screens: [
      { label: "الرئيسية", screen: "fin-dashboard" },
      { label: "الحركات", screen: "fin-transactions" },
      { label: "الكروت", screen: "fin-cards" },
      { label: "التحويلات", screen: "fin-transfers" },
      { label: "التحليلات", screen: "fin-analytics" },
    ],
    capabilities: [
      "رصيد وحركات",
      "تحويل بخطوة تأكيد",
      "إدارة كروت",
      "تحليل المصروفات",
    ],
    accent: "lime",
  },

  {
    id: "nexa",
    index: "02",
    title: "نيكسا",
    titleLatin: "NEXA",
    kicker: "SAAS PLATFORM",
    discipline: "منصة إدارة أعمال",
    summary: "الأرقام والطلبات والعملاء والفريق في نظام تشغيل واحد.",
    screens: [
      { label: "لوحة الأرقام", screen: "ops-analytics" },
      { label: "الطلبات", screen: "ops-orders" },
      { label: "العملاء", screen: "ops-customers" },
      { label: "التقارير", screen: "ops-reports" },
      { label: "الإشعارات", screen: "ops-notifications" },
      { label: "الفريق والصلاحيات", screen: "ops-team" },
    ],
    capabilities: [
      "أرقام اليوم في أول شاشة",
      "طلبات بحالات وفلترة",
      "ملف لكل عميل",
      "صلاحيات لكل موظّف",
    ],
    accent: "violet",
  },

  {
    id: "flowai",
    index: "03",
    title: "فلو إيه آي",
    titleLatin: "FLOWAI",
    kicker: "AI ASSISTANT",
    discipline: "مساعد أعمال ذكي",
    summary: "بيقرا بياناتك، يقترح خطوة، ويشيل الشغل المتكرّر — والقرار يفضل قرارك.",
    screens: [
      { label: "الرئيسية", screen: "ai-dashboard" },
      { label: "مساحة العمل", screen: "ai-workspace" },
      { label: "المهام", screen: "ai-tasks" },
      { label: "الملاحظات", screen: "ai-insights" },
      { label: "الأتمتة", screen: "ai-automation" },
    ],
    capabilities: [
      "مساحة محادثة للشغل",
      "مهام على بورد",
      "ملاحظات من البيانات",
      "أتمتة للخطوات المتكرّرة",
    ],
    accent: "violet",
  },

  {
    id: "atlas",
    index: "04",
    title: "أطلس",
    titleLatin: "ATLAS",
    kicker: "E-COMMERCE",
    discipline: "تجربة تسوّق على الموبايل",
    summary: "متجر كامل بمنطق الإبهام — كل حاجة مهمة في متناول إيد واحدة.",
    screens: [
      { label: "الترحيب", screen: "app-onboarding" },
      { label: "الرئيسية", screen: "app-home" },
      { label: "البحث", screen: "app-search" },
      { label: "التفاصيل", screen: "app-detail" },
      { label: "الإشعارات", screen: "app-notifications" },
      { label: "الحساب", screen: "app-profile" },
    ],
    capabilities: [
      "تدفّق ترحيب قصير",
      "بحث وفلترة",
      "صفحة منتج بزرار واحد",
      "إشعارات وحساب",
    ],
    accent: "lime",
  },
];

/**
 * The label every concept surface must carry, in both scripts.
 *
 * Exported as data rather than typed into the component so that a second
 * surface — a future `/lab` route, an OG image, a case-study page — cannot
 * quietly render one of these without it.
 */
export const conceptBadge = {
  ar: "مشروع تصوّري — مش شغل عميل",
  latin: "WEBCRAFT CONCEPT · EXPERIMENTAL",
  /**
   * The one line under the section heading.
   *
   * It used to run to three sentences saying the same thing the heading, the
   * lead and every panel badge already say. One clause is enough — and the
   * clause that matters is the one naming what these are *not*.
   */
  disclaimer: "مشاريع تصوّرية من تصميمنا. مش شغل عملاء، وولا واحد فيهم اتنفّذ.",
} as const;

export function getConcept(id: string): ConceptProject | undefined {
  return concepts.find((concept) => concept.id === id);
}
