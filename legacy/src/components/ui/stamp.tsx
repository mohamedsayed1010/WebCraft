"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * WEBCRAFT — ROTATING STAMP
 *
 * The logo is built on a disc. This is that disc, promoted from a container to
 * a graphic element: a slowly rotating ring of type with a mark at its centre.
 *
 * ─── WHY THE TEXT IS LATIN ───────────────────────────────────────────────
 * Circular text is laid out by `textPath`, which positions each glyph
 * independently along a curve. For Arabic that is fatal for the same reason
 * per-character animation is (see `SplitText`): the letters are cursive and
 * joined, and distributing them along a path severs the joins and forces
 * isolated forms. The word renders misspelled.
 *
 * So the ring carries the Latin tagline — WE DESIGN · WE BUILD · WE GROW —
 * which is exactly what the brand's Latin lockup is for, and the Arabic lives
 * in flat type elsewhere on the page. The constraint produced the right answer.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * The rotation is a single infinite CSS-driven transform on the SVG, not a
 * per-glyph animation — it composites on the GPU and costs nothing.
 */

interface StampProps {
  className?: string;
  size?: number;
  /** Seconds per full revolution. Slow is the point; 22s reads as ambient. */
  duration?: number;
  /** Reverse direction, for a second stamp elsewhere on the page. */
  reverse?: boolean;
  children?: React.ReactNode;
}

const RING_TEXT = "WE DESIGN · WE BUILD · WE GROW · ";

/** One glyph per slot, spread evenly around the full 360°. */
const RING_CHARS = [...RING_TEXT];
const RING_STEP = 360 / RING_CHARS.length;

export function Stamp({
  className,
  size = 132,
  duration = 22,
  reverse = false,
  children,
}: StampProps) {
  return (
    <div
      className={cn("relative grid place-items-center", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 size-full"
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {/* ── The ring, one glyph at a time ────────────────────────────
            Not `<textPath>`. That is the obvious way to write this and it
            renders nothing here: every character reports a 0×0 extent, so the
            ring silently disappears while the markup looks perfectly correct.
            It also needs an `id`, and an id inside a component rendered more
            than once per page (hero + founder) collides with itself.

            Placing each glyph on its own rotation is immune to both problems
            and needs no references at all. Splitting text per character is
            normally forbidden in this codebase because it destroys Arabic
            cursive joins — safe here, and only here, because the ring is
            Latin by construction (Silkscreen carries no Arabic glyphs). */}
        {RING_CHARS.map((char, index) => (
          <text
            key={`${char}-${index}`}
            x="100"
            // y=30 against a centre of (100,100) puts the baseline on a
            // radius-70 circle, which clears the 200 viewBox comfortably.
            y="30"
            textAnchor="middle"
            transform={`rotate(${index * RING_STEP} 100 100)`}
            fill="var(--color-lime-500)"
            className="font-pixel"
            style={{ fontSize: 13 }}
          >
            {char}
          </text>
        ))}
      </motion.svg>

      {/* Static centre. Deliberately outside the rotating SVG so whatever sits
          here — an arrow, the mark, a dot — stays upright. */}
      <div className="relative grid place-items-center">
        {children ?? (
          <span className="bg-lime-500 shadow-glow-lime block size-2.5 rounded-full" />
        )}
      </div>
    </div>
  );
}
