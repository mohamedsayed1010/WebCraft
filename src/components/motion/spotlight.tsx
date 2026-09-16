"use client";

import { useCallback } from "react";

import { cn } from "@/lib/utils";

/**
 * Writes the pointer position into `--mx` / `--my` so the `spotlight` utility
 * can paint a soft brand glow under the cursor. No React state — a style write
 * per frame, so hovering a grid never re-renders it.
 */
export function Spotlight({
  children,
  className,
  as: Component = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  const onMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.style.setProperty("--spot", "1");
  }, []);
  const onLeave = useCallback((e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--spot", "0");
  }, []);

  return (
    <Component onPointerMove={onMove} onPointerLeave={onLeave} className={cn("spotlight", className)}>
      {children}
    </Component>
  );
}
