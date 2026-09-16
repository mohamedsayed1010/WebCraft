import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { StatusBadge } from "@/components/sections/work";
import { FinalCta } from "@/components/sections/final-cta";
import { TextLink } from "@/components/ui/button";
import { ProjectMedia } from "@/components/work/project-media";
import { projects } from "@/content/projects";
import { localePath } from "@/i18n/config";
import { getDictionary, resolveLocale } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/work">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale).pages.work;
  return buildMetadata({ locale, path: "/work", title: d.metaTitle, description: d.metaDescription });
}

export default async function WorkPage({ params }: PageProps<"/[lang]/work">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const d = dict.pages.work;

  return (
    <>
      <PageHero
        locale={locale}
        title={d.title}
        lead={d.lead}
        crumbs={[
          { name: dict.nav.home, path: "/" },
          { name: d.title, path: "/work" },
        ]}
      />
      <section className="container-x pb-28">
        <ul className="grid gap-x-8 gap-y-20 md:grid-cols-2">
          {projects.map((project, i) => {
            const text = project.text[locale];
            const href = localePath(locale, `/work/${project.slug}`);
            return (
              <li key={project.slug} className={i % 2 === 1 ? "md:mt-24" : undefined}>
                <ProjectMedia project={project} locale={locale} href={href} viewLabel={dict.work.cursorView} priority={i < 2} />
                <Reveal>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <StatusBadge project={project} dict={dict} />
                    <span className="text-sm font-semibold text-aqua-700">{text.category}</span>
                  </div>
                  <h2 className="mt-3 text-headline font-extrabold text-fg">{text.name}</h2>
                  <p className="mt-3 max-w-lg text-fg-muted">{text.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-6">
                    <TextLink href={href}>{dict.common.caseStudy}</TextLink>
                    <TextLink href={project.liveUrl} external>
                      {dict.common.viewLive}
                    </TextLink>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </section>
      <FinalCta locale={locale} dict={dict} />
      <div className="h-16" />
    </>
  );
}
