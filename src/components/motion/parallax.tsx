"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

/**
 * Scroll-linked drift. `speed` is pixels of travel across the element's pass
 * through the viewport — positive drifts up. Transform-only.
 *
 * ─── PERFORMANCE ─────────────────────────────────────────────────────────
 * Measured on a throttled phone, the previous version (a spring per layer,
 * 11 layers on the homepage) kept the main thread busy on every scroll frame.
 * Now:
 *   • no spring — on desktop, Lenis already smooths the scroll input, so the
 *     spring only added per-frame physics work;
 *   • desktop fine pointers only — on phones the drift is barely perceptible
 *     at that screen size and native momentum scrolling matters more;
 *   • `will-change` is set only while the effect is actually live.
 * Always the same element, so enabling it after hydration never remounts
 * the images inside.
 * ─────────────────────────────────────────────────────────────────────────
 */
export function Parallax({
  children,
  speed = 60,
  axis = "y",
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  axis?: "x" | "y";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
  const live = desktop && !reduce;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const value = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div
      ref={ref}
      style={live ? (axis === "y" ? { y: value } : { x: value }) : undefined}
      className={cn(live && "will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
