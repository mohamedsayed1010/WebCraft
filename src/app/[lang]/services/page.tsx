import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/layout/page-hero";
import { Spotlight } from "@/components/motion/spotlight";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { FinalCta } from "@/components/sections/final-cta";
import { SeoBand } from "@/components/sections/seo-band";
import { services } from "@/content/services";
import { localePath } from "@/i18n/config";
import { getDictionary, resolveLocale } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale).pages.services;
  return buildMetadata({ locale, path: "/services", title: d.metaTitle, description: d.metaDescription });
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const d = dict.pages.services;

  return (
    <>
      <PageHero
        locale={locale}
        title={d.title}
        lead={d.lead}
        crumbs={[
          { name: dict.nav.home, path: "/" },
          { name: d.title, path: "/services" },
        ]}
      />
      <section className="container-x pb-28">
        <RevealGroup as="ul" className="grid gap-4 md:grid-cols-2" stagger={0.06}>
          {services.map((service) => {
            const text = service.text[locale];
            return (
              <RevealItem key={service.slug} as="li">
                <Spotlight className="group relative h-full overflow-hidden rounded-panel border border-line bg-surface transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-line-strong">
                  <Link href={localePath(locale, `/services/${service.slug}`)} className="flex h-full flex-col p-7 sm:p-9">
                    <span aria-hidden="true" className={cn("glow absolute -end-20 -top-20 size-72 transition-opacity duration-700 group-hover:opacity-100", service.accent === "aqua" ? "[--glow:var(--color-aqua-200)] opacity-60" : "[--glow:color-mix(in_oklab,var(--color-brand-300)_65%,transparent)] opacity-60")} />
                    <span className="label-mono ltr relative text-brand-600">{service.index}</span>
                    <h2 className="relative mt-6 text-headline font-extrabold text-fg">{text.name}</h2>
                    <p className="relative mt-2 font-semibold text-aqua-700">{text.tagline}</p>
                    <p className="relative mt-4 text-fg-muted">{text.what}</p>
                    <ul className="relative mt-6 flex flex-wrap gap-2">
                      {service.stack.slice(0, 4).map((tech) => (
                        <li key={tech} className="ltr rounded-full border border-line-strong px-2.5 py-1 font-mono text-[0.7rem] text-fg-muted">
                          {tech}
                        </li>
                      ))}
                    </ul>
                    <span className="relative mt-auto inline-flex items-center gap-2 pt-8 font-semibold text-fg transition-colors group-hover:text-brand-600">
                      {dict.services.cta}
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1">→</span>
                    </span>
                  </Link>
                </Spotlight>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </section>
      <SeoBand locale={locale} dict={dict} />
      <div className="h-16" />
      <FinalCta locale={locale} dict={dict} />
      <div className="h-16" />
    </>
  );
}
