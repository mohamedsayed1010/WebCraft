import { Parallax } from "@/components/motion/parallax";
import { MaskedLines, Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { BrandMark } from "@/components/ui/brand-mark";
import { PhoneFrame } from "@/components/ui/device-frames";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";

/**
 * ANDROID — the most colourful section on the page: the logo's azure→aqua ribbon
 * as a light field. It's the loudest brand moment on purpose — this is where the
 * story moves from "we build for the web" to "we put it in your customer's hand".
 */
export function AndroidShowcase({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const a = dict.android;
  const ar = locale === "ar";

  return (
    <section id="android" aria-labelledby="android-title" className="relative overflow-hidden bg-[linear-gradient(135deg,var(--color-brand-300)_0%,var(--color-brand-200)_40%,var(--color-aqua-200)_100%)] text-navy">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgb(255_255_255/0.5),transparent_40%),radial-gradient(circle_at_5%_100%,rgb(76_124_255/0.35),transparent_50%)]" />
      <div aria-hidden="true" className="absolute inset-0 grid-bg opacity-60" />
      {/* The folded ribbon, oversized, as a watermark */}
      <BrandMark tone="white" className="pointer-events-none absolute -end-24 -bottom-24 size-[34rem] rotate-[-8deg] opacity-40" />

      <div className="container-x section-y relative grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal preset="fade">
            <p className="flex items-center gap-3">
              <span className="label-mono ltr font-bold">{a.index}</span>
              <span aria-hidden="true" className="h-px w-8 bg-navy/40" />
              <span className="label-mono font-bold">{a.kicker}</span>
            </p>
          </Reveal>
          <h2 id="android-title" className="mt-6 text-mega font-black">
            <MaskedLines lines={[a.title]} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-4 font-display text-headline font-extrabold text-brand-800">{a.subtitle}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lead text-navy/80">{a.lead}</p>
          </Reveal>

          {/* The path */}
          <RevealGroup as="ul" className="mt-10 flex flex-wrap items-center gap-2" stagger={0.1} delay={0.2}>
            {a.path.map((step, i) => {
              const last = i === a.path.length - 1;
              return (
                <RevealItem key={step} as="li" className="flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full border-2 px-4 py-2 font-display text-sm font-bold sm:text-base",
                      last ? "border-navy bg-navy text-white" : "border-navy/70 bg-white/40",
                    )}
                  >
                    {step}
                  </span>
                  {!last ? (
                    <svg aria-hidden="true" viewBox="0 0 24 12" className="h-3 w-5 rtl:-scale-x-100">
                      <path d="M0 6h20m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  ) : null}
                </RevealItem>
              );
            })}
          </RevealGroup>

          <RevealGroup as="ul" className="mt-12 grid gap-4 sm:grid-cols-3" stagger={0.08}>
            {a.points.map((p) => (
              <RevealItem key={p.title} as="li" className="rounded-card border border-white/70 bg-white/45 p-4 shadow-[var(--shadow-soft)]">
                <p className="font-display font-extrabold">{p.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-navy/75">{p.detail}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink href={localePath(locale, "/#contact")} variant="navy" size="lg" magnetic>
                {a.cta}
              </ButtonLink>
              <span className="text-xs font-medium text-navy/70">{a.note}</span>
            </div>
          </Reveal>
        </div>

        <div className="relative pb-20 lg:col-span-6 lg:pb-0">
          <div className="relative mx-auto flex max-w-[34rem] items-center justify-center gap-3 sm:gap-5" dir="ltr">
            <div aria-hidden="true" className="absolute inset-[10%] glow [--glow:color-mix(in_oklab,var(--color-white)_80%,transparent)]" />
            <Parallax speed={30} className="relative w-[31%] translate-y-10">
              <PhoneFrame
                shot="dahab-el-araby/mobile-light"
                alt={ar ? "دهب العربي على الموبايل" : "Dahab El Araby on mobile"}
                sizes="(min-width: 1024px) 11rem, 30vw"
                className="-rotate-6"
              />
            </Parallax>
            <Parallax speed={80} className="relative z-10 w-[36%]">
              <PhoneFrame
                shot="shopik-lopik/mobile-categories"
                alt={ar ? "أقسام شوبيك لوبيك على الموبايل" : "Shopik Lopik categories on mobile"}
                sizes="(min-width: 1024px) 13rem, 36vw"
                className="shadow-[var(--shadow-float)]"
              />
            </Parallax>
            <Parallax speed={40} className="relative w-[31%] translate-y-16">
              <PhoneFrame
                shot="bay3/mobile-product"
                alt={ar ? "صفحة منتج Bay3 على الموبايل" : "Bay3 product page on mobile"}
                sizes="(min-width: 1024px) 11rem, 30vw"
                className="rotate-6"
              />
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  );
}
