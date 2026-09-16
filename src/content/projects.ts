import type { Project, ProjectSlug } from "@/types";

/**
 * WEBCRAFT — PORTFOLIO
 *
 * Six deployed projects. Every live URL was opened, and every feature below
 * is something visible on the live product or present in its shipped code
 * (routes, API endpoints, UI strings). Screenshots are captures of the live
 * sites — see `scripts/prep-media.mjs`.
 *
 * Not written anywhere in this file: client names beyond the product's own
 * brand, traffic, revenue, ratings, or "increased X by Y%". None of that has
 * been supplied, so none of it is claimed.
 *
 * Technology tags are limited to what could be verified from the deployed
 * builds (e.g. Next.js chunks, Vite bundles, service workers, API routes,
 * ASP.NET Core identity claims in the auth layer).
 */

export const projects: Project[] = [
  /* ─────────────────────────────────────────────────────────────────────
     01 — DAHAB EL ARABY
     ───────────────────────────────────────────────────────────────────── */
  {
    slug: "dahab-el-araby",
    liveUrl: "https://dahbelarby.com/",
    tone: "214 176 98",
    featured: true,
    status: "live",
    showcase: "phones",
    desktop: [
      {
        key: "dahab-el-araby/desktop",
        label: {
          ar: "دهب العربي على الديسكتوب — أقسام الذهب والفضة وتسجيل الدخول",
          en: "Dahab El Araby on desktop — gold and silver sections with sign-in",
        },
      },
    ],
    mobile: [
      {
        key: "dahab-el-araby/mobile-dark",
        label: {
          ar: "تطبيق دهب العربي على الموبايل بالوضع الداكن مع زر تثبيت التطبيق",
          en: "Dahab El Araby on mobile in dark mode, with the install-app button",
        },
      },
      {
        key: "dahab-el-araby/mobile-light",
        label: {
          ar: "تطبيق دهب العربي على الموبايل بالوضع الفاتح",
          en: "Dahab El Araby on mobile in light mode",
        },
      },
    ],
    stack: ["React", "Tailwind CSS", "PWA", "Service Worker", "Admin Dashboard"],
    services: ["progressive-web-apps", "frontend-development", "ui-ux-design", "web-applications"],
    text: {
      ar: {
        name: "دهب العربي",
        category: "تطبيق ويب (PWA) لأسعار الذهب والفضة",
        summary:
          "تطبيق بيتثبّت على الموبايل زي أي تطبيق، وبيعرض أسعار الذهب والفضة لحظة بلحظة لعملاء محل دهب في الفيوم.",
        overview: [
          "دهب العربي محتاج وسيلة سريعة يوصل بيها الأسعار لعملائه من غير ما يستنّوا رد على التليفون. بنينا له تطبيق ويب تقدّمي (PWA) العميل بيثبّته على شاشة موبايله بضغطة، ويفتحه زي أي تطبيق.",
          "الأسعار متقسّمة بالظبط زي ما السوق بيفكّر: ذهب (سبايك، جديد، مستعمل) وفضة (أسعار، سبايك، مشغولات)، ووراها لوحة تحكم للإدارة بتتحكّم في المنتجات والمستخدمين.",
        ],
        built: [
          "تطبيق ويب تقدّمي قابل للتثبيت، بخطوات تثبيت واضحة حتى على iPhone",
          "واجهة عربية بالكامل بوضع داكن وفاتح",
          "تسجيل دخول بالاسم ورقم الموبايل",
          "لوحة تحكم لإضافة وتعديل المنتجات وإدارة المستخدمين",
          "صفحات الشروط والخصوصية وحذف الحساب",
        ],
        features: [
          { title: "أسعار لحظة بلحظة", detail: "عيار 24 و21 و18، السبائك والمشغولات، الجديد والمستعمل." },
          { title: "يتثبّت كتطبيق", detail: "زر «تثبيت» في الهيدر، وService Worker بيخلّي التجربة سريعة." },
          { title: "ذهب وفضة", detail: "قسمين مستقلين، كل واحد بتصنيفاته." },
          { title: "لوحة إدارة", detail: "إضافة منتج، تعديل المنتجات، وإدارة المستخدمين." },
          { title: "تواصل ودفع", detail: "واتساب وتليجرام واتصال مباشر، وطرق الدفع إنستاباي وفودافون كاش." },
          { title: "داكن وفاتح", detail: "تبديل الثيم من الهيدر بلمسة." },
        ],
        seoTitle: "دهب العربي — تطبيق ويب لأسعار الذهب والفضة",
        seoDescription:
          "تطبيق ويب تقدّمي (PWA) بنته ويب كرافت لعرض أسعار الذهب والفضة لحظة بلحظة، بلوحة تحكم لإدارة المنتجات والمستخدمين.",
      },
      en: {
        name: "Dahab El Araby",
        category: "Progressive Web App · Gold & Silver Pricing",
        summary:
          "An installable web app that puts live gold and silver prices in customers' pockets for a jewelry business in Fayoum, Egypt.",
        overview: [
          "Dahab El Araby needed a faster way to get today's prices to customers than answering the phone. We built a Progressive Web App that installs to the home screen in one tap and opens like a native app.",
          "Prices are organised the way the market actually thinks — gold (bullion, new, used) and silver (prices, bullion, crafted pieces) — backed by an admin dashboard for managing products and users.",
        ],
        built: [
          "An installable PWA, with guided install steps for iPhone users too",
          "A fully Arabic, right-to-left interface with dark and light themes",
          "Sign-in with name and mobile number",
          "An admin dashboard to add and edit products and manage users",
          "Terms, privacy and account-deletion pages",
        ],
        features: [
          { title: "Live prices", detail: "24k, 21k and 18k gold, bullion and jewelry — new and used." },
          { title: "Installs like an app", detail: "An Install button in the header, with a service worker for speed." },
          { title: "Gold & silver", detail: "Two independent sections, each with its own categories." },
          { title: "Admin dashboard", detail: "Add products, edit the catalogue and manage users." },
          { title: "Contact & payment", detail: "WhatsApp, Telegram and direct calls; InstaPay and Vodafone Cash listed." },
          { title: "Dark & light", detail: "Theme switch available from the header." },
        ],
        seoTitle: "Dahab El Araby — Gold & Silver Pricing PWA",
        seoDescription:
          "A Progressive Web App built by WebCraft that shows live gold and silver prices, with an admin dashboard for products and users.",
      },
    },
  },

  /* ─────────────────────────────────────────────────────────────────────
     02 — SHOPIK LOPIK
     ───────────────────────────────────────────────────────────────────── */
  {
    slug: "shopik-lopik",
    liveUrl: "https://shopiklopik.com/",
    tone: "70 120 255",
    featured: true,
    status: "live",
    desktop: [
      {
        key: "shopik-lopik/home",
        label: {
          ar: "الصفحة الرئيسية لشوبيك لوبيك — البحث في الإعلانات والبانرات",
          en: "Shopik Lopik home — ad search and promotional banners",
        },
      },
      {
        key: "shopik-lopik/categories",
        label: {
          ar: "تصفّح الأقسام الاثنا عشر في شوبيك لوبيك",
          en: "Browsing the twelve marketplace categories",
        },
      },
      {
        key: "shopik-lopik/subcategories",
        label: {
          ar: "اختيار القسم الفرعي داخل قسم السيارات",
          en: "Choosing a subcategory inside Cars",
        },
      },
    ],
    mobile: [
      {
        key: "shopik-lopik/mobile-home",
        label: {
          ar: "شوبيك لوبيك على الموبايل مع شريط التنقّل السفلي وزر «أضف إعلان»",
          en: "Shopik Lopik on mobile with bottom navigation and the Post Ad button",
        },
      },
      {
        key: "shopik-lopik/mobile-categories",
        label: {
          ar: "أقسام السوق على شاشة الموبايل",
          en: "Marketplace categories on mobile",
        },
      },
    ],
    stack: ["React", "PWA", "REST API", "ASP.NET Core Identity", "Notifications"],
    services: ["web-applications", "backend-development", "frontend-development", "progressive-web-apps", "seo"],
    text: {
      ar: {
        name: "شوبيك لوبيك",
        category: "سوق إلكتروني محلي — منصة إعلانات",
        summary:
          "سوق إلكتروني لمحافظة الفيوم بيوصّل البايع بالمشتري مباشرة، باثنا عشر قسم ومن غير عمولة.",
        overview: [
          "شوبيك لوبيك سوق إلكتروني محلي لمحافظة الفيوم: أي حد يقدر ينشر إعلان، وأي حد يدوّر يوصل للبايع مباشرة من غير وسيط ومن غير عمولة.",
          "المنصة مبنية كتطبيق ويب كامل: واجهة سريعة بتتثبّت على الموبايل، وBackend بـAPI بيدير الإعلانات والأقسام والإشعارات والحسابات، وتقسيم جغرافي بالمحافظة والمركز.",
        ],
        built: [
          "واجهة تطبيق ويب قابلة للتثبيت (PWA) بتنقّل سفلي على الموبايل",
          "REST API للإعلانات والأقسام والملفات الشخصية والإشعارات",
          "شجرة أقسام رئيسية وفرعية، وتحديد الموقع بالمحافظة والمركز",
          "نظام حجز بانرات إعلانية مدفوعة",
          "حسابات مستخدمين ومفضّلة وإشعارات بعدّاد غير المقروء",
        ],
        features: [
          { title: "12 قسم رئيسي", detail: "سيارات، ورش وحرفيين، مفقودات، وظائف، عقارات، وغيرهم — بأقسام فرعية." },
          { title: "انشر إعلانك", detail: "زر «أضف إعلانك» ظاهر في كل مكان، وعلى الموبايل في نص الشريط السفلي." },
          { title: "تواصل مباشر", detail: "المشتري بيكلّم البايع على طول، والمنصة من غير عمولة." },
          { title: "إشعارات", detail: "إشعارات داخل التطبيق مع عدّاد للي ماتقراش." },
          { title: "بانرات إعلانية", detail: "حجز مساحات بانر للمعلنين من خلال المنصة." },
          { title: "مفضّلة وحساب", detail: "ملف شخصي وقائمة مفضّلة لكل مستخدم." },
        ],
        seoTitle: "شوبيك لوبيك — سوق إلكتروني محلي بلوحة إعلانات",
        seoDescription:
          "منصة إعلانات وسوق إلكتروني لمحافظة الفيوم من تنفيذ ويب كرافت: أقسام وأقسام فرعية، نشر إعلانات، إشعارات، وبانرات مدفوعة.",
      },
      en: {
        name: "Shopik Lopik",
        category: "Local Marketplace · Classifieds Platform",
        summary:
          "A local marketplace for Fayoum, Egypt, connecting buyers and sellers directly across twelve categories — commission-free.",
        overview: [
          "Shopik Lopik is a local online marketplace for the Fayoum governorate. Anyone can post an ad, and anyone looking can reach the seller directly — no middleman, no commission.",
          "It's built as a full web application: a fast, installable frontend, an API-driven backend managing ads, categories, notifications and accounts, and location data down to governorate and district level.",
        ],
        built: [
          "An installable PWA frontend with app-style bottom navigation on mobile",
          "A REST API for ads, categories, profiles and notifications",
          "A category tree with subcategories, plus governorate and district lookups",
          "A paid banner-advertising booking flow",
          "User accounts, favourites and notifications with unread counts",
        ],
        features: [
          { title: "12 categories", detail: "Cars, workshops, lost & found, jobs, real estate and more — each with subcategories." },
          { title: "Post an ad", detail: "A persistent Post Ad action, centred in the mobile bottom bar." },
          { title: "Direct contact", detail: "Buyers talk to sellers directly, with zero commission." },
          { title: "Notifications", detail: "In-app notifications with an unread counter." },
          { title: "Banner ads", detail: "Advertisers can book banner placements through the platform." },
          { title: "Profiles & favourites", detail: "Personal profiles and saved listings for every user." },
        ],
        seoTitle: "Shopik Lopik — Local Marketplace Platform",
        seoDescription:
          "A classifieds marketplace built by WebCraft for Fayoum, Egypt: category tree, ad posting, notifications and paid banner bookings.",
      },
    },
  },

  /* ─────────────────────────────────────────────────────────────────────
     03 — BAY3
     ───────────────────────────────────────────────────────────────────── */
  {
    slug: "bay3",
    liveUrl: "https://bay3.vercel.app/",
    tone: "76 124 255",
    featured: true,
    status: "live",
    desktop: [
      {
        key: "bay3/storefront",
        label: { ar: "واجهة متجر Bay3 — بانر العروض والبحث في المنتجات", en: "Bay3 storefront — promo hero and product search" },
      },
      {
        key: "bay3/catalog",
        label: { ar: "الكتالوج — فلترة بالسعر والتقييم والتوفّر", en: "Catalogue — filter by price, rating and availability" },
      },
      {
        key: "bay3/product",
        label: { ar: "صفحة المنتج — معرض صور واختيار اللون والفيرنت", en: "Product page — gallery with colour and variant selection" },
      },
      {
        key: "bay3/admin-dashboard",
        label: { ar: "لوحة تحكم التاجر — الإيرادات والطلبات والمخزون", en: "Merchant dashboard — revenue, orders and stock" },
      },
      {
        key: "bay3/admin-products",
        label: { ar: "إدارة المنتجات والمخزون", en: "Product and inventory management" },
      },
      {
        key: "bay3/admin-analytics",
        label: { ar: "تقارير الطلبات حسب الحالة والمبيعات حسب التصنيف", en: "Orders by status and sales by category" },
      },
      {
        key: "bay3/admin-reviews",
        label: { ar: "مراجعة تقييمات العملاء قبل النشر", en: "Moderating customer reviews" },
      },
    ],
    mobile: [
      { key: "bay3/mobile-home", label: { ar: "Bay3 على الموبايل", en: "Bay3 on mobile" } },
      { key: "bay3/mobile-catalog", label: { ar: "كتالوج المنتجات على الموبايل", en: "Product catalogue on mobile" } },
      { key: "bay3/mobile-product", label: { ar: "صفحة منتج على الموبايل مع زر الإضافة للسلة", en: "Mobile product page with add-to-cart" } },
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Admin Dashboard", "AR / EN"],
    services: ["ecommerce-development", "web-applications", "frontend-development", "ui-ux-design"],
    text: {
      ar: {
        name: "Bay3",
        category: "منصة تجارة إلكترونية — متجر + لوحة تحكم",
        summary: "متجر إلكتروني كامل، من الكتالوج والسلة لحد لوحة تحكم التاجر والتقارير.",
        overview: [
          "Bay3 منصة تجارة إلكترونية متكاملة. العميل بيتصفّح ويفلتر ويفتح المنتج ويختار اللون والفيرنت ويضيف للسلة من غير ما يسيب الصفحة.",
          "والتاجر عنده لوحة تحكم مستقلة بيدير منها الكتالوج والمخزون والطلبات والكوبونات والشحن والمرتجعات والعملاء، ويشوف فيها المبيعات مقسّمة حسب الحالة والتصنيف.",
        ],
        built: [
          "متجر مبني بـNext.js بواجهة عربي وإنجليزي ووضع ليلي",
          "كتالوج ببحث وفلترة وترتيب",
          "صفحات منتجات بألوان وفيرنتس وتقييمات",
          "لوحة تحكم كاملة للتاجر مع تقارير",
          "مراجعة وقبول تقييمات العملاء",
        ],
        features: [
          { title: "كتالوج ذكي", detail: "بحث بالاسم أو الـSKU، فلترة بالسعر والتقييم والتوفّر، وترتيب." },
          { title: "صفحة منتج", detail: "معرض صور، اختيار اللون والفيرنت، والإضافة للسلة من نفس الشاشة." },
          { title: "لوحة تحكم", detail: "المنتجات، المخزون، الطلبات، الكوبونات، الشحن، المرتجعات، والعملاء." },
          { title: "تقارير", detail: "الطلبات حسب الحالة والمبيعات حسب التصنيف." },
          { title: "المراجعات", detail: "التقييمات بتتراجع وتتقبل أو تتشال من اللوحة." },
          { title: "لغتين + ليلي", detail: "تبديل اللغة والثيم من شريط التنقل." },
        ],
        seoTitle: "Bay3 — منصة تجارة إلكترونية بلوحة تحكم",
        seoDescription:
          "متجر إلكتروني كامل بنته ويب كرافت بـNext.js: كتالوج بفلترة، صفحة منتج بفيرنتس، سلة، ولوحة تحكم للتاجر بتقارير.",
      },
      en: {
        name: "Bay3",
        category: "E-Commerce Platform · Storefront + Admin",
        summary: "A complete online store — from catalogue and cart to a full merchant dashboard with reporting.",
        overview: [
          "Bay3 is an end-to-end e-commerce platform. Shoppers browse, filter, open a product, pick a colour and variant, and add to cart without losing their place.",
          "Merchants get a separate dashboard to run the catalogue, inventory, orders, coupons, shipping, returns and customers — with sales broken down by status and category.",
        ],
        built: [
          "A Next.js storefront in Arabic and English, with dark mode",
          "A catalogue with search, filtering and sorting",
          "Product pages with colours, variants and reviews",
          "A full merchant dashboard with reports",
          "Customer review moderation",
        ],
        features: [
          { title: "Smart catalogue", detail: "Search by name or SKU; filter by price, rating and stock; sort." },
          { title: "Product page", detail: "Image gallery, colour and variant pickers, add to cart in place." },
          { title: "Merchant dashboard", detail: "Products, stock, orders, coupons, shipping, returns and customers." },
          { title: "Reporting", detail: "Orders by status and sales by category." },
          { title: "Reviews", detail: "Approve or remove customer reviews from the dashboard." },
          { title: "Bilingual + dark", detail: "Language and theme switching in the navigation." },
        ],
        seoTitle: "Bay3 — E-Commerce Platform with Admin Dashboard",
        seoDescription:
          "A complete online store built by WebCraft with Next.js: filterable catalogue, variant product pages, cart and a merchant dashboard.",
      },
    },
  },

  /* ─────────────────────────────────────────────────────────────────────
     04 — VERRA (WebCraft Women's Gym demo)
     ───────────────────────────────────────────────────────────────────── */
  {
    slug: "verra",
    liveUrl: "https://webcraft-womens-gym-demo.vercel.app/",
    tone: "196 150 160",
    featured: true,
    status: "demo",
    desktop: [
      { key: "verra/home", label: { ar: "الصفحة الرئيسية لموقع VERRA", en: "VERRA homepage hero" } },
      { key: "verra/experience", label: { ar: "قسم «Four rooms, one standard» — مساحات النادي", en: "“Four rooms, one standard” — the club's spaces" } },
      { key: "verra/classes", label: { ar: "جدول الحصص مقسّم بالتصنيف", en: "Class formats grouped by category" } },
      { key: "verra/story", label: { ar: "قسم قصة النادي", en: "The club story section" } },
      { key: "verra/coaches", label: { ar: "المدرّبات وتجارب الأعضاء", en: "Coaches and member stories" } },
    ],
    mobile: [
      { key: "verra/mobile-home", label: { ar: "VERRA على الموبايل", en: "VERRA on mobile" } },
      { key: "verra/mobile-experience", label: { ar: "قسم مميزات الموقع للجيم على الموبايل", en: "Gym growth features section on mobile" } },
    ],
    stack: ["React", "Vite", "Responsive", "Booking Flow", "WhatsApp CTA"],
    services: ["ui-ux-design", "frontend-development", "seo"],
    text: {
      ar: {
        name: "VERRA",
        category: "موقع بيزنس — نادي لياقة للسيدات (نموذج)",
        summary:
          "نموذج كامل لموقع جيم سيدات، مصمَّم عشان يحوّل زيارات السوشيال ميديا لحجوزات حصص تجريبية.",
        overview: [
          "VERRA نموذج (Demo) بنيناه في ويب كرافت عشان نوضّح شكل موقع احترافي لنادي لياقة: الاسم والمحتوى توضيحيين، لكن كل الصفحات والتدفّقات شغّالة.",
          "الموقع مبني حوالين طريقة بيع الجيم فعلاً: من السوشيال ميديا للموقع، لحصة أو عرض، لطلب حصة تجريبية، لمتابعة، لاشتراك.",
        ],
        built: [
          "موقع متعدد الصفحات: عن النادي، الحصص، الاشتراكات، المدرّبات، الفروع، العروض، والتواصل",
          "جدول حصص بفلترة حسب التصنيف وصفحة لكل حصة",
          "مقارنة اشتراكات واضحة",
          "مسار حجز حصة تجريبية مجانية",
          "زر واتساب ثابت وأسئلة شائعة",
        ],
        features: [
          { title: "حصص بفلترة", detail: "قوة، Mind & Body، ورقص — مع صفحة تفاصيل لكل حصة." },
          { title: "اشتراكات أوضح", detail: "الخطط والمدد في جدول مقارنة واحد." },
          { title: "حجز تجربة", detail: "طلب حصة تجريبية مجانية من أي صفحة." },
          { title: "ملفات المدرّبات", detail: "صفحة لكل مدرّبة بتخصّصها." },
          { title: "الفروع", detail: "صفحة للفروع والمواقع." },
          { title: "تصميم فاخر", detail: "تايبوجرافي تحريري وصور بالأبيض والأسود." },
        ],
        note: "نموذج عرض — المحتوى والأرقام داخل الموقع توضيحية.",
        seoTitle: "VERRA — نموذج موقع نادي لياقة للسيدات",
        seoDescription:
          "نموذج موقع جيم سيدات من ويب كرافت: حصص بفلترة، اشتراكات، مدرّبات، فروع، وحجز حصة تجريبية.",
      },
      en: {
        name: "VERRA",
        category: "Business Website · Women's Fitness Club (Demo)",
        summary:
          "A complete women's gym website concept, designed to turn social media traffic into free-trial bookings.",
        overview: [
          "VERRA is a demo build by WebCraft that shows what a premium fitness-club website can be. The brand and content are illustrative — the pages and flows are fully working.",
          "It's structured around how a gym actually sells: social media → website → class or offer → trial request → follow-up → membership.",
        ],
        built: [
          "A multi-page site: about, classes, memberships, trainers, branches, offers and contact",
          "A class timetable filterable by category, with a page per class",
          "A clear membership comparison",
          "A free-trial booking flow",
          "A persistent WhatsApp action and an FAQ",
        ],
        features: [
          { title: "Filterable classes", detail: "Strength, Mind & Body and Dance — with a detail page for each class." },
          { title: "Clear memberships", detail: "Plans and terms in a single comparison." },
          { title: "Trial booking", detail: "Request a free trial from anywhere on the site." },
          { title: "Coach profiles", detail: "A dedicated page for every trainer." },
          { title: "Branches", detail: "A locations page for every branch." },
          { title: "Editorial design", detail: "Serif typography and monochrome photography." },
        ],
        note: "Demo build — brand, figures and content inside the site are illustrative.",
        seoTitle: "VERRA — Women's Fitness Club Website (Demo)",
        seoDescription:
          "A women's gym website concept by WebCraft: filterable classes, memberships, trainers, branches and a free-trial booking flow.",
      },
    },
  },

  /* ─────────────────────────────────────────────────────────────────────
     05 — HAJATY DAY3A
     ───────────────────────────────────────────────────────────────────── */
  {
    slug: "hajaty-day3a",
    liveUrl: "https://hajata-day3a.vercel.app/",
    tone: "59 130 246",
    featured: false,
    status: "live",
    desktop: [
      {
        key: "hajaty-day3a/home",
        label: {
          ar: "الصفحة الرئيسية لحاجتي ضاعت — نشر بلاغ مفقود أو بلاغ وجد",
          en: "Hajaty Day3a home — post a lost or found report",
        },
      },
    ],
    mobile: [
      {
        key: "hajaty-day3a/mobile-home",
        label: { ar: "حاجتي ضاعت على الموبايل", en: "Hajaty Day3a on mobile" },
      },
    ],
    stack: ["React", "Vite", "ASP.NET Core Identity", "User Accounts"],
    services: ["web-applications", "backend-development", "frontend-development"],
    text: {
      ar: {
        name: "حاجتي ضاعت",
        category: "منصة مفقودات وموجودات",
        summary: "منصة بتجمع اللي ضاع منه حاجة واللي لقاها على نفس الشاشة.",
        overview: [
          "منصة بتجمع طرفين: حد ضاع منه حاجة، وحد لقى حاجة. الاتنين بينشروا بلاغ، والبلاغات بتتنظّم بتصنيف ومحافظة ومنطقة وتاريخ عشان الوصول يبقى بالبحث مش بالصدفة.",
          "لكل مستخدم حساب وملف فيه نقاط ثقة وعدد بلاغاته، وفيه بلاغات بتتنشر ومعاها مكافأة لمن يرشد عنها.",
        ],
        built: [
          "مسارين واضحين: بلاغ مفقود وبلاغ وجد",
          "بحث وتصفّح البلاغات بالشبكة أو القائمة",
          "تصنيفات ومناطق وتاريخ لكل بلاغ",
          "حسابات مستخدمين بنقاط ثقة",
          "مكافآت على البلاغات ووضع ليلي",
        ],
        features: [
          { title: "بلاغ مفقود / وجد", detail: "كل مسار بزرّه المستقل من أول شاشة." },
          { title: "بحث وفلترة", detail: "بحث نصّي وعرض بالشبكة أو القائمة." },
          { title: "حسابات وثقة", detail: "ملف لكل مستخدم فيه نقاط الثقة وعدد البلاغات." },
        ],
        seoTitle: "حاجتي ضاعت — منصة مفقودات وموجودات",
        seoDescription: "منصة للإبلاغ عن المفقودات والموجودات بتصنيفات ومناطق وحسابات مستخدمين، من تنفيذ ويب كرافت.",
      },
      en: {
        name: "Hajaty Day3a",
        category: "Lost & Found Platform",
        summary: "A platform that brings people who lost something and people who found it onto the same screen.",
        overview: [
          "Two sides, one platform: someone who lost an item and someone who found one. Both post a report, organised by category, governorate, area and date — so matches come from search, not luck.",
          "Every user has an account with trust points and report history, and reports can carry a reward for whoever helps.",
        ],
        built: [
          "Two clear paths: report a lost item or a found item",
          "Search and browse reports in grid or list view",
          "Category, location and date for every report",
          "User accounts with trust points",
          "Rewards on reports, plus dark mode",
        ],
        features: [
          { title: "Lost / Found", detail: "Each path has its own action on the first screen." },
          { title: "Search & filter", detail: "Text search with grid and list views." },
          { title: "Accounts & trust", detail: "Profiles with trust points and report counts." },
        ],
        seoTitle: "Hajaty Day3a — Lost & Found Platform",
        seoDescription: "A lost-and-found reporting platform with categories, locations and user accounts, built by WebCraft.",
      },
    },
  },

  /* ─────────────────────────────────────────────────────────────────────
     06 — AL-KHABAR AL-JADID
     ───────────────────────────────────────────────────────────────────── */
  {
    slug: "alkhabar-aljadid",
    liveUrl: "https://alkhabaraljadid.com/",
    tone: "220 38 38",
    featured: false,
    status: "live",
    desktop: [
      {
        key: "alkhabar-aljadid/home",
        label: { ar: "الصفحة الرئيسية لموقع الخبر الجديد", en: "Al-Khabar Al-Jadid homepage" },
      },
      {
        key: "alkhabar-aljadid/sections",
        label: { ar: "قسم عرب وعالم مع الكلمات المفتاحية", en: "Arab & World section with keyword sidebar" },
      },
      {
        key: "alkhabar-aljadid/regional",
        label: { ar: "قسم السعودية والمنشورات الموصى بها", en: "Saudi section with recommended posts" },
      },
    ],
    mobile: [],
    stack: ["News Platform", "Multi-section Layout", "Search", "Arabic RTL"],
    services: ["frontend-development", "ui-ux-design", "seo"],
    text: {
      ar: {
        name: "الخبر الجديد",
        category: "موقع إخباري متعدّد الأقسام",
        summary: "موقع إخباري بأقسام مستقلة وشريط عاجل وبحث.",
        overview: [
          "موقع إخباري بأقسام مستقلة — مصر، السعودية، عرب وعالم، رياضة، اقتصاد، تعليم، تقنية ومنوعات — وكل قسم ليه شبكته على الصفحة الرئيسية.",
          "الصفحة مبنية عشان تستوعب كم كبير من الأخبار من غير ما تتلخبط: خبر رئيسي، شريط عاجل، وأعمدة جانبية للمنشورات الموصى بها والكلمات المفتاحية.",
        ],
        built: [
          "أقسام إخبارية متعددة بشبكات مستقلة",
          "شريط أخبار عاجلة",
          "خبر رئيسي بتنقّل بين الأخبار البارزة",
          "كلمات مفتاحية ومنشورات موصى بها",
          "بحث من شريط التنقل",
        ],
        features: [
          { title: "أقسام متعددة", detail: "مصر، السعودية، عرب وعالم، رياضة، اقتصاد، تعليم، تقنية ومنوعات." },
          { title: "عاجل", detail: "شريط مستقل لآخر الأخبار العاجلة." },
          { title: "قراءة أعمق", detail: "كلمات مفتاحية ومنشورات موصى بها." },
        ],
        seoTitle: "الخبر الجديد — موقع إخباري متعدّد الأقسام",
        seoDescription: "موقع إخباري بأقسام مستقلة وشريط عاجل وكلمات مفتاحية، من تنفيذ ويب كرافت.",
      },
      en: {
        name: "Al-Khabar Al-Jadid",
        category: "Multi-section News Website",
        summary: "An Arabic news website with independent sections, breaking-news ticker and search.",
        overview: [
          "A news site with independent sections — Egypt, Saudi Arabia, Arab & World, Sports, Economy, Education, Tech and Variety — each with its own grid on the homepage.",
          "The layout is built to carry a high volume of stories without clutter: a lead story, a breaking-news bar, and sidebars for recommended posts and keywords.",
        ],
        built: [
          "Multiple news sections with independent grids",
          "A breaking-news ticker",
          "A lead-story carousel",
          "Keywords and recommended posts",
          "Search from the main navigation",
        ],
        features: [
          { title: "Many sections", detail: "Egypt, Saudi Arabia, Arab & World, Sports, Economy, Education, Tech, Variety." },
          { title: "Breaking news", detail: "A dedicated bar for the latest breaking stories." },
          { title: "Deeper reading", detail: "Keyword tags and recommended posts." },
        ],
        seoTitle: "Al-Khabar Al-Jadid — Multi-section News Website",
        seoDescription: "An Arabic news website with independent sections, breaking news and keyword navigation, built by WebCraft.",
      },
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const moreProjects = projects.filter((p) => !p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function nextProject(slug: ProjectSlug): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length] as Project;
}

export { displayUrl } from "@/lib/utils";
