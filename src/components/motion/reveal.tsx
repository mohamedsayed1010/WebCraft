import { Children, cloneElement, isValidElement, type CSSProperties, type ReactElement } from "react";

import { cn } from "@/lib/utils";
import type { RevealPreset } from "@/types";

/**
 * WEBCRAFT — REVEAL PRIMITIVES (CSS-driven)
 *
 * Every scroll entrance on the site comes from here, and none of it runs
 * through React at runtime.
 *
 * ─── WHY THIS IS NOT FRAMER MOTION ANY MORE ──────────────────────────────
 * These used to be ~200 `motion.*` components. Measured on a throttled mobile
 * profile that meant: heavy hydration (TBT 1.2s), and above-the-fold copy held
 * at opacity 0 until every chunk had downloaded and executed — LCP 23s.
 *
 * Now each primitive renders a plain element with `data-reveal`. One ~1 kB
 * inline observer (`RevealScript`) runs as soon as the HTML is parsed — before
 * hydration — and flips `data-shown`; `styles/motion.css` does the animation
 * with transform + opacity only, so it stays on the compositor. Staggers are a
 * CSS custom property, not JS timers. Reduced motion and no-JS both render
 * content fully visible.
 *
 * The public API (`Reveal`, `RevealGroup`, `RevealItem`, `MaskedLines`) is
 * unchanged, so no section had to be rewritten.
 * ─────────────────────────────────────────────────────────────────────────
 */

type RevealTag = "div" | "li" | "section" | "article" | "span" | "p" | "ul";

const presetName: Record<RevealPreset, string> = {
  fade: "fade",
  rise: "rise",
  scale: "scale",
  mask: "rise",
  split: "rise",
  draw: "fade",
};

/** Single element entrance. The workhorse — most content is wrapped in this. */
export function Reveal({
  children,
  preset = "rise",
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  preset?: RevealPreset;
  delay?: number;
  className?: string;
  as?: RevealTag;
}) {
  return (
    <Tag
      data-reveal={presetName[preset]}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}
      suppressHydrationWarning
    >
      {children}
    </Tag>
  );
}

/**
 * Staggered group. The group is what gets observed; each direct `RevealItem`
 * child receives its index as `--i`, and CSS turns that into a delay.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "section";
}) {
  let index = 0;
  const items = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    const el = child as ReactElement<{ style?: CSSProperties }>;
    return cloneElement(el, { style: { ...el.props.style, "--i": index++ } as CSSProperties });
  });

  return (
    <Tag
      data-reveal-group=""
      className={className}
      style={{ "--stagger": `${stagger}s`, "--reveal-delay": `${delay}s` } as CSSProperties}
      suppressHydrationWarning
    >
      {items}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  preset = "rise",
  as: Tag = "div",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  preset?: RevealPreset;
  as?: "div" | "li" | "article";
  style?: CSSProperties;
}) {
  return (
    <Tag data-reveal-item={presetName[preset]} className={className} style={style}>
      {children}
    </Tag>
  );
}

/**
 * Headline lines that rise from beneath their own baseline. Each line sits in
 * an overflow-hidden box with descender room: Arabic glyphs (ي ج ع ق) drop
 * ~0.25em below the baseline, so 0.3em keeps them from being sliced.
 */
export function MaskedLines({
  lines,
  className,
  lineClassName,
  stagger = 0.12,
  delay = 0,
}: {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
  delay?: number;
}) {
  return (
    <span
      data-reveal-group=""
      className={cn("block", className)}
      style={{ "--stagger": `${stagger}s`, "--reveal-delay": `${delay}s` } as CSSProperties}
      suppressHydrationWarning
    >
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden pb-[0.3em]">
          <span data-reveal-item="line" className={cn("block", lineClassName)} style={{ "--i": index } as CSSProperties}>
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}
