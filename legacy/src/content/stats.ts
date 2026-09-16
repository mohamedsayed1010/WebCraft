import type { Stat } from "@/types";

/**
 * WEBCRAFT — HERO TRUST STRIP
 *
 * Three facts, directly under the hero CTAs, and every one of them is
 * checkable by the person reading it.
 *
 * ─── WHAT WAS REMOVED, AND WHY ───────────────────────────────────────────
 * «أقل من تانيتين» (a <2s average load time) used to sit here. It was never
 * measured across the three shipped projects, and an unverified performance
 * number is the most dangerous kind of claim on this page: it is the one a
 * technically-minded prospect will actually go and test. One failed test
 * discredits every other line on the site, including the true ones.
 *
 * The remaining three are true today:
 *   • «٣+ سنين» — trading since 2022.
 *   • «٣ مشاريع أونلاين» — counted from `featuredProjects`, so it can never
 *     drift away from the portfolio the visitor is about to scroll into.
 *   • «رد في نفس اليوم» — the WhatsApp promise, made everywhere and kept.
 *
 * A volume claim goes here only when there is a real count behind it.
 * `publishedStats` drops any entry with an empty value, and the strip hides
 * itself if none survive.
 */

import { featuredProjects } from "./projects";

export const stats: Stat[] = [
  {
    value: "3+",
    label: "سنين شغل مع أصحاب بيزنس",
    countTo: 3,
    suffix: "+",
  },
  {
    /* Derived, never typed by hand — the number and the proof stay in sync. */
    value: String(featuredProjects.length),
    label: "مشاريع شغّالة أونلاين دلوقتي",
    countTo: featuredProjects.length,
  },
  {
    value: "24h",
    label: "بنرد في نفس يوم الشغل",
  },
];

/** Only render stats that have a real value. */
export const publishedStats = stats.filter((stat) => stat.value.length > 0);
