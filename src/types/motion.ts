/**
 * WEBCRAFT — MOTION TYPES
 *
 * Motion on this site is a system, not a collection of one-off animations.
 * These types constrain the reveal primitives so that "how something enters"
 * is always chosen from a fixed vocabulary.
 */

/** Direction an element travels from as it reveals. */
export type RevealDirection = "up" | "down" | "left" | "right" | "none";

/**
 * The reveal vocabulary. Every entrance on the site is one of these.
 *
 *   fade   — opacity only. The reduced-motion fallback for all of them.
 *   rise   — the house default: 24px up + fade.
 *   mask   — a clip-path wipe. Used for images and section headings.
 *   split  — per-word or per-character stagger. Headlines only.
 *   scale  — subtle 0.96 → 1. Cards and media, never text.
 *   draw   — SVG path stroke draw. Ribbon strokes, underlines, arrows.
 */
export type RevealPreset = "fade" | "rise" | "mask" | "split" | "scale" | "draw";

/** Granularity for split-text reveals. */
export type SplitBy = "character" | "word" | "line";

export interface RevealOptions {
  preset?: RevealPreset;
  direction?: RevealDirection;
  /** Seconds. Prefer the shared delay steps over arbitrary values. */
  delay?: number;
  /** Per-child stagger in seconds. */
  stagger?: number;
  /**
   * Fire once and stay revealed. Defaults to true — content that re-animates
   * every time it scrolls past feels like a toy, not a portfolio.
   */
  once?: boolean;
  /** IntersectionObserver root margin, e.g. "-15%". */
  margin?: string;
}

/** Parallax layer depth. Negative moves against the scroll direction. */
export interface ParallaxOptions {
  /** Multiplier, roughly -1 to 1. 0.15 is a tasteful default. */
  speed?: number;
  axis?: "x" | "y";
  /** Clamp travel in pixels so long sections cannot drift off-screen. */
  clamp?: number;
}

/** Cursor state, broadcast by the cursor provider and read by hoverables. */
export type CursorVariant =
  | "default"
  | "hover" /* generic interactive element   */
  | "view" /* portfolio card — "VIEW" label */
  | "drag" /* draggable carousel            */
  | "text" /* over selectable copy          */
  | "hidden"; /* over inputs and video         */
