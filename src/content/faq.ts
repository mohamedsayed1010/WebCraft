import type { Localized } from "@/types";

/**
 * WEBCRAFT — FAQ
 *
 * Deliberately free of commitments nobody has confirmed: no fixed timelines,
 * revision counts, prices or free-support periods. When the business confirms
 * its commercial terms, add them here — the page and its FAQPage structured
 * data both read from this array.
 */
export const faqs: { id: string; q: Localized<string>; a: Localized<string> }[] = [
  {
    id: "services",
    q: { ar: "بتعملوا إيه بالظبط؟", en: "What exactly do you build?" },
    a: {
      ar: "بنبني منتجات رقمية كاملة: مواقع شركات، متاجر إلكترونية، تطبيقات ويب ومنصات، تطبيقات ويب تقدّمية (PWA)، وتطبيقات Android — ومعاها تصميم UI/UX، وتطوير Frontend وBackend، وSEO.",
      en: "Complete digital products: company websites, online stores, web applications and platforms, Progressive Web Apps and Android apps — including UI/UX design, frontend and backend development, and SEO.",
    },
  },
  {
    id: "cost",
    q: { ar: "المشروع بيتكلّف كام؟", en: "How much does a project cost?" },
    a: {
      ar: "التكلفة بتعتمد على حجم المشروع ووظائفه. بعد ما نفهم احتياجك بنحدّد النطاق بوضوح، وتعرف التفاصيل قبل ما الشغل يبدأ.",
      en: "Cost depends on the scope and functionality. Once we understand what you need, we define the scope clearly so you know the details before work begins.",
    },
  },
  {
    id: "timeline",
    q: { ar: "المشروع بياخد وقت قد إيه؟", en: "How long does a project take?" },
    a: {
      ar: "بيختلف حسب النوع: موقع تعريفي غير منصة أو متجر بلوحة تحكم. بنتفق على جدول زمني واضح في مرحلة الفهم والتخطيط.",
      en: "It varies by type — a company website differs from a platform or a store with an admin dashboard. We agree on a clear timeline during discovery and planning.",
    },
  },
  {
    id: "seo",
    q: { ar: "الموقع هيبقى جاهز لجوجل؟", en: "Will the site be ready for Google?" },
    a: {
      ar: "أيوه. الـSEO جزء من التطوير عندنا: HTML دلالي، Metadata، بيانات منظّمة، Sitemap، وسرعة محسوبة من البداية.",
      en: "Yes. SEO is part of development: semantic HTML, metadata, structured data, a sitemap and performance considered from the start.",
    },
  },
  {
    id: "pwa-android",
    q: { ar: "إيه الفرق بين الـPWA وتطبيق Android؟", en: "What's the difference between a PWA and an Android app?" },
    a: {
      ar: "الـPWA موقع بيتثبّت على الموبايل ويشتغل كأنه تطبيق من غير متجر. تطبيق Android بيتنزل كتطبيق مستقل. غالباً بنبدأ بمنتج ويب قوي، وبعدين نطلقه كتطبيق على نفس الـBackend.",
      en: "A PWA is a website that installs to the phone and behaves like an app without an app store. An Android app is a standalone application. We often start with a strong web product, then launch it as an app on the same backend.",
    },
  },
  {
    id: "results",
    q: { ar: "بتضمنوا نتيجة معيّنة؟", en: "Do you guarantee specific results?" },
    a: {
      ar: "مفيش حد يقدر يضمن رقم مبيعات بصدق. اللي بنركّز عليه هو الحاجات اللي بتتقاس: موقع سريع، متجاوب، واضح للمستخدم، ومبني صح تقنياً.",
      en: "No one can honestly guarantee a sales figure. We focus on what can be measured: a fast, responsive, clear product that's technically built right.",
    },
  },
  {
    id: "remote",
    q: { ar: "ينفع نشتغل مع بعض أونلاين؟", en: "Can we work together remotely?" },
    a: {
      ar: "طبعاً. المتابعة بتتم أونلاين وعلى واتساب، وبتشوف الشغل أول بأول.",
      en: "Of course. Collaboration happens online and over WhatsApp, and you see progress as it happens.",
    },
  },
];
