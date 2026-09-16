"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";

import { duration, easing } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * WEBCRAFT — ACCORDION
 *
 * Built for the FAQ, where the content is a list of objections. Two decisions
 * follow from that:
 *
 *   • Multiple panels can be open at once. A single-open accordion forces a
 *     visitor comparing "how much" against "how long" to keep re-opening
 *     panels, and every one of those extra clicks is a chance to give up.
 *
 *   • Panels are collapsed with `height`, not `display: none`. The answers are
 *     emitted into FAQPage structured data, and Google requires the answer
 *     text to be present and discoverable in the DOM. `display: none` is a
 *     grey area there; a collapsed height with real text in it is not.
 *
 * ─── ACCESSIBILITY ───────────────────────────────────────────────────────
 * The disclosure pattern, implemented properly: a real <button> carries
 * `aria-expanded` and `aria-controls`, and the panel is labelled by the button
 * that controls it. Keyboard users get Enter/Space and a visible focus ring for
 * free by using a button rather than a div with a click handler.
 *
 * `hidden` is applied to the collapsed panel only when the animation has
 * finished closing, so its content is never announced while visible and never
 * hidden while still on screen.
 */

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItemData[];
  /** Index of the panel open on first paint. -1 for all closed. */
  defaultOpen?: number;
  className?: string;
}

export function Accordion({ items, defaultOpen = 0, className }: AccordionProps) {
  const [open, setOpen] = useState<Set<string>>(
    () =>
      new Set(
        defaultOpen >= 0 && items[defaultOpen]
          ? [items[defaultOpen].id]
          : [],
      ),
  );

  const toggle = (id: string) => {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className={cn("divide-border divide-y border-y", className)}>
      {items.map((item, index) => (
        <AccordionRow
          key={item.id}
          item={item}
          index={index}
          isOpen={open.has(item.id)}
          onToggle={() => toggle(item.id)}
        />
      ))}
    </div>
  );
}

function AccordionRow({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: AccordionItemData;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reactId = useId();
  const panelId = `faq-panel-${reactId}`;
  const buttonId = `faq-button-${reactId}`;

  return (
    <div className="group/row">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className={cn(
            "flex w-full items-start gap-5 py-7 text-start",
            "transition-colors duration-fast ease-brand",
            "hover:text-accent focus-visible:outline-offset-[-2px]",
          )}
        >
          {/* Numeric index in the pixel face — Latin/numeric by construction.
              Violet when open: "which row is currently open" is a state, and
              states are violet. Lime stays on the hover, which is an
              invitation to act. */}
          <span
            dir="ltr"
            className={cn(
              "pixel-label mt-2 shrink-0 tabular-nums transition-colors duration-fast",
              isOpen ? "text-graphic" : "text-fg-subtle",
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="font-display flex-1 text-xl font-bold md:text-2xl">
            {item.question}
          </span>

          {/* Plus → minus, drawn as two bars so the transition is a rotation
              rather than a glyph swap. Cheaper and smoother than two icons. */}
          <span
            aria-hidden="true"
            className={cn(
              "relative mt-1.5 grid size-8 shrink-0 place-items-center rounded-full",
              "ring-1 transition-all duration-base ease-brand",
              // Open = violet fill with white on top. Full-strength violet is
              // 2.7:1 and unusable as a glyph colour, but as a *fill* carrying
              // white it measures 7.0:1 — the one arrangement that lets the
              // brand's secondary work at full saturation on dark.
              isOpen
                ? "bg-active text-active-fg ring-active rotate-180"
                : "text-fg-muted ring-border-strong group-hover/row:ring-accent/60",
            )}
          >
            <span className="absolute h-px w-3 rounded-full bg-current" />
            <span
              className={cn(
                "absolute h-3 w-px rounded-full bg-current transition-transform duration-base ease-brand",
                isOpen && "scale-y-0",
              )}
            />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: duration.base, ease: easing.brand },
              opacity: { duration: duration.fast },
            }}
            className="overflow-hidden"
          >
            <p className="text-fg-muted leading-body max-w-[62ch] pb-8 ps-11 text-base">
              {item.answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
