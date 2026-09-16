"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * WEBCRAFT — MARQUEE
 *
 * An infinitely scrolling strip. Used for the promise band under the hero and
 * the oversized brand rule above the footer.
 *
 * ─── HOW THE SEAM IS HIDDEN ──────────────────────────────────────────────
 * The content is rendered twice inside a flex row, and the row animates from
 * 0% to -50% of its own width. At -50% the second copy sits exactly where the
 * first started, so resetting to 0 is invisible. Duplicating the content is
 * what makes the loop seamless; a single copy always shows a gap.
 *
 * `%` is used rather than pixels so the animation never needs to measure the
 * DOM — no ResizeObserver, no layout thrash on window resize, and it is
 * correct on first frame instead of after a measurement pass.
 *
 * ─── DIRECTION ───────────────────────────────────────────────────────────
 * On an RTL page the row's flex direction is already reversed, so animating to
 * -50% moves the content right-to-left *in reading order* — which is the
 * direction that feels natural here. `reverse` flips it for the second strip,
 * because two bands travelling the same way read as a single mistake and two
 * travelling opposite ways read as design.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * The whole strip is `aria-hidden`: it is decorative, and a screen reader
 * announcing seven promises twice is noise. Where the content carries meaning
 * it is also present as real text in the section below.
 */

interface MarqueeProps {
  children: React.ReactNode;
  /** Seconds for one full pass. Higher is slower and calmer. */
  duration?: number;
  reverse?: boolean;
  className?: string;
  /** Fade the strip into the background at both ends. */
  fade?: boolean;
  /** Pause on hover — only for strips carrying readable content. */
  pauseOnHover?: boolean;
}

export function Marquee({
  children,
  duration = 34,
  reverse = false,
  className,
  fade = true,
  pauseOnHover = false,
}: MarqueeProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "group/marquee relative flex w-full overflow-hidden",
        fade && "mask-edges-x",
        className,
      )}
    >
      <motion.div
        className={cn(
          "flex w-max shrink-0 items-center",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
        )}
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {children}
        {/* The duplicate that makes the seam invisible. */}
        {children}
      </motion.div>
    </div>
  );
}

/**
 * A single item in the promise band. Separated so the diamond separator is
 * defined once rather than repeated at every call site.
 */
export function MarqueeItem({
  children,
  accent = false,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <span className="flex items-center">
      {/* Violet. The strip is aria-hidden decoration that scrolls past the
          hero CTA — in lime it was a row of moving accent marks competing
          with the one button the hero is built around. */}
      <span
        className={cn(
          "px-7 text-sm font-medium whitespace-nowrap",
          accent ? "text-graphic" : "text-fg-muted",
        )}
      >
        {children}
      </span>
      <span
        className="bg-accent-alt/55 size-1 rotate-45"
        // A rotated square rather than a bullet: it echoes the pixel motif and
        // stays crisp at 4px where a round dot goes soft.
      />
    </span>
  );
}
