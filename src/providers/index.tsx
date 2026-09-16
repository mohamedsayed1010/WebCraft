"use client";

import { MotionConfig } from "framer-motion";

import { CursorProvider } from "./cursor-provider";
import { SmoothScrollProvider } from "./smooth-scroll";

export { useCursor, useCursorProps } from "./cursor-provider";
export { useSmoothScroll } from "./smooth-scroll";

/**
 * APP PROVIDERS
 *
 * Composition order is load-bearing:
 *
 *   MotionConfig        outermost, so *every* animation below it — including
 *                       ones inside the other providers — respects the user's
 *                       reduced-motion setting. `reducedMotion="user"` is one
 *                       switch that strips transform and layout animation
 *                       while preserving opacity, which is why no variant in
 *                       `lib/motion/variants.ts` branches on it individually.
 *
 *   SmoothScrollProvider  needs to be above anything that calls `scrollTo`,
 *                         which is the header, the hero and the scroll-spy.
 *
 *   CursorProvider        innermost. It is pure state and depends on nothing.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>
        <CursorProvider>{children}</CursorProvider>
      </SmoothScrollProvider>
    </MotionConfig>
  );
}
