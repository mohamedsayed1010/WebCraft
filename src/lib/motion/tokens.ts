/**
 * WEBCRAFT — MOTION TOKENS (JS side)
 *
 * These are the exact counterparts of the `--ease-*` and `--duration-*`
 * values in `src/styles/tokens.css`. CSS transitions and Framer Motion must
 * never disagree about what "the house easing" means, or a card whose border
 * animates in CSS and whose transform animates in JS will visibly desync.
 *
 * If you change a value here, change it there. They are checked against each
 * other in `docs/DESIGN-SYSTEM.md`.
 */

/* --------------------------------------------------------------------------
   EASINGS
   -------------------------------------------------------------------------- */

export const easing = {
  /**
   * The house easing. Expo-out: leaves fast, lands soft.
   * Used for ~80% of the motion on the site. When in doubt, this one.
   */
  brand: [0.16, 1, 0.3, 1],

  /** Symmetric in-out. Slides, drawer transitions, anything that returns. */
  power: [0.65, 0, 0.35, 1],

  /** Slight overshoot. Micro-interactions only — buttons, toggles, tags. */
  snap: [0.34, 1.4, 0.64, 1],

  /** Entrances that should feel weighted rather than springy. */
  soft: [0.25, 0.46, 0.45, 0.94],
} as const;

export type EasingName = keyof typeof easing;

/* --------------------------------------------------------------------------
   DURATIONS (seconds — Framer Motion's unit)
   -------------------------------------------------------------------------- */

export const duration = {
  instant: 0.12, // colour/opacity flicks
  fast: 0.24, // hover states, tooltips
  base: 0.42, // the default transition
  slow: 0.7, // section reveals
  reveal: 1.0, // image + heading reveals
  cinematic: 1.6, // hero sequence, preloader
} as const;

export type DurationName = keyof typeof duration;

/* --------------------------------------------------------------------------
   STAGGER
   --------------------------------------------------------------------------
   Stagger is where "premium" actually lives. Too fast and a grid looks like a
   glitch; too slow and the user scrolls past the tail. These three values
   cover every list on the site.
   -------------------------------------------------------------------------- */

export const stagger = {
  tight: 0.04, // characters in a split headline
  base: 0.08, // cards in a grid, list items
  loose: 0.14, // large hero elements, process steps
} as const;

/* --------------------------------------------------------------------------
   DISTANCE
   --------------------------------------------------------------------------
   Travel distances for reveals, in pixels. Restraint matters: a 24px rise
   reads as considered, an 80px rise reads as a template.
   -------------------------------------------------------------------------- */

export const distance = {
  sm: 16,
  base: 24,
  lg: 40,
  /** Mega display type can take more travel without looking cheap. */
  display: 64,
} as const;

/* --------------------------------------------------------------------------
   SPRINGS
   --------------------------------------------------------------------------
   Reserved for anything that follows the pointer — springs are for input,
   tweens are for choreography.
   -------------------------------------------------------------------------- */

export const spring = {
  /** Custom cursor tracking. Fast enough to feel attached to the hand. */
  cursor: { stiffness: 620, damping: 42, mass: 0.34 },

  /** Magnetic buttons pulling toward the pointer. */
  magnetic: { stiffness: 260, damping: 22, mass: 0.6 },

  /** Scroll-progress indicators — heavier, so it never jitters. */
  scroll: { stiffness: 160, damping: 34, mass: 0.9 },
} as const;

/**
 * How far a magnetic element travels toward the pointer, as a fraction of the
 * distance between pointer and element centre. Above ~0.4 it stops feeling
 * magnetic and starts feeling broken.
 */
export const MAGNETIC_STRENGTH = 0.28;

/** Viewport margin for scroll-triggered reveals — fire slightly before entry. */
export const VIEWPORT_MARGIN = "-12% 0px -12% 0px";
