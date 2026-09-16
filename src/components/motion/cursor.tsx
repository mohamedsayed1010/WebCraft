"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

import { features } from "@/config/site";
import { spring } from "@/lib/motion";
import { useMediaQuery } from "@/lib/use-media-query";
import { useCursor } from "@/providers";

/**
 * A cursor that carries information: over a project it grows into a "View"
 * disc, so the visitor knows a click opens the case study. Fine pointers only;
 * hidden under reduced motion by `base.css`. The native cursor is never
 * removed, so nothing is lost if this fails to mount.
 */
export function Cursor() {
  const { variant, label } = useCursor();
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)", true);
  const enabled = features.customCursor && fine && !reduced;
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, spring.cursor);
  const sy = useSpring(y, spring.cursor);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;
  const isView = variant === "view";

  return (
    <motion.div
      aria-hidden="true"
      className="motion-cursor pointer-events-none fixed top-0 left-0 z-[90]"
      style={{ x: sx, y: sy }}
    >
      <AnimatePresence>
        {isView ? (
          <motion.div
            key="view"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.2, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="-translate-x-1/2 -translate-y-1/2 grid size-24 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white shadow-[var(--shadow-brand)]"
          >
            {label}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
