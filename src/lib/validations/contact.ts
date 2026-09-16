import { z } from "zod";

import { EMAIL_PATTERN, PHONE_PATTERN, PROJECT_TYPES } from "./contact-fields";

/**
 * WEBCRAFT — LEAD FORM SCHEMA (server)
 *
 * The Route Handler re-validates every submission with this schema — client
 * validation is UX, never a security boundary. The browser form imports its
 * rules from `contact-fields.ts` so zod never reaches the client bundle.
 */

export { EMAIL_PATTERN, PHONE_PATTERN, PROJECT_TYPES } from "./contact-fields";
export type { ContactInput, ProjectType } from "./contact-fields";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().toLowerCase().regex(EMAIL_PATTERN).max(160),
  phone: z
    .string()
    .trim()
    .max(40)
    .refine((v) => v === "" || PHONE_PATTERN.test(v))
    .optional(),
  projectType: z.enum(PROJECT_TYPES),
  message: z.string().trim().min(10).max(4000),
  locale: z.enum(["ar", "en"]).optional(),
  /** Honeypot — hidden from people, filled by bots. */
  website: z.string().max(0).optional(),
});

export type ContactResponse =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };
