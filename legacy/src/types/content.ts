/**
 * WEBCRAFT — CONTENT MODEL
 *
 * The contract between content and presentation.
 *
 * Everything the site displays is described here first. Components read these
 * shapes and never invent their own. That gives us two things:
 *
 *   1. Adding a project or service is a data edit, not a UI edit.
 *   2. Moving to a CMS later means writing one adapter that returns these
 *      shapes — no component changes at all.
 *
 * Content lives in `src/content/*` and is validated against these types at
 * build time by `tsc`.
 */

/* ==========================================================================
   PRIMITIVES
   ========================================================================== */

/** URL-safe identifier. Also the route segment. Lowercase, hyphenated. */
export type Slug = string;

/**
 * An image with its intrinsic dimensions.
 *
 * `width`/`height` are required, not optional: without them Next.js cannot
 * reserve space and every image becomes a layout shift. CLS is the cheapest
 * way to make an expensive site feel cheap.
 *
 * `alt` is required for the same reason it always is. Decorative images pass
 * an empty string explicitly, which is a decision rather than an omission.
 */
export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Base64 LQIP for `placeholder="blur"`. Generated at build time. */
  blurDataURL?: string;
}

/**
 * Per-item accent override. The portfolio grid assigns these so adjacent
 * cards never share a glow colour — a monotone grid reads as a template.
 */
export type AccentKey = "lime" | "violet" | "paper";

export interface Link {
  label: string;
  href: string;
  external?: boolean;
}

/* ==========================================================================
   SERVICES
   ========================================================================== */

/**
 * The ten offerings. Each is a real route (`/services/[slug]`) and therefore
 * a real SEO landing page — this is the lead-generation surface, not a
 * decorative homepage grid.
 */
export type ServiceSlug =
  | "website-design"
  | "website-development"
  | "website-redesign"
  | "website-audit"
  | "seo-optimization"
  | "landing-pages"
  | "business-websites"
  | "corporate-websites"
  | "ecommerce-websites"
  | "website-maintenance";

/** Groups the ten services into three homepage clusters. */
export type ServiceGroup = "design" | "build" | "grow";

export interface Service {
  slug: ServiceSlug;
  /** Short label — cards, navigation, filter chips. */
  title: string;
  /** Long label — used as the `<h1>` on the service page. */
  headline: string;
  group: ServiceGroup;
  /** Lucide icon name, resolved through the icon registry. */
  icon: string;

  /**
   * The one-line promise. Written as an outcome the client can picture, never
   * as a technology. "A site that turns visitors into booked appointments" —
   * not "a performant React application".
   */
  promise: string;

  /** Two or three sentences for the service page intro. */
  description: string;

  /** What the client actually receives. Concrete nouns. */
  deliverables: string[];

  /** The business problem this service removes. Used for the pain-point block. */
  problemsSolved: string[];

  /** Who this is for — maps to the target-client list. */
  bestFor: string[];

  /** Typical delivery window, e.g. "2–3 weeks". Sets expectations early. */
  timeline?: string;
  /** Entry price, e.g. "from $1,800". Omit to show "Request a quote". */
  startingPrice?: string;

  /** Related service slugs for cross-sell at the foot of the service page. */
  related: ServiceSlug[];

  /** Portfolio slugs proving this service. Powers "See it in the wild". */
  proofProjects?: Slug[];

  seo: SeoFields;
}

/* ==========================================================================
   PORTFOLIO & CASE STUDIES
   ========================================================================== */

/**
 * Client verticals — doubles as the portfolio filter set.
 *
 * `platform` and `news` are not "industries" in the trade sense; they are
 * product *types*, and they are in this union because the portfolio's job is
 * to prove range. A visitor scanning E-COMMERCE / PLATFORM / NEWS & CONTENT
 * learns in three words that we build more than brochure sites, which is
 * exactly what the category labels are there to say.
 */
export type Industry =
  | "medical"
  | "restaurant"
  | "real-estate"
  | "ecommerce"
  | "platform"
  | "news"
  | "corporate"
  | "startup"
  | "local-business"
  | "other";

/**
 * A single headline number in the Results block.
 *
 * CREDIBILITY RULE — these are the most scrutinised words on the site. Every
 * metric must be traceable to a real measurement, and `source` must say where
 * it came from. If a number cannot be sourced, use a qualitative outcome
 * instead. Invented statistics are the fastest way to lose an enterprise lead,
 * and in several markets they are also unlawful advertising.
 */
export interface ResultMetric {
  /** The number as displayed, e.g. "+184%", "2.1s", "3x". */
  value: string;
  /** What it measures, e.g. "Organic traffic, 6 months". */
  label: string;
  /** Direction, for the arrow glyph and colour. */
  trend?: "up" | "down" | "neutral";
  /** Where the figure came from, e.g. "GA4, Jan–Jun 2026". Required for trust. */
  source: string;
}

export interface GalleryItem {
  image: ImageAsset;
  /** Optional caption explaining the design decision shown. */
  caption?: string;
  /** Layout hint for the masonry/asymmetric grid. */
  span?: "full" | "half" | "third";
}

/**
 * A single observable capability of the shipped product.
 *
 * "Observable" is the whole constraint: every entry must be something a
 * visitor can go and verify on the live site in ten seconds. That is what
 * separates a feature list from a claim, and it is why this — rather than
 * `results` — is the block a project can publish on day one.
 */
export interface ProjectFeature {
  title: string;
  detail?: string;
}

/**
 * THE CASE STUDY, AND WHY ALMOST ALL OF IT IS OPTIONAL
 *
 * `overview`, `projectType`, `features` and `gallery` describe the thing that
 * exists — they can be written by looking at the product. `problem`,
 * `solution`, `results` and `outcome` describe what happened commercially,
 * which only the client can tell us, and which we do not have yet for any of
 * the three projects currently shipped.
 *
 * Making those four required would force a choice between inventing a
 * narrative and publishing nothing. So they are optional, the case-study page
 * renders only the blocks that are filled in, and a project ships honestly
 * with the half we can verify. Fill the rest in when the client confirms it.
 */
export interface CaseStudy {
  /** What the product is, in one or two paragraphs. Always available. */
  overview: string[];

  /** Plain-language product type, e.g. «متجر إلكتروني بلوحة تحكم». */
  projectType: string;

  /** What the product actually does. See `ProjectFeature`. */
  features?: ProjectFeature[];

  /** The situation the client was in. Written from their point of view. */
  problem?: {
    heading: string;
    body: string[];
    /** Bullet list of concrete symptoms — makes the pain specific. */
    symptoms?: string[];
  };

  /** What we did and, more importantly, why. */
  solution?: {
    heading: string;
    body: string[];
    /** Named decisions, e.g. "Booking moved above the fold". */
    decisions?: { title: string; detail: string }[];
  };

  /**
   * Three to five metrics — or none at all.
   *
   * Optional, and deliberately so: an empty results block is a gap a visitor
   * forgives, and a fabricated one is the single fastest way to lose a serious
   * lead. See the credibility rule on `ResultMetric`.
   */
  results?: ResultMetric[];

  /** Closing narrative paragraph after the metrics. */
  outcome?: string;

  gallery: GalleryItem[];

  /** Links to a testimonial by id, so the quote is authored in one place. */
  testimonialId?: string;

  /** Engagement facts for the sidebar. */
  meta?: {
    duration?: string;
    scope?: string[];
    team?: string;
  };
}

/**
 * How much room a project gets in the editorial portfolio layout.
 *
 * This is a layout hint living in the content layer on purpose, alongside
 * `accent`. A portfolio that art-directs itself from an array index is a grid
 * wearing a costume: the moment the order changes, the composition the
 * designer approved is gone. Naming the weight per project keeps the rhythm
 * — big, medium, smaller — attached to the work rather than to its position.
 *
 *   lead    full-bleed hero. One per page, at the top.
 *   wide    seven of twelve columns, meta offset opposite.
 *   compact six of twelve, mirrored, with the meta column taller.
 */
export type ProjectDisplay = "lead" | "wide" | "compact";

/** Which face the project's name is set in. See `titleLatin`. */
export type NameScript = "ar" | "latin";

export interface Project {
  slug: Slug;

  /** The name as its own brand uses it — Arabic when the brand has one. */
  title: string;

  /**
   * The Latin half of the name, taken from the project's own mark.
   *
   * All three shipped projects lock their name up bilingually exactly the way
   * ours does — «حاجتي ضاعت / HAJATY DAY3A», «الخبر الجديد / AL-KHABAR
   * AL-JADEED» — so the portfolio card can reproduce their real lockup rather
   * than inventing a transliteration. Never write one that is not on the mark.
   */
  titleLatin: string;

  /**
   * Which face `title` is set in. Silkscreen and Archivo carry no Arabic
   * glyphs, and Noto Kufi is the wrong voice for a Latin wordmark, so the
   * card has to be told rather than sniff the string.
   */
  script: NameScript;

  /**
   * Optional — and it stays optional.
   *
   * A client name is publishable only with written permission, and an invented
   * one is a legal exposure. Projects with no cleared name simply omit it, and
   * every consumer treats that as normal rather than as missing data.
   */
  client?: string;

  industry: Industry;

  /** Omit rather than guess. The card hides the year when it is absent. */
  year?: number;

  /** One line for the grid card. Outcome-led, not feature-led. */
  summary: string;

  /** Which services this project demonstrates. Drives cross-linking. */
  services: ServiceSlug[];

  cover: ImageAsset;

  /**
   * Powers the "Live Preview" button. Undefined hides the button entirely —
   * a dead or 404ing link on a portfolio does more damage than a missing one.
   */
  liveUrl?: string;

  /**
   * Powers the "Case Study" button and the `/work/[slug]` route. Projects
   * without one appear in the grid but are not clickable through.
   */
  caseStudy?: CaseStudy;

  /** Optional by design — most clients do not care, and it is not our pitch. */
  technologies?: string[];

  /** Surfaces on the homepage portfolio section. */
  featured: boolean;
  /** Manual sort weight, ascending. */
  order: number;
  /** Grid accent so neighbouring cards differ. */
  accent: AccentKey;
  /** Weight in the editorial layout. See `ProjectDisplay`. */
  display: ProjectDisplay;

  seo?: SeoFields;
}

/* ==========================================================================
   SOCIAL PROOF
   ========================================================================== */

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  /** Job title — anonymous praise is worth nothing. */
  role: string;
  company: string;
  /** Client headshot. Faces raise perceived credibility measurably. */
  avatar?: ImageAsset;
  companyLogo?: ImageAsset;
  /** Ties the quote back to the work that earned it. */
  projectSlug?: Slug;
  rating?: 1 | 2 | 3 | 4 | 5;
  featured?: boolean;
}

/** Logo wall entry for the trust bar under the hero. */
export interface ClientLogo {
  name: string;
  logo: ImageAsset;
  /** Render in monochrome until hover — keeps the wall visually calm. */
  invert?: boolean;
}

/** Single number for the stats strip, e.g. "3+ years", "40+ projects". */
export interface Stat {
  value: string;
  label: string;
  /** Animate from 0 to this on scroll-into-view. Omit for non-numeric values. */
  countTo?: number;
  suffix?: string;
}

/* ==========================================================================
   PROCESS / WHY US / FAQ
   ========================================================================== */

export interface ProcessStep {
  /** Zero-padded index shown in the pixel face, e.g. "01". */
  index: string;
  title: string;
  /**
   * ONE short line. The homepage renders this and nothing else.
   *
   * It used to be two sentences, and with five steps that is a hundred words
   * of methodology in the middle of a conversion page. The specifics that
   * make the process reassuring — what you get, how long it takes — are still
   * here in `deliverables` and `duration`, and `/about` still renders them.
   * The homepage's job is to show that a path exists and that it ends.
   */
  description: string;
  /** What the client walks away with. Rendered on `/about`, not the homepage. */
  deliverables: string[];
  /** How long it takes. Vagueness here reads as risk. */
  duration?: string;
  icon: string;
}

/**
 * One reason to hire us: a Latin label and a single Arabic line.
 *
 * ─── WHY THIS SHRANK ─────────────────────────────────────────────────────
 * It used to carry `description` and `proof` as well — a claim, a paragraph
 * explaining the claim, and a second sentence proving it. Five of those is
 * roughly 150 words of assertion sitting between the work and the ask, and
 * the honest reading of that block was that we did not trust the claims to
 * stand on their own.
 *
 * They do. «الموقع والكود ملكك بالكامل» needs no supporting paragraph; it is
 * either true or it is not, and a visitor who wants to test it will ask. The
 * mechanisms that used to live in `proof` are answered properly in the FAQ,
 * which is where someone actually looking for them goes.
 * ─────────────────────────────────────────────────────────────────────────
 */
export interface Differentiator {
  /** Latin label for the pixel face, e.g. "FULL OWNERSHIP". Never Arabic. */
  kicker: string;
  /** The claim, in one Arabic line. Short and falsifiable. */
  title: string;
  icon: string;
  /**
   * The longer form, used on `/about` where there is room for it and where
   * the reader has already opted into detail. Never rendered on the homepage.
   */
  description?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
  /**
   * Surfaces on the homepage.
   *
   * The full list runs to twelve, which is a reference document rather than a
   * conversion section — a visitor one screen from the ask does not read
   * twelve accordions, they scroll past all of them. Six carry the objections
   * that actually stall a deal; the rest live at `/faq`.
   */
  featured?: boolean;
}

/**
 * FAQ groupings. These mirror the real objections that stall a deal —
 * the section exists to remove friction, not to fill space.
 */
export type FaqCategory =
  | "pricing"
  | "process"
  | "timeline"
  | "technical"
  | "support";

/* ==========================================================================
   FOUNDER
   ========================================================================== */

/**
 * The founder block is a credibility instrument, not a biography. The brief is
 * explicit: credibility over self-promotion. That shapes the model — proof
 * points and verifiable links are required fields; the personal story is a
 * short supporting element.
 */
export interface Founder {
  name: string;
  role: string;
  photo: ImageAsset;

  /** The positioning line. One sentence, first person. */
  intro: string;
  /** Two to four short paragraphs. Ends on the client's benefit, not the CV. */
  story: string[];
  /**
   * The homepage cut — one or two sentences.
   *
   * The homepage and `/about` want different lengths of the same story, and
   * the alternative to this field is a component slicing `story` by index,
   * which silently changes meaning the moment a paragraph is rewritten.
   */
  shortStory: string[];

  /** Verifiable credibility markers: years active, projects shipped, sectors. */
  credentials: { label: string; value: string }[];

  /** Trust badges — certifications, partnerships, platform verifications. */
  badges: {
    label: string;
    icon?: string;
    /** Link to the issuing body. An unverifiable badge is decoration. */
    href?: string;
  }[];

  socials: {
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    github?: string;
    email?: string;
  };

  /** Optional signature image for the sign-off flourish. */
  signature?: ImageAsset;
}

/* ==========================================================================
   SEO
   ========================================================================== */

export interface SeoFields {
  /** ~55 chars. The brand suffix is appended by the metadata builder. */
  title: string;
  /** 140–160 chars. Written to earn the click, not to stuff keywords. */
  description: string;
  keywords?: string[];
  /** Custom OG image. Falls back to the generated route-level image. */
  ogImage?: string;
  /** Exclude from sitemap + set noindex. For thin or legal pages. */
  noIndex?: boolean;
}

/* ==========================================================================
   NAVIGATION
   ========================================================================== */

export interface NavItem {
  label: string;
  href: string;
  /** Renders a mega-menu column instead of a plain link. */
  children?: NavItem[];
  /** Short line shown under the label inside the mega-menu. */
  description?: string;
  external?: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

/* ==========================================================================
   CONCEPT LAB
   --------------------------------------------------------------------------
   Self-initiated product directions — the answer to "can you build something
   more complicated than a website", asked by a visitor who has just seen
   three websites.

   THE RULE, AND IT IS NOT NEGOTIABLE: nothing modelled here is client work,
   and every surface that renders it must say so in words the visitor reads
   before the picture. There is no `client`, no `liveUrl`, no `results` and no
   `year` on this type, and their absence is the point — a concept has no
   commercial history to report, so the shape of the data makes it impossible
   to imply one by filling in a field.

   The screens are drawn in `components/graphics/`, not photographed. See the
   note at the head of `components/graphics/ui-fragments.tsx`.
   ========================================================================== */

/** One screen inside a concept. `screen` keys into the drawing registry. */
export interface ConceptScreenRef {
  /** Arabic name of the screen, e.g. «شاشة التحليلات». */
  label: string;
  /**
   * A key in `conceptScreens` (`components/graphics/concept-screens.tsx`).
   * A string rather than a component so the content layer stays free of React
   * imports — the same contract `Service.icon` keeps with the icon registry.
   */
  screen: string;
}

export interface ConceptProject {
  id: string;
  /** Zero-padded editorial number, e.g. "01". Pixel face. */
  index: string;
  /** Arabic name of the direction. */
  title: string;
  /** Latin lockup for the pixel/Archivo face. */
  titleLatin: string;
  /** Latin category label, e.g. "OPERATIONS". Silkscreen — never Arabic. */
  kicker: string;
  /** Plain-language product type, e.g. «نظام إدارة أعمال». */
  discipline: string;
  /** Two sentences. What the product is for, in business language. */
  summary: string;
  /** The screens modelled, in the order they are shown. */
  screens: ConceptScreenRef[];
  /** What building it would involve, as outcomes rather than technologies. */
  capabilities: string[];
  accent: AccentKey;
}

/* ==========================================================================
   CAPABILITIES
   --------------------------------------------------------------------------
   "We do not only build websites", said as a list of things a business owner
   can recognise rather than as a stack of technologies.
   ========================================================================== */

export interface Capability {
  id: string;
  /** Latin label for the pixel face. */
  kicker: string;
  title: string;
  /** One sentence. An outcome, never an implementation. */
  description: string;
  icon: string;
  /**
   * The fragment drawn beside this row, keyed into the concept-screen
   * registry. Optional — a capability with no drawing simply shows none.
   */
  screen?: string;
  /** Where to send someone who wants this. A real route, or omitted. */
  href?: string;
}
