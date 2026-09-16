import type { Dictionary } from "./ar";

/**
 * ENGLISH — written for an international, technical audience. Typed against
 * the Arabic dictionary, so a key added in one language fails the build until
 * it exists in the other.
 */
export const en: Dictionary = {
  meta: {
    siteName: "WebCraft",
    titleTemplate: "%s | WebCraft",
    homeTitle: "WebCraft — Web, App & Android Development Studio",
    description:
      "WebCraft is a software and digital solutions company building production-ready products: UI/UX design, frontend and backend development, e-commerce, web apps, PWAs, Android apps and SEO.",
    ogAlt: "WebCraft — We Design. We Build. We Launch. We Grow.",
  },

  common: {
    skip: "Skip to content",
    startProject: "Start a Project",
    exploreWork: "Explore Our Work",
    viewLive: "View Live Project",
    caseStudy: "Case Study",
    learnMore: "Learn more",
    allServices: "All services",
    allWork: "All work",
    backHome: "Back to home",
    live: "Live",
    demo: "Demo",
    email: "Send an email",
    call: "Call us",
    whatsapp: "Chat on WhatsApp",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    switchTo: "العربية",
    newTab: "(opens in a new tab)",
    tech: "Technologies",
    next: "Next project",
  },

  nav: {
    home: "Home",
    services: "Services",
    work: "Work",
    process: "Process",
    about: "About",
    contact: "Contact",
  },

  hero: {
    eyebrow: "Software & Digital Product Studio",
    titleA: "We don't just build websites.",
    titleB: "We build",
    titleHighlight: "digital products.",
    lead: "WebCraft designs and engineers websites, web applications, online stores and Android apps — from UI/UX and frontend to backend and SEO. Real products, production-ready, built to grow with your business.",
    motto: ["Design", "Build", "Launch", "Grow"],
    capabilitiesLabel: "We build",
    rotating: ["Websites", "Web Apps", "Online Stores", "Android Apps", "PWAs", "Dashboards"],
    scroll: "Scroll",
    liveBadge: "Projects live in production",
  },

  proof: {
    title: "From Idea to Production",
    items: [
      { title: "Real Production Projects", detail: "Every project in our work links to a live product you can open." },
      { title: "Custom Development", detail: "Code written around the business — never a template." },
      { title: "Responsive Experiences", detail: "Mobile, tablet and desktop from day one." },
      { title: "Modern Technologies", detail: "React, Next.js, TypeScript and REST APIs." },
      { title: "Scalable Architecture", detail: "Backends and dashboards ready for growth." },
      { title: "Android Applications", detail: "From web, to PWA, to an app in your customer's hand." },
    ],
  },

  about: {
    index: "01",
    kicker: "Who we are",
    title: "We close the gap between a good idea and a product that actually works.",
    body: [
      "WebCraft is a software company that builds digital products for businesses — websites, stores, platforms and apps. We work across the whole product: design, frontend, backend and search visibility, so you never have to coordinate between separate vendors.",
      "We don't measure a project by how it looks alone. We measure it by whether the client can really use it — to sell, to operate, and to grow.",
    ],
    pillars: [
      { label: "Design", detail: "Clear experiences grounded in users and business goals." },
      { label: "Build", detail: "Frontend and backend in clean, maintainable code." },
      { label: "Launch", detail: "Deployment and readiness for real users." },
      { label: "Grow", detail: "Ongoing optimisation, maintenance and evolution." },
    ],
  },

  services: {
    index: "02",
    kicker: "Services",
    title: "Everything your product needs, under one roof.",
    lead: "From the first screen your customer sees, to the server running behind it, to how they find you on Google and carry you on their phone.",
    whatLabel: "What we do",
    whyLabel: "Why it matters",
    buildsLabel: "What we build",
    outcomesLabel: "How it helps",
    proofLabel: "See it in",
    stackLabel: "Technologies & capabilities",
    cta: "Explore service",
  },

  seoBand: {
    kicker: "SEO",
    title: "SEO is written into the code — not added after launch.",
    lead: "Every site we build ships with semantic HTML, complete metadata, structured data and a performance budget — so search engines understand it from day one.",
    checklist: [
      "Semantic HTML and a clean heading hierarchy",
      "Metadata and Open Graph on every page",
      "Structured data (JSON-LD)",
      "Sitemap and robots.txt",
      "Optimised, lazy-loaded images",
      "Core Web Vitals considered from the start",
    ],
    serpUrl: "webcraft",
    serpTitle: "WebCraft — Web, App & Android Development",
    serpDesc: "Real digital products: UI/UX, frontend, backend, SEO and Android applications…",
    vitals: ["LCP", "INP", "CLS"],
    vitalsLabel: "Performance signals we design for",
  },

  work: {
    index: "03",
    kicker: "Selected work",
    title: "Real products. Live right now.",
    lead: "Not concept shots. Every project here is deployed, with a link you can open and try for yourself.",
    moreTitle: "More live work",
    featuresLabel: "Highlights",
    viewCase: "Open case study",
    cursorView: "View",
  },

  process: {
    index: "04",
    kicker: "How we work",
    title: "Six stages. None of them guesswork.",
    steps: [
      { title: "Discover", detail: "Understand the business, users, requirements and goals before a pixel or a line of code." },
      { title: "Design", detail: "Turn the idea into a clear UI/UX experience you can see and approve." },
      { title: "Develop", detail: "Build the frontend, backend, integrations and core functionality." },
      { title: "Test", detail: "Verify responsiveness, functionality, performance and usability." },
      { title: "Launch", detail: "Deploy and prepare the product for real users." },
      { title: "Grow", detail: "Improve, optimise, maintain and evolve as the business grows." },
    ],
  },

  tech: {
    index: "05",
    kicker: "Technology",
    title: "Tools proven in real, shipped work.",
    lead: "Nothing here is listed because it's popular. These are the technologies running in our deployed projects.",
    groups: { frontend: "Frontend", backend: "Backend & data", platform: "Platforms & delivery" },
    usedIn: "Used in",
  },

  android: {
    index: "06",
    kicker: "Android Applications",
    title: "From Web to Android.",
    subtitle: "Your product. In your customers' hands.",
    lead: "We start with a strong web product, make it installable as a PWA, then launch it as an Android app on the same backend — without starting over at each step.",
    path: ["Idea", "Design", "Web", "PWA", "Android"],
    points: [
      { title: "One backend", detail: "Web and app run on the same APIs and data." },
      { title: "Mobile-first", detail: "Interfaces designed for touch and small screens." },
      { title: "Step by step", detail: "Each stage adds value instead of replacing the last." },
    ],
    note: "Screens shown are from our real projects.",
    cta: "Talk to us about your app",
  },

  why: {
    index: "07",
    kicker: "Why WebCraft",
    title: "Not just good-looking. Built to work.",
    items: [
      { title: "Custom, Not Templates", detail: "We build around the actual business and its requirements, not around a theme." },
      { title: "Design Meets Engineering", detail: "UI/UX and code come from the same team, so nothing gets lost in translation." },
      { title: "Production Ready", detail: "We focus on real-world products that people use every day." },
      { title: "Performance First", detail: "Speed is part of development itself — not a fix after complaints." },
      { title: "Responsive by Default", detail: "Great experiences across desktop, tablet and mobile." },
      { title: "Built to Grow", detail: "Clean code and an architecture that scales and stays maintainable." },
    ],
  },

  realBusiness: {
    kicker: "Built for real businesses",
    title: "Proof isn't a quote. Proof is a link.",
    lead: "Instead of testimonials you can't verify, open the products yourself.",
  },

  cta: {
    title: "Have an idea?",
    titleB: "Let's build it.",
    lead: "Tell us about your project — a website, a store, a platform or an app — and we'll come back with a clear next step.",
    start: "Start Your Project",
    work: "View Our Work",
    contact: "Contact Us",
  },

  contact: {
    index: "08",
    kicker: "Contact",
    title: "Let's get started.",
    lead: "Fill in the form or reach us directly. The more detail you share, the more precise our reply.",
    channelsTitle: "Or reach us directly",
    socialTitle: "Follow us",
    fields: {
      name: { label: "Name", placeholder: "Your full name" },
      email: { label: "Email", placeholder: "name@company.com" },
      phone: { label: "Phone", placeholder: "+20 1xx xxx xxxx", hint: "Optional" },
      projectType: { label: "Project type", placeholder: "Select a project type" },
      message: { label: "Project details", placeholder: "Tell us about the idea, the goal and anything important…" },
    },
    projectTypes: {
      website: "Business / company website",
      ecommerce: "Online store",
      webapp: "Web app / platform",
      pwa: "Progressive Web App",
      android: "Android app",
      uiux: "UI/UX design",
      seo: "SEO",
      other: "Something else",
    },
    errors: {
      name: "Please enter your name (at least 2 characters).",
      email: "Please enter a valid email so we can reply.",
      phone: "That phone number doesn't look right.",
      projectType: "Please choose a project type.",
      message: "Please share a few details (at least 10 characters).",
    },
    submit: "Send request",
    sending: "Sending…",
    successTitle: "Message received.",
    successBody: "Thank you! We'll review the details and get back to you by email or phone as soon as possible.",
    errorTitle: "Your message didn't go through.",
    errorBody: "Something went wrong while sending. Please try again, or email us at:",
    sendAnother: "Send another message",
    privacy: "Your details are only used to respond to your request.",
  },

  footer: {
    description:
      "WebCraft is a software and digital solutions company. We design, build and launch real digital products: websites, stores, web applications and Android apps.",
    services: "Services",
    projects: "Projects",
    company: "Company",
    contact: "Contact",
    faq: "FAQ",
    rights: "All rights reserved.",
    motto: "We Design. We Build. We Launch. We Grow.",
    backToTop: "Top",
  },

  pages: {
    services: {
      title: "Services",
      lead: "Eight services covering a digital product from design to launch and growth.",
      metaTitle: "Services — Web, App & Android Development",
      metaDescription:
        "WebCraft services: frontend and backend development, UI/UX design, SEO, e-commerce, web applications, PWAs and Android apps.",
    },
    serviceDetail: {
      related: "Projects that show this service",
      otherServices: "Other services",
      ctaTitle: "Need this service?",
      ctaLead: "Tell us about your project and we'll come back with a clear next step.",
    },
    work: {
      title: "Our Work",
      lead: "Deployed, working products. Open any project and try it yourself.",
      metaTitle: "Work — Real Projects Live in Production",
      metaDescription:
        "WebCraft portfolio: Dahab El Araby, Shopik Lopik, Bay3, VERRA, Hajaty Day3a and Al-Khabar Al-Jadid — real, deployed projects.",
    },
    caseStudy: {
      overview: "Overview",
      built: "What we built",
      features: "Key features",
      stack: "Technologies & capabilities",
      services: "Services",
      screens: "Screens",
      desktop: "Desktop",
      mobile: "Mobile",
      visit: "Visit site",
    },
    contact: {
      metaTitle: "Contact — Start Your Project",
      metaDescription: "Contact WebCraft to start your website, store or app. Email, social or the project form.",
    },
    about: {
      metaTitle: "About WebCraft",
      metaDescription:
        "WebCraft is a software and digital solutions company building real products: design, frontend, backend, SEO and Android apps.",
    },
    faq: {
      title: "Frequently Asked Questions",
      lead: "Straight answers to the questions asked before every project.",
      metaTitle: "FAQ",
      metaDescription: "Answers about working with WebCraft, cost, SEO, PWAs and Android applications.",
    },
    notFound: {
      title: "This page doesn't exist.",
      lead: "The link may have changed or been mistyped. Head home or explore our work.",
    },
  },
};
