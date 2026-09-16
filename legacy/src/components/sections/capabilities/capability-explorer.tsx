"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { duration, easing, inViewDefaults, rise, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * CAPABILITY EXPLORER
 *
 * Six rows on the reading side, one drawing on the other, and the drawing
 * follows whichever row the visitor is on.
 *
 * ─── WHY THIS SHAPE AND NOT SIX CARDS ────────────────────────────────────
 * A card grid would have said "here are six things we do" and been finished
 * in one glance. The point of this section is that the visitor sees what a
 * dashboard or an internal tool *looks like when we build it* — that is the
 * claim, and a claim about design has to be demonstrated rather than listed.
 *
 * A single canvas that changes as you move down the list also does something
 * a grid cannot: it makes the six read as one coherent product family, drawn
 * by one hand, which is the actual argument being made.
 *
 * ─── WHY THE DRAWINGS ARRIVE AS PROPS ────────────────────────────────────
 * `panels` and `glyphs` are rendered by the server component that wraps this
 * and handed down as React nodes. The state has to be here, but the twenty-odd
 * fragment components behind each drawing do not — passing them in means the
 * whole graphics library stays server-rendered and none of it is shipped to
 * the browser. The client cost of this section is this file and nothing else.
 *
 * ─── INTERACTION ─────────────────────────────────────────────────────────
 * Pointer enter and keyboard focus both select, so the section is fully usable
 * from the keyboard and the canvas is never stuck on the first item for
 * someone tabbing through. Selection never moves on click: three of the six
 * rows are real links, and a canvas that changed at the moment of navigation
 * would flash a new drawing on the way out of the page.
 *
 * Below `lg` the canvas is not rendered at all. A phone has no hover, and a
 * 320px-wide drawing of a dashboard is a smudge — the rows carry the section
 * on mobile, which is what they are written to be able to do.
 * ─────────────────────────────────────────────────────────────────────────
 */

export interface CapabilityRow {
  id: string;
  kicker: string;
  title: string;
  description: string;
  href?: string;
}

export function CapabilityExplorer({
  items,
  panels,
  glyphs,
}: {
  items: CapabilityRow[];
  /** Drawing per capability id, rendered on the server. */
  panels: Record<string, React.ReactNode>;
  /** Icon per capability id, rendered on the server. */
  glyphs: Record<string, React.ReactNode>;
}) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  return (
    <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-start lg:gap-16">
      {/* ── The rows ─────────────────────────────────────────────────── */}
      <motion.ul
        variants={staggerContainer(0.07)}
        {...inViewDefaults}
        className="border-border flex flex-col border-t"
      >
        {items.map((item, index) => {
          const isActive = item.id === active;

          const body = (
            <>
              <span
                aria-hidden="true"
                className={cn(
                  "chip-icon shrink-0 transition-colors",
                  isActive &&
                    "border-violet-400/55 bg-violet-500/20 text-violet-100",
                )}
              >
                {glyphs[item.id]}
              </span>

              <span className="min-w-0 flex-1">
                <span dir="ltr" className="flex items-center gap-2.5">
                  <span className="pixel-label text-fg-subtle">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-px w-4 transition-[width,background-color]",
                      "duration-base ease-brand",
                      isActive ? "bg-graphic-muted w-8" : "bg-border-strong",
                    )}
                  />
                  <span className="pixel-label text-graphic">{item.kicker}</span>
                </span>

                {/* The arrow sits against the title, not at the far edge of
                    the row. At this row width the end-aligned version left
                    four hundred pixels of nothing between the words and the
                    affordance, and an arrow that far from its label stops
                    reading as belonging to it.

                    It also only exists on rows that go somewhere: an
                    affordance on a row that does not navigate is a promise
                    the section cannot keep. */}
                <span className="mt-3 flex items-center gap-3">
                  <span className="font-display block text-xl font-bold md:text-2xl">
                    {item.title}
                  </span>

                  {item.href ? (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "text-fg-subtle shrink-0 transition-[color,transform]",
                        "duration-base ease-brand",
                        isActive && "text-accent -translate-x-1.5",
                      )}
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="size-5">
                        <path
                          d="M19 12H5m0 0 6-6m-6 6 6 6"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  ) : null}
                </span>

                <span className="text-fg-muted leading-body mt-2 block max-w-[46ch] text-sm">
                  {item.description}
                </span>
              </span>
            </>
          );

          const shared = cn(
            "relative flex w-full items-start gap-5 py-7 text-start",
            "transition-colors duration-base ease-brand",
          );

          return (
            <motion.li
              key={item.id}
              variants={rise}
              onPointerEnter={() => setActive(item.id)}
              onFocus={() => setActive(item.id)}
              className="border-border relative border-b"
            >
              {/* The active mark: a violet hairline riding the row's start
                  edge. It scales from the row's own top rather than fading,
                  so moving down the list reads as one indicator travelling
                  rather than six lights blinking. */}
              <span
                aria-hidden="true"
                className={cn(
                  "bg-graphic-muted absolute inset-y-0 -start-4 w-px origin-top",
                  "duration-base ease-brand transition-transform",
                  isActive ? "scale-y-100" : "scale-y-0",
                )}
              />

              {item.href ? (
                <Link href={item.href} className={cn(shared, "group")}>
                  {body}
                </Link>
              ) : (
                <div className={shared}>{body}</div>
              )}
            </motion.li>
          );
        })}
      </motion.ul>

      {/* ── The canvas ───────────────────────────────────────────────────
          Sticky, so the drawing stays beside whichever row is being read on
          a tall viewport. `top-32` clears the floating header. */}
      <div className="hidden lg:block lg:sticky lg:top-32">
        <motion.div
          variants={rise}
          {...inViewDefaults}
          className="relative aspect-[4/3.1]"
        >
          <span
            aria-hidden="true"
            className="orb-violet pointer-events-none absolute -inset-10 -z-10"
          />

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: duration.fast, ease: easing.brand }}
              className="absolute inset-0"
            >
              {panels[active]}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Says out loud what the drawing is, so nobody mistakes an invented
            interface for a delivered one. The Concept Lab makes the same
            promise at full volume; here it is a caption, because the section
            above it is about capability rather than about the picture. */}
        <p dir="ltr" className="pixel-label text-fg-subtle mt-5 text-center">
          UI SKETCH · NOT A CLIENT PROJECT
        </p>
      </div>
    </div>
  );
}
