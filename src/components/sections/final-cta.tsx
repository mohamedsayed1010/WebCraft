import { MaskedLines, Reveal } from "@/components/motion/reveal";
import { BrandMark } from "@/components/ui/brand-mark";
import { ButtonLink } from "@/components/ui/button";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

/**
 * The page's saturated moment: the logo's ribbon gradient as a full panel, with
 * the folded W drifting in the corner. `.on-brand` re-points text tokens to
 * white so contrast holds on the blue.
 */
export function FinalCta({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict.cta;
  return (
    <section data-loop aria-labelledby="cta-title" className="relative px-3 py-6 sm:px-6">
      <div className="on-brand relative isolate overflow-hidden rounded-[2rem] bg-brand-600 shadow-[var(--shadow-float)] sm:rounded-[2.75rem]">
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
          {/* the ribbon gradient drifts by translating an oversized layer, not by
              animating background-position (which repaints the panel each frame) */}
          <div className="h-full w-[200%] animate-[slide-x_22s_ease-in-out_infinite_alternate] bg-[linear-gradient(110deg,var(--color-brand-800)_0%,var(--color-brand-600)_22%,var(--color-brand-500)_38%,var(--color-brand-600)_50%,var(--color-brand-800)_72%,var(--color-brand-600)_100%)]" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_130%,rgb(52_211_192/0.55),transparent_55%),radial-gradient(circle_at_0%_0%,rgb(163_181_255/0.35),transparent_45%)]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(to_right,rgb(255_255_255/0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.08)_1px,transparent_1px)] [background-size:64px_64px] mask-radial" />

        <div aria-hidden="true" className="absolute end-[-5rem] top-[-5rem] hidden size-[24rem] animate-spin-slow rounded-full border border-dashed border-white/25 md:block">
          <div className="absolute start-12 top-14 grid size-24 animate-[spin_24s_linear_infinite_reverse] place-items-center rounded-[1.6rem] bg-white shadow-[var(--shadow-float)]">
            <BrandMark className="size-16" />
          </div>
        </div>

        <div className="container-x relative py-24 text-center sm:py-32">
          <h2 id="cta-title" className="mx-auto max-w-5xl font-black">
            <MaskedLines
              stagger={0.14}
              lines={[
                <span key="a" className="block text-display text-fg">{c.title}</span>,
                <span key="b" className="block text-mega text-aqua-200">{c.titleB}</span>,
              ]}
            />
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lead text-fg-muted">{c.lead}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <ButtonLink href={localePath(locale, "/#contact")} size="lg" variant="light" magnetic>
                {c.start}
              </ButtonLink>
              <ButtonLink href={localePath(locale, "/#work")} size="lg" variant="ghost" className="border border-line-strong text-fg hover:border-white hover:text-white">
                {c.work}
              </ButtonLink>
              <ButtonLink href={localePath(locale, "/contact")} size="lg" variant="ghost" className="text-fg hover:text-aqua-200">
                {c.contact}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
