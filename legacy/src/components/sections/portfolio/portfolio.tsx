import { Reveal } from "@/components/motion/reveal";
import { ProjectShowcase } from "@/components/work/project-showcase";
import { ButtonLink, buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppLink } from "@/components/ui/whatsapp-cta";
import { sectionCopy, ui } from "@/content/copy";
import { featuredProjects, industryKicker } from "@/content/projects";
import { cn } from "@/lib/utils";

/**
 * SELECTED WORK — 01
 *
 * The first thing after the hero, and that placement is the single biggest
 * change on the page.
 *
 * It used to sit behind the services section, which meant a stranger had to
 * read ten offerings before seeing one piece of evidence that we can build
 * any of them. The order is now inverted: proof, then the pitch. Everything
 * further down the page is easier to believe once a visitor has opened
 * `bay3.vercel.app` in a second tab and found a working store.
 *
 * ─── THE SHAPE OF THE ARGUMENT ───────────────────────────────────────────
 *   heading      «شغل شغّال دلوقتي.» — sets the claim
 *   category row E-COMMERCE / PLATFORM / NEWS & CONTENT, in three words the
 *                proof that we build more than one kind of thing
 *   three rows   each a real product at a different weight, each with a live
 *                URL a visitor can open and check in ten seconds
 *   closing ask  one row, not a panel — see `ClosingCta`
 *
 * The category row is doing more work than it looks like. A prospect's real
 * question at this point is "have you built anything like *mine*", and three
 * visibly different product types answer it faster than any paragraph.
 *
 * ─── EVERY CLAIM HERE IS CHECKABLE ───────────────────────────────────────
 * No invented clients, no metrics, no testimonials, no before/after. The
 * whole section rests on three links that resolve — which is a stronger
 * position than a page of unverifiable percentages, and the only one
 * available honestly today. See the rule at the head of `content/projects.ts`.
 * ─────────────────────────────────────────────────────────────────────────
 */
export function Portfolio() {
  const hasWork = featuredProjects.length > 0;

  return (
    <section id="work" className="section-y relative overflow-hidden">
      {/* Atmosphere. Violet does the depth work; nothing here is lime, because
          the only lime in this section should be on the things you can tap. */}
      <div
        aria-hidden="true"
        className="orb-violet pointer-events-none absolute -top-40 start-[-18rem] -z-10 size-[46rem] opacity-45"
      />
      <div
        aria-hidden="true"
        className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_72%)]"
      />

      <div className="container-page">
        <SectionHeading
          index={sectionCopy.work.index}
          kicker={sectionCopy.work.kicker}
          title={hasWork ? sectionCopy.work.title : sectionCopy.work.emptyTitle}
          lead={hasWork ? sectionCopy.work.lead : sectionCopy.work.emptyLead}
        />

        {hasWork ? (
          <>
            <CategoryRow />

            {/* The rhythm between rows is deliberately large. These are case
                studies, not tiles, and crowding them back into a grid gap is
                what would undo the whole composition. */}
            <div className="mt-20 flex flex-col gap-28 md:gap-36 lg:gap-44">
              {featuredProjects.map((project, i) => (
                <ProjectShowcase
                  key={project.slug}
                  project={project}
                  index={i + 1}
                />
              ))}
            </div>

            <ClosingCta />
          </>
        ) : (
          /* No work published yet. One honest ask beats a wall of empty
             placeholder tiles pretending to be a portfolio. */
          <Reveal preset="rise" className="mt-14">
            <WhatsAppLink
              context="نماذج من شغلكم"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <Icon name="WhatsApp" className="size-4" />
              اطلب نماذج من شغلنا
            </WhatsAppLink>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ==========================================================================
   CATEGORY ROW
   --------------------------------------------------------------------------
   The range claim, made in three words before a single screenshot loads.
   Latin kickers in the pixel face — Silkscreen carries no Arabic glyphs, and
   these labels are the reason the taxonomy exists.
   ========================================================================== */

function CategoryRow() {
  const kickers = Array.from(
    new Set(featuredProjects.map((project) => industryKicker(project.industry))),
  ).filter(Boolean);

  if (kickers.length === 0) return null;

  return (
    <Reveal preset="fade" delay={0.15}>
      <ul
        dir="ltr"
        className="border-border mt-12 flex flex-wrap items-center gap-x-3 gap-y-3 border-t pt-6"
      >
        {kickers.map((kicker, i) => (
          <li key={kicker} className="flex items-center gap-3">
            {i > 0 ? (
              <span
                aria-hidden="true"
                className="bg-border-strong size-1 rounded-full"
              />
            ) : null}
            <span className="border-graphic-line bg-graphic-fill text-graphic pixel-label rounded-pill border px-3.5 py-2">
              {kicker}
            </span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

/* ==========================================================================
   CLOSING CTA
   --------------------------------------------------------------------------
   One rule and one row, where a bordered panel with its own orb and grid used
   to be.

   The panel was a second hero sitting a third of the way down the page, and
   with Work now in position 01 it would have been the loudest thing on screen
   before the visitor had reached a single reason to buy. The ask still belongs
   here — a CTA immediately after proof is the highest-intent moment on the
   page — but it belongs at the volume of a caption, not a headline. The full
   ask lives in Contact.
   ========================================================================== */

function ClosingCta() {
  const { cta } = sectionCopy.work;

  return (
    <Reveal preset="rise" className="mt-24 md:mt-28">
      <div className="border-border flex flex-col gap-6 border-t pt-8 md:flex-row md:items-center md:justify-between">
        <p className="font-display text-xl font-bold md:text-2xl">
          {cta.title}{" "}
          <span className="text-fg-subtle font-normal">{cta.lead}</span>
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <WhatsAppLink
            context="مشروع جديد"
            label={ui.whatsappCta}
            className={cn(
              buttonVariants({ variant: "primary", size: "lg" }),
              "group/cta",
            )}
          >
            <Icon name="WhatsApp" className="size-4" />
            {cta.primary}
          </WhatsAppLink>

          <ButtonLink
            href="/work"
            variant="ghost"
            size="lg"
            className="group/cta"
          >
            {ui.viewAll}
            <Icon
              name="ArrowLeft"
              className="duration-fast ease-brand size-4 transition-transform group-hover/cta:-translate-x-1"
            />
          </ButtonLink>
        </div>
      </div>
    </Reveal>
  );
}
