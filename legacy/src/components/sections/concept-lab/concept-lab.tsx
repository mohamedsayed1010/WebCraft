import { ConceptScreen } from "@/components/graphics/concept-screens";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionCopy } from "@/content/copy";
import { conceptBadge, concepts } from "@/content/concepts";
import type { ConceptProject } from "@/types";
import { cn } from "@/lib/utils";

import { ConceptSwitcher } from "./concept-switcher";

/**
 * CONCEPT LAB — 06
 *
 * Four product directions we designed for ourselves, shown as what they are.
 *
 * ─── PLACEMENT ───────────────────────────────────────────────────────────
 * After the process, before the founder — deliberately far from the portfolio.
 *
 * The temptation is to put these next to the real work, where the drawings
 * would flatter the screenshots. That is precisely the arrangement that gets
 * an agency into trouble: adjacency reads as equivalence, and a visitor
 * skim-scrolling a single strip of eight visuals does not stop to read which
 * three of them shipped. Section 01 is proof and stands alone; this is a
 * separate claim, made later, in its own compartment, at its own volume.
 *
 * ─── EVERY GUARD IN ONE PLACE ────────────────────────────────────────────
 *   1. The section heading says «معمل التجارب» and the lead says these are
 *      not client projects — before a single drawing renders.
 *   2. A full disclaimer sentence sits under the heading.
 *   3. Every panel carries «مشروع تصوّري — تجريبي» above the name.
 *   4. Every drawing is stamped `CONCEPT · EXPERIMENTAL` in the corner.
 *   5. The data model has no client, no live URL, no results and no year, so
 *      none of those can be implied by filling in a field.
 *
 * Five is the important one. The first four are copy and copy can be edited
 * carelessly; the fifth is a type error. See `content/concepts.ts`.
 * ─────────────────────────────────────────────────────────────────────────
 */
export function ConceptLab() {
  if (concepts.length === 0) return null;

  /* Rendered here, on the server, and passed down as nodes — the graphics
     library must never reach the client bundle. Same contract as the
     capability explorer. */
  const stages = Object.fromEntries(
    concepts.map((concept) => [concept.id, <ConceptStage key={concept.id} concept={concept} />]),
  );

  return (
    <section id="lab" className="section-y relative overflow-hidden">
      <div
        aria-hidden="true"
        className="orb-violet pointer-events-none absolute -top-52 -end-64 -z-10 size-[42rem] rounded-full opacity-40"
      />

      <div className="container-page">
        <SectionHeading {...sectionCopy.lab} />

        <Reveal preset="fade" delay={0.14}>
          <p className="border-graphic-line bg-graphic-fill text-fg-muted leading-body mt-8 max-w-[62ch] rounded-lg border px-5 py-4 text-sm">
            {conceptBadge.disclaimer}
          </p>
        </Reveal>

        <ConceptSwitcher
          badge={{ ar: conceptBadge.ar, latin: conceptBadge.latin }}
          stages={stages}
          concepts={concepts.map((concept) => ({
            id: concept.id,
            index: concept.index,
            title: concept.title,
            titleLatin: concept.titleLatin,
            kicker: concept.kicker,
            discipline: concept.discipline,
            summary: concept.summary,
            capabilities: concept.capabilities,
            screenLabels: concept.screens.map((screen) => screen.label),
          }))}
        />
      </div>
    </section>
  );
}

/* ==========================================================================
   STAGE
   --------------------------------------------------------------------------
   The composition of drawings for one concept.

   Two arrangements, because a phone and a dashboard cannot share one. Desktop
   concepts get a large primary screen with a smaller secondary overlapping its
   near corner — the standard way a studio presents a system rather than a
   page. The mobile concept gets three handsets on a shallow arc, which is the
   only arrangement in which three 9:19.5 rectangles read as a product family
   instead of as a fence.
   ========================================================================== */

function ConceptStage({ concept }: { concept: ConceptProject }) {
  const isMobile = concept.screens[0]?.screen.startsWith("app-");

  return (
    <div className="relative">
      {isMobile ? <PhoneStage concept={concept} /> : <DeskStage concept={concept} />}
      <StageStamp />
    </div>
  );
}

/** Primary screen, secondary overlapping the near corner. */
function DeskStage({ concept }: { concept: ConceptProject }) {
  const [primary, secondary] = concept.screens;

  if (!primary) return null;

  return (
    <div className="relative pb-14 ps-0 sm:pb-16 sm:ps-10">
      <div className="aspect-[4/3] w-full">
        <ConceptScreen name={primary.screen} />
      </div>

      {/* The overlap. Hidden on the narrowest widths — at 360px it covers a
          third of the primary and the composition stops being readable, which
          is worse than showing one screen well. */}
      {secondary ? (
        <div
          className={cn(
            "absolute bottom-0 start-0 hidden aspect-[4/3] w-[46%] sm:block",
            "drop-shadow-[0_30px_50px_rgb(0_0_0/0.75)]",
          )}
        >
          <ConceptScreen name={secondary.screen} />
        </div>
      ) : null}
    </div>
  );
}

/** Three handsets, the middle one raised. */
function PhoneStage({ concept }: { concept: ConceptProject }) {
  const screens = concept.screens.slice(0, 3);

  return (
    <div className="flex items-end justify-center gap-3 sm:gap-5">
      {screens.map((screen, i) => (
        <div
          key={screen.screen}
          className={cn(
            "w-full max-w-[10.5rem] flex-1",
            /* The centre handset sits proud of the other two. `-mb` rather
               than a transform so the flex row's own baseline moves with it
               and the arc survives at any width. */
            i === 1 ? "-mb-0 sm:-mb-6" : "mb-0",
            /* The outer two step back on the smallest screens rather than
               shrinking all three into illegibility. */
            i === 2 ? "hidden sm:block" : "",
          )}
        >
          <div className="aspect-[9/17]">
            <ConceptScreen name={screen.screen} />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * The corner stamp.
 *
 * The last of the five guards, and the one that survives a screenshot: if
 * somebody photographs one of these drawings and it travels without the page
 * around it, the words «CONCEPT · EXPERIMENTAL» travel with it.
 */
function StageStamp() {
  return (
    <span
      dir="ltr"
      className={cn(
        "border-graphic-line bg-ink-900/85 rounded-pill absolute -top-3 -start-1 z-10 border px-3 py-1.5",
        "pixel-label text-graphic backdrop-blur-sm",
      )}
    >
      {conceptBadge.latin}
    </span>
  );
}
