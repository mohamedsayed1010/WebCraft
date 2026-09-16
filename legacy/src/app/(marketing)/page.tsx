import { Capabilities } from "@/components/sections/capabilities/capabilities";
import { ConceptLab } from "@/components/sections/concept-lab/concept-lab";
import { Contact } from "@/components/sections/contact/contact";
import { Faq } from "@/components/sections/faq/faq";
import { Founder } from "@/components/sections/founder/founder";
import { Hero } from "@/components/sections/hero/hero";
import { Portfolio } from "@/components/sections/portfolio/portfolio";
import { Process } from "@/components/sections/process/process";
import { Services } from "@/components/sections/services/services";
import { WhyUs } from "@/components/sections/why-us/why-us";
import { JsonLd } from "@/components/seo/json-ld";
import { homepageFaqs } from "@/content/faq";
import { faqSchema } from "@/lib/seo/schema";

/**
 * HOMEPAGE
 *
 * One continuous scroll, ordered as a conversion argument:
 *
 *   HOOK → PROOF → WHY → WHAT → HOW → WHO → OBJECTIONS → ASK
 *
 * ─── WHAT CHANGED, AND WHY IT IS SHORTER ─────────────────────────────────
 * The previous order was hook → services → proof → why → testimonials →
 * founder → faq → ask. Two problems, both expensive:
 *
 *   1. Ten service cards stood between the hero and the first piece of
 *      evidence. A stranger was asked to read a catalogue before seeing that
 *      we can build anything at all. Work is now section 01 — a visitor meets
 *      three live URLs about one scroll after the headline.
 *
 *   2. The same five promises — ownership, fixed price, same-day reply,
 *      content writing, one month of support — were asserted in the hero
 *      marquee, the Why Us grid, the founder story and the contact panel.
 *      Repetition does not compound; it reads as padding. They are made once,
 *      in Why Us, with the mechanism attached, and every other section was
 *      cut back to a job nothing else does.
 *
 * Testimonials came out entirely. There are none that are real, and an empty
 * «المكان ده لعملائنا» block one screen from the ask tells a prospect that
 * nobody has hired us. The component and its copy stay in the project, ready
 * to compose back in the day a quote arrives with a name and permission.
 *
 * Net effect: five long sections became seven short ones, and the page is
 * roughly a third shorter while making more of its argument.
 *
 * The order here must match `sectionAnchors` in `config/navigation.ts` and the
 * indices in `content/copy.ts`, or the header's scroll-spy highlights the
 * wrong item.
 *
 * ─── THE SEAMS ────────────────────────────────────────────────────────────
 * `<Seam />` is the violet hairline between sections, placed by hand rather
 * than emitted between every pair, because two of the joins already have a
 * transition of their own and would read as over-ruled with a third:
 *
 *   Lab → Founder        the black-to-white inversion is the loudest
 *   Founder → Faq        transition on the page; a hairline on either side of
 *                        it is noise.
 *
 * The seam is the brand hierarchy's "purple marks section transitions" spent
 * literally, and at one pixel tall it costs the ink budget almost nothing
 * while tying separately-built sections into one document.
 * ─────────────────────────────────────────────────────────────────────────
 */

/** The violet section seam. Decorative — never announced to assistive tech. */
function Seam() {
  return (
    <div aria-hidden="true" className="container-page">
      <hr className="section-seam" />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/*
        FAQ rich result. Emitted here rather than only on `/faq` because these
        six questions are visibly answered on this page — which is the whole
        condition for the markup being legitimate. `homepageFaqs`, not `faqs`:
        marking up the other six, which are not rendered here, is exactly the
        hidden-content violation the note in `lib/seo/schema.ts` warns about.
      */}
      <JsonLd data={faqSchema(homepageFaqs)} />

      <Hero />
      <Portfolio />
      <Seam />
      <Capabilities />
      <Seam />
      <Services />
      <Seam />
      <WhyUs />
      <Seam />
      <Process />
      <Seam />
      <ConceptLab />
      <Founder />
      <Faq />
      <Seam />
      <Contact />
    </>
  );
}
