import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/layout/page-hero";
import { Parallax } from "@/components/motion/parallax";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { FinalCta } from "@/components/sections/final-cta";
import { StatusBadge } from "@/components/sections/work";
import { ButtonLink } from "@/components/ui/button";
import { BrowserFrame, PhoneFrame } from "@/components/ui/device-frames";
import { media } from "@/content/media.generated";
import { getProject, nextProject, projects } from "@/content/projects";
import { getService } from "@/content/services";
import { localePath, locales } from "@/i18n/config";
import { getDictionary, resolveLocale } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo/metadata";
import { projectSchema } from "@/lib/seo/schema";
import { cn, displayUrl } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const project = getProject(slug);
  if (!project) return {};
  const text = project.text[locale];
  const cover = project.desktop[0] ?? project.mobile[0];
  const img = cover ? media[cover.key] : undefined;
  return buildMetadata({
    locale,
    path: `/work/${slug}`,
    title: text.seoTitle,
    description: text.seoDescription,
    type: "article",
    image: img && cover ? { url: img.src, width: img.width, height: img.height, alt: cover.label[locale] } : undefined,
  });
}

export default async function CaseStudyPage({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const project = getProject(slug);
  if (!project) notFound();

  const dict = getDictionary(locale);
  const cs = dict.pages.caseStudy;
  const text = project.text[locale];
  const next = nextProject(project.slug);
  const hero = project.desktop[0];
  const heroPhone = project.mobile[0];

  return (
    <>
      <JsonLd data={projectSchema(project, locale)} />
      <PageHero
        locale={locale}
        title={text.name}
        lead={text.summary}
        crumbs={[
          { name: dict.nav.home, path: "/" },
          { name: dict.pages.work.title, path: "/work" },
          { name: text.name, path: `/work/${project.slug}` },
        ]}
      >
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <StatusBadge project={project} dict={dict} />
            <span className="rounded-full border border-line-strong px-3 py-1 text-sm text-fg-muted">{text.category}</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={project.liveUrl} external size="lg" newTabLabel={dict.common.newTab} magnetic>
              {dict.common.viewLive}
            </ButtonLink>
            <ButtonLink href={localePath(locale, "/#contact")} variant="secondary" size="lg">
              {dict.common.startProject}
            </ButtonLink>
          </div>
        </Reveal>
      </PageHero>

      {/* Hero media */}
      <section aria-label={cs.screens} className="container-x">
        <div
          className=" ring-gradient relative overflow-hidden rounded-[2rem] bg-surface p-4 sm:p-10 lg:p-14"
          style={{ "--tone": project.tone } as React.CSSProperties}
        >
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgb(var(--tone)/0.35),transparent_65%)]" />
          <div className="relative" dir="ltr">
            {hero ? (
              <Reveal preset="scale">
                <BrowserFrame shot={hero.key} alt={hero.label[locale]} url={displayUrl(project.liveUrl)} priority sizes="(min-width: 1280px) 76rem, 92vw" />
              </Reveal>
            ) : null}
            {heroPhone ? (
              <Parallax speed={50} className="absolute -bottom-6 right-[3%] w-[24%] max-w-[15rem] sm:right-[5%]">
                <PhoneFrame shot={heroPhone.key} alt={heroPhone.label[locale]} sizes="(min-width: 1024px) 15rem, 24vw" />
              </Parallax>
            ) : null}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="container-x section-y grid gap-14 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <div className="space-y-8 lg:sticky lg:top-32">
            <div>
              <h2 className="label-mono text-fg-subtle">{cs.services}</h2>
              <ul className="mt-4 space-y-2">
                {project.services.map((s) => {
                  const service = getService(s);
                  return service ? (
                    <li key={s}>
                      <Link href={localePath(locale, `/services/${s}`)} className="font-semibold text-fg transition-colors hover:text-brand-600">
                        {service.text[locale].name}
                      </Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
            <div>
              <h2 className="label-mono text-fg-subtle">{cs.stack}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li key={tech} className="ltr rounded-full border border-line-strong px-3 py-1 font-mono text-xs text-fg-muted">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="label-mono text-fg-subtle">{cs.visit}</h2>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 font-mono text-sm text-brand-600 underline-offset-4 hover:underline">
                <span className="size-1.5 animate-pulse rounded-full bg-success" />
                <bdi>{displayUrl(project.liveUrl)}</bdi> ↗
              </a>
            </div>
            {text.note ? <p className="rounded-xl border border-aqua-200 bg-brand-100/60 p-4 text-sm text-aqua-700">{text.note}</p> : null}
          </div>
        </aside>

        <div className="lg:col-span-8">
          <Reveal>
            <h2 className="label-mono text-brand-600">{cs.overview}</h2>
          </Reveal>
          <div className="mt-6 space-y-6">
            {text.overview.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={cn(i === 0 ? "text-title leading-[var(--lh-body)] font-semibold text-fg" : "text-lead text-fg-muted")}>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h2 className="label-mono mt-16 text-brand-600">{cs.built}</h2>
          </Reveal>
          <RevealGroup as="ul" className="mt-6 divide-y divide-line border-y border-line" stagger={0.06}>
            {text.built.map((item, i) => (
              <RevealItem key={item} as="li" className="flex items-baseline gap-5 py-4">
                <span className="label-mono ltr text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg text-fg">{item}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-line bg-surface/70">
        <div className="container-x section-y">
          <Reveal>
            <h2 className="text-display font-extrabold text-fg">{cs.features}</h2>
          </Reveal>
          <RevealGroup as="ul" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {text.features.map((f, i) => (
              <RevealItem key={f.title} as="li" className="group rounded-panel border border-line bg-canvas p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 sm:p-7">
                <span className="label-mono ltr text-brand-600">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 font-display text-title font-bold text-fg">{f.title}</h3>
                <p className="mt-2 text-fg-muted">{f.detail}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Gallery */}
      <section className="container-x section-y">
        <Reveal>
          <h2 className="text-display font-extrabold text-fg">{cs.screens}</h2>
        </Reveal>

        {project.desktop.length > 1 ? (
          <>
            <p className="label-mono mt-10 text-fg-subtle">{cs.desktop}</p>
            <ul className="mt-6 grid gap-8 md:grid-cols-2">
              {project.desktop.slice(1).map((shot, i) => (
                <li key={shot.key} className={cn(i % 3 === 0 && "md:col-span-2")}>
                  <Reveal preset="scale">
                    <figure>
                      <BrowserFrame shot={shot.key} alt={shot.label[locale]} url={displayUrl(project.liveUrl)} sizes={i % 3 === 0 ? "(min-width: 1280px) 76rem, 92vw" : "(min-width: 768px) 46vw, 92vw"} />
                      <figcaption className="mt-3 text-sm text-fg-subtle">{shot.label[locale]}</figcaption>
                    </figure>
                  </Reveal>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        {project.mobile.length > 0 ? (
          <>
            <p className="label-mono mt-16 text-fg-subtle">{cs.mobile}</p>
            <ul className="scrollbar-none -mx-5 mt-6 flex snap-x gap-6 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
              {project.mobile.map((shot, i) => (
                <li key={shot.key} className={cn("w-[62vw] shrink-0 snap-center sm:w-auto", i === 1 && "sm:mt-16")}>
                  <Reveal delay={i * 0.08}>
                    <figure>
                      <PhoneFrame shot={shot.key} alt={shot.label[locale]} sizes="(min-width: 640px) 28vw, 62vw" />
                      <figcaption className="mt-4 text-center text-sm text-fg-subtle">{shot.label[locale]}</figcaption>
                    </figure>
                  </Reveal>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </section>

      {/* Next project */}
      <section className="border-t border-line">
        <Link href={localePath(locale, `/work/${next.slug}`)} className="group container-x flex flex-col gap-4 py-16 sm:flex-row sm:items-end sm:justify-between sm:py-24">
          <span>
            <span className="label-mono text-fg-subtle">{dict.common.next}</span>
            <span className="mt-3 block text-mega font-black text-fg transition-colors duration-500 group-hover:text-brand-600">{next.text[locale].name}</span>
            <span className="mt-2 block text-fg-muted">{next.text[locale].category}</span>
          </span>
          <span aria-hidden="true" className="grid size-20 shrink-0 place-items-center rounded-full border border-line-strong text-3xl text-fg transition-all duration-500 group-hover:border-brand-500 group-hover:bg-brand-600 group-hover:text-white rtl:-scale-x-100">
            →
          </span>
        </Link>
      </section>

      <FinalCta locale={locale} dict={dict} />
      <div className="h-16" />
    </>
  );
}
