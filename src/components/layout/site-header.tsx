"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { localePath, stripLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";
import { useSmoothScroll } from "@/providers";

import { LanguageSwitcher } from "./language-switcher";

const SECTIONS = ["hero", "services", "work", "process", "about", "contact"] as const;
type SectionId = (typeof SECTIONS)[number];

export function SiteHeader({
  locale,
  nav,
  common,
}: {
  locale: Locale;
  nav: Dictionary["nav"];
  common: Dictionary["common"];
}) {
  const pathname = usePathname() ?? "/";
  const isHome = stripLocale(pathname) === "/";
  const { scrollTo, setLocked } = useSmoothScroll();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionId>("hero");
  const menuButton = useRef<HTMLButtonElement>(null);
  const origin = locale === "ar" ? "8%" : "92%";
  const firstLink = useRef<HTMLAnchorElement>(null);

  const items: { id: SectionId; label: string }[] = [
    { id: "hero", label: nav.home },
    { id: "services", label: nav.services },
    { id: "work", label: nav.work },
    { id: "process", label: nav.process },
    { id: "about", label: nav.about },
    { id: "contact", label: nav.contact },
  ];

  /* Scrolled + hide-on-scroll-down */
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        setHidden(y > 640 && y > last + 4);
        if (y < last - 4) setHidden(false);
        last = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll-spy (home only) */
  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [isHome]);

  const close = useCallback(() => {
    setOpen(false);
    setLocked(false);
    menuButton.current?.focus();
  }, [setLocked]);

  /* Menu: lock scroll, Escape closes, focus the first link */
  useEffect(() => {
    if (!open) return;
    setLocked(true);
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, setLocked]);

  const onAnchor = (id: SectionId) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (open) {
      setOpen(false);
      setLocked(false);
    }
    if (!isHome) return;
    e.preventDefault();
    const target = id === "hero" ? 0 : `#${id}`;
    requestAnimationFrame(() => scrollTo(target, id === "hero" ? 0 : -72));
    history.replaceState(null, "", id === "hero" ? localePath(locale, "/") : localePath(locale, `/#${id}`));
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,padding] duration-500 ease-[var(--ease-brand)]",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
          scrolled ? "py-2.5" : "py-4 sm:py-6",
        )}
      >
        <div className="container-x">
          <div
            className={cn(
              "flex items-center justify-between gap-4 rounded-full ps-2 pe-2 transition-all duration-500 ease-[var(--ease-brand)] sm:ps-3",
              scrolled
                ? "glass-blur py-2 shadow-[var(--shadow-lift)]"
                : "border border-transparent py-1",
            )}
          >
            <Logo href={localePath(locale, "/")} label={`WebCraft — ${nav.home}`} size={scrolled ? 38 : 44} />

            <nav aria-label={nav.home} className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {items.map((item) => {
                  const isActive = isHome && active === item.id;
                  return (
                    <li key={item.id}>
                      <Link
                        href={localePath(locale, item.id === "hero" ? "/" : `/#${item.id}`)}
                        onClick={onAnchor(item.id)}
                        aria-current={isActive ? "location" : undefined}
                        className={cn(
                          "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                          isActive ? "text-fg" : "text-fg-muted hover:text-fg",
                        )}
                      >
                        {isActive ? (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-0 rounded-full bg-mist-2"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        ) : null}
                        <span className="relative">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <LanguageSwitcher locale={locale} label={common.language} className="hidden sm:inline-flex" />
              <ButtonLink
                href={localePath(locale, "/#contact")}
                onClick={onAnchor("contact")}
                size="sm"
                className="hidden md:inline-flex"
                magnetic
              >
                {common.startProject}
              </ButtonLink>
              <button
                ref={menuButton}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? common.closeMenu : common.openMenu}
                className="grid size-11 place-items-center rounded-full border border-line-strong text-fg transition-colors hover:border-brand-500 hover:text-brand-600 lg:hidden"
              >
                {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={common.openMenu}
            initial={{ clipPath: `circle(0% at ${origin} 3rem)` }}
            animate={{ clipPath: `circle(150% at ${origin} 3rem)` }}
            exit={{ clipPath: `circle(0% at ${origin} 3rem)` }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-canvas pt-28 pb-10 lg:hidden"
          >
            <div aria-hidden="true" className="pointer-events-none absolute -top-40 end-[-20%] size-[36rem] glow [--glow:color-mix(in_oklab,var(--color-brand-300)_48%,transparent)]" />
            <div aria-hidden="true" className="pointer-events-none absolute bottom-[-10rem] start-[-20%] size-[28rem] glow [--glow:color-mix(in_oklab,var(--color-brand-50)_100%,transparent)]" />
            <nav aria-label={nav.home} className="container-x relative flex-1">
              <ul className="flex flex-col">
                {items.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-line"
                  >
                    <Link
                      ref={i === 0 ? firstLink : undefined}
                      href={localePath(locale, item.id === "hero" ? "/" : `/#${item.id}`)}
                      onClick={onAnchor(item.id)}
                      className="flex items-baseline justify-between py-4 font-display text-headline font-extrabold text-fg transition-colors hover:text-brand-600"
                    >
                      {item.label}
                      <span className="label-mono ltr text-fg-subtle">0{i + 1}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="container-x relative mt-10 flex flex-col gap-4"
            >
              <LanguageSwitcher locale={locale} label={common.language} variant="segmented" className="self-start" />
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={localePath(locale, "/#contact")} onClick={onAnchor("contact")} size="lg">
                  {common.startProject}
                </ButtonLink>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
