import { Check } from "lucide-react";

import { Parallax } from "@/components/motion/parallax";
import { MaskedLines, Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { BrandMark } from "@/components/ui/brand-mark";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

/**
 * SEO, as its own chapter: the message is that search visibility is a
 * property of how the code is written. The visual is literally that — the
 * document outline, the structured data and the link preview a crawler and a
 * WhatsApp chat both see.
 */
export function SeoBand({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const s = dict.seoBand;
  return (
    <section aria-labelledby="seo-title" className="relative overflow-hidden border-y border-line bg-[linear-gradient(160deg,var(--color-brand-100)_0%,var(--color-mist)_45%,var(--color-tide)_100%)]">
      <div aria-hidden="true" className="grid-bg absolute inset-0 opacity-70 mask-fade-b" />
      <div aria-hidden="true" className="absolute end-[-15%] top-[-30%] size-[42rem] glow [--glow:color-mix(in_oklab,var(--color-brand-300)_64%,transparent)]" />

      <div className="container-x section-y relative grid items-center gap-16 lg:grid-cols-2">
        <div>
          <Reveal preset="fade">
            <p className="label-mono ltr inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-brand-600">
              <span className="size-1.5 rounded-full bg-brand-600" /> {s.kicker}
            </p>
          </Reveal>
          <h2 id="seo-title" className="mt-6 text-display font-extrabold text-fg">
            <MaskedLines lines={[s.title]} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-lead text-fg-muted">{s.lead}</p>
          </Reveal>
          <RevealGroup as="ul" className="mt-10 grid gap-3 sm:grid-cols-2" stagger={0.06}>
            {s.checklist.map((item) => (
              <RevealItem key={item} as="li" className="flex items-start gap-3 rounded-xl border border-white/70 bg-white/55 p-3.5 text-sm text-fg shadow-[var(--shadow-soft)]">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
                  <Check className="size-3" aria-hidden="true" />
                </span>
                {item}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[34rem]" dir="ltr">
          <Parallax speed={30} className="absolute top-[4%] left-0 w-[64%]">
            <div className="-rotate-3 rounded-2xl border border-line bg-surface p-5 font-mono text-[0.68rem] leading-[1.9] shadow-[var(--shadow-lift)] sm:text-xs">
              <p className="mb-2 text-fg-subtle">document outline</p>
              <p><span className="text-aqua-700">&lt;html</span> <span className="text-fg-subtle">lang</span>=<span className="text-brand-600">&quot;{locale === "ar" ? "ar-EG" : "en"}&quot;</span> <span className="text-fg-subtle">dir</span>=<span className="text-brand-600">&quot;{locale === "ar" ? "rtl" : "ltr"}&quot;</span><span className="text-aqua-700">&gt;</span></p>
              <p className="ps-3 text-fg-muted">&lt;header&gt; &lt;nav&gt;</p>
              <p className="ps-3 text-fg-muted">&lt;main&gt;</p>
              <p className="ps-6"><span className="rounded bg-aqua-100 px-1 text-brand-600">&lt;h1&gt;</span> <span className="text-fg-subtle">× 1</span></p>
              <p className="ps-9 text-fg-muted">&lt;section&gt; <span className="text-aqua-700">&lt;h2&gt;</span></p>
              <p className="ps-12 text-fg-muted">&lt;article&gt; <span className="text-aqua-700">&lt;h3&gt;</span></p>
              <p className="ps-3 text-fg-muted">&lt;footer&gt;</p>
            </div>
          </Parallax>

          <Parallax speed={-40} className="absolute right-0 bottom-[6%] w-[70%]">
            <div className="rotate-2 overflow-hidden rounded-2xl border border-white bg-white shadow-[var(--shadow-float)]">
              <div className="relative flex h-32 items-center justify-center overflow-hidden bg-[linear-gradient(135deg,var(--color-brand-500),var(--color-brand-600)_55%,var(--color-aqua-500))] sm:h-40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgb(255_255_255/0.35),transparent_55%)]" />
                <span className="relative grid size-16 place-items-center rounded-2xl bg-white shadow-[var(--shadow-lift)] sm:size-[4.5rem]"><BrandMark className="size-10 sm:size-12" /></span>
              </div>
              <div className="border-s-4 border-aqua-400 bg-white p-3.5 text-start">
                <p className="text-[0.8rem] leading-snug font-semibold text-navy">{s.serpTitle}</p>
                <p className="mt-1 line-clamp-2 text-[0.7rem] leading-snug text-fg-muted">{s.serpDesc}</p>
                <p className="mt-1.5 text-[0.65rem] text-fg-subtle">webcraft · Open Graph</p>
              </div>
            </div>
          </Parallax>

          <Parallax speed={70} className="absolute top-[38%] right-[4%]">
            <div className="glass flex flex-col gap-2 rounded-2xl p-3">
              <p className="px-1 text-[0.6rem] text-fg-subtle">Core Web Vitals</p>
              {s.vitals.map((v) => (
                <span key={v} className="flex items-center gap-2 rounded-full bg-surface px-3 py-1 font-mono text-xs text-fg">
                  <span className="size-1.5 rounded-full bg-success" /> {v}
                </span>
              ))}
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
