import type { MediaKey } from "@/content/media.generated";
import type { Locale } from "@/i18n/config";

/**
 * WEBCRAFT — CONTENT MODEL
 *
 * Structure (slugs, URLs, images) is written once. Words are written per
 * language inside `Localized<T>`, so TypeScript refuses to build if a string
 * exists in Arabic but not in English, or the other way round.
 */

export type Localized<T> = Record<Locale, T>;

/* ── Services ──────────────────────────────────────────────────────────── */

export type ServiceSlug =
  | "frontend-development"
  | "backend-development"
  | "ui-ux-design"
  | "seo"
  | "ecommerce-development"
  | "web-applications"
  | "progressive-web-apps"
  | "android-apps";

export type ServiceVisual =
  | "frontend"
  | "backend"
  | "uiux"
  | "seo"
  | "ecommerce"
  | "webapps"
  | "pwa"
  | "android";

export interface ServiceText {
  name: string;
  /** One-line promise used in cards and the explorer list. */
  tagline: string;
  /** What we do — 1–2 sentences. */
  what: string;
  /** Why it matters to the business. */
  why: string;
  /** What we build. */
  builds: string[];
  /** How it helps the client — outcomes, never invented numbers. */
  outcomes: string[];
  seoTitle: string;
  seoDescription: string;
}

export interface Service {
  slug: ServiceSlug;
  index: string;
  visual: ServiceVisual;
  accent: "brand" | "aqua";
  /** Technology or capability tags. Only verified technologies appear here. */
  stack: string[];
  /** Real projects that demonstrate the service. */
  proof: ProjectSlug[];
  text: Localized<ServiceText>;
}

/* ── Projects ──────────────────────────────────────────────────────────── */

export type ProjectSlug =
  | "dahab-el-araby"
  | "shopik-lopik"
  | "bay3"
  | "verra"
  | "hajaty-day3a"
  | "alkhabar-aljadid";

export interface ProjectText {
  name: string;
  category: string;
  /** One sentence for cards. */
  summary: string;
  overview: string[];
  built: string[];
  features: { title: string; detail: string }[];
  /** Honest status note, e.g. a demo build. */
  note?: string;
  seoTitle: string;
  seoDescription: string;
}

export interface Shot {
  key: MediaKey;
  /** Doubles as alt text and caption. Describes what is on screen. */
  label: Localized<string>;
}

export interface Project {
  slug: ProjectSlug;
  liveUrl: string;
  /** Glow tone for the showcase, as an RGB triplet. */
  tone: string;
  featured: boolean;
  /** "live" = a deployed product; "demo" = a concept build, labelled as such. */
  status: "live" | "demo";
  /** "phones" leads the showcase with mobile screens (app-first products). */
  showcase?: "browser" | "phones";
  desktop: Shot[];
  mobile: Shot[];
  /** Verified technologies/capabilities only. */
  stack: string[];
  services: ServiceSlug[];
  text: Localized<ProjectText>;
}
