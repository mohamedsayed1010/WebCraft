/**
 * WEBCRAFT — SHARED FRAMER MOTION VARIANTS
 *
 * The reveal vocabulary, defined once.
 *
 * Components import from here rather than writing inline `initial`/`animate`
 * objects. The point is not brevity — it is that every entrance on the site
 * shares the same easing and the same rhythm, which is the difference between
 * a site that feels art-directed and one that feels assembled.
 *
 * Reduced motion is NOT handled inside these variants. It is handled once, at
 * the root, by `<MotionConfig reducedMotion="user">`, which strips transform
 * and layout animation while preserving opacity. One switch, no per-component
 * branching.
 */

import type { Variants } from "framer-motion";
import { distance, duration, easing, stagger } from "./tokens";

/* --------------------------------------------------------------------------
   CONTAINERS
   -------------------------------------------------------------------------- */

/** Parent that staggers its children. Pair with any child variant below. */
export const staggerContainer = (
  childDelay: number = stagger.base,
  initialDelay = 0,
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: childDelay,
      delayChildren: initialDelay,
    },
  },
});

/* --------------------------------------------------------------------------
   TEXT
   -------------------------------------------------------------------------- */

/**
 * The headline reveal: each line sits inside an `overflow-hidden` wrapper and
 * slides up from beneath its own baseline. This is the single most recognisable
 * "premium agency" move, and it costs nothing because it animates only
 * transform and opacity.
 *
 * Requires the parent line wrapper to have `overflow: hidden`.
 */
export const lineReveal: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: duration.reveal, ease: easing.brand },
  },
};

/** Per-word or per-character variant for split headlines. */
export const splitReveal: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: duration.slow, ease: easing.brand },
  },
};

/* --------------------------------------------------------------------------
   GENERAL ENTRANCES
   -------------------------------------------------------------------------- */

/** The house default: a short rise with a fade. Used for most content blocks. */
export const rise: Variants = {
  hidden: { y: distance.base, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: duration.slow, ease: easing.brand },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.base, ease: easing.soft },
  },
};

/** Cards and media. Never apply to text — scaling type looks like a bug. */
export const scaleIn: Variants = {
  hidden: { scale: 0.96, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: duration.slow, ease: easing.brand },
  },
};

/* --------------------------------------------------------------------------
   MEDIA
   -------------------------------------------------------------------------- */

/**
 * Image reveal — a clip-path wipe with a counter-scale on the inner <img>.
 *
 * The two halves belong together: the frame unmasks while the image itself
 * settles from 1.12 → 1. That counter-movement is what makes it read as
 * cinematic rather than as a rectangle growing.
 */
export const imageMask: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: duration.cinematic, ease: easing.brand },
  },
};

export const imageScale: Variants = {
  hidden: { scale: 1.12 },
  visible: {
    scale: 1,
    transition: { duration: duration.cinematic, ease: easing.brand },
  },
};

/* --------------------------------------------------------------------------
   SVG
   -------------------------------------------------------------------------- */

/** Stroke-draw for ribbon strokes, underlines and connector arrows. */
export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: duration.cinematic, ease: easing.brand },
      opacity: { duration: duration.instant },
    },
  },
};

/* --------------------------------------------------------------------------
   OVERLAYS
   -------------------------------------------------------------------------- */

/** Mobile navigation panel. */
export const drawer: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: duration.slow, ease: easing.power },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: duration.base, ease: easing.power },
  },
};

/**
 * Route transition. Deliberately short — a transition the user notices twice
 * is charming, one they notice on every click is an obstacle.
 */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: easing.brand },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration.fast, ease: easing.power },
  },
};

/* --------------------------------------------------------------------------
   DEFAULT VIEWPORT CONFIG
   -------------------------------------------------------------------------- */

/**
 * Spread into `whileInView` usage: `<motion.div {...inViewDefaults}>`.
 * `once: true` is deliberate — replaying reveals on every scroll-past is the
 * hallmark of an amateur build.
 */
export const inViewDefaults = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-12% 0px -12% 0px" },
} as const;
