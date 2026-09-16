"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

import type { Dictionary } from "@/i18n/get-dictionary";

/**
 * HOW WE WORK — a timeline the scroll draws. The brand rail fills as you move
 * through the section and each stage lights up when the rail reaches it.
 * Heading stays pinned on desktop so the six steps read as one argument.
 */
export function Process({ copy }: { copy: Dictionary["process"] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  // Straight from scroll — no spring. The rail and the lit states already track
  // the scroll position smoothly; a spring only added per-frame physics work.
  const progress = scrollYProgress;
  // scaleY, not height: animating height forced a layout on every scroll frame.
  const railScale = progress;
  const n = copy.steps.length;

  return (
    <section id="process" aria-labelledby="process-title" className="section-y relative overflow-hidden bg-[linear-gradient(180deg,var(--color-mist)_0%,var(--color-brand-100)_100%)]">
      <div aria-hidden="true" className="grid-bg absolute inset-0 opacity-25 mask-fade-b" />
      <div aria-hidden="true" className="absolute start-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-300/60 to-transparent rtl:translate-x-1/2" />

      <div className="container-x relative grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="flex items-center gap-3 text-fg-muted">
              <span className="label-mono ltr text-brand-600">{copy.index}</span>
              <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-aqua-400 to-aqua-400 rtl:bg-gradient-to-l" />
              <span className="label-mono">{copy.kicker}</span>
            </p>
            <h2 id="process-title" className="mt-5 text-display font-extrabold text-fg">
              {copy.title}
            </h2>
            <div aria-hidden="true" className="mt-10 hidden max-w-sm gap-1.5 lg:flex">
              {copy.steps.map((s, i) => (
                <Bar key={s.title} progress={progress} index={i} total={n} />
              ))}
            </div>
          </div>
        </div>

        <ol ref={ref} className="relative lg:col-span-7">
          <span aria-hidden="true" className="absolute start-[1.2rem] top-2 bottom-2 w-px bg-line-strong sm:start-[1.45rem]" />
          <motion.span aria-hidden="true" style={{ scaleY: railScale }} className="absolute start-[1.2rem] top-2 bottom-2 w-px origin-top will-change-transform bg-gradient-to-b from-aqua-400 via-brand-500 to-aqua-400 shadow-[var(--shadow-brand)] sm:start-[1.45rem]" />
          {copy.steps.map((step, i) => (
            <Step key={step.title} index={i} total={n} progress={progress} title={step.title} detail={step.detail} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Bar({ progress, index, total }: { progress: MotionValue<number>; index: number; total: number }) {
  const fill = useTransform(progress, [index / total, (index + 1) / total], [0, 1]);
  return (
    <div className="h-1 flex-1 overflow-hidden rounded-full bg-mist-2">
      <motion.div style={{ scaleX: fill }} className="h-full w-full origin-left rounded-full bg-gradient-to-r from-aqua-400 to-aqua-400 rtl:origin-right" />
    </div>
  );
}
function Step({
  index,
  total,
  progress,
  title,
  detail,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  title: string;
  detail: string;
}) {
  const at = index / (total - 1 || 1);
  const lit = useTransform(progress, [Math.max(0, at - 0.12), at], [0, 1]);
  const dotBg = useTransform(lit, [0, 1], ["rgb(223 232 255)", "rgb(63 87 230)"]);
  const dotColor = useTransform(lit, [0, 1], ["rgb(88 96 127)", "rgb(255 255 255)"]);
  const cardOpacity = useTransform(lit, [0, 1], [0.45, 1]);

  return (
    <li className="relative grid grid-cols-[auto_1fr] gap-5 pb-12 last:pb-0 sm:gap-8">
      <motion.span
        style={{ backgroundColor: dotBg, color: dotColor }}
        className="ltr relative z-10 grid size-10 place-items-center rounded-full border border-line-strong font-mono text-xs font-bold sm:size-12"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>
      <motion.div style={{ opacity: cardOpacity }} className="group rounded-card border border-white/80 bg-white/60 p-6 shadow-[var(--shadow-soft)] transition-colors duration-500 hover:border-brand-200 sm:p-7">
        <h3 className="font-display text-headline font-extrabold text-fg">{title}</h3>
        <p className="mt-3 max-w-lg text-fg-muted">{detail}</p>
      </motion.div>
    </li>
  );
}
