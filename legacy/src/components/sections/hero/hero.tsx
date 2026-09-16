import {
  HeroAnalytics,
  HeroCatalog,
  HeroConversation,
} from "@/components/graphics/hero-fragments";
import { MaskedLines, Reveal, SplitText } from "@/components/motion/reveal";
import { ButtonLink, buttonVariants } from "@/components/ui/button";
import { Icon, WhatsAppIcon } from "@/components/ui/icon";
import { Stamp } from "@/components/ui/stamp";
import { WhatsAppLink } from "@/components/ui/whatsapp-cta";
import { heroCopy } from "@/content/copy";
import { publishedStats } from "@/content/stats";
import { cn } from "@/lib/utils";

import { HeroCollage } from "./hero-collage";

/**
 * HERO — the promise, one sentence, two ways forward, and a picture of what
 * we actually make.
 *
 * Structure: eyebrow → the two-line headline that carries the whole pitch →
 * one-sentence lead → CTA pair → three checkable facts, with the collage
 * holding the opposite column.
 *
 * The headline break is load-bearing (see `heroCopy`): line one is a
 * compliment the reader already believes, line two is the gap it costs them.
 *
 * ─── WHAT REPLACED THE LONE STAMP ────────────────────────────────────────
 * The right column used to be the rotating disc and nothing else. It is a
 * good mark and it is still here — but on its own it left the largest, most
 * expensive rectangle on the site saying only "we have a logo", while the
 * headline underneath was asked to carry the entire claim by itself.
 *
 * It now holds `<HeroCollage>`: three interface fragments layered at
 * different depths, leaning toward the pointer, with the stamp sitting on
 * them. Between them they say measurement, commerce, and a product people
 * talk to — which is DESIGN / DEVELOPMENT / DIGITAL PRODUCTS / RESULTS
 * stated in pictures, in the seconds before anyone starts reading.
 *
 * ─── WHY THIS FILE IS NO LONGER A CLIENT COMPONENT ───────────────────────
 * It never needed to be. Nothing here holds state; every interactive part —
 * the reveals, the stamp, the WhatsApp link, the collage — is its own client
 * component and stays one. Dropping the directive is what lets the three
 * fragments render on the server and reach `<HeroCollage>` as nodes, so the
 * graphics library is not shipped to the browser to draw a picture that never
 * changes. On the site's single most performance-sensitive screen, that is
 * the difference between a collage that costs bytes and one that costs none.
 *
 * ─── WHAT THIS SECTION STILL DOES NOT DO ─────────────────────────────────
 * Three things were removed earlier and stay removed, all for one reason —
 * the top of the page was making its argument three and four times over:
 * the rotating «معمول عشان …» line, the unmeasured «أقل من تانيتين»
 * statistic, and the promise marquee whose five claims the Why Us section
 * makes properly with the mechanism attached.
 * ─────────────────────────────────────────────────────────────────────────
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="noise relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24"
    >
      <HeroAtmosphere />

      <div className="container-page relative z-10">
        {/* The collage column is capped at 21rem on `lg` and 26rem on `xl`,
            and the cap is measured rather than chosen. Line two of the
            headline — «خلّي موقعك يقول كده.» — has to stay on one line, and
            at the 5xl step it needs roughly 700px of column to do it. A wider
            collage column takes that width away and the line wraps, which
            breaks the two-beat structure the whole headline is built on. If
            the collage ever needs more room, the headline step comes down
            first. */}
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] xl:gap-20">
          {/* ── Left column: the pitch ───────────────────────────────────
              No `max-w` here. It used to carry `max-w-[22ch]`, and `ch` on
              this element resolves against the *body* size — 17px — not the
              headline's, so the whole pitch column was capped at about 210px
              on a 390px phone. The headline broke into five lines, the lead
              ran three words wide, and the CTAs were pushed off the first
              screen. The headline owns its own measure; the column does not
              need one. */}
          <div>
            <Reveal preset="fade">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="bg-accent shadow-glow-lime size-1.5 rounded-full"
                />
                <span className="eyebrow">{heroCopy.eyebrow}</span>
              </div>
            </Reveal>

            {/* The type scale lives on the h1, not on the inner spans: the
                `ch` measure below resolves against this element's own font
                size, and setting it on a child collapses the headline to a
                body-sized column. */}
            {/* THE MEASURE. 24ch, not 20 — the original figure was wrong and
                the line it was protecting was wrapping because of it. `ch` in
                Noto Kufi is the advance of «0», which is narrower than the
                script's average glyph, so 20ch measures out to noticeably
                less than twenty Arabic characters of room and «خلّي موقعك
                يقول كده.» broke across two lines at every desktop width.

                One line matters here specifically: the headline's whole
                structure is two beats — a compliment, then the gap it costs
                you — and a three-line headline has no beats at all.

                The step drops to `text-4xl` below `sm`. At the 5xl minimum a
                390px phone renders the headline at 44px and line two takes
                three lines of its own; the smaller step brings it back to
                two and keeps the primary CTA on the first screen, which is
                the only thing the mobile hero genuinely has to do. */}
            {/* ── WHY LINE TWO IS NOT SPLIT INTO WORDS ──────────────────
                It was, and it rendered as nothing at all.

                `text-gradient-brand` paints a gradient on the element and
                clips it to the element's glyphs with `background-clip: text`,
                which requires `color: transparent`. `SplitText` wraps every
                word in a `motion.span` that carries a transform — and a
                transformed descendant is painted into its own layer, so it no
                longer contributes to the ancestor's text clip. The result is
                transparent glyphs with no clipped background behind them: the
                brand's own statement, in the largest type on the site, was
                invisible in every browser.

                The fix is to put the gradient on the element that moves.
                `MaskedLines` does exactly that — one line, one wrapper, the
                gradient on the animated span itself — so the paint and the
                transform are the same element and the clip survives.

                It also reads better. Line one assembles word by word; line
                two arrives whole, as one committed statement, with a single
                continuous lime→violet sweep instead of four separate ones. */}
            <h1 className="display-mega leading-mega mt-6 max-w-[24ch] text-4xl font-extrabold sm:text-5xl">
              <span className="block">
                <SplitText text={heroCopy.headline.lineOne} />
              </span>
              <MaskedLines
                className="mt-1"
                lineClassName="text-gradient-brand"
                lines={[heroCopy.headline.lineTwo]}
                delay={0.28}
              />
            </h1>

            <Reveal preset="rise" delay={0.5}>
              <p className="text-fg-muted leading-body mt-7 max-w-[48ch] text-lg md:text-xl">
                {heroCopy.lead}
              </p>
            </Reveal>

            {/* ── CTAs ─────────────────────────────────────────────────
                Work first. The portfolio is the only thing on this site a
                stranger can verify in ten seconds, and sending them to it is
                a stronger opening move than asking them to talk to us before
                they have seen anything.

                The second button is still WhatsApp underneath — a business
                owner who is already sold at this point should not have to
                scroll to the foot of the page to act on it. */}
            <Reveal preset="rise" delay={0.62}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ButtonLink
                  href="/#work"
                  variant="primary"
                  size="xl"
                  className="group/cta hover:-translate-y-0.5"
                >
                  {heroCopy.primaryCta}
                  <Icon
                    name="ArrowLeft"
                    className="duration-fast ease-brand size-4 transition-transform group-hover/cta:-translate-x-1"
                  />
                </ButtonLink>

                <WhatsAppLink
                  context="تصميم موقع لمشروعي"
                  label={heroCopy.secondaryCta}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "xl" }),
                    "group/cta",
                  )}
                >
                  <WhatsAppIcon className="size-5" />
                  {heroCopy.secondaryCta}
                </WhatsAppLink>
              </div>
            </Reveal>

            <Reveal preset="fade" delay={0.74}>
              <p className="text-fg-subtle mt-5 text-sm">{heroCopy.ctaNote}</p>
            </Reveal>
          </div>

          {/* ── Right column: the collage ───────────────────────────────
              Hidden below `lg`. On a phone the hero has one job — headline,
              lead, thumb-reachable CTA — and a stack of decorative panels
              above the fold pushes the button off it. The mobile hero is not
              a shrunk desktop hero; it is the desktop hero with the
              atmosphere removed. */}
          <div className="hidden lg:block">
            <HeroCollage
              fragments={[
                <HeroAnalytics key="analytics" />,
                <HeroCatalog key="catalog" />,
                <HeroConversation key="conversation" />,
              ]}
              stamp={<Stamp size={104} />}
            />
          </div>
        </div>

        {/* ── Trust ───────────────────────────────────────────────────────
            Three facts, each one checkable. Violet numerals, not lime: four
            36px lime figures directly beneath a lime button meant the button
            was no longer the loudest thing in its own viewport. */}
        {publishedStats.length > 0 ? (
          <Reveal preset="rise" delay={0.86}>
            <dl className="border-border mt-16 grid grid-cols-3 gap-x-6 gap-y-8 border-t pt-10">
              {publishedStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span
                      dir="ltr"
                      className="latin-display text-graphic block text-3xl font-black md:text-4xl"
                    >
                      {stat.value}
                    </span>
                    <span className="text-fg-subtle mt-2 block text-xs md:text-sm">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

/* ==========================================================================
   ATMOSPHERE
   --------------------------------------------------------------------------
   Depth on near-black comes from coloured bloom and a grid, never from grey
   drop-shadows. All decorative, all pointer-events-none.
   ========================================================================== */

function HeroAtmosphere() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/* The grid drifts one cell every 26 seconds — slow enough that nobody
          consciously sees it move, fast enough that the hero is never quite
          still. It animates `background-position` on a layer that paints
          nothing else, so it composites without touching layout, and the
          global reduced-motion block stops it outright. */}
      <div className="grid-lines grid-drift absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_50%_35%,black,transparent_72%)]" />
      <div className="orb-violet absolute -top-40 -start-32 size-[46rem] rounded-full" />
      <div className="orb-lime absolute -bottom-52 -end-24 size-[34rem] rounded-full" />
      <div className="from-bg absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent" />
    </div>
  );
}
