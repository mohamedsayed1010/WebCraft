import type { Differentiator, ProcessStep } from "@/types";

/**
 * WEBCRAFT — PROCESS
 *
 * Five steps. One line each on the homepage.
 *
 * This section exists to remove fear, not to describe methodology. A business
 * owner who has been burned before — and in this market most of them have —
 * is asking one silent question: is there a path, and does it end. Five
 * numbered steps answer that before a word is read.
 *
 * `description` is the homepage line and it stays short. `deliverables` and
 * `duration` carry the specifics that make each step checkable, and they are
 * rendered on `/about`, where the reader has already opted into detail. On
 * the homepage they were a hundred words of process documentation standing
 * between the work and the ask.
 */

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "نفهم مشروعك",
    description: "مكالمة عن شغلك ومين بيشتري منك. مفيش أي سؤال تقني.",
    deliverables: ["مكالمة تعارف", "ملخّص مكتوب"],
    duration: "الأسبوع الأول",
    icon: "MessageSquare",
  },
  {
    index: "02",
    title: "نخطط ونصمّم",
    description: "خطة بسعر ثابت، وبعدها تصميم بمحتواك انت مش قالب جاهز.",
    deliverables: ["عرض سعر ثابت", "تصميم كل صفحة", "دورتين تعديلات"],
    duration: "الأسبوع ٢ — ٣",
    icon: "PenTool",
  },
  {
    index: "03",
    title: "نبني",
    description: "التصميم بيتحوّل لموقع شغّال، وبتتابعه أول بأول على لينك خاص.",
    deliverables: ["لينك متابعة", "تحديث أسبوعي"],
    duration: "الأسبوع ٣ — ٥",
    icon: "Hammer",
  },
  {
    index: "04",
    title: "نختبر ونطلق",
    description: "تجربة على موبايلات حقيقية، وربط الدومين من غير ما تخسر ترتيبك.",
    deliverables: ["تجربة على أجهزة حقيقية", "نقل آمن للروابط"],
    duration: "الأسبوع ٦",
    icon: "Rocket",
  },
  {
    index: "05",
    title: "ندعمك بعد الإطلاق",
    description: "شهر كامل بنظبّط فيه أي حاجة تظهر، وبنربطلك قياس النتايج.",
    deliverables: ["شهر متابعة", "ربط قياس النتايج"],
    duration: "بعد الإطلاق",
    icon: "LifeBuoy",
  },
];

/* ==========================================================================
   WHY WEBCRAFT
   --------------------------------------------------------------------------
   Five reasons, a Latin label and one Arabic line each.

   ─── WHAT THIS USED TO BE ─────────────────────────────────────────────────
   Each entry carried a claim, a two-sentence description explaining it, and a
   `proof` line giving the mechanism. Five of those is about 150 words of
   assertion, in cards, one screen from the ask — and a claim that needs a
   paragraph of support reads as a claim that cannot stand up.

   These can. «الموقع والكود ملكك بالكامل» is either true or it is not. The
   mechanisms are not lost: they are answered in the FAQ, two sections down,
   which is where a visitor who wants to test a claim actually goes.

   Every line is still falsifiable. «خدمة ممتازة» and «فريق محترف» are the
   default furniture of Arabic agency sites and carry no information — nothing
   here is one of those.
   ========================================================================== */

export const differentiators: Differentiator[] = [
  {
    kicker: "CUSTOM BUILD",
    title: "مصمم ومبني حسب مشروعك.",
    icon: "PenTool",
    description:
      "مفيش قوالب جاهزة. كل صفحة بتتصمّم لشغلك انت وللناس اللي بتشتري منك.",
  },
  {
    kicker: "FULL OWNERSHIP",
    title: "الموقع والكود ملكك بالكامل.",
    icon: "KeyRound",
    description:
      "الدومين والاستضافة والكود كلهم باسمك من أول يوم، وبنسلّم بيانات الدخول مكتوبة يوم الإطلاق.",
  },
  {
    kicker: "CLEAR PRICING",
    title: "السعر والخطوات واضحين من البداية.",
    icon: "ReceiptText",
    description:
      "عرض مكتوب بكل بند بتوافق عليه قبل أي بداية. مفيش «ده خارج الاتفاق» في النص.",
  },
  {
    kicker: "POST-LAUNCH SUPPORT",
    title: "متابعة بعد الإطلاق.",
    icon: "LifeBuoy",
    description:
      "شهر كامل بعد النزول بنظبّط فيه أي حاجة تظهر — داخل في سعر كل مشروع.",
  },
  {
    kicker: "SEO READY",
    title: "بنية تقنية جاهزة لمحركات البحث.",
    icon: "TrendingUp",
    description:
      "سرعة، وترميز سليم، وروابط متنقّلة صح — عشان الموقع يبان في جوجل من يوم واحد.",
  },
];
