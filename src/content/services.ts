import type { Service, ServiceSlug } from "@/types";

/**
 * WEBCRAFT — SERVICES
 *
 * Eight services, each answering four questions in both languages: what we do,
 * why it matters, what we build, and how it helps. `stack` lists only
 * technologies found in WebCraft's own deployed work; `proof` points at the
 * real projects that demonstrate the service.
 */

export const services: Service[] = [
  {
    slug: "frontend-development",
    index: "01",
    visual: "frontend",
    accent: "brand",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"],
    proof: ["bay3", "dahab-el-araby", "verra"],
    text: {
      ar: {
        name: "تطوير الواجهات",
        tagline: "واجهات سريعة، بتتكلّم عربي وإنجليزي، وبتشتغل على كل شاشة.",
        what: "بنبني الجزء اللي عميلك بيشوفه ويلمسه: مواقع وتطبيقات ويب بـReact وNext.js، مبنية من مكوّنات قابلة لإعادة الاستخدام، وسريعة من أول ضغطة.",
        why: "الزائر بيحكم على البيزنس بتاعك من أول ثواني. واجهة بطيئة أو ملخبطة على الموبايل معناها عميل راح لغيرك قبل ما يعرف انت بتقدّم إيه.",
        builds: [
          "تطبيقات React وNext.js",
          "مواقع سريعة ومتجاوبة مع كل الشاشات",
          "واجهات تفاعلية بحركة مدروسة",
          "واجهات عربي (RTL) وإنجليزي (LTR)",
          "أنظمة مكوّنات قابلة للتوسّع",
          "واجهات سهلة الاستخدام لكل الناس (Accessibility)",
        ],
        outcomes: [
          "تجربة أسرع = زوار أكتر بيكمّلوا",
          "كود منظّم بيسهّل أي تطوير بعدين",
          "شكل احترافي بيبني ثقة من أول زيارة",
        ],
        seoTitle: "تطوير واجهات المواقع بـReact وNext.js",
        seoDescription:
          "ويب كرافت بتبني واجهات مواقع وتطبيقات ويب سريعة ومتجاوبة بـReact وNext.js وTypeScript، بدعم كامل للعربي والإنجليزي.",
      },
      en: {
        name: "Frontend Development",
        tagline: "Fast, bilingual interfaces that feel right on every screen.",
        what: "We build the part your customers see and touch — websites and web apps in React and Next.js, assembled from reusable components and engineered for speed from the first tap.",
        why: "Visitors judge a business in seconds. A slow or awkward interface on mobile means a customer has left before they've understood what you offer.",
        builds: [
          "React and Next.js applications",
          "High-performance responsive websites",
          "Interactive, motion-rich experiences",
          "Arabic (RTL) and English (LTR) interfaces",
          "Scalable component systems",
          "Accessible, keyboard-friendly UI",
        ],
        outcomes: [
          "Faster experiences keep more visitors moving forward",
          "Clean architecture makes every future change cheaper",
          "A polished interface earns trust on the first visit",
        ],
        seoTitle: "Frontend Development with React & Next.js",
        seoDescription:
          "WebCraft builds fast, responsive websites and web apps with React, Next.js and TypeScript — with first-class Arabic and English support.",
      },
    },
  },
  {
    slug: "backend-development",
    index: "02",
    visual: "backend",
    accent: "aqua",
    stack: ["REST APIs", "ASP.NET Core", "Authentication", "Role-based Access", "Admin Dashboards"],
    proof: ["shopik-lopik", "hajaty-day3a", "dahab-el-araby"],
    text: {
      ar: {
        name: "تطوير الـBackend",
        tagline: "المنطق اللي شغّال ورا الشاشة — آمن، منظّم، وجاهز يكبر.",
        what: "بنبني السيرفر والـAPIs وقواعد البيانات اللي بتشغّل المنتج: تسجيل الدخول، الصلاحيات، الطلبات، الإشعارات، ولوحات التحكم.",
        why: "الواجهة الحلوة من غير Backend قوي بتقع أول ما الشغل يزيد. الـBackend هو اللي بيحافظ على بياناتك وبيخلّي النظام يستحمل.",
        builds: [
          "REST APIs",
          "أنظمة تسجيل دخول وصلاحيات",
          "تطبيقات قايمة على قواعد بيانات",
          "لوحات تحكم وأنظمة إدارة",
          "منطق البيزنس والعمليات",
          "ربط مع خدمات خارجية",
        ],
        outcomes: [
          "بياناتك محمية ومنظّمة",
          "تقدر تدير كل حاجة من لوحة تحكم",
          "بنية تستحمل نمو المستخدمين",
        ],
        seoTitle: "تطوير Backend وREST APIs ولوحات تحكم",
        seoDescription:
          "ويب كرافت بتبني Backend وREST APIs وأنظمة تسجيل دخول وصلاحيات ولوحات تحكم لمنصات وتطبيقات ويب حقيقية.",
      },
      en: {
        name: "Backend Development",
        tagline: "The logic behind the screen — secure, structured, built to scale.",
        what: "We build the servers, APIs and data layers that power a product: authentication, permissions, orders, notifications and admin dashboards.",
        why: "A beautiful interface without a solid backend breaks the moment the business grows. The backend protects your data and keeps the system standing under load.",
        builds: [
          "REST APIs",
          "Authentication and permission systems",
          "Database-driven applications",
          "Admin panels and management systems",
          "Business logic and workflows",
          "Third-party integrations",
        ],
        outcomes: [
          "Data that stays protected and organised",
          "Everything manageable from one dashboard",
          "An architecture ready for more users",
        ],
        seoTitle: "Backend Development, REST APIs & Admin Systems",
        seoDescription:
          "WebCraft builds backends, REST APIs, authentication and admin dashboards for real web platforms and applications.",
      },
    },
  },
  {
    slug: "ui-ux-design",
    index: "03",
    visual: "uiux",
    accent: "brand",
    stack: ["User Flows", "Wireframes", "UI Design", "Design Systems", "RTL / LTR"],
    proof: ["verra", "shopik-lopik", "bay3"],
    text: {
      ar: {
        name: "تصميم UI/UX",
        tagline: "التصميم مش ألوان حلوة. التصميم قرار بيجيب نتيجة.",
        what: "بنرسم رحلة المستخدم من أول زيارة لحد الشراء أو الحجز: مسارات، Wireframes، تصميم واجهات، وأنظمة تصميم متّسقة.",
        why: "العميل اللي مش فاهم يعمل إيه بعد كده بيقفل الصفحة. التصميم الصح بيشيل الحيرة وبيوصّل الزائر للخطوة اللي انت عايزها.",
        builds: [
          "مسارات المستخدم (User Flows)",
          "Wireframes ونماذج أولية",
          "تصميم واجهات كامل",
          "تصميم متجاوب لكل الأجهزة",
          "أنظمة تصميم (Design Systems)",
          "تحسين سهولة الاستخدام",
        ],
        outcomes: [
          "المستخدم + أهداف البيزنس + سهولة الاستخدام + التحويل",
          "خطوات أقل بين الزائر والطلب",
          "هوية متّسقة في كل شاشة",
        ],
        seoTitle: "تصميم UI/UX لمواقع وتطبيقات الويب",
        seoDescription:
          "ويب كرافت بتصمّم تجربة وواجهات المستخدم: User Flows وWireframes وDesign Systems مبنية على أهداف البيزنس وسهولة الاستخدام.",
      },
      en: {
        name: "UI/UX Design",
        tagline: "Design isn't pretty screens. It's decisions that convert.",
        what: "We map the journey from first visit to purchase or booking — user flows, wireframes, interface design and consistent design systems.",
        why: "A visitor who doesn't know what to do next closes the tab. Good design removes the hesitation and guides people to the action that matters.",
        builds: [
          "User flows",
          "Wireframes and prototypes",
          "Complete UI design",
          "Responsive design for every device",
          "Design systems",
          "Usability improvements",
        ],
        outcomes: [
          "Users + business goals + usability + conversion",
          "Fewer steps between a visitor and an enquiry",
          "A consistent identity across every screen",
        ],
        seoTitle: "UI/UX Design for Websites & Web Apps",
        seoDescription:
          "WebCraft designs user experiences and interfaces — flows, wireframes and design systems grounded in business goals and usability.",
      },
    },
  },
  {
    slug: "seo",
    index: "04",
    visual: "seo",
    accent: "aqua",
    stack: ["Technical SEO", "Semantic HTML", "Structured Data", "Metadata & Open Graph", "Core Web Vitals", "Sitemaps"],
    proof: ["shopik-lopik", "alkhabar-aljadid", "verra"],
    text: {
      ar: {
        name: "تحسين الظهور في جوجل (SEO)",
        tagline: "الـSEO بيتبني مع الموقع — مش حاجة بتتضاف في الآخر.",
        what: "بنجهّز الموقع من جوّه عشان جوجل يفهمه ويقدّره: SEO تقني، محتوى منظّم، HTML دلالي، بيانات منظّمة، وسرعة.",
        why: "لو عميلك بيدوّر على خدمتك ومش لاقيك، هيلاقي منافسك. والـSEO اللي بيتعمل بعد ما الموقع يخلص غالباً بيبقى ترقيع.",
        builds: [
          "SEO تقني وبنية صديقة لمحركات البحث",
          "SEO داخلي للصفحات والعناوين",
          "HTML دلالي وترتيب عناوين صحيح",
          "Metadata وOpen Graph للمشاركة",
          "بيانات منظّمة (Structured Data)",
          "تحسين الأداء وCore Web Vitals",
        ],
        outcomes: [
          "فرصة أكبر تظهر للي بيدوّر عليك",
          "روابط شكلها احترافي على واتساب والسوشيال",
          "موقع أسرع = تجربة أحسن وترتيب أفضل",
        ],
        seoTitle: "خدمات SEO وتحسين الظهور في جوجل",
        seoDescription:
          "ويب كرافت بتبني الـSEO جوّه الموقع من أول يوم: SEO تقني، HTML دلالي، بيانات منظّمة، Metadata، وتحسين Core Web Vitals.",
      },
      en: {
        name: "SEO",
        tagline: "SEO is engineered in during development — not bolted on after.",
        what: "We prepare a site from the inside so search engines understand and trust it: technical SEO, structured content, semantic HTML, structured data and performance.",
        why: "If customers search for what you do and can't find you, they find a competitor. SEO added after launch is usually a patch on top of the wrong foundation.",
        builds: [
          "Technical SEO and search-friendly architecture",
          "On-page SEO for pages and headings",
          "Semantic HTML with a correct heading hierarchy",
          "Metadata and Open Graph for sharing",
          "Structured data",
          "Performance and Core Web Vitals optimisation",
        ],
        outcomes: [
          "A better chance of being found by people searching for you",
          "Professional link previews on WhatsApp and social",
          "A faster site — better experience, stronger signals",
        ],
        seoTitle: "SEO Services — Technical & On-Page SEO",
        seoDescription:
          "WebCraft builds SEO into every site from day one: technical SEO, semantic HTML, structured data, metadata and Core Web Vitals.",
      },
    },
  },
  {
    slug: "ecommerce-development",
    index: "05",
    visual: "ecommerce",
    accent: "brand",
    stack: ["Product Catalogues", "Cart & Checkout", "Merchant Dashboard", "Next.js", "Bilingual Stores"],
    proof: ["bay3"],
    text: {
      ar: {
        name: "المتاجر الإلكترونية",
        tagline: "متجر بيبيع وانت نايم — ولوحة تحكم تديره منها.",
        what: "بنبني متاجر إلكترونية كاملة: كتالوج منتجات، تجربة شراء، سلة، وCheckout، ولوحة تحكم للتاجر.",
        why: "بيع على السوشيال لوحده بيخلّيك تحت رحمة الرسايل. متجر منظّم بيعرض منتجاتك صح وبيخلّي الطلب يوصل من غير مجهود.",
        builds: [
          "متاجر إلكترونية كاملة",
          "كتالوج منتجات ببحث وفلترة",
          "تجربة تسوّق وصفحات منتجات بفيرنتس",
          "سلة وتجربة إتمام طلب",
          "لوحة تحكم للمنتجات والطلبات والمخزون",
          "متاجر متجاوبة مع الموبايل",
        ],
        outcomes: [
          "طلبات منظّمة بدل رسايل متفرّقة",
          "مخزون ومنتجات تحت السيطرة",
          "تجربة شراء سهلة على الموبايل",
        ],
        seoTitle: "تصميم وبرمجة متاجر إلكترونية",
        seoDescription:
          "ويب كرافت بتبني متاجر إلكترونية كاملة: كتالوج بفلترة، صفحات منتجات، سلة، Checkout، ولوحة تحكم للتاجر.",
      },
      en: {
        name: "E-Commerce Development",
        tagline: "A store that sells while you sleep — and a dashboard to run it.",
        what: "We build complete online stores: product catalogues, shopping experiences, carts, checkout flows and merchant dashboards.",
        why: "Selling through social DMs alone leaves you at the mercy of your inbox. A structured store presents products properly and lets orders arrive without friction.",
        builds: [
          "Complete online stores",
          "Product catalogues with search and filters",
          "Shopping experiences with variant product pages",
          "Cart and checkout experiences",
          "Admin for products, orders and inventory",
          "Mobile-first responsive commerce",
        ],
        outcomes: [
          "Organised orders instead of scattered messages",
          "Inventory and catalogue under control",
          "An easy buying experience on mobile",
        ],
        seoTitle: "E-Commerce Website Development",
        seoDescription:
          "WebCraft builds complete online stores: filterable catalogues, product pages, cart, checkout and a merchant dashboard.",
      },
    },
  },
  {
    slug: "web-applications",
    index: "06",
    visual: "webapps",
    accent: "aqua",
    stack: ["Dashboards", "Marketplaces", "User Accounts", "REST APIs", "Notifications"],
    proof: ["shopik-lopik", "bay3", "hajaty-day3a"],
    text: {
      ar: {
        name: "تطبيقات الويب",
        tagline: "أنظمة مفصّلة على مقاس شغلك — مش قوالب جاهزة.",
        what: "بنبني تطبيقات ويب مخصّصة: لوحات تحكم، أسواق إلكترونية، أنظمة إدارة وحجز، وأدوات داخلية لفريقك.",
        why: "لما الشغل يكبر، الإكسيل والورق والجروبات بيبقوا عبء. نظام مصمّم لطريقة شغلك بيوفّر وقت وبيقلّل الغلط.",
        builds: [
          "لوحات تحكم (Dashboards)",
          "أسواق ومنصات إعلانات",
          "أنظمة إدارة",
          "أنظمة حجز",
          "تطبيقات أعمال",
          "أدوات داخلية مخصّصة",
        ],
        outcomes: [
          "كل شغلك في مكان واحد",
          "عمليات أسرع وأخطاء أقل",
          "نظام بيكبر مع البيزنس",
        ],
        seoTitle: "برمجة تطبيقات ويب وأنظمة إدارة مخصّصة",
        seoDescription:
          "ويب كرافت بتبني تطبيقات ويب مخصّصة: لوحات تحكم، أسواق إلكترونية، أنظمة إدارة وحجز، وأدوات داخلية.",
      },
      en: {
        name: "Web Applications",
        tagline: "Systems shaped around how you work — not off-the-shelf templates.",
        what: "We build custom web applications: dashboards, marketplaces, management and booking systems, and internal tools for your team.",
        why: "As a business grows, spreadsheets, paper and group chats become a liability. A system designed around your workflow saves time and reduces mistakes.",
        builds: [
          "Dashboards",
          "Marketplaces and classifieds platforms",
          "Management systems",
          "Booking systems",
          "Business applications",
          "Custom internal tools",
        ],
        outcomes: [
          "Your operation in one place",
          "Faster processes, fewer errors",
          "A system that scales with the business",
        ],
        seoTitle: "Custom Web Application Development",
        seoDescription:
          "WebCraft builds custom web applications: dashboards, marketplaces, management and booking systems, and internal tools.",
      },
    },
  },
  {
    slug: "progressive-web-apps",
    index: "07",
    visual: "pwa",
    accent: "brand",
    stack: ["Installable", "Service Workers", "Web App Manifest", "App-like UX", "Cross-device"],
    proof: ["dahab-el-araby", "shopik-lopik"],
    text: {
      ar: {
        name: "تطبيقات الويب التقدّمية (PWA)",
        tagline: "موقع بيتثبّت على الموبايل ويشتغل كأنه تطبيق.",
        what: "بنحوّل منتجك لتطبيق ويب تقدّمي: العميل يثبّته على شاشة الموبايل بضغطة، ويفتح بملء الشاشة وبسرعة التطبيقات.",
        why: "مش كل بيزنس محتاج يبدأ بتطبيق متجر بتكلفته ووقته. الـPWA بتديك تجربة تطبيق من نفس الكود على كل الأجهزة.",
        builds: [
          "مواقع قابلة للتثبيت على الموبايل والكمبيوتر",
          "تجربة بملء الشاشة زي التطبيقات",
          "Service Workers لسرعة أعلى",
          "أيقونة وشاشة بداية باسم البراند",
          "خطوات تثبيت واضحة حتى على iPhone",
        ],
        outcomes: [
          "براندك على شاشة موبايل العميل",
          "كود واحد لكل الأجهزة",
          "خطوة طبيعية قبل تطبيق Android",
        ],
        seoTitle: "برمجة تطبيقات الويب التقدّمية PWA",
        seoDescription:
          "ويب كرافت بتبني تطبيقات ويب تقدّمية (PWA) قابلة للتثبيت على الموبايل، بتجربة تطبيق وسرعة عالية على كل الأجهزة.",
      },
      en: {
        name: "Progressive Web Apps",
        tagline: "A website that installs to the home screen and behaves like an app.",
        what: "We turn your product into a Progressive Web App: customers install it in one tap, and it opens full-screen with app-like speed.",
        why: "Not every business needs to start with the cost and timeline of a store app. A PWA delivers an app experience from one codebase across every device.",
        builds: [
          "Installable experiences for mobile and desktop",
          "Full-screen, app-like interfaces",
          "Service workers for speed",
          "Branded icons and launch screens",
          "Guided install steps, including on iPhone",
        ],
        outcomes: [
          "Your brand on the customer's home screen",
          "One codebase across devices",
          "A natural step toward an Android app",
        ],
        seoTitle: "Progressive Web App (PWA) Development",
        seoDescription:
          "WebCraft builds installable Progressive Web Apps with app-like experience and speed across every device.",
      },
    },
  },
  {
    slug: "android-apps",
    index: "08",
    visual: "android",
    accent: "aqua",
    stack: ["Android", "PWA → Android", "Responsive UI", "REST APIs"],
    proof: ["shopik-lopik", "dahab-el-araby", "bay3"],
    text: {
      ar: {
        name: "تطبيقات Android",
        tagline: "منتجك. في إيد عملائك.",
        what: "بنطلّق منتجك كتطبيق Android: نفس التجربة اللي بنيناها على الويب، في تطبيق على موبايل عميلك.",
        why: "عميلك عايش على الموبايل. تطبيق على شاشته معناه إنك أقرب له من أي إعلان، وبيرجعلك بلمسة.",
        builds: [
          "تطبيقات Android لمنتجات الويب",
          "مسار واضح: ويب ← PWA ← Android",
          "واجهات مصمّمة للموبايل أولاً",
          "ربط بنفس الـBackend والـAPIs",
          "تجهيز التطبيق للنشر",
        ],
        outcomes: [
          "حضور دايم على موبايل العميل",
          "Backend واحد للويب والتطبيق",
          "توسّع من غير ما تبدأ من الصفر",
        ],
        seoTitle: "برمجة تطبيقات Android",
        seoDescription:
          "ويب كرافت بتطلّق منتجات الويب كتطبيقات Android: من الويب للـPWA للتطبيق، على نفس الـBackend.",
      },
      en: {
        name: "Android Applications",
        tagline: "Your product. In your customers' hands.",
        what: "We launch your product as an Android application — the experience we built for the web, living on your customer's phone.",
        why: "Your customers live on their phones. An app on their home screen keeps you closer than any ad, one tap away.",
        builds: [
          "Android apps for web products",
          "A clear path: Web → PWA → Android",
          "Mobile-first interfaces",
          "Connected to the same backend and APIs",
          "Release-ready app preparation",
        ],
        outcomes: [
          "A permanent place on the customer's phone",
          "One backend for web and app",
          "Expansion without starting from zero",
        ],
        seoTitle: "Android App Development",
        seoDescription:
          "WebCraft launches web products as Android applications — from web to PWA to Android, on the same backend.",
      },
    },
  },
];

export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Old URLs from the previous site → the closest new service page. */
export const legacyServiceRedirects: Record<string, ServiceSlug | null> = {
  "website-design": "ui-ux-design",
  "website-development": "frontend-development",
  "website-redesign": "ui-ux-design",
  "website-audit": "seo",
  "seo-optimization": "seo",
  "landing-pages": "frontend-development",
  "business-websites": "frontend-development",
  "corporate-websites": "frontend-development",
  "ecommerce-websites": "ecommerce-development",
  "website-maintenance": null,
};
