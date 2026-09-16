"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ui } from "@/content/copy";
import { displayUrl, industryKicker, industryLabel } from "@/content/projects";
import {
  duration,
  easing,
  imageMask,
  imageScale,
  inViewDefaults,
  rise,
  splitReveal,
  staggerContainer,
} from "@/lib/motion";
import { cn } from "@/lib/utils";
import type {
  AccentKey,
  Project,
  ProjectDisplay,
  ProjectFeature,
} from "@/types";

/**
 * WEBCRAFT — PROJECT SHOWCASE
 *
 * One shipped product, presented as a case study rather than as a tile.
 *
 * ─── WHY THIS IS NOT A CARD GRID ─────────────────────────────────────────
 * A three-up grid of equal cards says "here are three things". An editorial
 * stack with different weights says "here is the work, and here is what we
 * think of it" — the composition itself is a claim about quality, which is
 * the entire job of a portfolio section. So the three projects run at three
 * different sizes (`display`), and the meta column lands on the opposite side
 * each time, so no two rows resolve into the same rectangle.
 *
 * ─── THE SCREENSHOT IS THE HERO ──────────────────────────────────────────
 * Everything else on the row is furniture around one large, uncropped,
 * readable capture of a real interface. The browser frame is not decoration:
 * it carries the actual host the CTA navigates to, so the visitor reads
 * «bay3.vercel.app/products» before they decide whether to click, and the
 * frame can never advertise an address the button does not go to — both come
 * from the same `liveUrl`.
 *
 * ─── MOTION ──────────────────────────────────────────────────────────────
 * The article is one variant tree. `staggerContainer` on the <article> drives
 * everything beneath it, so the number, the category, the frame and the meta
 * arrive in a designed order rather than as six independent fades. The frame
 * unmasks with `imageMask` while the capture inside counter-settles from 1.12
 * with `imageScale` — the pairing is what reads as cinematic instead of as a
 * box growing.
 *
 * Parallax moves the *frame*, never the image inside it. Translating the
 * capture within an overflow-hidden window would crop the interface, and the
 * whole point of the section is that the interface stays readable.
 * ─────────────────────────────────────────────────────────────────────────
 */

/* ==========================================================================
   LAYOUT TABLE
   --------------------------------------------------------------------------
   The art direction, in one object. Everything asymmetric about the section
   is here rather than scattered through JSX, so the composition can be
   retuned without reading the component.
   ========================================================================== */

interface LayoutSpec {
  /** Grid placement for the browser frame. */
  canvas: string;
  /** Grid placement for the title + summary column. */
  meta: string;
  /** Grid placement for the features + CTA column. */
  aside: string;
  /** Vertical rhythm between the header rail and the body. */
  gap: string;
  /** `sizes` for next/image — must match the real rendered width. */
  sizes: string;
  /** Parallax travel in pixels. Bigger blocks move more. */
  drift: number;
}

const layouts: Record<ProjectDisplay, LayoutSpec> = {
  /** The opener. Full-bleed capture, meta split into two columns beneath it. */
  lead: {
    canvas: "col-span-12",
    meta: "col-span-12 lg:col-span-6 lg:col-start-1",
    aside: "col-span-12 lg:col-span-5 lg:col-start-8",
    gap: "gap-y-10 lg:gap-y-14",
    sizes: "(min-width: 1440px) 1360px, (min-width: 1024px) 92vw, 100vw",
    drift: 26,
  },

  /** Capture on the reading side, meta pushed to the far edge. */
  wide: {
    canvas: "col-span-12 lg:col-span-7 lg:col-start-1",
    meta: "col-span-12 lg:col-span-4 lg:col-start-9",
    aside: "col-span-12 lg:col-span-4 lg:col-start-9",
    gap: "gap-y-10 lg:gap-x-10",
    sizes: "(min-width: 1024px) 56vw, 100vw",
    drift: 18,
  },

  /**
   * Mirrored: meta leads, capture answers it from the opposite edge.
   *
   * `lg:row-start-1` on both is load-bearing, not tidiness. Grid
   * auto-placement only ever moves its cursor *forward*: the capture is
   * placed first at column 7, and the meta's definite start at column 1 is
   * behind that cursor, so the algorithm drops it onto row 2 and leaves a
   * screen of dead space beside the image. Naming the row is the fix.
   */
  compact: {
    canvas: "col-span-12 lg:col-span-6 lg:col-start-7 lg:row-start-1",
    meta: "col-span-12 lg:col-span-5 lg:col-start-1 lg:row-start-1",
    aside: "col-span-12 lg:col-span-5 lg:col-start-1",
    gap: "gap-y-10 lg:gap-x-12",
    sizes: "(min-width: 1024px) 48vw, 100vw",
    drift: 18,
  },
};

/**
 * Per-project bloom behind the frame.
 *
 * Violet leads and lime is the quietest of the three, which is the brand
 * ratio: lime is the colour you act on, and on this row the thing you act on
 * is the button, not the atmosphere behind a screenshot.
 */
const bloom: Record<AccentKey, string> = {
  violet: "from-violet-500/22 via-violet-500/5",
  lime: "from-lime-500/12 via-lime-500/[0.03]",
  paper: "from-white/10 via-white/[0.02]",
};

/* ==========================================================================
   SHOWCASE
   ========================================================================== */

export function ProjectShowcase({
  project,
  index,
}: {
  project: Project;
  /** 1-based. Rendered as the zero-padded editorial number. */
  index: number;
}) {
  const layout = layouts[project.display];
  const frameRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  /**
   * Frame parallax. `offset` runs from "this row's top hits the viewport
   * bottom" to "its bottom leaves the top", so the travel is spent across the
   * whole time the row is on screen rather than in a burst at one edge.
   */
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(
    scrollYProgress,
    [0, 1],
    [layout.drift, -layout.drift],
  );

  const features = project.caseStudy?.features?.slice(0, 3) ?? [];

  return (
    <motion.article
      variants={staggerContainer(0.09)}
      {...inViewDefaults}
      className="group relative"
    >
      <ProjectRail
        index={index}
        kicker={industryKicker(project.industry)}
        label={industryLabel(project.industry)}
        isLive={Boolean(project.liveUrl)}
      />

      <div className={cn("mt-8 grid grid-cols-12 lg:mt-12", layout.gap)}>
        {/* ── The capture ──────────────────────────────────────────────── */}
        <div className={cn("self-start", layout.canvas)}>
          <motion.div
            ref={frameRef}
            style={reduced ? undefined : { y: drift }}
            className="will-animate"
          >
            <ProjectFrame project={project} sizes={layout.sizes} />
          </motion.div>
        </div>

        {/*
          ── The written half ────────────────────────────────────────────
          The lead row splits it across two columns beneath a full-bleed
          capture; the two mirrored rows keep it as one column beside the
          capture. That is not a style preference — two separately-placed
          grid items sharing a column track auto-flow onto *different rows*,
          which is what would leave a screen-tall void next to the image.
        */}
        {project.display === "lead" ? (
          <>
            <motion.div
              variants={staggerContainer(0.07)}
              className={cn("flex flex-col justify-center", layout.meta)}
            >
              <ProjectHeadline project={project} />
            </motion.div>

            <motion.div
              variants={staggerContainer(0.06)}
              className={cn("flex flex-col justify-center", layout.aside)}
            >
              <ProjectDetail project={project} features={features} />
            </motion.div>
          </>
        ) : (
          <motion.div
            variants={staggerContainer(0.07)}
            className={cn("flex flex-col justify-center", layout.meta)}
          >
            <ProjectHeadline project={project} />
            <div className="mt-10">
              <ProjectDetail project={project} features={features} />
            </div>
          </motion.div>
        )}
      </div>

    </motion.article>
  );
}

/* ==========================================================================
   HEADLINE — Latin lockup, name, accent rule, summary
   ========================================================================== */

function ProjectHeadline({ project }: { project: Project }) {
  return (
    <>
      <ProjectTitle project={project} />

      <motion.p
        variants={rise}
        className="text-fg-muted leading-body mt-5 max-w-[46ch] text-base"
      >
        {project.summary}
      </motion.p>
    </>
  );
}

/* ==========================================================================
   DETAIL — what it does, and the two ways in
   ========================================================================== */

function ProjectDetail({
  project,
  features,
}: {
  project: Project;
  features: ProjectFeature[];
}) {
  return (
    <>
      {features.length > 0 ? (
        <motion.ul variants={staggerContainer(0.05)} className="space-y-2.5">
          {features.map((feature) => (
            <motion.li
              key={feature.title}
              variants={rise}
              className="text-fg-subtle group-hover:text-fg-muted duration-base ease-brand flex items-start gap-2.5 text-sm transition-colors"
            >
              <span
                aria-hidden="true"
                className="bg-graphic-muted mt-2 size-1 shrink-0 rounded-full"
              />
              {feature.title}
            </motion.li>
          ))}
        </motion.ul>
      ) : null}

      <motion.div
        variants={rise}
        className={cn(
          "flex flex-wrap items-center gap-3",
          features.length > 0 && "mt-8",
        )}
      >
        {project.liveUrl ? (
          <ButtonLink
            href={project.liveUrl}
            external
            variant="primary"
            size="lg"
            className="group/cta"
          >
            {ui.viewLive}
            <Icon
              name="ArrowUpRight"
              className="duration-fast ease-brand size-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
            />
          </ButtonLink>
        ) : null}

        {project.caseStudy ? (
          <ButtonLink
            href={`/work/${project.slug}`}
            variant="outline"
            size="lg"
            className="group/cta"
          >
            {ui.readCase}
            <Icon
              name="ArrowLeft"
              className="duration-fast ease-brand size-4 transition-transform group-hover/cta:-translate-x-1"
            />
          </ButtonLink>
        ) : null}
      </motion.div>
    </>
  );
}

/* ==========================================================================
   HEADER RAIL — number · category · live state
   ========================================================================== */

function ProjectRail({
  index,
  kicker,
  label,
  isLive,
}: {
  index: number;
  kicker: string;
  label: string;
  isLive: boolean;
}) {
  return (
    <div className="border-border flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t pt-6">
      <div dir="ltr" className="flex items-end gap-5">
        {/*
          THE NUMBER — outlined, so it reads as a printed folio rather than as
          a UI badge, and it ignites to lime on hover. It is the one element
          on the row that is pure typography, which is what buys the section
          its "graphic design portfolio" register.
        */}
        <span className="block overflow-hidden pb-[0.08em]">
          <motion.span
            variants={splitReveal}
            className={cn(
              "latin-display text-outline block text-5xl leading-none font-black md:text-6xl",
              "duration-base ease-brand transition-[color,-webkit-text-stroke-color]",
              "group-hover:[-webkit-text-stroke-color:var(--color-accent)]",
            )}
          >
            {String(index).padStart(2, "0")}
          </motion.span>
        </span>

        <span className="mb-1.5 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="from-graphic-muted/70 h-px w-6 bg-gradient-to-r to-transparent"
          />
          {/*
            Per-character reveal. Safe here and ONLY here: these labels are
            Latin. The same treatment on Arabic would sever the cursive joins
            and render the word misspelled — see the note in
            `components/motion/reveal.tsx`.
          */}
          <CharReveal text={kicker} className="pixel-label text-graphic" />
        </span>
      </div>

      <div className="flex items-center gap-4">
        <motion.span
          variants={rise}
          className="text-fg-subtle hidden text-xs font-semibold sm:block"
        >
          {label}
        </motion.span>

        {isLive ? (
          <motion.span
            variants={rise}
            className="border-border rounded-pill text-fg-muted flex items-center gap-2 border px-3 py-1.5 text-xs font-semibold"
          >
            <span aria-hidden="true" className="relative grid place-items-center">
              <span className="bg-lime-500 size-1.5 rounded-full" />
              <span className="bg-lime-500/40 absolute inset-0 -m-1 animate-ping rounded-full [animation-duration:2.6s] motion-reduce:hidden" />
            </span>
            {ui.liveNow}
          </motion.span>
        ) : null}
      </div>
    </div>
  );
}

/** Latin-only, per-character mask reveal. */
function CharReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <motion.span
      variants={staggerContainer(0.028)}
      aria-label={text}
      dir="ltr"
      className={cn("inline-flex", className)}
    >
      {Array.from(text).map((char, i) => (
        <span
          key={`${char}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden"
        >
          <motion.span variants={splitReveal} className="inline-block">
            {char === " " ? " " : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* ==========================================================================
   BROWSER FRAME
   ========================================================================== */

function ProjectFrame({
  project,
  sizes,
}: {
  project: Project;
  sizes: string;
}) {
  const href = project.liveUrl;
  const host = href ? displayUrl(href) : null;

  const media = (
    <>
      {/* Bloom, behind everything, keyed to the project's accent. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-to-bl to-transparent opacity-0",
          "duration-slow ease-brand transition-opacity group-hover:opacity-100",
          bloom[project.accent],
        )}
      />

      <div
        className={cn(
          "border-border-strong/70 bg-ink-850 rounded-lg relative overflow-hidden border",
          "shadow-[0_40px_90px_-40px_rgb(0_0_0/0.95)]",
          "duration-base ease-brand transition-[border-color,box-shadow]",
          "group-hover:border-lime-500/35",
          "group-hover:shadow-[0_50px_110px_-40px_rgb(0_0_0/0.95),0_0_0_1px_rgb(182_255_0/0.18)]",
        )}
      >
        {/* ── Chrome ───────────────────────────────────────────────────
            A designed browser bar, not a skeuomorphic one: three flat dots
            and the real address. It exists to say "this is a live site you
            can open", which is the single most persuasive thing the section
            can say — and the address comes from the same `liveUrl` the CTA
            navigates to, so the two can never disagree. */}
        <div
          dir="ltr"
          className="border-border bg-ink-800/70 flex h-9 items-center gap-3 border-b px-4"
        >
          <span aria-hidden="true" className="flex shrink-0 items-center gap-1.5">
            <span className="bg-ink-500 size-2 rounded-full" />
            <span className="bg-ink-500 size-2 rounded-full" />
            <span className="bg-ink-500 size-2 rounded-full" />
          </span>

          {host ? (
            <span
              dir="ltr"
              className="bg-ink-900/70 pixel-label text-fg-subtle group-hover:text-accent duration-base ease-brand truncate rounded-pill px-3 py-1.5 transition-colors"
            >
              {host}
            </span>
          ) : null}
        </div>

        {/* ── The capture ─────────────────────────────────────────────
            `imageMask` unmasks the window while `imageScale` settles the
            capture from 1.12 → 1 inside it. Both end at their natural size,
            so nothing is permanently cropped; the only standing transform is
            the 1.02 hover scale, which clips ~1% of the outer edge and never
            touches the interface. */}
        <motion.div
          variants={imageMask}
          className="relative overflow-hidden"
          style={{
            aspectRatio: `${project.cover.width} / ${project.cover.height}`,
          }}
        >
          <motion.div
            variants={imageScale}
            className={cn(
              "h-full w-full",
              "duration-slow ease-brand transition-transform group-hover:scale-[1.02]",
            )}
          >
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              sizes={sizes}
              placeholder={project.cover.blurDataURL ? "blur" : "empty"}
              blurDataURL={project.cover.blurDataURL}
              className="h-full w-full object-cover object-top"
            />
          </motion.div>

          {/* A near-black wash from the foot of the capture, so the frame
              sits in the page instead of glowing off it. Lifts on hover —
              the screenshot literally brightens under the cursor. */}
          <span
            aria-hidden="true"
            className="from-ink-950/45 duration-slow ease-brand pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent opacity-100 transition-opacity group-hover:opacity-0"
          />
        </motion.div>
      </div>
    </>
  );

  if (!href) {
    return <div className="relative">{media}</div>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} — ${ui.viewLive}`}
      className="relative block focus-visible:outline-offset-8"
    >
      {media}
    </a>
  );
}

/* ==========================================================================
   TITLE
   ========================================================================== */

function ProjectTitle({ project }: { project: Project }) {
  const arabicName = project.script === "ar";

  return (
    <div>
      {/* The Latin half of the project's own lockup, above the name. Only for
          projects whose mark is bilingual — repeating "BAY3" over "Bay3"
          would be noise, not a lockup. */}
      {arabicName ? (
        <CharReveal
          text={project.titleLatin}
          className="pixel-label text-fg-subtle mb-4 block"
        />
      ) : null}

      {/* 0.3em of descender room — Noto Kufi's ي and ق drop about 0.25em
          below the baseline and were being sliced by the mask. See the note
          in `components/motion/reveal.tsx`. */}
      <h3 className="overflow-hidden pb-[0.3em]">
        <motion.span
          variants={splitReveal}
          className={cn(
            "block",
            arabicName
              ? "font-display text-3xl font-extrabold md:text-4xl"
              // `.latin-display` carries `direction: ltr` (base.css) so the
              // bidi algorithm cannot mangle a Latin wordmark sitting in an
              // Arabic line. The side effect is that `text-align: start`
              // inside it resolves to the *left*, which floats the name away
              // from the column it belongs to. `text-end` puts it back on the
              // document's start edge without giving up the isolation.
              : "latin-display text-end text-4xl md:text-5xl",
            // The hover shift. Negative X is *forward* in an RTL line, so the
            // name leans into the reading direction rather than away from it.
            "duration-base ease-brand transition-transform group-hover:-translate-x-1.5",
          )}
        >
          {project.title}
        </motion.span>
      </h3>

      {/* The accent line: draws on scroll, then extends and brightens under
          the cursor. `origin-right` is the start edge in this document. */}
      <motion.span
        aria-hidden="true"
        variants={accentLine}
        className={cn(
          "from-lime-500 mt-4 block h-px w-24 origin-right bg-gradient-to-l to-transparent",
          "duration-base ease-brand opacity-50 transition-[width,opacity]",
          "group-hover:w-40 group-hover:opacity-100",
        )}
      />
    </div>
  );
}

/** Hairline that draws from the start edge as the row enters. */
const accentLine = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: duration.reveal, ease: easing.brand },
  },
};
