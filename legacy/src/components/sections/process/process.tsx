"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionCopy } from "@/content/copy";
import { processSteps } from "@/content/process";

/**
 * PROCESS — 04
 *
 * Five steps, and the section exists to remove fear rather than to describe a
 * methodology. The content has been written since the first build but was
 * never composed into the page; the homepage went from "why us" straight to
 * "who we are", which left the largest unanswered question in the funnel —
 * «طيب وبعدين؟» — sitting unanswered right where the visitor starts deciding.
 *
 * Specificity is the whole point. «مرحلة الاكتشاف» reassures nobody. «مكالمة
 * عن شغلك، وبعدها عرض مكتوب توافق عليه قبل ما حاجة تبدأ» reassures everyone,
 * because it can be checked.
 *
 * ─── THE RAIL ────────────────────────────────────────────────────────────
 * One violet line runs the height of the list and fills as the section
 * scrolls, with each step's node lighting as the fill reaches it. It is the
 * one scroll-linked effect on the page and it earns its place here because
 * the section's subject *is* progression — the motion says "there is a path
 * and it ends" before a word is read. Everywhere else, motion is an
 * entrance and nothing more.
 *
 * `useScroll` needs no reduced-motion branch: the fill is a scaleY on a
 * decorative hairline, and MotionConfig's `reducedMotion="user"` at the root
 * strips transform animation while leaving the layout intact — the rail just
 * renders at full height for those users, which is the correct fallback.
 * ─────────────────────────────────────────────────────────────────────────
 */
export function Process() {
  const listRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    /* Starts filling when the list's top reaches three-quarters down the
       viewport and completes when its bottom clears the halfway line, so the
       fill tracks reading position rather than racing ahead of it. */
    offset: ["start 0.75", "end 0.55"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="section-y relative overflow-hidden">
      <div
        aria-hidden="true"
        className="orb-violet pointer-events-none absolute top-1/4 -end-72 -z-10 size-[38rem] rounded-full opacity-40"
      />

      <div className="container-page">
        <SectionHeading {...sectionCopy.process} />

        <div ref={listRef} className="relative mt-16">
          {/* ── The rail ───────────────────────────────────────────────
              Hidden below lg: at mobile widths the steps stack full-width
              and the line would run down the page edge with nothing to
              connect. */}
          <div
            aria-hidden="true"
            className="bg-border absolute inset-y-0 start-[1.4375rem] hidden w-px lg:block"
          >
            <motion.span
              style={{ scaleY: fill }}
              className="from-violet-400 via-violet-500 absolute inset-0 block origin-top bg-gradient-to-b to-transparent"
            />
          </div>

          <RevealGroup as="ul" stagger={0.1} className="flex flex-col gap-3">
            {processSteps.map((step) => (
              <RevealItem as="li" key={step.index}>
                <article className="group relative flex flex-col gap-5 py-5 lg:flex-row lg:items-start lg:gap-10 lg:ps-0">
                  {/* ── Node ───────────────────────────────────────────
                      The point where the rail passes through the step. Sits
                      on the page background so the line appears to run
                      behind it rather than through it. */}
                  <div className="relative flex shrink-0 items-center gap-4 lg:w-[13rem]">
                    <span className="bg-bg border-border-strong text-graphic duration-base ease-brand relative grid size-11 shrink-0 place-items-center rounded-full border transition-colors group-hover:border-violet-500/60">
                      <Icon name={step.icon} className="size-4" />
                    </span>

                    <span
                      dir="ltr"
                      className="pixel-label text-fg-subtle lg:hidden"
                    >
                      {step.index}
                    </span>

                    <h3 className="font-display hidden text-xl font-bold lg:block">
                      {step.title}
                    </h3>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="font-display text-xl font-bold lg:hidden">
                        {step.title}
                      </h3>
                      <span
                        dir="ltr"
                        className="pixel-label text-graphic hidden lg:inline"
                      >
                        {step.index}
                      </span>
                      {step.duration ? (
                        <span className="text-fg-subtle text-xs">
                          {step.duration}
                        </span>
                      ) : null}
                    </div>

                    <p className="text-fg-muted leading-body mt-3 max-w-[56ch] text-sm">
                      {step.description}
                    </p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
