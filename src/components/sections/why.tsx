import { Gauge, Layers, MonitorSmartphone, Rocket, Sparkles, TrendingUp } from "lucide-react";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Spotlight } from "@/components/motion/spotlight";
import { SectionHeader } from "@/components/ui/section-header";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";

const icons = [Sparkles, Layers, Rocket, Gauge, MonitorSmartphone, TrendingUp];

/** Bento layout — the first two reasons get the big tiles because they carry the positioning. */
export function Why({ dict }: { dict: Dictionary }) {
  const w = dict.why;
  return (
    <section id="why" aria-labelledby="why-title" className="section-y relative overflow-hidden">
      <div aria-hidden="true" className="absolute start-1/2 top-1/2 size-[50rem] -translate-x-1/2 -translate-y-1/2 glow [--glow:color-mix(in_oklab,var(--color-brand-100)_96%,transparent)] rtl:translate-x-1/2" />
      <div className="container-x relative">
        <SectionHeader id="why-title" index={w.index} kicker={w.kicker} title={w.title} />
        <RevealGroup as="ul" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          {w.items.map((item, i) => {
            const Icon = icons[i] ?? Sparkles;
            const big = i < 2;
            return (
              <RevealItem key={item.title} as="li" className={cn(big && "lg:col-span-2")}>
                <Spotlight
                  className={cn(
                    "group relative h-full overflow-hidden rounded-panel border border-white/80 bg-white/55 p-6 shadow-[var(--shadow-soft)] transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-line-strong sm:p-8",
                    big && "lg:min-h-[17rem]",
                  )}
                >
                  {big ? (
                    <span aria-hidden="true" className={cn("glow absolute -end-16 -bottom-16 size-64 transition-opacity duration-700 group-hover:opacity-100", i === 0 ? "[--glow:var(--color-aqua-200)] opacity-60" : "[--glow:color-mix(in_oklab,var(--color-brand-300)_60%,transparent)] opacity-70")} />
                  ) : null}
                  <span className={cn("relative grid size-12 place-items-center rounded-2xl border transition-all duration-500 group-hover:-rotate-6", i === 0 ? "border-brand-500 bg-brand-600 text-white" : "border-line-strong text-brand-600 group-hover:border-brand-300")}>
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className={cn("relative mt-8 font-display font-extrabold text-fg", big ? "text-headline" : "text-title")}>{item.title}</h3>
                  <p className="relative mt-3 max-w-md text-fg-muted">{item.detail}</p>
                </Spotlight>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
