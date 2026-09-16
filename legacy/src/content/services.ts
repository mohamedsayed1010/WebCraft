import type { Service, ServiceGroup, ServiceSlug } from "@/types";

/**
 * WEBCRAFT — SERVICES
 *
 * The ten offerings, each a route at `/services/[slug]`.
 *
 * ─── VOICE ───────────────────────────────────────────────────────────────
 * Written in Egyptian Arabic as an Egyptian would actually say it — «بنعمل»
 * not «نقوم بعمل», «عشان» not «من أجل», «اللي» not «التي». Modern Standard
 * Arabic would be grammatically safer and commercially deadly here: it reads
 * as a government circular or, worse, as a machine translation of an English
 * template, which is exactly the impression this site exists to avoid.
 *
 * The reader is a business owner, not a developer. Every `promise` is an
 * outcome they can picture — الزباين بتكلّمك, الأوردرات بتزيد, بتظهر في جوجل.
 * No framework names, no «تصميم متجاوب», no «حلول رقمية متكاملة». Technology
 * appears only in the optional `technologies` field on portfolio projects,
 * where a technical buyer might actually look for it.
 *
 * Note the deliberate absence of «احترافية» and «عالية الجودة». They are the
 * two most-used words on Arabic agency sites and they carry no information;
 * a specific, checkable claim does the work instead.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * These entries are launch-ready except for `startingPrice` and `timeline`,
 * which must be confirmed against real commercial terms before they go live.
 * They are quotable back at you on a sales call.
 */

export const services: Service[] = [
  {
    slug: "website-design",
    title: "تصميم مواقع",
    headline: "موقع الناس تثق فيه من أول ثلاث ثواني",
    group: "design",
    icon: "PenTool",
    promise: "شكل يخلّي شغلك يبان محترف قبل ما حد يقرا كلمة.",
    description:
      "الزائر بيقرر يثق فيك أو لأ قبل ما يقرا سطر واحد. إحنا بنصمّم اللحظة دي بقصد — ترتيب واضح، خطوط واثقة، وطريق مرسوم يوصّل الزائر للحاجة اللي انت عايزه يعملها. مش شكل حلو وخلاص، شكل شغّال.",
    deliverables: [
      "تصميم كامل لكل صفحة، على الموبايل وعلى اللابتوب",
      "نظام ألوان وخطوط ومسافات يقدر البراند يكبر جواه",
      "نموذج تقدر تضغط عليه وتجرّبه قبل ما نبدأ ننفّذ",
      "دورتين تعديلات، محسوبين في السعر من الأول",
    ],
    problemsSolved: [
      "موقعك شكله قديم جنب اللي بيشتغلوا في نفس المجال",
      "ناس بتدخل الموقع وتخرج من غير ما تكلّمك",
      "الموقع مااتصممش، هو بس اتظبط على بعضه مع الوقت",
      "بتتكسف تبعت لينك موقعك لعميل كبير",
    ],
    bestFor: ["شركات قايمة بالفعل", "عيادات", "مطاعم", "مكاتب ومهن حرة"],
    timeline: "٢ — ٣ أسابيع", // CONFIRM
    startingPrice: "", // CONFIRM before enabling `features.pricingHints`
    related: ["website-development", "website-redesign", "landing-pages"],
    proofProjects: [],
    seo: {
      title: "تصميم مواقع إلكترونية في مصر",
      description:
        "تصميم مواقع للشركات والمحلات في مصر — شكل يبني ثقة من أول ثانية، وترتيب صفحات بيحوّل الزائر لعميل بيكلّمك. تصميم كامل للموبايل واللابتوب.",
      keywords: [
        "تصميم مواقع",
        "تصميم مواقع في مصر",
        "تصميم موقع الكتروني",
        "شركة تصميم مواقع",
      ],
    },
  },

  {
    slug: "website-development",
    title: "برمجة وتنفيذ",
    headline: "موقع بيفتح على طول، ومابيقعش",
    group: "build",
    icon: "Code2",
    promise: "موقع سريع، مستقر، وسهل تظبّطه من غير ما تحتاج حد.",
    description:
      "أسرع طريقة تخسر بيها زبون إن الموقع ياخد وقت يفتح. بنبني الموقع بحيث يفتح في أقل من تانيتين، يشتغل صح على أي موبايل، ويفضل ماشي من غير مشاكل. وبتاخد لوحة تحكّم بسيطة تغيّر منها الكلام والصور بنفسك.",
    deliverables: [
      "الموقع كامل شغّال وسريع على كل الأجهزة",
      "لوحة تحكّم تعدّل منها المحتوى من غير مبرمج",
      "ربط النماذج بالإيميل والواتساب",
      "شهادة أمان SSL وربط الدومين والاستضافة",
      "شهر متابعة بعد النزول",
    ],
    problemsSolved: [
      "الموقع بطيء والناس بتقفله قبل ما يفتح",
      "بيبوظ على الموبايل ومش متظبط",
      "بتدفع لحد كل مرة عايز تغيّر كلمة",
      "الموقع بيقع ومحدش عارف السبب",
    ],
    bestFor: ["شركات بتكبر", "متاجر", "مشاريع محتاجة سرعة", "أي موقع فيه حجز أو طلبات"],
    timeline: "٣ — ٥ أسابيع", // CONFIRM
    startingPrice: "",
    related: ["website-design", "ecommerce-websites", "website-maintenance"],
    proofProjects: [],
    seo: {
      title: "برمجة وتنفيذ مواقع إلكترونية",
      description:
        "تنفيذ مواقع سريعة ومستقرة بتفتح في أقل من تانيتين، شغالة صح على كل الموبايلات، مع لوحة تحكم تعدّل منها المحتوى بنفسك.",
      keywords: ["برمجة مواقع", "تنفيذ مواقع", "تطوير مواقع", "شركة برمجة مواقع"],
    },
  },

  {
    slug: "website-redesign",
    title: "تطوير موقع قديم",
    headline: "موقعك موجود، بس مش بيجيب شغل",
    group: "design",
    icon: "RefreshCw",
    promise: "نصلّح اللي بيخسّرك زباين، من غير ما تبدأ من الصفر.",
    description:
      "مش كل موقع محتاج يتعمل من أول وجديد. بنبص الأول على اللي موجود، نحدّد بالظبط إيه اللي بيوقّف الناس عن إنها تكلّمك، ونعيد بناء الأجزاء دي. اللي شغّال بيفضل زي ما هو، واللي بيخسّرك بيتغيّر.",
    deliverables: [
      "تقرير بالمشاكل اللي بتقلّل الاستفسارات، مرتبة بالأهم",
      "تصميم جديد للصفحات اللي بتفرق فعلاً",
      "نقل كل المحتوى القديم من غير ما تضيع ترتيبك في جوجل",
      "مقارنة قبل وبعد بالأرقام",
    ],
    problemsSolved: [
      "الموقع بيجيب زيارات بس مافيش استفسارات",
      "شكله بقى قديم بالنسبة لسنة ٢٠٢٦",
      "مش متظبط على الموبايل وأغلب زوارك من الموبايل",
      "خايف تغيّره وتخسر ترتيبك في جوجل",
    ],
    bestFor: ["مواقع بقالها أكتر من ٣ سنين", "شركات غيّرت هويتها", "مواقع زياراتها كويسة ومبيعاتها ضعيفة"],
    timeline: "٢ — ٤ أسابيع", // CONFIRM
    startingPrice: "",
    related: ["website-audit", "website-design", "seo-optimization"],
    proofProjects: [],
    seo: {
      title: "تطوير وإعادة تصميم المواقع القديمة",
      description:
        "موقعك بيجيب زيارات ومش بيجيب استفسارات؟ بنحدّد بالظبط إيه اللي بيوقّف الزباين وبنعيد بناءه — من غير ما تخسر ترتيبك في جوجل.",
      keywords: ["تطوير موقع", "اعادة تصميم موقع", "تحديث موقع الكتروني"],
    },
  },

  {
    slug: "website-audit",
    title: "فحص وتحليل الموقع",
    headline: "اعرف بالظبط إيه اللي بيخسّرك زباين",
    group: "grow",
    icon: "SearchCheck",
    promise: "تقرير واضح باللي مكسور، مرتّب بالأهم — من غير أي التزام.",
    description:
      "قبل ما تصرف مليم على تطوير، اعرف الأول انت واقف فين. بنفحص السرعة، والترتيب، والظهور في جوجل، والطريق اللي الزائر بيمشي فيه، ونطلعلك تقرير بلغة تفهمها، فيه اللي محتاج يتصلّح دلوقتي واللي يستنى.",
    deliverables: [
      "تقرير مكتوب بكل مشكلة وتأثيرها على البيزنس",
      "قايمة أولويات: إيه دلوقتي وإيه بعدين",
      "قياس السرعة على الموبايل والديسكتوب",
      "مكالمة نمشي فيها على التقرير مع بعض",
    ],
    problemsSolved: [
      "مش عارف موقعك كويس ولا وحش",
      "حد قالك إن الموقع فيه مشاكل ومش فاهم إيه هي",
      "بتدفع إعلانات والناس بتدخل وتخرج",
      "عايز رأي محايد قبل ما تصرف",
    ],
    bestFor: ["أي موقع شغال", "قبل قرار تطوير", "قبل ما تزوّد ميزانية الإعلانات"],
    timeline: "٣ — ٥ أيام", // CONFIRM
    startingPrice: "",
    related: ["website-redesign", "seo-optimization", "website-maintenance"],
    proofProjects: [],
    seo: {
      title: "فحص وتحليل المواقع الإلكترونية",
      description:
        "تقرير واضح بكل اللي بيخسّرك زباين في موقعك — السرعة، الترتيب، الظهور في جوجل — مرتّب بالأولوية وبلغة تفهمها.",
      keywords: ["تحليل موقع", "فحص موقع الكتروني", "تقرير اداء موقع"],
    },
  },

  {
    slug: "seo-optimization",
    title: "الظهور في جوجل",
    headline: "خلّي اللي بيدوّر على خدمتك يلاقيك انت",
    group: "grow",
    icon: "TrendingUp",
    promise: "زباين بتوصلك من جوجل من غير ما تدفع في كل ضغطة.",
    description:
      "فيه ناس بتدوّر على اللي بتقدّمه دلوقتي. السؤال هو بيلاقوا مين. بنظبّط الموقع عشان جوجل يفهمه ويثق فيه — الكلمات اللي الناس بتكتبها فعلاً، سرعة الصفحات، وخريطة الموقع — عشان تيجي أعلى وتفضل عالي.",
    deliverables: [
      "بحث عن الكلمات اللي زباينك بيكتبوها بالمصري",
      "ظبط كل صفحة: العنوان، الوصف، والترتيب الداخلي",
      "تحسين السرعة والأداء التقني",
      "ملف Google Business لو شغلك محلي",
      "تقرير شهري بالترتيب والزيارات",
    ],
    problemsSolved: [
      "منافسينك فوقك في نتايج البحث",
      "كل زبون جديد بيجيلك من إعلان مدفوع",
      "الموقع مش ظاهر خالص لما تدوّر باسم خدمتك",
      "الناس مش بتلاقيك في بحث المنطقة",
    ],
    bestFor: ["شغل محلي", "عيادات ومراكز", "متاجر", "أي حد بيدفع كتير في الإعلانات"],
    timeline: "متابعة شهرية", // CONFIRM
    startingPrice: "",
    related: ["website-audit", "website-development", "business-websites"],
    proofProjects: [],
    seo: {
      title: "تحسين ظهور المواقع في جوجل SEO",
      description:
        "خلّي اللي بيدوّر على خدمتك في مصر يلاقيك انت مش منافسك. ظبط الكلمات المفتاحية والسرعة والملف المحلي، مع تقرير شهري بالنتايج.",
      keywords: ["سيو", "تحسين محركات البحث", "ظهور في جوجل", "SEO مصر"],
    },
  },

  {
    slug: "landing-pages",
    title: "صفحات هبوط",
    headline: "صفحة واحدة، هدف واحد: إن حد يكلّمك",
    group: "grow",
    icon: "Target",
    promise: "تحوّل فلوس الإعلانات لاستفسارات فعلية.",
    description:
      "لو بتصرف على إعلانات وبتوّدي الناس على الصفحة الرئيسية، انت بتحرق ميزانيتك. الصفحة دي هدفها حاجة واحدة بس — إن اللي داخل يعمل خطوة. كلام مركّز، إثبات، ونموذج قصير في المكان الصح.",
    deliverables: [
      "تصميم وتنفيذ الصفحة كاملة",
      "صياغة الكلام بالمصري بحيث يبيع",
      "نموذج قصير مربوط بالواتساب والإيميل",
      "نسختين للتجربة ومعرفة الأحسن",
      "ربط بقياس النتايج",
    ],
    problemsSolved: [
      "بتدفع إعلانات والنتيجة ضعيفة",
      "الناس بتدخل من الإعلان وتتوه في الموقع",
      "مش عارف الإعلان بيجيب كام استفسار فعلاً",
      "محتاج تنزل عرض بسرعة",
    ],
    bestFor: ["حملات إعلانية", "عروض موسمية", "إطلاق منتج", "خدمة واحدة محددة"],
    timeline: "٥ — ٨ أيام", // CONFIRM
    startingPrice: "",
    related: ["seo-optimization", "website-design", "website-development"],
    proofProjects: [],
    seo: {
      title: "تصميم صفحات هبوط للحملات الإعلانية",
      description:
        "صفحة هبوط مصمّمة لهدف واحد — إن اللي داخل من الإعلان يكلّمك. كلام مركّز بالمصري، نموذج قصير، وقياس فعلي للنتايج.",
      keywords: ["صفحة هبوط", "landing page", "صفحات هبوط للاعلانات"],
    },
  },

  {
    slug: "business-websites",
    title: "مواقع الشركات الصغيرة",
    headline: "الموقع الأساسي، معمول صح من أول مرة",
    group: "build",
    icon: "Building2",
    promise: "وجود محترم على النت يخلّي الناس تاخدك بجدية.",
    description:
      "أغلب الشركات مش محتاجة موقع ضخم. محتاجة خمس أو ست صفحات شغّالين صح: مين انت، بتعمل إيه، ليه انت، والناس بتقول إيه، وإزاي يوصلولك. بنعمل ده بترتيب وبسرعة وبشكل يليق باسمك.",
    deliverables: [
      "من ٥ لـ ٨ صفحات مصمّمة ومنفّذة",
      "صفحة تواصل مربوطة بالواتساب",
      "ظهور صح في نتايج بحث منطقتك",
      "لوحة تحكّم بسيطة",
      "ربط الدومين والاستضافة",
    ],
    problemsSolved: [
      "معندكش موقع أصلاً وبتشتغل بالفيسبوك بس",
      "الناس بتسأل «فين موقعكم؟» وانت مالكش رد",
      "شكلك أصغر من حجم شغلك الحقيقي",
      "محتاج حاجة محترمة من غير تعقيد",
    ],
    bestFor: ["شركات ناشئة", "مكاتب", "ورش ومصانع صغيرة", "مقدّمي خدمات"],
    timeline: "٣ — ٤ أسابيع", // CONFIRM
    startingPrice: "",
    related: ["website-design", "seo-optimization", "website-maintenance"],
    proofProjects: [],
    seo: {
      title: "مواقع الشركات الصغيرة والمتوسطة",
      description:
        "موقع شركة من ٥ لـ ٨ صفحات، معمول صح: مين انت، بتعمل إيه، وإزاي الناس توصلك. مربوط بالواتساب وظاهر في بحث منطقتك.",
      keywords: ["موقع شركة", "تصميم موقع شركة", "موقع للشركات الصغيرة"],
    },
  },

  {
    slug: "corporate-websites",
    title: "مواقع الشركات الكبيرة",
    headline: "موقع يشتغل مع فريق، مش مع شخص",
    group: "build",
    icon: "Landmark",
    promise: "منصّة تكبر مع الشركة وتفضل متسقة.",
    description:
      "لما يبقى فيه أكتر من قسم بيحطّ محتوى، الموقع محتاج يتبني بشكل مختلف. بنعمل نظام صفحات وصلاحيات واضح، بحيث كل قسم يحدّث اللي يخصّه من غير ما يبوّظ شكل الموقع أو يكسر حاجة عند غيره.",
    deliverables: [
      "بناء هيكل صفحات لعدد كبير من الأقسام",
      "صلاحيات مختلفة لكل فريق",
      "مكتبة عناصر ثابتة تحافظ على الشكل",
      "صفحات وظايف وأخبار وعلاقات المستثمرين",
      "تدريب للفريق على الإدارة",
    ],
    problemsSolved: [
      "كل قسم عامل صفحاته بشكل مختلف",
      "أي تعديل بسيط بياخد أسابيع",
      "الموقع مش قادر يستحمل المحتوى اللي بيزيد",
      "مفيش تحكّم في مين يعدّل إيه",
    ],
    bestFor: ["شركات كبيرة", "مجموعات", "جهات ليها فروع", "مؤسسات تعليمية"],
    timeline: "٦ — ١٠ أسابيع", // CONFIRM
    startingPrice: "",
    related: ["website-development", "website-maintenance", "website-audit"],
    proofProjects: [],
    seo: {
      title: "مواقع الشركات الكبيرة والمؤسسات",
      description:
        "منصّة بتستحمل أكتر من قسم بيحطّ محتوى: صلاحيات واضحة، مكتبة عناصر ثابتة، وشكل متسق مهما كبر الموقع.",
      keywords: ["موقع مؤسسي", "مواقع الشركات الكبرى", "بوابة الكترونية"],
    },
  },

  {
    slug: "ecommerce-websites",
    title: "متاجر إلكترونية",
    headline: "متجر معمول عشان يبيع، مش عشان يعرض",
    group: "build",
    icon: "ShoppingBag",
    promise: "أوردرات بتخلص، مش عربات بتتساب في نصّها.",
    description:
      "الفرق بين متجر بيبيع ومتجر بيتفرّجوا عليه هو تفاصيل صغيرة: البحث بيلاقي، الصور بتوضّح، وخطوة الدفع قصيرة ومطمّنة. بنبني المتجر حوالين الخطوات دي، ونربطه بوسائل الدفع والشحن اللي بتشتغل في مصر.",
    deliverables: [
      "متجر كامل بصفحات منتجات وتصنيفات",
      "ربط بوسائل الدفع المحلية والدفع عند الاستلام",
      "ربط بشركات الشحن وحساب المصاريف",
      "لوحة تحكّم للمخزون والأوردرات",
      "استرجاع العربات المتروكة",
    ],
    problemsSolved: [
      "الناس بتحطّ في العربة وماتكمّلش",
      "بتاخد الأوردرات بالرسايل وبتتلخبط",
      "صعب تلاقي منتج جوّه المتجر",
      "الدفع معقّد والزبون بيسيبه",
    ],
    bestFor: ["محلات ليها فرع", "براندات ملابس", "منتجات محلية", "بيع بالجملة"],
    timeline: "٤ — ٨ أسابيع", // CONFIRM
    startingPrice: "",
    related: ["website-development", "seo-optimization", "website-maintenance"],
    proofProjects: [],
    seo: {
      title: "تصميم متاجر إلكترونية في مصر",
      description:
        "متجر إلكتروني معمول عشان يبيع: بحث بيلاقي، دفع قصير ومطمّن، ربط بالدفع عند الاستلام وشركات الشحن، ولوحة تحكم للأوردرات.",
      keywords: ["متجر الكتروني", "تصميم متجر الكتروني", "انشاء متجر اونلاين مصر"],
    },
  },

  {
    slug: "website-maintenance",
    title: "متابعة وصيانة",
    headline: "الموقع شغّال وآمن، وانت مش بتفكّر فيه",
    group: "grow",
    icon: "ShieldCheck",
    promise: "حد مسؤول لما تحتاج، من غير ما تدوّر.",
    description:
      "الموقع مش حاجة بتخلص وتُنسى. التحديثات بتيجي، والثغرات بتظهر، والمحتوى بيحتاج يتغيّر. بنمسك ده كله بمتابعة شهرية — نسخ احتياطي، تحديثات أمان، مراقبة، وتعديلات صغيرة من غير ما تتفاوض على كل واحدة.",
    deliverables: [
      "نسخة احتياطية كل أسبوع ومحفوظة برّه",
      "تحديثات الأمان أول بأول",
      "مراقبة على مدار اليوم وتنبيه لو الموقع وقع",
      "ساعات تعديلات شهرية محسوبة",
      "تقرير شهري بالسرعة والزيارات",
    ],
    problemsSolved: [
      "الموقع وقع ومحدش رد عليك",
      "بتستنى أيام عشان تغيّر رقم تليفون",
      "خايف من الاختراق أو ضياع البيانات",
      "اللي عمل الموقع اختفى",
    ],
    bestFor: ["أي موقع شغال", "متاجر", "مواقع فيها حجز", "شركات مالهاش فريق تقني"],
    timeline: "اشتراك شهري", // CONFIRM
    startingPrice: "",
    related: ["website-audit", "website-development", "seo-optimization"],
    proofProjects: [],
    seo: {
      title: "صيانة ومتابعة المواقع الإلكترونية",
      description:
        "متابعة شهرية للموقع: نسخ احتياطي، تحديثات أمان، مراقبة على مدار اليوم، وساعات تعديلات محسوبة — حد مسؤول لما تحتاج.",
      keywords: ["صيانة مواقع", "متابعة موقع الكتروني", "دعم فني للمواقع"],
    },
  },
];

/* ==========================================================================
   GROUPING
   --------------------------------------------------------------------------
   Ten cards in one flat grid is a price list, and a price list invites the
   visitor to comparison-shop line items. Three named groups turn the same ten
   into a narrative — نصمّم / نبني / نكبّر — which is the tagline, and which
   frames the work as a sequence a business moves through rather than a menu.
   ========================================================================== */

export const serviceGroups: {
  id: ServiceGroup;
  /** The tagline word this group belongs to. */
  title: string;
  /** Latin kicker for the pixel label. Silkscreen has no Arabic glyphs. */
  kicker: string;
  index: string;
  description: string;
}[] = [
  {
    id: "design",
    title: "نصمّم",
    kicker: "DESIGN",
    index: "01",
    description: "الشكل اللي بيخلّي حد غريب يثق فيك قبل ما يكلّمك.",
  },
  {
    id: "build",
    title: "نبني",
    kicker: "BUILD",
    index: "02",
    description: "التنفيذ اللي بيخلّي الموقع سريع ومستقر ومايوقّفكش.",
  },
  {
    id: "grow",
    title: "نكبّر",
    kicker: "GROW",
    index: "03",
    description: "الشغل اللي بيحصل بعد ما الموقع ينزل، وبيجيب النتيجة.",
  },
];

/** Services belonging to one group, in declaration order. */
export function servicesByGroup(group: ServiceGroup): Service[] {
  return services.filter((service) => service.group === group);
}

/** Single service lookup for `/services/[slug]`. */
export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

/** Every slug — feeds `generateStaticParams` and the sitemap. */
export const serviceSlugs: ServiceSlug[] = services.map((s) => s.slug);
