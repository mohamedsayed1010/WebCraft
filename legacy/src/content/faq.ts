import type { FaqCategory, FaqItem } from "@/types";

/**
 * WEBCRAFT — FAQ
 *
 * These are objections, not questions.
 *
 * The section sits immediately before the contact block because its job is to
 * clear the last obstacles between reading and messaging. Every entry answers
 * something that genuinely stalls a deal in this market — price, ownership,
 * «هستنى كتير؟», «لو مش عاجبني؟», and the big unspoken one: «إيه اللي يضمنلي
 * إنك متختفيش؟».
 *
 * Vague answers here do more damage than omitting the question. A visitor who
 * reads a hedge learns that the hedge is the answer.
 *
 * Rendered into FAQPage structured data, so every answer must also be visible
 * on the page — see the integrity note in `src/lib/seo/schema.ts`.
 *
 * ⚠️  The pricing, ownership and guarantee answers are quotable back at you.
 *     They must match your real commercial terms exactly before launch.
 */

export const faqs: FaqItem[] = [
  {
    id: "cost",
    featured: true,
    category: "pricing",
    question: "الموقع بيتكلّف كام؟",
    answer:
      "بيعتمد على عدد الصفحات والموقع هيعمل إيه. المهم إنك بتاخد عرض سعر مكتوب وثابت قبل ما أي شغل يبدأ — مابنبدأش وبعدين نبعت فاتورة.",
  },
  {
    id: "payment",
    category: "pricing",
    question: "الدفع بيتم إزاي؟",
    answer:
      "على دفعات مع مراحل الشغل — مقدّم في الأول والباقي عند الإطلاق. المشاريع الكبيرة بتتقسّم على مراحل أكتر، بحيث انت في أي لحظة مادفعتش على شغل لسه ماشوفتوش.",
  },
  {
    id: "timeline",
    featured: true,
    category: "timeline",
    question: "هياخد وقت قد إيه؟",
    answer:
      "أغلب مواقع الشركات من ٤ لـ ٦ أسابيع من أول مكالمة لحد الإطلاق. المتاجر والمواقع الكبيرة بتاخد أكتر. بتاخد جدول بتواريخ محددة قبل ما نبدأ.",
  },
  {
    id: "involvement",
    category: "process",
    question: "هياخد من وقتي قد إيه؟",
    answer:
      "من ٣ لـ ٤ ساعات إجمالاً: مكالمة في الأول، مراجعة للتصميم، وموافقة أخيرة قبل النزول. كل اللي بينهم علينا إحنا، ومابنجيلكش غير لما يكون فيه قرار محتاجك انت فعلاً.",
  },
  {
    id: "content",
    featured: true,
    category: "process",
    question: "بتساعدوا في المحتوى والـSEO؟",
    answer:
      "أيوه، والاتنين داخلين في السعر. بنكتب الكلام معاك — بنسمع منك ونصيغ وانت بتوافق — والموقع بينزل ببنية تقنية سليمة وسرعة تخلّيه يبان في جوجل من يوم واحد.",
  },
  {
    id: "revisions",
    category: "process",
    question: "لو التصميم مش عاجبني؟",
    answer:
      "دورتين تعديلات كاملين داخلين في السعر. وعشان نوصل لده أصلاً بنعرض عليك التصميم على مراحل، مش نختفي شهر ونرجع بحاجة نهائية. لو الاتجاه غلط بنعرف من بدري، مش في الآخر.",
  },
  {
    id: "ownership",
    featured: true,
    category: "technical",
    question: "الموقع هيبقى ملك مين؟",
    answer:
      "ملكك انت، بالكامل. الدومين والاستضافة باسمك من أول يوم، والكود بتاعك، وبنسلّمك بيانات الدخول مكتوبة يوم الإطلاق. لو مشيت بكرة بتاخد كل حاجة معاك.",
  },
  {
    id: "edit",
    category: "technical",
    question: "أقدر أعدّل في الموقع بنفسي؟",
    answer:
      "أيوه. بتاخد لوحة تحكّم بسيطة تغيّر منها الكلام والصور والأسعار من غير أي خبرة تقنية، وبنعمل معاك جلسة شرح مسجّلة ترجعلها وقت ما تحب.",
  },
  {
    id: "seo-loss",
    category: "technical",
    question: "لو غيّرت الموقع هخسر ترتيبي في جوجل؟",
    answer:
      "لأ، لو النقل اتعمل صح. بنحوّل كل رابط قديم لمكانه الجديد، ونحافظ على المحتوى اللي بيجيبلك زيارات، ونراقب الترتيب بعد الإطلاق. أغلب المواقع بترتيبها بيتحسّن بعد النقل لأن السرعة بتزيد.",
  },
  {
    id: "after-launch",
    featured: true,
    category: "support",
    question: "وبعد ما الموقع ينزل، بتختفوا؟",
    answer:
      "شهر كامل متابعة داخل في السعر، بنظبّط فيه أي حاجة تظهر. وبعد كده فيه اشتراك صيانة شهري لو حبيت — مش إجباري، الموقع ملكك وشغّال من غيره.",
  },
  {
    id: "no-results",
    category: "support",
    question: "وإيه اللي يضمنلي إن الموقع هيجيب نتيجة؟",
    answer:
      "مفيش حد يقدر يضمنلك رقم مبيعات، واللي بيقولك غير كده بيبيعلك كلام. اللي بنضمنه إن الموقع هيفتح بسرعة، ويشتغل صح على كل موبايل، ويكون واضح للزائر يعمل إيه — ودي الحاجات اللي بتتقاس. بنربطلك قياس النتايج من يوم الإطلاق عشان تشوف الأرقام بنفسك مش تصدّقنا.",
  },
  {
    id: "remote",
    category: "process",
    question: "إحنا مش في نفس المحافظة. هينفع؟",
    answer:
      "ينفع طبعاً، وأغلب شغلنا بيتم كده. المكالمات بتبقى أونلاين والمتابعة على الواتساب، وبتشوف الشغل أول بأول على لينك خاص. مكان مكتبك مش هيفرق في حاجة.",
  },
];

/**
 * The five that run on the homepage: price → timeline → content & SEO →
 * ownership → after launch. That is the real sequence of objections in this
 * market, and it ends on the two a burned client cares about most.
 *
 * It was six. «الدفع بيتم إزاي؟» came out — a visitor who has not yet decided
 * to talk to us is not costing a deal over the payment schedule, and it is
 * answered in full at `/faq` and on the first call. Five accordions read as a
 * short list of real objections; six started reading as a document.
 */
export const homepageFaqs: FaqItem[] = faqs.filter((faq) => faq.featured);

/* ==========================================================================
   CATEGORIES
   ========================================================================== */

export const faqCategories: { id: FaqCategory; label: string; kicker: string }[] =
  [
    { id: "pricing", label: "الفلوس", kicker: "PRICING" },
    { id: "timeline", label: "الوقت", kicker: "TIMELINE" },
    { id: "process", label: "طريقة الشغل", kicker: "PROCESS" },
    { id: "technical", label: "الملكية والتحكّم", kicker: "OWNERSHIP" },
    { id: "support", label: "بعد الإطلاق", kicker: "SUPPORT" },
  ];

/** FAQs in one category, in declaration order. */
export function faqsByCategory(category: FaqCategory): FaqItem[] {
  return faqs.filter((faq) => faq.category === category);
}
