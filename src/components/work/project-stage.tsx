"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useCallback, useRef } from "react";

import { Parallax } from "@/components/motion/parallax";
import { BrowserFrame, PhoneFrame } from "@/components/ui/device-frames";
import type { MediaKey } from "@/content/media.generated";
import type { Locale } from "@/i18n/config";
import { cn, displayUrl } from "@/lib/utils";
import { useCursorProps } from "@/providers";

/**
 * The portfolio stage. Real screenshots in device frames, a glow tinted to the
 * project's own colour, a gentle pointer tilt, a phone that drifts on scroll,
 * and a "View" cursor that tells you a click opens the case study.
 *
 * Receives only the current language's strings — see `project-media.tsx`.
 * Passing whole bilingual project records made Next serialise both languages
 * and every screenshot label of every project into the page HTML.
 */

export interface StageShot {
  key: MediaKey;
  label: string;
}

export interface StageData {
  name: string;
  category: string;
  tone: string;
  liveUrl: string;
  showcase?: "browser" | "phones";
  desktop?: StageShot;
  phone?: StageShot;
  phone2?: StageShot;
}

export function ProjectStage({
  stage,
  locale,
  href,
  viewLabel,
  priority,
  className,
}: {
  stage: StageData;
  locale: Locale;
  href: string;
  viewLabel: string;
  priority?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const cursorProps = useCursorProps();
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, (v) => v * -4), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(px, (v) => v * 5), { stiffness: 120, damping: 20 });

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLAnchorElement>) => {
      if (reduce || e.pointerType !== "mouse" || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
      ref.current.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
      ref.current.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
    },
    [px, py, reduce],
  );
  const onLeave = useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  const { desktop, phone, phone2 } = stage;
  const phonesFirst = stage.showcase === "phones";
  const url = displayUrl(stage.liveUrl);
  const cursor = cursorProps("view", viewLabel);

  return (
    <Link
      ref={ref}
      href={href}
      aria-label={`${stage.name} — ${stage.category}`}
      onPointerMove={onMove}
      onPointerEnter={cursor.onPointerEnter}
      onPointerLeave={() => {
        onLeave();
        cursor.onPointerLeave();
      }}
      // Entrance: the CSS scale reveal (opacity + transform). It used to be a
      // clip-path wipe, which repaints the whole stage every frame.
      data-reveal="scale"
      suppressHydrationWarning
      className={cn("group/media relative block [perspective:1600px]", className)}
      style={{ "--tone": stage.tone } as React.CSSProperties}
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry }}
        className="ring-gradient relative aspect-[4/3] overflow-hidden rounded-panel bg-[linear-gradient(160deg,var(--color-surface),var(--color-mist))] [--ring:linear-gradient(135deg,rgb(var(--tone)/0.55),rgb(255_255_255/0.4)_45%,rgb(52_211_192/0.5))] sm:aspect-[16/11]"
      >
        {/* Tone glow + pointer light */}
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgb(var(--tone)/0.35),transparent_60%)]" />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/media:opacity-100"
          style={{ background: "radial-gradient(600px circle at var(--gx,50%) var(--gy,50%), rgb(var(--tone) / 0.22), transparent 45%)" }}
        />
        <div aria-hidden="true" className="grid-bg absolute inset-0 opacity-30" />

        {phonesFirst ? (
          <div className="absolute inset-0" dir="ltr">
            {desktop ? (
              <div className="absolute top-[9%] left-[5%] w-[62%] opacity-70 transition-all duration-700 ease-[var(--ease-brand)] group-hover/media:opacity-90">
                <BrowserFrame shot={desktop.key} alt={desktop.label} url={url} sizes="(min-width: 1024px) 26rem, 60vw" />
              </div>
            ) : null}
            {phone2 ? (
              <Parallax speed={24} className="absolute top-[14%] right-[30%] w-[24%]">
                <div className="rotate-[-5deg] transition-transform duration-700 ease-[var(--ease-brand)] group-hover/media:rotate-[-8deg] group-hover/media:-translate-x-2">
                  <PhoneFrame shot={phone2.key} alt={phone2.label} sizes="(min-width: 1024px) 11rem, 24vw" />
                </div>
              </Parallax>
            ) : null}
            {phone ? (
              <Parallax speed={48} className="absolute top-[8%] right-[6%] w-[27%]">
                <div className="rotate-[4deg] transition-transform duration-700 ease-[var(--ease-brand)] group-hover/media:rotate-[7deg] group-hover/media:translate-x-2">
                  <PhoneFrame shot={phone.key} alt={phone.label} priority={priority} sizes="(min-width: 1024px) 12rem, 27vw" />
                </div>
              </Parallax>
            ) : null}
          </div>
        ) : (
          <div className="absolute inset-0" dir="ltr">
            {desktop ? (
              <div className="absolute top-[8%] left-[6%] w-[84%] transition-transform duration-[1.2s] ease-[var(--ease-brand)] group-hover/media:-translate-y-2 group-hover/media:scale-[1.02]">
                <BrowserFrame
                  shot={desktop.key}
                  alt={desktop.label}
                  url={url}
                  priority={priority}
                  sizes="(min-width: 1024px) 40rem, 90vw"
                  aspect="16/10"
                  imageClassName="transition-transform duration-[1.6s] ease-[var(--ease-brand)] group-hover/media:scale-[1.06]"
                />
              </div>
            ) : null}
            {phone ? (
              <Parallax speed={56} className="absolute right-[5%] bottom-[-8%] w-[25%]">
                <div className="transition-transform duration-700 ease-[var(--ease-brand)] group-hover/media:-translate-y-3 group-hover/media:rotate-[3deg]">
                  <PhoneFrame shot={phone.key} alt={phone.label} sizes="(min-width: 1024px) 11rem, 25vw" />
                </div>
              </Parallax>
            ) : null}
          </div>
        )}

        {/* Hover reveal */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-gradient-to-t from-canvas via-canvas/80 to-transparent px-6 pt-16 pb-5 transition-transform duration-700 ease-[var(--ease-brand)] group-hover/media:translate-y-0 group-focus-visible/media:translate-y-0">
          <span className="font-mono text-xs text-fg-muted">{url}</span>
          <span className="rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white">
            {viewLabel} {locale === "ar" ? "←" : "→"}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
