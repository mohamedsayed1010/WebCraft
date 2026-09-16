import type { ProjectSlug } from "@/types";

/**
 * WEBCRAFT — TECHNOLOGIES
 *
 * Each entry cites where it was verified. "webcraft-site" means this website
 * itself (Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion). Project
 * slugs mean the technology was detected in that project's deployed build.
 */

export type TechGroup = "frontend" | "backend" | "platform";

export interface Technology {
  name: string;
  group: TechGroup;
  /** Short code-ish glyph used as the tile mark. */
  mark: string;
  usedIn: (ProjectSlug | "webcraft-site")[];
}

export const technologies: Technology[] = [
  { name: "React", group: "frontend", mark: "Re", usedIn: ["dahab-el-araby", "shopik-lopik", "bay3", "verra", "hajaty-day3a"] },
  { name: "Next.js", group: "frontend", mark: "N", usedIn: ["bay3", "webcraft-site"] },
  { name: "TypeScript", group: "frontend", mark: "TS", usedIn: ["webcraft-site"] },
  { name: "Tailwind CSS", group: "frontend", mark: "Tw", usedIn: ["dahab-el-araby", "bay3", "webcraft-site"] },
  { name: "Vite", group: "frontend", mark: "Vi", usedIn: ["dahab-el-araby", "shopik-lopik", "verra", "hajaty-day3a"] },
  { name: "Framer Motion", group: "frontend", mark: "Fm", usedIn: ["webcraft-site"] },

  { name: "REST APIs", group: "backend", mark: "{ }", usedIn: ["shopik-lopik"] },
  { name: "ASP.NET Core", group: "backend", mark: ".NET", usedIn: ["shopik-lopik", "hajaty-day3a"] },
  { name: "Authentication", group: "backend", mark: "Au", usedIn: ["shopik-lopik", "hajaty-day3a", "dahab-el-araby"] },
  { name: "Admin Dashboards", group: "backend", mark: "Ad", usedIn: ["bay3", "dahab-el-araby"] },

  { name: "PWA", group: "platform", mark: "Pw", usedIn: ["dahab-el-araby", "shopik-lopik"] },
  { name: "Android", group: "platform", mark: "An", usedIn: [] },
  { name: "SEO", group: "platform", mark: "Se", usedIn: ["webcraft-site", "shopik-lopik"] },
  { name: "Vercel", group: "platform", mark: "▲", usedIn: ["bay3", "verra", "hajaty-day3a"] },
];
