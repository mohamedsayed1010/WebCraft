import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionCopy } from "@/content/copy";
import { differentiators } from "@/content/process";
import { cn } from "@/lib/utils";

/**
 * WHY WEBCRAFT — 02
 *
 * The one place on the homepage where a promise is allowed to be made.
 *
 * Ownership, fixed price, direct contact, content writing and post-launch
 * support used to be asserted in five different places — the hero marquee,
 * this section, the founder block, the FAQ and the contact panel — which is
 * how a page ends up long without ending up convincing. They are made once,
 * here, with the mechanism attached, and every other section was cut back to
 * a job of its own.
 *
 * Every card is a falsifiable claim plus that mechanism. «خدمة ممتازة» is the
 * default furniture of Arabic agency sites and carries no information;
 * «بترد عليك في نفس اليوم» can be checked, which is the only reason it is
 * worth saying. The `proof` line is the load-bearing half, so it gets its own
 * visually separated row rather than being folded into the description.
 *
 * ─── LAYOUT ──────────────────────────────────────────────────────────────
 * Five into a three-column grid leaves a hole. Six columns with a 2-2-2 / 3-3
 * split fills the block and, more usefully, gives the last two cards more
 * room than the first three — which is the right emphasis, because content
 * and after-launch support are the two objections this market actually
 * carries into the FAQ.
 * ─────────────────────────────────────────────────────────────────────────
 */
export function WhyUs() {
  return (
    <section id="why-us" className="section-y relative">
      <div className="container-page">
        <SectionHeading {...sectionCopy.whyUs} />

        <RevealGroup
          as="ul"
          className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-6"
        >
          {differentiators.map((item, index) => (
            <RevealItem
              as="li"
              key={item.title}
              className={cn(index < 3 ? "lg:col-span-2" : "lg:col-span-3")}
            >
              <article className="group card">
                <span aria-hidden="true" className="chip-icon">
                  <Icon name={item.icon} className="size-5" />
                </span>

                <h3 className="font-display mt-6 text-xl font-bold">
                  {item.title}
                </h3>

                <p className="text-fg-muted leading-body mt-3 text-sm">
                  {item.description}
                </p>

                {/* The mechanism. Set apart because it is the sentence that
                    turns a promise into something checkable. */}
                {/* The one lime mark in this section, and a deliberate
                    exception to "icons are violet": there is no CTA anywhere
                    in Why Us, so lime competes with nothing here, and the
                    proof line is the sentence the whole card exists to make.
                    A tick is also the one glyph where the signal colour is
                    read as meaning rather than as decoration. */}
                <p className="border-border text-fg-subtle mt-auto flex items-start gap-2.5 border-t pt-5 text-xs leading-relaxed">
                  <Icon
                    name="Check"
                    className="text-accent mt-px size-4 shrink-0"
                  />
                  {item.proof}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
