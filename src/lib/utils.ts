import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's default scale, so without this it reads
 * `text-display` as a colour and silently drops it next to `text-fg`. The
 * custom type steps and radii from `styles/tokens.css` are registered here.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["hero", "mega", "display", "headline", "title", "lead"],
      radius: ["card", "panel"],
    },
  },
});

/**
 * Merge Tailwind classes with correct conflict resolution.
 * Later classes win, so component defaults can always be overridden by a
 * caller's `className` — the convention every component here follows.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Absolute URL against the canonical origin. Needed for OG tags and JSON-LD. */
export function absoluteUrl(path = ""): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

/** "01", "02", … — the pixel-face section indices. */
export function pad(n: number, length = 2): string {
  return String(n).padStart(length, "0");
}

/** Clamp a number, used by parallax and progress maths. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Map a value from one range to another. The workhorse of scroll effects. */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  if (inMax - inMin === 0) return outMin;
  return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);
}

/** Split a string into words, preserving spaces for split-text reveals. */
export function splitWords(text: string): string[] {
  return text.split(/(\s+)/).filter((chunk) => chunk.length > 0);
}

/** Deterministic slug for ids generated from content strings. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Format a date consistently across server and client (avoids hydration drift). */
export function formatDate(input: string | Date, locale = "en-US"): string {
  const date = typeof input === "string" ? new Date(input) : input;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** `bay3.vercel.app` — the address a visitor would see in their browser. */
export function displayUrl(href: string): string {
  try {
    const url = new URL(href);
    return `${url.host}${url.pathname.replace(/\/$/, "")}`;
  } catch {
    return href;
  }
}