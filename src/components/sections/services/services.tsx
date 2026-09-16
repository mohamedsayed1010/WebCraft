import { SectionHeader } from "@/components/ui/section-header";
import { TextLink } from "@/components/ui/button";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

import { ServicesExplorer } from "./services-explorer";

export function Services({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const s = dict.services;
  const projectNames = Object.fromEntries(projects.map((p) => [p.slug, p.text[locale].name]));
  // Only this language's copy crosses into the client component — its props
  // are serialised into the HTML, and the full records carried both languages.
  const localized = services.map(({ slug, index, visual, stack, proof, text }) => {
    const { seoTitle: _seoTitle, seoDescription: _seoDescription, ...copy } = text[locale];
    return { slug, index, visual, stack, proof, text: copy };
  });

  return (
    <section id="services" aria-labelledby="services-title" className="section-y relative bg-[linear-gradient(180deg,var(--color-canvas)_0%,var(--color-mist)_60%,var(--color-canvas)_100%)]">
      <div aria-hidden="true" className="absolute start-[-10rem] top-40 size-[34rem] glow [--glow:color-mix(in_oklab,var(--color-aqua-200)_48%,transparent)]" />
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader id="services-title" index={s.index} kicker={s.kicker} title={s.title} lead={s.lead} />
          <TextLink href={localePath(locale, "/services")} className="shrink-0">
            {dict.common.allServices}
          </TextLink>
        </div>
        <div className="mt-14 lg:mt-20">
          <ServicesExplorer locale={locale} services={localized} labels={s} projectNames={projectNames} />
        </div>
      </div>
    </section>
  );
}
