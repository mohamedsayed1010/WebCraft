import Link from "next/link";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionCopy, ui } from "@/content/copy";
import { serviceGroups, servicesByGroup } from "@/content/services";

/**
 * SERVICES — 03
 *
 * Ten offerings in three named stages: نصمّم / نبني / نكبّر. The grouping is
 * the tagline, and it turns what would otherwise read as a price list into a
 * sequence a business moves through. A flat grid of ten invites line-item
 * comparison shopping; three stages invite "which stage am I in".
 *
 * ─── THE HOMEPAGE SUMMARISES, THE SERVICE PAGE EXPLAINS ──────────────────
 * This used to render ten full cards — icon plate, title, a promise sentence
 * and a «اعرف أكتر» row each — stacked in three sticky-headed groups. That is
 * roughly two thousand words of scrolling in the middle of a conversion page,
 * and it asked a visitor to read the entire catalogue before reaching the
 * process, the founder or the ask.
 *
 * What is here now is the taxonomy and nothing else: three stages, each with
 * its services as a compact list of links. A visitor learns the shape of what
 * we sell in about six seconds and can leave for `/services/[slug]` at the
 * exact line that interests them. All ten routes are intact — this is a
 * change of presentation, not of catalogue.
 * ─────────────────────────────────────────────────────────────────────────
 */
export function Services() {
  return (
    <section id="services" className="section-y relative">
      <div className="container-page">
        <SectionHeading {...sectionCopy.services} />

        <RevealGroup as="ul" className="mt-16 grid gap-5 lg:grid-cols-3">
          {serviceGroups.map((group) => (
            <RevealItem as="li" key={group.id}>
              <article className="card group relative overflow-hidden">
                {/* ── The folio row ──────────────────────────────────────
                    Kicker on the reading edge, oversized outlined numeral on
                    the far one, both in normal flow.

                    The numeral used to be absolutely positioned at the
                    card's top corner, and at `text-7xl` it ran straight
                    through «نصمّم» / «نبني» / «نكبّر» — the outline crossed
                    the middle of every group title on the page. Laying the
                    two out as one row means the numeral can never collide
                    with the heading no matter how the card is resized, and
                    it reads more like printed editorial numbering than a
                    watermark did. */}
                <div dir="ltr" className="relative flex items-start justify-between gap-3">
                  <span className="pixel-label text-graphic mt-2">
                    {group.kicker}
                  </span>

                  <span
                    aria-hidden="true"
                    className="latin-display text-outline duration-slow ease-brand pointer-events-none -mt-2 text-6xl leading-none font-black opacity-70 transition-opacity group-hover:opacity-100"
                  >
                    {group.index}
                  </span>
                </div>

                <h3 className="font-display relative mt-3 text-3xl font-extrabold">
                  {group.title}
                </h3>

                <p className="text-fg-muted leading-body relative mt-3 text-sm">
                  {group.description}
                </p>

                {/* ── The services in this stage ─────────────────────────
                    Hairline-separated rows rather than nested cards. A card
                    inside a card is two borders saying the same thing, and at
                    this density the eye reads the list as one object — which
                    is what makes the stage, not the line item, the unit the
                    visitor compares. */}
                <ul className="border-border relative mt-7 flex flex-col border-t">
                  {servicesByGroup(group.id).map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="border-border group/row hover:text-accent duration-fast ease-brand flex items-center justify-between gap-3 border-b py-3 text-sm font-semibold transition-colors"
                      >
                        {service.title}
                        <Icon
                          name="ArrowLeft"
                          className="text-fg-subtle group-hover/row:text-accent duration-fast size-4 shrink-0 transition-[transform,color] group-hover/row:-translate-x-1"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal preset="rise" className="mt-12">
          <ButtonLink href="/services" variant="outline" size="lg">
            {ui.allServices}
            <Icon name="ArrowLeft" className="size-4" />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
