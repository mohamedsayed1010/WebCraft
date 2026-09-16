import { ArrowDown } from "lucide-react";

import { MaskedLines, Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

import { HeroVisual } from "./hero-visual";
import { RotatingWord } from "./rotating-word";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const h = dict.hero;

  return (
    <section id="hero" data-loop aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 lg:min-h-[100svh] lg:pb-24">
      {/* Atmosphere */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="aurora absolute inset-0" />
        <div className="grid-bg mask-radial absolute inset-0 opacity-80" />
        <div className="absolute -top-[20%] end-[-10%] size-[46rem] glow [--glow:color-mix(in_oklab,var(--color-brand-200)_80%,transparent)]" />
        <div className="absolute bottom-[-25%] start-[-15%] size-[38rem] glow [--glow:color-mix(in_oklab,var(--color-aqua-200)_64%,transparent)]" />
        <div className="absolute inset-x-0 top-0 h-px overflow-hidden opacity-70">
          {/* static hairline: a looping shimmer here kept the compositor producing
              frames forever for a 1px detail (measured ~30% idle CPU on mobile) */}
          <div className="h-full w-full bg-[linear-gradient(90deg,transparent,var(--color-aqua-400),var(--color-brand-500),transparent)]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-canvas" />
      </div>

      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7 xl:col-span-7">
          <Reveal preset="fade">
            <p className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 ps-2 pe-4 text-sm text-fg-muted">
              <span className="grid size-6 place-items-center rounded-full bg-aqua-100">
                <span className="pulse-ring size-2 rounded-full bg-aqua-500" />
              </span>
              {h.eyebrow}
            </p>
          </Reveal>

          <h1 id="hero-title" className="mt-7 font-extrabold">
            <MaskedLines
              stagger={0.12}
              lines={[
                <span key="a" className="block text-headline text-fg-muted">
                  {h.titleA}
                </span>,
                <span key="b" className="block text-hero text-fg">
                  {h.titleB}
                </span>,
                <span key="c" className="block text-hero text-fg">
                  <span className="highlight">
                    <span className="text-gradient">{h.titleHighlight}</span>
                  </span>
                </span>,
              ]}
            />
          </h1>

          <Reveal delay={0.35}>
            <p className="mt-6 flex flex-wrap items-center gap-x-3 font-display text-title font-bold text-fg">
              <span className="text-fg-subtle">{h.capabilitiesLabel}</span>
              <RotatingWord words={h.rotating} />
            </p>
          </Reveal>

          <Reveal delay={0.45}>
            <p className="mt-6 max-w-xl text-lead text-fg-muted">{h.lead}</p>
          </Reveal>

          <Reveal delay={0.55}>
            <div className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
              <ButtonLink href={localePath(locale, "/#contact")} size="lg" magnetic>
                {dict.common.startProject}
              </ButtonLink>
              <ButtonLink href={localePath(locale, "/#work")} size="lg" variant="secondary">
                {dict.common.exploreWork}
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.7}>
            <ol className="mt-12 flex flex-wrap items-center gap-x-2 gap-y-3" aria-label={dict.footer.motto}>
              {h.motto.map((word, i) => (
                <li key={word} className="flex items-center gap-2">
                  <span className="label-mono ltr text-brand-600">0{i + 1}</span>
                  <span className="font-display text-base font-bold text-fg">{word}</span>
                  {i < h.motto.length - 1 ? (
                    <span aria-hidden="true" className="mx-2 h-px w-6 bg-line-strong sm:w-10" />
                  ) : null}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <div className="lg:col-span-5 xl:col-span-5">
          <HeroVisual
            browserAlt={locale === "ar" ? "واجهة متجر Bay3 من أعمال ويب كرافت" : "Bay3 storefront, built by WebCraft"}
            phoneAlt={locale === "ar" ? "تطبيق شوبيك لوبيك على الموبايل" : "Shopik Lopik on mobile"}
            phone2Alt={locale === "ar" ? "تطبيق دهب العربي على الموبايل" : "Dahab El Araby app on mobile"}
            labels={{ api: "REST API · 200 OK", pwa: "PWA · installable", seo: "SEO · JSON-LD" }}
          />
        </div>
      </div>

      <a
        href="#proof"
        className="absolute bottom-6 start-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-fg-subtle transition-colors hover:text-brand-600 lg:flex rtl:translate-x-1/2"
      >
        <span className="label-mono">{h.scroll}</span>
        <ArrowDown aria-hidden="true" className="size-4 animate-float" />
      </a>
    </section>
  );
}
