import Link from "next/link";

import { Reveal, SplitText } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";

/**
 * PAGE HEADER
 *
 * The opening block on every standalone route — /services, /work, /about,
 * /faq, /contact and each service page.
 *
 * It exists because those pages are where the homepage now sends anyone who
 * wants detail, and a visitor who lands on one from a search result has to
 * recognise the site instantly. So it reproduces the homepage's own section
 * opener — Latin kicker in the pixel face, Arabic heading in Noto Kufi, one
 * lead line — at page scale, rather than inventing a second heading system
 * for inner pages.
 *
 * `backHref` renders a breadcrumb-style return link. In an RTL document
 * "back" points *right*, which is why the glyph is `ArrowRight`.
 */
export function PageHeader({
  kicker,
  title,
  lead,
  backHref,
  backLabel,
  children,
}: {
  /** Latin, pixel face. Silkscreen carries no Arabic glyphs. */
  kicker: string;
  title: string;
  lead?: string;
  backHref?: string;
  backLabel?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-20">
      <div
        aria-hidden="true"
        className="orb-violet pointer-events-none absolute -top-52 start-[-14rem] -z-10 size-[42rem] rounded-full opacity-50"
      />
      <div
        aria-hidden="true"
        className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_70%)]"
      />

      <div className="container-page">
        {backHref && backLabel ? (
          <Reveal preset="fade">
            <Link
              href={backHref}
              className="text-fg-subtle hover:text-fg duration-fast group mb-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            >
              <Icon
                name="ArrowRight"
                className="duration-fast size-4 transition-transform group-hover:translate-x-1"
              />
              {backLabel}
            </Link>
          </Reveal>
        ) : null}

        <Reveal preset="fade">
          <div dir="ltr" className="flex items-center gap-3">
            <span className="pixel-label text-graphic">{kicker}</span>
            <span
              aria-hidden="true"
              className="from-graphic-muted/70 h-px w-8 bg-gradient-to-r to-transparent"
            />
          </div>
        </Reveal>

        {/* `leading-display` is explicit for the reason documented in
            `styles/tokens.css`: a `text-*` utility carries its own
            line-height and beats both `@utility` rules and the `h1..h4`
            declaration in base.css. Without it a two-line Arabic page title
            at the 6xl step runs the descender of one line into the ascenders
            of the next. */}
        <h1 className="font-display leading-display mt-6 max-w-[20ch] text-4xl font-extrabold md:text-6xl">
          <SplitText text={title} />
        </h1>

        {lead ? (
          <Reveal preset="rise" delay={0.12}>
            <p className="text-fg-muted leading-body mt-6 max-w-[54ch] text-lg">
              {lead}
            </p>
          </Reveal>
        ) : null}

        {children}
      </div>
    </header>
  );
}
