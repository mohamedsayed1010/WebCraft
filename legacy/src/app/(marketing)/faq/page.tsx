import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion } from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { WhatsAppLink } from "@/components/ui/whatsapp-cta";
import { ui } from "@/content/copy";
import { faqCategories, faqs, faqsByCategory } from "@/content/faq";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import { cn } from "@/lib/utils";

/**
 * FAQ — /faq
 *
 * All twelve questions, grouped by the five categories, which is the format
 * the homepage six deliberately are not: a reference document rather than a
 * conversion block.
 *
 * The FAQPage structured data is emitted here and only here. Google's policy
 * requires every marked-up answer to be visible on the page carrying the
 * markup, and the homepage now shows six of the twelve — so this is the page
 * that can honestly claim all of them.
 */
export const metadata: Metadata = buildMetadata({
  title: "أسئلة شائعة — الأسعار والمواعيد وملكية الموقع",
  description:
    "إجابات مباشرة على اللي بيتسأل قبل أي مشروع: الموقع بيتكلّف كام، الدفع بيتم إزاي، بياخد وقت قد إيه، الموقع هيبقى ملك مين، وإيه اللي بيحصل بعد الإطلاق.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "الرئيسية", path: "/" },
          { name: "أسئلة شائعة", path: "/faq" },
        ])}
      />

      <PageHeader
        kicker="FAQ"
        title="أسئلة بتتسأل كتير"
        lead="الأسئلة اللي بتيجي في بال أي حد قبل ما يبدأ. الإجابات هنا مباشرة، عشان متضطرش تسأل عشان تعرف."
        backHref="/"
        backLabel={ui.backHome}
      />

      <div className="container-page pb-24 md:pb-32">
        <div className="flex flex-col gap-16 md:gap-20">
          {faqCategories.map((category) => {
            const items = faqsByCategory(category.id);
            if (items.length === 0) return null;

            return (
              <section key={category.id}>
                <div className="grid gap-8 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-14">
                  <Reveal preset="rise">
                    <div className="lg:sticky lg:top-28">
                      <span
                        dir="ltr"
                        className="pixel-label text-graphic block"
                      >
                        {category.kicker}
                      </span>
                      <h2 className="font-display mt-3 text-2xl font-extrabold">
                        {category.label}
                      </h2>
                    </div>
                  </Reveal>

                  <Reveal preset="rise">
                    <Accordion
                      items={items.map((faq) => ({
                        id: faq.id,
                        question: faq.question,
                        answer: faq.answer,
                      }))}
                    />
                  </Reveal>
                </div>
              </section>
            );
          })}
        </div>

        <Reveal preset="rise" className="mt-20">
          <div className="border-border flex flex-col gap-6 border-t pt-10 md:flex-row md:items-center md:justify-between">
            <p className="font-display text-xl font-bold md:text-2xl">
              سؤالك مش موجود؟{" "}
              <span className="text-fg-subtle font-normal">
                ابعته وهيجيلك رد في نفس اليوم.
              </span>
            </p>

            <WhatsAppLink
              context="سؤال مش موجود في الأسئلة الشائعة"
              label={ui.whatsappCta}
              className={cn(buttonVariants({ variant: "whatsapp", size: "lg" }))}
            >
              <Icon name="WhatsApp" className="size-4" />
              {ui.whatsappCta}
            </WhatsAppLink>
          </div>
        </Reveal>
      </div>
    </>
  );
}
