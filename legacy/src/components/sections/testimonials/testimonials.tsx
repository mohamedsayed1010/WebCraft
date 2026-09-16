import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionCopy } from "@/content/copy";
import { featuredTestimonials } from "@/content/testimonials";

/**
 * TESTIMONIALS — 05
 *
 * `testimonials` is empty, and the empty state says so in plain language
 * rather than shipping three invented quotes.
 *
 * That is a commercial decision, not a purist one: a visitor who suspects one
 * fake testimonial discounts every other number on the page, and this site's
 * whole argument rests on claims being checkable. Saying «لسه مامليناهوش»
 * costs one section and buys the credibility of all the others.
 */
export function Testimonials() {
  const hasTestimonials = featuredTestimonials.length > 0;

  return (
    <section id="testimonials" className="section-y relative">
      <div className="container-page">
        <SectionHeading
          index={sectionCopy.testimonials.index}
          kicker={sectionCopy.testimonials.kicker}
          title={
            hasTestimonials
              ? sectionCopy.testimonials.title
              : sectionCopy.testimonials.emptyTitle
          }
          lead={
            hasTestimonials
              ? sectionCopy.testimonials.lead
              : sectionCopy.testimonials.emptyLead
          }
          align="center"
          className="mx-auto"
        />

        {hasTestimonials ? (
          <RevealGroup
            as="ul"
            className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {featuredTestimonials.map((testimonial) => (
              <RevealItem as="li" key={testimonial.id}>
                <figure className="card">
                  {/* Decorative punctuation — violet. Nothing in a testimonial
                      is clickable, so there is no action for lime to mark. */}
                  <Icon name="Quote" className="text-graphic size-6" />

                  <blockquote className="text-fg-muted leading-body mt-5 flex-1">
                    {testimonial.quote}
                  </blockquote>

                  <figcaption className="border-border mt-6 border-t pt-5">
                    <span className="font-display block font-bold">
                      {testimonial.author}
                    </span>
                    <span className="text-fg-subtle mt-1 block text-xs">
                      {testimonial.role}
                    </span>
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}

/* ==========================================================================
   EMPTY STATE
   --------------------------------------------------------------------------
   Three blank quote cards, deliberately unfilled. The shape of the section is
   visible — a visitor understands exactly what will live here — while the
   absence is stated rather than papered over.
   ========================================================================== */

function EmptyState() {
  return (
    <Reveal preset="rise" className="mt-16">
      <ul className="grid gap-5 md:grid-cols-3">
        {[0, 1, 2].map((slot) => (
          <li key={slot}>
            <div className="border-border/70 relative flex h-56 flex-col rounded-lg border border-dashed p-7">
              <Icon name="Quote" className="text-fg-subtle/40 size-6" />

              {/* Redacted lines — the silhouette of a quote, obviously empty. */}
              <div aria-hidden="true" className="mt-5 flex flex-col gap-2.5">
                <span className="block h-2 w-full rounded-full bg-white/[0.055]" />
                <span className="block h-2 w-[88%] rounded-full bg-white/[0.055]" />
                <span className="block h-2 w-[64%] rounded-full bg-white/[0.055]" />
              </div>

              <div
                aria-hidden="true"
                className="border-border/70 mt-auto flex items-center gap-3 border-t pt-5"
              >
                <span className="block size-8 rounded-full bg-white/[0.055]" />
                <span className="block h-2 w-24 rounded-full bg-white/[0.055]" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
