"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useCallback, useRef } from "react";

import { BrowserFrame, PhoneFrame } from "@/components/ui/device-frames";
import { cn } from "@/lib/utils";

/**
 * The hero stage: real screenshots of shipped work, layered in depth, drifting
 * toward the pointer at different rates. Every layer is transform-only; on
 * touch and under reduced motion it holds still.
 */

function useDepth(mx: MotionValue<number>, my: MotionValue<number>, depth: number) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return { x, y };
}

export function HeroVisual({
  browserAlt,
  phoneAlt,
  phone2Alt,
  labels,
}: {
  browserAlt: string;
  phoneAlt: string;
  phone2Alt: string;
  labels: { api: string; pwa: string; seo: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 90, damping: 20, mass: 0.6 });
  const my = useSpring(rawY, { stiffness: 90, damping: 20, mass: 0.6 });

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduce || e.pointerType !== "mouse" || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      rawX.set(((e.clientX - r.left) / r.width - 0.5) * 2);
      rawY.set(((e.clientY - r.top) / r.height - 0.5) * 2);
    },
    [rawX, rawY, reduce],
  );
  const onLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  const back = useDepth(mx, my, -10);
  const mid = useDepth(mx, my, 14);
  const front = useDepth(mx, my, 26);
  const chips = useDepth(mx, my, 36);
  const rotY = useTransform(mx, (v) => v * 4);
  const rotX = useTransform(my, (v) => v * -3);

  /* Entrances are CSS (`.hero-in` in styles/motion.css): they start at first
     paint instead of after hydration, and stay on the compositor. */
  const enter = (delay: number, fromY = 40) => ({
    className: "hero-in",
    style: { "--in-delay": `${delay}s`, "--from-y": `${fromY}px` } as React.CSSProperties,
  });

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative mx-auto aspect-[5/4] w-full max-w-[40rem] [perspective:1400px]"
      dir="ltr"
    >
      {/* Orbit rings */}
      <motion.div aria-hidden="true" style={back} className="absolute inset-[6%] rounded-full border border-line">
        <div className="absolute inset-[12%] rounded-full border border-dashed border-brand-300/60" />
        <span className="absolute top-[8%] left-[18%] size-2 rounded-full bg-brand-600 shadow-[var(--shadow-brand)]" />
        <span className="absolute right-[10%] bottom-[20%] size-1.5 rounded-full bg-aqua-400 shadow-[var(--shadow-float)]" />
      </motion.div>

      {/* Browser — Bay3 storefront */}
      <motion.div style={{ ...mid, rotateY: rotY, rotateX: rotX }} className="absolute top-[6%] right-0 w-[86%] [transform-style:preserve-3d]">
        <div {...enter(0.35, 60)}>
          <BrowserFrame
            shot="bay3/storefront"
            alt={browserAlt}
            url="bay3.vercel.app"
            priority
            sizes="(min-width: 1024px) 34rem, 86vw"
            className="shadow-[var(--shadow-float)]"
          />
        </div>
      </motion.div>

      {/* Phone — Shopik Lopik */}
      <motion.div style={front} className="absolute bottom-[2%] left-[2%] w-[30%] min-w-[7.5rem]">
        <div {...enter(0.6, 80)}>
          <PhoneFrame shot="shopik-lopik/mobile-home" alt={phoneAlt} sizes="(min-width: 1024px) 12rem, 30vw" />
        </div>
      </motion.div>

      {/* Phone 2 — Dahab El Araby, peeking behind */}
      <motion.div style={mid} className="absolute right-[4%] bottom-[-4%] hidden w-[22%] sm:block">
        <div style={enter(0.8, 90).style} className="hero-in rotate-[6deg]">
          <PhoneFrame shot="dahab-el-araby/mobile-dark" alt={phone2Alt} sizes="9rem" />
        </div>
      </motion.div>

      {/* Code card */}
      <motion.div style={chips} className="absolute top-[-6%] left-[-4%] z-10 hidden w-[40%] sm:block">
        <div style={enter(0.9, 30).style} className="hero-in rounded-2xl border border-navy-700 bg-navy p-4 font-mono text-[0.68rem] leading-relaxed text-[#b9c0dc] shadow-[var(--shadow-float)]">
          <div className="mb-2 flex items-center gap-1.5" aria-hidden="true">
            <span className="size-2 rounded-full bg-navy-600" />
            <span className="size-2 rounded-full bg-navy-600" />
            <span className="size-2 rounded-full bg-navy-600" />
            <span className="ms-auto text-[0.6rem] text-[#8f97b8]">product.tsx</span>
          </div>
          <pre aria-hidden="true" className="overflow-hidden">
            <span className="text-aqua-300">export function</span> <span className="text-brand-300">Launch</span>() {"{"}
            {"\n  "}
            <span className="text-aqua-300">return</span> {"<"}
            <span className="text-brand-300">Product</span>
            {"\n    "}
            <span className="text-[#8f97b8]">design</span>=<span className="text-aqua-200">&quot;ui/ux&quot;</span>
            {"\n    "}
            <span className="text-[#8f97b8]">api</span>=<span className="text-aqua-200">&quot;rest&quot;</span>
            {"\n    "}
            <span className="text-[#8f97b8]">ship</span>=<span className="text-aqua-200">&quot;android&quot;</span>
            {"\n  />;\n}"}
          </pre>
        </div>
      </motion.div>

      {/* Chips */}
      <Chip style={chips} className="top-[44%] left-[26%]" delay={1.1} dot="brand">
        {labels.api}
      </Chip>
      <Chip style={front} className="right-[-2%] top-[-4%]" delay={1.25} dot="aqua">
        {labels.pwa}
      </Chip>
      <Chip style={chips} className="bottom-[26%] right-[22%] hidden sm:flex" delay={1.4} dot="brand">
        {labels.seo}
      </Chip>
    </div>
  );
}

function Chip({
  children,
  className,
  style,
  delay,
  dot,
}: {
  children: React.ReactNode;
  className?: string;
  style: { x: MotionValue<number>; y: MotionValue<number> };
  delay: number;
  dot: "brand" | "aqua";
}) {
  return (
    <motion.div style={style} className={cn("absolute z-10 flex", className)}>
      {/* float and entrance live on separate elements: both animate `transform` */}
      <div className="animate-float will-change-transform">
        <div
          style={{ "--in-delay": `${delay}s`, "--from-y": "0px", "--from-scale": 0.8 } as React.CSSProperties}
          className="hero-in glass flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[0.68rem] whitespace-nowrap text-fg shadow-[var(--shadow-lift)]"
        >
          <span className={cn("size-1.5 rounded-full", dot === "brand" ? "bg-brand-500" : "pulse-ring bg-aqua-500")} />
          {children}
        </div>
      </div>
    </motion.div>
  );
}
