import { cn } from "@/lib/utils";

import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/reveal";

/**
 * WEBCRAFT — SECTION HEADING
 *
 * Every section on the site opens with this, which is what gives a long scroll
 * a readable rhythm: the visitor learns the pattern once and afterwards knows
 * instantly where a new idea begins.
 *
 * The bilingual stack — a Latin index and kicker in the pixel face, an Arabic
 * heading in Noto Kufi beneath it — is the logo's own construction (WEB/CRAFT
 * in Latin above ويب كرافت in Arabic) carried through the page as a system
 * rather than repeated as an ornament.
 *
 * `align="start"` is the default and, in RTL, that means the right edge. The
 * component uses logical properties throughout, so nothing here needs to know
 * which direction the document runs.
 */

interface SectionHeadingProps {
  /** Zero-padded index, e.g. "03". Pixel face — Latin/numeric only. */
  index: string;
  /** Latin kicker, e.g. "WHY US". Pixel face — never Arabic. */
  kicker: string;
  /** The Arabic heading. */
  title: string;
  /** One or two sentences under the heading. */
  lead?: string;
  align?: "start" | "center";
  className?: string;
  /** Heading level. Sections use h2; the hero owns the page's only h1. */
  as?: "h2" | "h3";
  /** Animate the title word by word. Off for headings low on the page. */
  animate?: boolean;
  children?: React.ReactNode;
}

export function SectionHeading({
  index,
  kicker,
  title,
  lead,
  align = "start",
  className,
  as: Tag = "h2",
  animate = true,
  children,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col",
        centered ? "items-center text-center" : "items-start text-start",
        className,
      )}
    >
      {/* ── Index + kicker ───────────────────────────────────────────────
          Wrapped in one LTR-isolated row. Both halves are Latin, and letting
          the bidi algorithm resolve them against the Arabic page would put the
          index on the wrong end of the pair. */}
      <Reveal preset="fade">
        <div
          dir="ltr"
          className={cn(
            "flex items-center gap-3",
            centered && "justify-center",
          )}
        >
          {/* Violet, not lime. This pair appears at the head of all eight
              sections — as lime it was eight recurrences of the CTA colour
              on elements nobody can act on, which is precisely how a signal
              colour stops signalling. Violet is the brand's structural
              accent and this is the most structural mark on the page. */}
          <span className="pixel-label text-graphic">{index}</span>
          <span
            aria-hidden="true"
            className="from-graphic-muted/70 h-px w-8 bg-gradient-to-r to-transparent"
          />
          <span className="pixel-label text-fg-subtle">{kicker}</span>
        </div>
      </Reveal>

      {/* ── Arabic heading ──────────────────────────────────────────────── */}
      <Tag
        className={cn(
          // `leading-display` is not decoration. A `text-*` utility carries
          // its own line-height and beats both the `@utility` and the
          // `h1..h4` rule in base.css, so without this every section heading
          // on the site sets at a ratio of 1.0 — and a two-line Arabic
          // heading at 80px/80px runs its descenders through the line below.
          // See the paired-line-height block in `styles/tokens.css`.
          "font-display leading-display mt-6 text-4xl font-extrabold md:text-5xl",
          centered ? "max-w-[22ch]" : "max-w-[20ch]",
        )}
      >
        {animate ? (
          <SplitText text={title} />
        ) : (
          title
        )}
      </Tag>

      {lead ? (
        <Reveal preset="rise" delay={0.12}>
          <p
            className={cn(
              "text-fg-muted mt-6 text-lg leading-body",
              centered ? "max-w-[54ch]" : "max-w-[52ch]",
            )}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}

      {children}
    </div>
  );
}
