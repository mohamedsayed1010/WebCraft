import { Reveal } from "@/components/motion/reveal";
import { Icon, WhatsAppIcon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppLink } from "@/components/ui/whatsapp-cta";
import { buttonVariants } from "@/components/ui/button";
import { contactCopy, sectionCopy } from "@/content/copy";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ContactForm } from "./contact-form";

/**
 * FINAL CTA / CONTACT — 07
 *
 * The whole page resolves here, so the section is built as one ask with a
 * fallback rather than as two equal options side by side.
 *
 *   1. The question, full width and centred: «جاهز تخلي موقعك يشتغل لصالح
 *      مشروعك؟»
 *   2. One button under it, at the largest size on the site, opening WhatsApp
 *      with the first message already written.
 *   3. Below a rule, and visibly quieter: the form, for the minority who
 *      prefer to send detail in one go.
 *
 * The previous layout put a WhatsApp card and the form in a two-column grid
 * of equal weight, which asks a visitor who has just decided to act to make
 * one more decision before acting. In this market that is the wrong trade: a
 * business owner will message a supplier at 11pm and will not fill in a form
 * at all, so the fast path gets the emphasis and the form gets the space.
 *
 * ⚠️  The form does not deliver email until `RESEND_API_KEY`,
 *     `CONTACT_FROM_EMAIL` and `CONTACT_TO_EMAIL` are set — see
 *     `app/api/contact/route.ts`. WhatsApp works the moment the number in
 *     `config/site.ts` is right, which it now is. That asymmetry is another
 *     reason the button leads.
 */
export function Contact() {
  const { contact } = siteConfig;

  return (
    <section id="contact" className="section-y relative overflow-hidden">
      <div
        aria-hidden="true"
        className="orb-lime pointer-events-none absolute -top-40 start-1/2 size-[46rem] -translate-x-1/2 rounded-full opacity-60"
      />
      <div
        aria-hidden="true"
        className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(ellipse_at_50%_20%,black,transparent_70%)]"
      />

      <div className="container-page relative z-10">
        {/* ── The ask ──────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center">
          <SectionHeading {...sectionCopy.contact} align="center" />

          <Reveal preset="rise" delay={0.2}>
            <WhatsAppLink
              context="تصميم موقع لمشروعي"
              label={contactCopy.whatsappCta}
              className={cn(
                buttonVariants({ variant: "whatsapp", size: "xl" }),
                "duration-base ease-brand mt-10 transition-transform hover:-translate-y-0.5",
              )}
            >
              <WhatsAppIcon className="size-5" />
              {contactCopy.whatsappCta}
            </WhatsAppLink>
          </Reveal>

          {/* Expectation-setting, in one row. It removes the two unspoken
              fears — "when will they reply" and "will I get a sales call" —
              at the exact moment they would otherwise stop the tap. */}
          <Reveal preset="fade" delay={0.3}>
            <ul className="text-fg-subtle mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Icon name="Clock" className="text-graphic size-4" />
                {contact.responseTime}
              </li>
              <li className="flex items-center gap-2">
                <Icon name="MessageSquare" className="text-graphic size-4" />
                {contact.hours}
              </li>
              {contact.whatsappDisplay ? (
                <li className="flex items-center gap-2">
                  <Icon name="Phone" className="text-graphic size-4" />
                  <span dir="ltr">{contact.whatsappDisplay}</span>
                </li>
              ) : null}
            </ul>
          </Reveal>
        </div>

        {/* ── The slower path ──────────────────────────────────────────── */}
        <div className="mx-auto mt-20 max-w-3xl md:mt-24">
          <Reveal preset="fade">
            <div className="flex items-center gap-5">
              <span aria-hidden="true" className="rule-fade flex-1" />
              <span className="text-fg-subtle text-sm">
                {contactCopy.formTitle}
              </span>
              <span aria-hidden="true" className="rule-fade flex-1" />
            </div>
          </Reveal>

          <Reveal preset="rise" delay={0.08}>
            <p className="text-fg-subtle mt-6 text-center text-sm">
              {contactCopy.formLead}
            </p>

            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          {contact.email ? (
            <Reveal preset="fade" delay={0.14}>
              <p className="text-fg-subtle mt-6 text-center text-sm">
                أو على الإيميل:{" "}
                <a
                  href={`mailto:${contact.email}`}
                  dir="ltr"
                  className="hover:text-accent duration-fast inline-block transition-colors"
                >
                  {contact.email}
                </a>
              </p>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
