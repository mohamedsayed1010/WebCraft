"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Magnetic } from "@/components/motion/magnetic";
import { WhatsAppIcon } from "@/components/ui/icon";
import { hasWhatsApp, whatsappUrl } from "@/config/site";
import { ui } from "@/content";
import { duration, easing } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * WEBCRAFT — WHATSAPP
 *
 * The brief puts a large WhatsApp CTA in the header and keeps it reachable at
 * all times, and it is right to: in this market a business owner will message
 * a supplier on WhatsApp at 11pm and will never fill in a contact form. This
 * is the primary conversion path on the site, not an alternative to one.
 *
 * ─── THE NO-NUMBER FALLBACK ──────────────────────────────────────────────
 * `siteConfig.contact.whatsapp` is not filled in yet. Rather than hide the
 * button — which would delete the site's main CTA and make the header look
 * unfinished — every WhatsApp affordance falls back to the contact section
 * with identical styling.
 *
 * So the design is complete and reviewable today, nobody is ever handed a link
 * to `wa.me/` that opens an error page, and the moment a real number lands in
 * site config every one of these becomes a live WhatsApp deep link with no
 * code change. The styling is identical either way, so the fallback never
 * looks like a different button.
 *
 * ─── WHY THESE ARE LIME AND NOT WHATSAPP GREEN ───────────────────────────
 * Because this is a WebCraft button that happens to open WhatsApp, not a
 * WhatsApp button. These two components put the colour on screen at every
 * scroll position — the nav pill above the fold, the floating button below it
 * — so whatever colour they carry is, in practice, the site's colour. #25D366
 * is a foreign green sitting a few degrees off the brand lime, which is the
 * worst possible distance: near enough to look like a mistake, far enough to
 * break the palette. The glyph carries the recognition; lime carries the
 * brand. See the `whatsapp` variant in `ui/button.tsx`.
 * ─────────────────────────────────────────────────────────────────────────
 */

/** wa.me deep link when configured, contact section otherwise. */
function resolveHref(context?: string): string {
  return hasWhatsApp ? whatsappUrl(context) : "/#contact";
}

interface WhatsAppLinkProps {
  /** What the visitor was reading — pre-fills the message and attributes the tap. */
  context?: string;
  className?: string;
  children: React.ReactNode;
  label?: string;
}

/** Bare anchor with the correct target/rel handling. Styling is the caller's. */
export function WhatsAppLink({
  context,
  className,
  children,
  label,
}: WhatsAppLinkProps) {
  const href = resolveHref(context);
  const isExternal = hasWhatsApp;

  return (
    <a
      href={href}
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      aria-label={label}
      className={className}
      data-analytics="whatsapp"
      data-context={context}
    >
      {children}
    </a>
  );
}

/* ==========================================================================
   HEADER CTA
   ========================================================================== */

/**
 * The large CTA that lives at the end of the floating nav.
 *
 * The live dot is not decoration — it is the "someone is actually there"
 * signal, and it is the single element most responsible for this reading as a
 * business you can reach rather than a form you shout into.
 */
export function WhatsAppNavCta({
  context = "عمل موقع",
  compact = false,
  iconOnly = false,
  className,
}: {
  context?: string;
  compact?: boolean;
  /**
   * Drop the label and render a circle. For the narrow header only — below
   * `sm` the labelled pill does not fit beside the wordmark and the menu
   * trigger, and the alternative to this is the site's primary conversion
   * path being missing from the header on phones.
   */
  iconOnly?: boolean;
  className?: string;
}) {
  return (
    <Magnetic strength={0.2}>
      <WhatsAppLink
        context={context}
        label={ui.whatsappCta}
        className={cn(
          "group/wa relative inline-flex items-center rounded-pill",
          "bg-lime-500 text-ink-900 font-sans font-bold",
          "shadow-[0_0_0_1px_rgb(182_255_0/0.35),0_0_38px_-12px_rgb(182_255_0/0.75)]",
          "transition-[background-color,box-shadow,transform] duration-fast ease-brand",
          "hover:bg-lime-400 hover:shadow-[0_0_0_1px_rgb(182_255_0/0.6),0_0_60px_-10px_rgb(182_255_0/0.9)]",
          "focus-visible:outline-offset-4",
          iconOnly
            ? "size-10 justify-center"
            : cn(
                "gap-2.5",
                compact ? "h-10 ps-3.5 pe-4 text-sm" : "h-11 ps-4 pe-5 text-sm",
              ),
          className,
        )}
      >
        <span className="relative grid place-items-center">
          <WhatsAppIcon className="size-[1.15rem]" />
          {/* Pulse ring. Pure CSS, so it survives reduced motion being handled
              at the MotionConfig level without a JS branch here. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 -m-1 animate-ping rounded-full bg-ink-900/25 [animation-duration:2.6s] motion-reduce:hidden"
          />
        </span>

        {iconOnly ? null : (
          <span className="whitespace-nowrap">{ui.whatsapp}</span>
        )}
      </WhatsAppLink>
    </Magnetic>
  );
}

/* ==========================================================================
   FLOATING BUTTON
   ========================================================================== */

/**
 * The always-reachable button, pinned to the bottom of the viewport.
 *
 * Behaviour notes, each of which is the fix for a specific way these usually
 * go wrong:
 *
 *   • It appears only after ~70vh of scroll. Showing it inside the hero, where
 *     a full-size WhatsApp CTA already sits, is redundant and covers content.
 *   • It sits on the inline-start corner — bottom-**right** in this RTL
 *     document, which is where the reading hand rests. `start-*` resolves that
 *     from `dir` alone, so it mirrors correctly if the site is ever localised.
 *     (The toast portal is pinned bottom-left for the same reason: the two
 *     must not stack on top of each other. See `app/layout.tsx`.)
 *   • The label expands on hover but the icon alone is always visible, so the
 *     hit target never changes size under a moving cursor.
 *   • `pb-[env(safe-area-inset-bottom)]` keeps it clear of the iOS home bar.
 */
export function WhatsAppFloating({ context = "عمل موقع" }: { context?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 24,
        scale: visible ? 1 : 0.9,
      }}
      transition={{ duration: duration.base, ease: easing.brand }}
      className={cn(
        // `start-6`, not `inset-inline-start-6` — the latter is not a Tailwind
        // utility and generated nothing, leaving the button unpositioned.
        // `start-*` maps to `inset-inline-start`, which is what puts this on
        // the thumb-side corner in either direction.
        "fixed start-6 bottom-6 z-[300]",
        "pb-[env(safe-area-inset-bottom)]",
        !visible && "pointer-events-none",
      )}
    >
      <WhatsAppLink
        context={context}
        label={ui.whatsappLong}
        className={cn(
          "group/fab flex items-center gap-0 rounded-pill",
          "bg-lime-500 text-ink-900",
          "shadow-[0_10px_40px_-8px_rgb(0_0_0/0.6),0_0_0_1px_rgb(182_255_0/0.4)]",
          "transition-[gap,padding,box-shadow] duration-base ease-brand",
          "h-14 px-4",
          "hover:gap-2.5 hover:px-5",
          "hover:shadow-[0_14px_50px_-8px_rgb(0_0_0/0.7),0_0_0_1px_rgb(182_255_0/0.7),0_0_60px_-12px_rgb(182_255_0/0.9)]",
        )}
      >
        <WhatsAppIcon className="size-6 shrink-0" />

        {/* Width-animated label. `max-w` rather than `width` so the text never
            needs measuring, and `whitespace-nowrap` stops it wrapping to two
            lines mid-transition. */}
        <span
          className={cn(
            "max-w-0 overflow-hidden text-sm font-bold whitespace-nowrap",
            "transition-[max-width] duration-base ease-brand",
            "group-hover/fab:max-w-40",
          )}
        >
          {ui.whatsappLong}
        </span>
      </WhatsAppLink>
    </motion.div>
  );
}
