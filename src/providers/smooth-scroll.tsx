"use client";

import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";

import { features } from "@/config/site";

/**
 * SMOOTH SCROLL — Lenis.
 *
 * Smooth scrolling is the single cheapest way to make a site feel expensive,
 * and the single easiest way to make one feel broken. Three rules keep it on
 * the right side of that line:
 *
 *   1. It is off entirely under `prefers-reduced-motion`. Hijacking the scroll
 *      of someone with a vestibular disorder is not a design flourish, it is
 *      an accessibility failure — and `base.css` hands smooth-scroll back to
 *      the browser in the same media query.
 *   2. The rAF loop is torn down on unmount. A leaked loop survives client
 *      navigation and quietly burns a frame budget forever.
 *   3. `scrollTo` is exposed through context rather than each consumer
 *      reaching for a module-level singleton, so anchor navigation and the
 *      scroll-spy always talk to the same instance.
 *
 * The instance is deliberately NOT created for touch devices' native momentum
 * — `smoothTouch` stays false. Overriding iOS momentum scrolling is the most
 * common way a "premium" site becomes unusable on a phone.
 */

interface SmoothScrollContextValue {
  /** Scroll to an element, a selector, or a pixel offset. */
  scrollTo: (target: string | HTMLElement | number, offset?: number) => void;
  /** True once Lenis is driving the page. False under reduced motion. */
  isSmooth: boolean;
  /** Stop/start — used by the preloader and the mobile drawer to lock scroll. */
  setLocked: (locked: boolean) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

/**
 * Consumers get a no-op-safe API whether or not smooth scrolling is active,
 * so no component ever has to null-check the provider. Under reduced motion
 * `scrollTo` still works — it just hands off to the native implementation.
 */
export function useSmoothScroll(): SmoothScrollContextValue {
  const ctx = useContext(SmoothScrollContext);

  const fallbackScrollTo = useCallback(
    (target: string | HTMLElement | number, offset = 0) => {
      if (typeof window === "undefined") return;

      if (typeof target === "number") {
        window.scrollTo({ top: target + offset, behavior: "smooth" });
        return;
      }

      const el =
        typeof target === "string" ? document.querySelector(target) : target;
      if (!el) return;

      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    },
    [],
  );

  return (
    ctx ?? {
      scrollTo: fallbackScrollTo,
      isSmooth: false,
      setLocked: () => {},
    }
  );
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);
  const wakeRef = useRef<(() => void) | null>(null);

  /**
   * `isSmooth` is a fact about the environment, not about the instance.
   *
   * It used to be `useState(false)` flipped to true inside the effect that
   * creates Lenis, which is a setState in an effect body — a cascading render
   * on every mount, and what `react-hooks/set-state-in-effect` flags. Reading
   * the media query through `useSyncExternalStore` gives the same answer
   * without the extra render, and it is strictly more correct: the value now
   * also updates if the visitor changes their reduced-motion preference while
   * the page is open, which the state version never noticed.
   *
   * The server snapshot is `false` because there is no smooth scrolling
   * during SSR, so the first client render agrees with the HTML.
   */
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => true,
  );
  const isSmooth = features.smoothScroll && !prefersReducedMotion;

  useEffect(() => {
    if (!features.smoothScroll) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    // Touch devices keep native momentum scrolling entirely — Lenis never
    // smooths touch here (syncTouch: false), so running it on phones was pure
    // per-frame overhead.
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)");
    if (coarse.matches) return;

    const lenis = new Lenis({
      // 1.05 is the sweet spot: enough easing to read as designed, short
      // enough that a flick of the wheel still feels connected to the hand.
      // Above ~1.4 the page starts to feel like it is resisting the user.
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      // Native momentum on touch. See the note in the block comment above.
      syncTouch: false,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
      autoResize: true,
    });

    lenisRef.current = lenis;

    /**
     * The rAF loop runs only while something is scrolling. The previous loop
     * ticked Lenis 60 times a second forever — including on an idle page —
     * which showed up as constant main-thread work in profiling. Any input
     * that can start a scroll wakes it; ~30 still frames put it back to sleep.
     */
    let idleFrames = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      idleFrames = lenis.isScrolling ? 0 : idleFrames + 1;
      if (idleFrames > 30) {
        rafRef.current = null;
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    const wake = () => {
      idleFrames = 0;
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(tick);
    };
    wakeRef.current = wake;

    const events = ["wheel", "scroll", "keydown", "pointerdown"] as const;
    events.forEach((type) => window.addEventListener(type, wake, { passive: true }));
    wake();

    return () => {
      events.forEach((type) => window.removeEventListener(type, wake));
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      wakeRef.current = null;
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback(
    (target: string | HTMLElement | number, offset = 0) => {
      const lenis = lenisRef.current;

      if (lenis) {
        lenis.scrollTo(target, { offset, duration: 1.2 });
        wakeRef.current?.();
        return;
      }

      // Reduced motion, or Lenis not yet mounted — native fallback.
      if (typeof window === "undefined") return;
      if (typeof target === "number") {
        window.scrollTo({ top: target + offset });
        return;
      }
      const el =
        typeof target === "string" ? document.querySelector(target) : target;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    },
    [],
  );

  /**
   * Scroll lock. The preloader and the mobile drawer both need the page frozen
   * behind them.
   *
   * `overflow: hidden` on <body> is the usual approach and is wrong here: it
   * resets scroll position on iOS and fights Lenis for control. Stopping Lenis
   * and setting `overscroll-behavior` keeps the position intact.
   */
  const setLocked = useCallback((locked: boolean) => {
    const lenis = lenisRef.current;
    if (lenis) {
      if (locked) lenis.stop();
      else {
        lenis.start();
        wakeRef.current?.();
      }
    }
    document.documentElement.style.overflow = locked ? "hidden" : "";
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ scrollTo, isSmooth, setLocked }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

/* ==========================================================================
   REDUCED-MOTION STORE
   --------------------------------------------------------------------------
   The two halves of `useSyncExternalStore`, kept at module scope so they are
   stable identities and never re-subscribe on re-render.
   ========================================================================== */

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}
