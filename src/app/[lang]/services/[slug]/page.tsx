import { Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/layout/page-hero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { FinalCta } from "@/components/sections/final-cta";
import { ServiceScene } from "@/components/sections/services/service-visuals";
import { ButtonLink } from "@/components/ui/button";
import { ProjectMedia } from "@/components/work/project-media";
import { getProject } from "@/content/projects";
import { getService, services } from "@/content/services";
import { localePath, locales } from "@/i18n/config";
import { getDictionary, resolveLocale } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo/metadata";
import { serviceSchema } from "@/lib/seo/schema";
import type { Project } from "@/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => services.map((s) => ({ lang, slug: s.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const service = getService(slug);
  if (!service) return {};
  const text = service.text[locale];
  return buildMetadata({ locale, path: `/services/${slug}`, title: text.seoTitle, description: text.seoDescription });
}

export default async function ServicePage({ params }: PageProps<"/[lang]/services/[slug]">) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const service = getService(slug);
  if (!service) notFound();

  const dict = getDictionary(locale);
  const s = dict.services;
  const d = dict.pages.serviceDetail;
  const text = service.text[locale];
  const related = service.proof.map(getProject).filter((p): p is Project => Boolean(p));

  return (
    <>
      <JsonLd data={serviceSchema(service, locale)} />
      <PageHero
        locale={locale}
        title={text.name}
        lead={text.tagline}
        crumbs={[
          { name: dict.nav.home, path: "/" },
          { name: dict.pages.services.title, path: "/services" },
          { name: text.name, path: `/services/${service.slug}` },
        ]}
      >
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={localePath(locale, "/#contact")} size="lg" magnetic>
              {dict.common.startProject}
            </ButtonLink>
            <ButtonLink href={localePath(locale, "/work")} size="lg" variant="secondary">
              {dict.common.exploreWork}
            </ButtonLink>
          </div>
        </Reveal>
      </PageHero>

      <section className="container-x">
        <Reveal preset="scale">
          <ServiceScene visual={service.visual} locale={locale} />
        </Reveal>
      </section>

      <section className="container-x section-y grid gap-14 lg:grid-cols-2">
        <div className="space-y-12">
          <Reveal>
            <h2 className="label-mono text-brand-600">{s.whatLabel}</h2>
            <p className="mt-4 text-title leading-[var(--lh-body)] font-semibold text-fg">{text.what}</p>
          </Reveal>
          <Reveal>
            <h2 className="label-mono text-aqua-700">{s.whyLabel}</h2>
            <p className="mt-4 text-lead text-fg-muted">{text.why}</p>
          </Reveal>
          <Reveal>
            <h2 className="label-mono text-fg-subtle">{s.stackLabel}</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {service.stack.map((tech) => (
                <li key={tech} className="ltr rounded-full border border-line-strong px-3 py-1.5 font-mono text-xs text-fg-muted">
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="space-y-12">
          <div>
            <h2 className="label-mono text-fg-subtle">{s.buildsLabel}</h2>
            <RevealGroup as="ul" className="mt-5 divide-y divide-line border-y border-line" stagger={0.05}>
              {text.builds.map((b) => (
                <RevealItem key={b} as="li" className="flex items-center gap-4 py-4 text-lg text-fg">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  {b}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <div>
            <h2 className="label-mono text-fg-subtle">{s.outcomesLabel}</h2>
            <RevealGroup as="ul" className="mt-5 grid gap-3" stagger={0.06}>
              {text.outcomes.map((o) => (
                <RevealItem key={o} as="li" className="rounded-2xl border border-line bg-surface p-4 text-fg">
                  {o}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-line">
          <div className="container-x section-y">
            <Reveal>
              <h2 className="text-display font-extrabold text-fg">{d.related}</h2>
            </Reveal>
            <ul className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {related.map((project) => (
                <li key={project.slug}>
                  <ProjectMedia project={project} locale={locale} href={localePath(locale, `/work/${project.slug}`)} viewLabel={dict.work.cursorView} />
                  <p className="mt-4 text-sm text-aqua-700">{project.text[locale].category}</p>
                  <h3 className="mt-1 font-display text-title font-bold text-fg">{project.text[locale].name}</h3>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="border-t border-line">
        <div className="container-x py-16">
          <h2 className="label-mono text-fg-subtle">{d.otherServices}</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {services
              .filter((x) => x.slug !== service.slug)
              .map((x) => (
                <li key={x.slug}>
                  <Link href={localePath(locale, `/services/${x.slug}`)} className="inline-flex rounded-full border border-line-strong px-4 py-2 text-sm font-semibold text-fg-muted transition-colors hover:border-brand-500 hover:text-brand-600">
                    {x.text[locale].name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <FinalCta locale={locale} dict={dict} />
      <div className="h-16" />
    </>
  );
}
