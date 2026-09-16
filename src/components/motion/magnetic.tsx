"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useRef } from "react";

import { MAGNETIC_STRENGTH, spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * MAGNETIC — an element that leans toward the pointer.
 *
 * The most-copied micro-interaction in award-site design, and the one most
 * often done badly. Three details separate the good version from the tacky one:
 *
 *   1. Strength stays at ~0.28. Above roughly 0.4 the element stops feeling
 *      attracted and starts feeling detached from its own layout.
 *   2. It springs, it does not tween. Anything following a pointer must be a
 *      spring — a tween produces a rubber-band lag that reads as jank.
 *   3. It is pointer-only. On touch there is no hover state to lean into, and
 *      the transform would fire on tap and make the button feel like it moved
 *      away from the finger. `(hover: hover)` gates it.
 */

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** 0–0.4. Above that it stops reading as magnetism. */
  strength?: number;
  /** Expands the reactive area beyond the element's own box, in pixels. */
  padding?: number;
}

export function Magnetic({
  children,
  className,
  strength = MAGNETIC_STRENGTH,
  padding = 0,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, spring.magnetic);
  const springY = useSpring(y, spring.magnetic);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      // Coarse pointers get no magnetism — see rule 3 above.
      if (event.pointerType !== "mouse") return;

      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      x.set((event.clientX - centerX) * strength);
      y.set((event.clientY - centerY) * strength);
    },
    [strength, x, y],
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      style={{ x: springX, y: springY, padding }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
}
