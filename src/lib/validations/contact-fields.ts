/**
 * Contact form constants shared by the browser form and the server schema.
 *
 * Deliberately free of `zod`: the form only needs these values, and importing
 * them from the schema file shipped the whole validation library to every
 * visitor (~320 kB chunk). `contact.ts` builds the server schema from here.
 */

export const PROJECT_TYPES = [
  "website",
  "ecommerce",
  "webapp",
  "pwa",
  "android",
  "uiux",
  "seo",
  "other",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE_PATTERN = /^[+\d][\d\s()-]{6,19}$/;

export interface ContactInput {
  name: string;
  email: string;
  phone?: string;
  projectType: ProjectType;
  message: string;
  locale?: "ar" | "en";
  website?: string;
}
