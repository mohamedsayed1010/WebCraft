"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { duration, easing, inViewDefaults, rise, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * CONCEPT SWITCHER
 *
 * Four directions, one on screen at a time.
 *
 * ─── WHY ONE AT A TIME ───────────────────────────────────────────────────
 * Stacked, these four would run to roughly four extra screens of scrolling
 * between the process and the founder — and they are the *least* load-bearing
 * proof on the page, because none of them shipped. Real work earns height;
 * concept work earns a compartment. Selecting into it also makes the section
 * something the visitor operates rather than scrolls past, which is worth
 * more here than length would be.
 *
 * ─── THE LABEL IS LOAD-BEARING ───────────────────────────────────────────
 * «مشروع تصوّري — تجريبي» renders above the drawing, in Arabic, at every
 * viewport, for every concept, before anything else in the panel. It is not a
 * footnote and it is not a hover state. A visitor who scrolls past this
 * section at speed must still come away knowing these are not client
 * projects — that is the single requirement the whole section is built
 * around. See the warning at the head of `content/concepts.ts`.
 *
 * ─── SERVER / CLIENT SPLIT ───────────────────────────────────────────────
 * Same contract as the capability explorer: every drawing is rendered on the
 * server and handed down as a node, so none of the graphics library is
 * shipped to the browser. This file is the entire client cost.
 * ─────────────────────────────────────────────────────────────────────────
 */

export interface ConceptTab {
  id: string;
  index: string;
  title: string;
  titleLatin: string;
  kicker: string;
  discipline: string;
  summary: string;
  capabilities: string[];
  screenLabels: string[];
}

export function ConceptSwitcher({
  concepts,
  stages,
  badge,
}: {
  concepts: ConceptTab[];
  /** The screens for each concept id, pre-rendered on the server. */
  stages: Record<string, React.ReactNode>;
  badge: { ar: string; latin: string };
}) {
  const [active, setActive] = useState(concepts[0]?.id ?? "");
  const current = concepts.find((concept) => concept.id === active) ?? concepts[0];

  if (!current) return null;

  return (
    <div className="mt-14">
      {/* ── Selector ────────────────────────────────────────────────────
          Real buttons in a tablist, not styled divs: this is the one control
          on the homepage a keyboard user has to be able to operate, and
          arrow-key semantics come free from the roles. */}
      <motion.div
        variants={staggerContainer(0.06)}
        {...inViewDefaults}
        role="tablist"
        aria-label="مشاريع تصوّرية"
        className="border-border flex flex-wrap gap-2 border-b pb-5"
      >
        {concepts.map((concept) => {
          const isActive = concept.id === active;

          return (
            <motion.button
              key={concept.id}
              variants={rise}
              type="button"
              role="tab"
              id={`concept-tab-${concept.id}`}
              aria-selected={isActive}
              aria-controls={`concept-panel-${concept.id}`}
              onClick={() => setActive(concept.id)}
              className={cn(
                "rounded-pill group flex items-center gap-3 px-4 py-2.5",
                "duration-base ease-brand transition-[background-color,box-shadow,color]",
                "focus-visible:outline-offset-4",
                isActive
                  ? "bg-graphic-fill ring-graphic-line text-fg ring-1"
                  : "text-fg-subtle hover:text-fg hover:bg-white/[0.05]",
              )}
            >
              <span
                dir="ltr"
                className={cn(
                  "pixel-label transition-colors",
                  isActive ? "text-graphic" : "text-fg-subtle",
                )}
              >
                {concept.index}
              </span>
              <span className="text-sm font-semibold whitespace-nowrap">
                {concept.title}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* ── Panel ───────────────────────────────────────────────────────
          `mode="wait"` rather than a crossfade: two dashboard drawings
          dissolving through each other for 400ms is visual mush, and the
          brief's line about over-animation is exactly this. Out, then in. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current.id}
          role="tabpanel"
          id={`concept-panel-${current.id}`}
          aria-labelledby={`concept-tab-${current.id}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: duration.base, ease: easing.brand }}
          className="grid gap-12 pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16"
        >
          {/* ── The written half ─────────────────────────────────────── */}
          <div className="flex flex-col">
            {/* THE BADGE. First thing in the panel, above the name, above
                the drawing. Do not move it and do not soften it. */}
            <span className="border-graphic-line bg-graphic-fill rounded-pill inline-flex w-fit items-center gap-2.5 border px-3.5 py-2">
              <span
                aria-hidden="true"
                className="bg-graphic-muted size-1.5 rounded-full"
              />
              <span className="text-graphic text-xs font-bold">{badge.ar}</span>
            </span>

            {/* The Latin lockup and the category. Deduped rather than always
                joined: the two coincide for some directions, and «OPERATIONS
                · OPERATIONS» reads as a rendering bug, not as a label. */}
            <span dir="ltr" className="pixel-label text-fg-subtle mt-7 block">
              {current.titleLatin === current.kicker
                ? current.titleLatin
                : `${current.titleLatin} · ${current.kicker}`}
            </span>

            <h3 className="font-display mt-3 text-3xl font-extrabold md:text-4xl">
              {current.title}
            </h3>

            <p className="text-fg-subtle mt-2 text-sm">{current.discipline}</p>

            <p className="text-fg-muted leading-body mt-6 max-w-[46ch] text-base">
              {current.summary}
            </p>

            {/* What building it would involve. Outcomes, not technologies —
                nothing here claims a stack we have not named elsewhere. */}
            <ul className="border-border mt-8 flex flex-col border-t">
              {current.capabilities.map((capability) => (
                <li
                  key={capability}
                  className="border-border text-fg-muted flex items-center gap-3 border-b py-3 text-sm"
                >
                  <span
                    aria-hidden="true"
                    className="bg-graphic-muted size-1 shrink-0 rounded-full"
                  />
                  {capability}
                </li>
              ))}
            </ul>

            <ul
              dir="ltr"
              className="mt-7 flex flex-wrap gap-x-2 gap-y-2"
              aria-label="الشاشات"
            >
              {current.screenLabels.map((label) => (
                <li
                  key={label}
                  dir="rtl"
                  className="border-border text-fg-subtle rounded-pill border px-3 py-1.5 text-xs"
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* ── The drawings ─────────────────────────────────────────── */}
          <div className="relative">
            <span
              aria-hidden="true"
              className="orb-violet pointer-events-none absolute -inset-12 -z-10"
            />
            {stages[current.id]}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
