"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback } from "react";

import { duration, easing, spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * HERO COLLAGE
 *
 * The visual system behind the pitch: three interface fragments and the brand
 * stamp, layered at different depths and leaning toward the pointer.
 *
 * ─── WHAT IT IS SAYING ───────────────────────────────────────────────────
 * The headline promises a website. The collage is what stops that promise
 * being read as "a page with a photo on it": a chart, a catalogue, a
 * conversation, arranged as one product. Four seconds after landing, before a
 * word is read, the visitor has already been told that this studio builds
 * interfaces — which is the claim the Capabilities section then makes in
 * words two screens later.
 *
 * ─── WHY THESE ARE DRAWINGS AND NOT SCREENSHOTS ──────────────────────────
 * A real capture in here would sit two hundred pixels above the portfolio,
 * which is where the real captures live and where they are labelled with the
 * URL you can open. Mixing invented interfaces and shipped ones in the same
 * eyeful is the exact adjacency the Concept Lab is placed six sections away
 * to avoid. The hero is atmosphere; section 01 is evidence. Keeping the two
 * visually distinct is what lets the evidence be believed.
 *
 * ─── THE MOTION, AND ITS THREE LIMITS ────────────────────────────────────
 *   1. Parallax is pointer-driven, not scroll-driven. The collage sits at the
 *      top of the page where there is no scroll distance to spend, and a
 *      hero that reacts to the mouse reads as responsive rather than as
 *      decorated.
 *   2. Rotation is capped at 4°. Past roughly 6° a flat panel starts to look
 *      like a 3D render, which is a different and much cheaper genre.
 *   3. Mouse only, and off entirely under `prefers-reduced-motion` — on touch
 *      there is no pointer to lean toward, and the transform would fire on
 *      the first tap and make the collage feel like it flinched.
 *
 * The fragments themselves arrive as pre-rendered nodes from the server hero.
 * The graphics library never reaches the browser; this file and its springs
 * are the whole client cost of the composition.
 * ─────────────────────────────────────────────────────────────────────────
 */

/**
 * Depth per layer: pixels of pointer travel, and the sign is the depth cue.
 *
 * Opposing signs are what produce parallax rather than a group slide — the
 * panel in front moves with the pointer while the one behind it moves against,
 * which is the whole illusion. Named rather than indexed out of an array so a
 * layer can never silently pick up the wrong plane.
 */
const DEPTH = {
  primary: 22,
  secondary: -16,
  accent: 12,
  stamp: -9,
} as const;

export function HeroCollage({
  fragments,
  stamp,
  className,
}: {
  /** Three nodes, in depth order: analytics panel, catalogue, conversation. */
  fragments: React.ReactNode[];
  stamp: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  /* Pointer position, normalised to -0.5…0.5 across the collage box. */
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const x = useSpring(pointerX, spring.magnetic);
  const y = useSpring(pointerY, spring.magnetic);

  const rotateY = useTransform(x, [-0.5, 0.5], [-4, 4]);
  const rotateX = useTransform(y, [-0.5, 0.5], [4, -4]);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse") return;

      const rect = event.currentTarget.getBoundingClientRect();
      pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
      pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    [pointerX, pointerY],
  );

  const reset = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  return (
    <div
      aria-hidden="true"
      onPointerMove={reduced ? undefined : handlePointerMove}
      onPointerLeave={reset}
      className={cn("relative", className)}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative aspect-[5/5.4] w-full"
      >
        {/* ── Primary: the analytics panel ─────────────────────────────
            Largest, most central, and the only layer that reads as a whole
            application. Everything else is a corner of something. */}
        <Layer
          depth={DEPTH.primary}
          x={x}
          y={y}
          reduced={reduced}
          delay={0.35}
          className="absolute top-[7%] start-0 w-[88%]"
        >
          {fragments[0]}
        </Layer>

        {/* ── Secondary: the catalogue, tucked behind the near corner ── */}
        <Layer
          depth={DEPTH.secondary}
          x={x}
          y={y}
          reduced={reduced}
          delay={0.5}
          className="absolute -end-[3%] bottom-[9%] w-[56%]"
        >
          {fragments[1]}
        </Layer>

        {/* ── Accent: the conversation ─────────────────────────────────
            Deliberately the smallest and the furthest forward. It is the one
            fragment carrying lime, and it sits at the corner the eye reaches
            last — which is where an accent is worth the most. */}
        <Layer
          depth={DEPTH.accent}
          x={x}
          y={y}
          reduced={reduced}
          delay={0.62}
          className="absolute bottom-0 start-[2%] w-[50%]"
        >
          {fragments[2]}
        </Layer>

        {/* ── The stamp ────────────────────────────────────────────────
            The brand's own disc, sitting on the collage rather than beside
            it. This is what keeps the composition WebCraft's and not a stock
            "dashboard hero". */}
        <Layer
          depth={DEPTH.stamp}
          x={x}
          y={y}
          reduced={reduced}
          delay={0.74}
          /* The stamp gets the one corner no panel reaches. It sat at the
             start edge, where the analytics panel is anchored, and read as
             an accident — a disc half-swallowed by a window frame rather
             than a mark placed on a composition. */
          className="absolute -top-[4%] -end-[7%]"
        >
          <span className="bg-ink-900/70 block rounded-full backdrop-blur-sm">
            {stamp}
          </span>
        </Layer>
      </motion.div>
    </div>
  );
}

/* ==========================================================================
   LAYER
   --------------------------------------------------------------------------
   One depth plane: entrance, then pointer travel. The two are separate
   transforms on separate elements on purpose — Framer cannot interpolate an
   entrance and track a spring on the same property, and doing it in one node
   produces a layer that snaps to centre the moment its entrance finishes.
   ========================================================================== */

function Layer({
  children,
  className,
  depth,
  x,
  y,
  delay,
  reduced,
}: {
  children: React.ReactNode;
  className?: string;
  depth: number;
  x: ReturnType<typeof useSpring>;
  y: ReturnType<typeof useSpring>;
  delay: number;
  reduced: boolean | null;
}) {
  const translateX = useTransform(x, (value) => value * depth);
  const translateY = useTransform(y, (value) => value * depth);

  return (
    <motion.div
      initial={{ opacity: 0, y: 26, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: duration.reveal, ease: easing.brand, delay }}
      className={cn("will-animate", className)}
    >
      <motion.div style={reduced ? undefined : { x: translateX, y: translateY }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
