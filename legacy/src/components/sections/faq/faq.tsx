import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Accordion } from "@/components/ui/accordion";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppLink } from "@/components/ui/whatsapp-cta";
import { buttonVariants } from "@/components/ui/button";
import { sectionCopy, ui } from "@/content/copy";
import { faqs, homepageFaqs } from "@/content/faq";
import { cn } from "@/lib/utils";

/**
 * FAQ — 06
 *
 * Objections, cleared immediately before the ask. Placement is the point: a
 * visitor who reaches the contact section still carrying «هياخد قد إيه؟» or
 * «الموقع هيبقى ملك مين؟» does not fill in the form, and the answer arriving
 * one screen too late is the same as no answer.
 *
 * Six here, not twelve. Twelve accordions one screen from the ask is a
 * reference document, and a reference document at the bottom of a funnel gets
 * scrolled past in one flick — taking the contact section with it. The six
 * that remain are the objections that actually stall a deal in this market:
 * price, payment, timeline, content, ownership, support. The full list lives
 * at `/faq` and is still what feeds the FAQPage structured data.
 *
 * Every question is one a real buyer asks out loud, phrased the way they ask
 * it — «الموقع بيتكلّف كام؟», not «ما هي سياسة التسعير».
 */
export function Faq() {
  const rest = faqs.length - homepageFaqs.length;

  return (
    <section id="faq" className="section-y relative">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
          {/* ── Heading + escape hatch ─────────────────────────────────── */}
          <div>
            <div className="lg:sticky lg:top-28">
              <SectionHeading {...sectionCopy.faq} />

              {/* The question this list does not answer is always the one that
                  matters most to the person reading it. */}
              <Reveal preset="rise" delay={0.2}>
                <div className="card mt-10">
                  <p className="font-display text-lg font-bold">
                    سؤالك مش موجود؟
                  </p>
                  <p className="text-fg-muted leading-body mt-2 text-sm">
                    ابعته على الواتساب وهيجيلك رد في نفس اليوم — من غير أي
                    التزام.
                  </p>

                  <WhatsAppLink
                    context="سؤال مش موجود في الأسئلة الشائعة"
                    label={ui.whatsappCta}
                    className={cn(
                      buttonVariants({ variant: "whatsapp", size: "md" }),
                      // `card` is a flex column, so an auto-width button
                      // would stretch to the full panel. This one is a
                      // secondary escape hatch, not the section's CTA — it
                      // should read as smaller than the ask in Contact.
                      "mt-5 self-start",
                    )}
                  >
                    <Icon name="WhatsApp" className="size-4" />
                    اسأل على واتساب
                  </WhatsAppLink>
                </div>
              </Reveal>
            </div>
          </div>

          {/* ── The questions ──────────────────────────────────────────── */}
          <div>
            <Reveal preset="rise">
              <Accordion
                items={homepageFaqs.map((faq) => ({
                  id: faq.id,
                  question: faq.question,
                  answer: faq.answer,
                }))}
              />
            </Reveal>

            {rest > 0 ? (
              <Reveal preset="fade" delay={0.1}>
                <Link
                  href="/faq"
                  className="text-fg-subtle hover:text-accent duration-fast group mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                >
                  {ui.allFaqs}
                  <Icon
                    name="ArrowLeft"
                    className="duration-fast size-4 transition-transform group-hover:-translate-x-1"
                  />
                </Link>
              </Reveal>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
