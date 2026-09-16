"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";

import { Logo } from "@/components/ui/logo";
import { WhatsAppNavCta } from "@/components/ui/whatsapp-cta";
import { mainNav, sectionAnchors, anchorId } from "@/config/navigation";
import { ui } from "@/content/copy";
import { duration, easing } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * FLOATING NAVBAR
 *
 * A detached pill that hovers over the page rather than a bar welded to the
 * top edge. Three behaviours carry it:
 *
 *   1. It starts transparent over the hero and picks up its glass surface once
 *      the page scrolls — so the hero reads as full-bleed on first paint.
 *   2. It hides on scroll-down and returns on scroll-up. On a long marketing
 *      page the nav is only wanted at the moment someone reaches for it, and
 *      reaching for it means scrolling back up.
 *   3. A scroll-spy underlines the section currently in view, so the pill
 *      doubles as a position indicator on a page that is one long argument.
 *
 * The WhatsApp CTA sits outside `mainNav` and never scrolls away with it.
 */
export function SiteHeader() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("hero");

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(current > 24);

    // Never hide while the mobile sheet is open — the close button lives in it.
    if (menuOpen) return;
    setHidden(current > previous && current > 320);
  });

  /* Scroll-spy. A section counts as active once its top crosses the upper
     third of the viewport, which is where the eye actually sits while reading
     — using the exact centre makes the indicator lag behind the content. */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5] },
    );

    for (const section of sectionAnchors) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  // Lock the page while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? "-140%" : "0%" }}
        transition={{ duration: duration.base, ease: easing.brand }}
        className="fixed inset-x-0 top-0 z-[200] pt-3 md:pt-5"
      >
        <div className="container-wide">
          <div
            className={cn(
              "flex items-center justify-between gap-4 rounded-pill",
              "px-3 py-2.5 md:px-4",
              "transition-[background-color,box-shadow,backdrop-filter,border-color] duration-base ease-brand",
              // `backdrop-blur-md` rather than `-xl`: a backdrop filter on a
              // full-width element is re-evaluated on every scroll frame, and
              // the larger radius is the difference between smooth and janky
              // on a page this long. The glass still reads at md.
              scrolled
                ? "border-border bg-ink-900/80 shadow-lift border backdrop-blur-md"
                : "border border-transparent bg-transparent",
            )}
          >
            {/* ── Mark ─────────────────────────────────────────────────── */}
            <Logo size={38} withWordmark priority />

            {/* ── Primary nav — desktop only ───────────────────────────── */}
            <nav aria-label="التنقل الرئيسي" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {mainNav.map((item) => {
                  const id = anchorId(item.href);
                  const isActive = id !== null && id === active;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "relative block rounded-pill px-3.5 py-2 text-sm font-medium",
                          "transition-colors duration-fast ease-brand",
                          isActive
                            ? "text-fg"
                            : "text-fg-subtle hover:text-fg",
                        )}
                      >
                        {/* The scroll-spy pill. Violet rather than the neutral
                            white it used to be: "which section am I in" is the
                            definition of an active state, and this is the one
                            element on the page that tracks the reader
                            continuously — so it is where the brand's secondary
                            earns the most reach for the least ink. Lime is
                            two centimetres away on the CTA and must stay the
                            only thing in the bar asking to be tapped. */}
                        {isActive ? (
                          <motion.span
                            layoutId="nav-active"
                            aria-hidden="true"
                            className="bg-graphic-fill ring-graphic-line absolute inset-0 -z-10 rounded-pill ring-1"
                            transition={{ duration: duration.base, ease: easing.brand }}
                          />
                        ) : null}
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* ── CTA + mobile trigger ─────────────────────────────────
                Two forms of the same button, never both at once. Below `sm`
                the labelled pill does not fit beside the wordmark and the
                menu trigger, and it used to simply disappear — which left the
                site's primary conversion path absent from the header on
                exactly the devices where WhatsApp is how people actually
                make contact. The icon-only circle takes its place: same
                target, same colour, same link, at a width the bar can hold.

                `aria-label` carries the name in both forms, so the icon-only
                one is not a mystery button to a screen reader. */}
            <div className="flex items-center gap-2">
              <WhatsAppNavCta compact className="hidden sm:inline-flex" />
              <WhatsAppNavCta compact iconOnly className="sm:hidden" />

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label={ui.menu}
                aria-expanded={menuOpen}
                className={cn(
                  "grid size-10 place-items-center rounded-full lg:hidden",
                  "border border-border bg-white/[0.04] text-fg",
                  "transition-colors duration-fast hover:bg-white/[0.09]",
                )}
              >
                <span aria-hidden="true" className="flex flex-col gap-[5px]">
                  <span className="block h-px w-4 bg-current" />
                  <span className="block h-px w-4 bg-current" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile sheet ─────────────────────────────────────────────────
          Full-screen rather than a slide-in drawer: on a page this long the
          nav is a jump-list, and a jump-list wants room to show the index and
          the label together. */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.fast }}
            className="fixed inset-0 z-[300] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-ink-950/80 backdrop-blur-xl"
              onClick={() => setMenuOpen(false)}
            />

            <motion.nav
              aria-label="التنقل الرئيسي"
              initial={{ y: -18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: duration.base, ease: easing.brand }}
              className="relative flex h-full flex-col px-6 pt-6 pb-10"
            >
              <div className="flex items-center justify-between">
                <Logo size={38} withWordmark />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label={ui.close}
                  className="grid size-10 place-items-center rounded-full border border-border bg-white/[0.04]"
                >
                  <span aria-hidden="true" className="relative block size-4">
                    <span className="absolute top-1/2 left-0 block h-px w-full rotate-45 bg-current" />
                    <span className="absolute top-1/2 left-0 block h-px w-full -rotate-45 bg-current" />
                  </span>
                </button>
              </div>

              {/* The jump-list scrolls. It carries one entry per homepage
                  section, and the homepage grew from eight sections to ten —
                  at ten entries the list is taller than a 667px phone, and
                  without this the overflow simply vanished under the CTA
                  pinned to the bottom of the sheet. `min-h-0` is the half
                  people forget: a flex child will not shrink below its
                  content without it, so `overflow-y-auto` alone does
                  nothing here. */}
              <ul className="mt-10 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
                {sectionAnchors.map((section) => (
                  <li key={section.id}>
                    <Link
                      href={`/#${section.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-baseline gap-4 rounded-lg px-2 py-3 transition-colors hover:bg-white/[0.04]"
                    >
                      {/* Section indices are violet everywhere — here too, so
                          the lime CTA at the foot of the sheet is the only
                          accent in the drawer. */}
                      <span className="pixel-label text-graphic">{section.index}</span>
                      <span className="font-display text-2xl font-bold">
                        {section.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* `shrink-0`, not `mt-auto`: the list above is now the flex
                  child that grows, so the CTA sits directly under it and
                  must refuse to be compressed when the list is full. */}
              <div className="shrink-0 pt-8">
                <WhatsAppNavCta className="w-full justify-center" />
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
