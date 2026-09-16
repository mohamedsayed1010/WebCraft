import { Plus } from "lucide-react";
import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { FinalCta } from "@/components/sections/final-cta";
import { faqs } from "@/content/faq";
import { getDictionary, resolveLocale } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqSchema } from "@/lib/seo/schema";

export async function generateMetadata({ params }: PageProps<"/[lang]/faq">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale).pages.faq;
  return buildMetadata({ locale, path: "/faq", title: d.metaTitle, description: d.metaDescription });
}

export default async function FaqPage({ params }: PageProps<"/[lang]/faq">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const d = dict.pages.faq;
  const items = faqs.map((f) => ({ id: f.id, q: f.q[locale], a: f.a[locale] }));

  return (
    <>
      <JsonLd data={faqSchema(items)} />
      <PageHero
        locale={locale}
        title={d.title}
        lead={d.lead}
        crumbs={[
          { name: dict.nav.home, path: "/" },
          { name: d.title, path: "/faq" },
        ]}
      />
      <section className="container-x max-w-4xl pb-28">
        <RevealGroup as="ul" className="divide-y divide-line border-y border-line" stagger={0.05}>
          {items.map((item) => (
            <RevealItem key={item.id} as="li">
              {/* Native disclosure: keyboard + screen-reader support with no JS. */}
              <details className="group py-2 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-title font-bold text-fg transition-colors hover:text-brand-600">
                  {item.q}
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line-strong transition-all duration-500 group-open:rotate-45 group-open:border-brand-500 group-open:bg-brand-600 group-open:text-white">
                    <Plus className="size-4" aria-hidden="true" />
                  </span>
                </summary>
                <p className="max-w-3xl pb-6 text-lead text-fg-muted">{item.a}</p>
              </details>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
      <FinalCta locale={locale} dict={dict} />
      <div className="h-16" />
    </>
  );
}
