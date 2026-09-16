import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink, buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { WhatsAppLink } from "@/components/ui/whatsapp-cta";
import { sectionCopy, ui } from "@/content/copy";
import {
  caseStudyProjects,
  displayUrl,
  getProject,
  industryKicker,
  industryLabel,
} from "@/content/projects";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, caseStudySchema } from "@/lib/seo/schema";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

/**
 * CASE STUDY — /work/[slug]
 *
 * ─── WHAT THIS PAGE DELIBERATELY DOES NOT DO ─────────────────────────────
 * It does not fill space. Every block below renders only if its data exists,
 * and today three of the seven are absent for all three projects: `problem`,
 * `solution` and `results` need facts only the client can supply, and this
 * page will stay quiet about them rather than invent a narrative or a
 * percentage. Add them to `content/projects.ts` and they appear here with no
 * change to this file.
 *
 * What it does show is everything verifiable: what the product is, what type
 * of product it is, what it actually does, real screenshots of it, and a link
 * that opens it. That is a thinner page than a fabricated one — and a far
 * stronger one, because a prospect can check every line of it in a minute.
 * ─────────────────────────────────────────────────────────────────────────
 */

/** Every project carrying a case study is a real, statically-rendered route. */
export function generateStaticParams() {
  return caseStudyProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return buildMetadata({
    title: project.seo?.title ?? project.title,
    description: project.seo?.description ?? project.summary,
    path: `/work/${project.slug}`,
    type: "article",
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project?.caseStudy) notFound();

  const { caseStudy } = project;

  return (
    <article className="relative">
      {/*
        Article + BreadcrumbList. `lib/seo/schema.ts` has generated both since
        the first build and the service, FAQ, about and contact routes all
        emit theirs — the case studies were the one page type that never did,
        which meant the deepest and most link-worthy pages on the site were
        also the only ones a crawler saw no trail to.
      */}
      <JsonLd data={caseStudySchema(project)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "الرئيسية", path: "/" },
          { name: "أعمالنا", path: "/work" },
          { name: project.title, path: `/work/${project.slug}` },
        ])}
      />

      <Hero project={project} />

      <div className="container-page pb-24 md:pb-32">
        {/* ── Overview ─────────────────────────────────────────────────── */}
        <Block index="01" kicker="OVERVIEW" title="نظرة عامة">
          <div className="max-w-[62ch] space-y-5">
            {caseStudy.overview.map((paragraph, i) => (
              <p key={i} className="text-fg-muted leading-body text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </Block>

        {/* ── Challenge / solution ─────────────────────────────────────
            Absent for every project today. See the note at the head of the
            file: an empty block is honest, an invented one is not. */}
        {caseStudy.problem ? (
          <Block index="02" kicker="CHALLENGE" title={caseStudy.problem.heading}>
            <div className="max-w-[62ch] space-y-5">
              {caseStudy.problem.body.map((paragraph, i) => (
                <p key={i} className="text-fg-muted leading-body text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </Block>
        ) : null}

        {caseStudy.solution ? (
          <Block index="03" kicker="SOLUTION" title={caseStudy.solution.heading}>
            <div className="max-w-[62ch] space-y-5">
              {caseStudy.solution.body.map((paragraph, i) => (
                <p key={i} className="text-fg-muted leading-body text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </Block>
        ) : null}

        {/* ── Features ─────────────────────────────────────────────────── */}
        {caseStudy.features && caseStudy.features.length > 0 ? (
          <Block index="04" kicker="FEATURES" title="اللي المنصة بتعمله">
            <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2">
              {caseStudy.features.map((feature) => (
                <RevealItem as="li" key={feature.title}>
                  <div className="card h-full">
                    <h3 className="font-display text-lg font-bold">
                      {feature.title}
                    </h3>
                    {feature.detail ? (
                      <p className="text-fg-muted leading-body mt-2 text-sm">
                        {feature.detail}
                      </p>
                    ) : null}
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </Block>
        ) : null}

        {/* ── Screenshots ──────────────────────────────────────────────── */}
        {caseStudy.gallery.length > 0 ? (
          <Block index="05" kicker="SCREENS" title="من جوه المشروع">
            <RevealGroup className="grid gap-5 md:grid-cols-2">
              {caseStudy.gallery.map((item) => (
                <RevealItem
                  key={item.image.src}
                  className={cn(item.span !== "half" && "md:col-span-2")}
                >
                  <figure>
                    <div className="border-border-strong/70 bg-ink-850 rounded-lg overflow-hidden border shadow-[0_30px_70px_-40px_rgb(0_0_0/0.95)]">
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        width={item.image.width}
                        height={item.image.height}
                        sizes={
                          item.span === "half"
                            ? "(min-width: 768px) 46vw, 100vw"
                            : "(min-width: 1440px) 1360px, 92vw"
                        }
                        placeholder={
                          item.image.blurDataURL ? "blur" : "empty"
                        }
                        blurDataURL={item.image.blurDataURL}
                        className="h-auto w-full"
                      />
                    </div>
                    {item.caption ? (
                      <figcaption className="text-fg-subtle mt-3 text-sm">
                        {item.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                </RevealItem>
              ))}
            </RevealGroup>
          </Block>
        ) : null}

        {/* ── Close ────────────────────────────────────────────────────── */}
        <Reveal preset="rise" className="mt-24">
          <div className="border-border bg-surface/40 rounded-xl relative overflow-hidden border p-8 md:p-14">
            <span
              aria-hidden="true"
              className="orb-violet pointer-events-none absolute -top-32 -end-24 size-[28rem] opacity-60"
            />

            <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="font-display leading-display text-3xl font-extrabold md:text-4xl">
                  {sectionCopy.work.cta.title}
                </h2>
                <p className="text-fg-muted leading-body mt-4 max-w-[38ch] text-lg">
                  {sectionCopy.work.cta.lead}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <ButtonLink href="/#contact" variant="primary" size="lg">
                  {sectionCopy.work.cta.primary}
                  <Icon name="ArrowUpRight" className="size-4" />
                </ButtonLink>

                <WhatsAppLink
                  context={project.title}
                  label={ui.whatsappCta}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                  )}
                >
                  <Icon name="WhatsApp" className="size-4" />
                  {sectionCopy.work.cta.secondary}
                </WhatsAppLink>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal preset="fade" className="mt-12">
          <ButtonLink href="/#work" variant="ghost" size="md">
            <Icon name="ArrowRight" className="size-4" />
            {ui.backToWork}
          </ButtonLink>
        </Reveal>
      </div>
    </article>
  );
}

/* ==========================================================================
   HERO
   ========================================================================== */

function Hero({ project }: { project: Project }) {
  const arabicName = project.script === "ar";
  const host = project.liveUrl ? displayUrl(project.liveUrl) : null;

  return (
    <header className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
      <div
        aria-hidden="true"
        className="orb-violet pointer-events-none absolute -top-52 start-[-14rem] -z-10 size-[42rem] opacity-50"
      />

      <div className="container-page">
        <Reveal preset="fade">
          <div dir="ltr" className="flex items-center gap-3">
            <span className="pixel-label text-graphic">
              {industryKicker(project.industry)}
            </span>
            <span
              aria-hidden="true"
              className="from-graphic-muted/70 h-px w-8 bg-gradient-to-r to-transparent"
            />
            <span className="pixel-label text-fg-subtle">CASE STUDY</span>
          </div>
        </Reveal>

        <h1
          className={cn(
            "mt-6",
            arabicName
              ? "font-display leading-display text-4xl font-extrabold md:text-6xl"
              // See the note in `project-showcase.tsx`: `.latin-display` is
              // direction:ltr, so `start` would resolve to the wrong edge.
              : "latin-display text-end text-5xl md:text-7xl",
          )}
        >
          {project.title}
        </h1>

        {arabicName ? (
          <p
            dir="ltr"
            className="pixel-label text-fg-subtle mt-4 inline-block"
          >
            {project.titleLatin}
          </p>
        ) : null}

        <p className="text-fg-muted leading-body mt-6 max-w-[52ch] text-lg">
          {project.summary}
        </p>

        {/* Engagement facts. Only the ones that are actually known. */}
        <dl className="border-border mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t pt-8">
          <Fact label="النوع" value={project.caseStudy?.projectType} />
          <Fact label="المجال" value={industryLabel(project.industry)} />
          <Fact label="العميل" value={project.client} />
          <Fact label="السنة" value={project.year?.toString()} />
        </dl>

        {project.liveUrl ? (
          <Reveal preset="rise" className="mt-10">
            <div className="flex flex-wrap items-center gap-4">
              <ButtonLink
                href={project.liveUrl}
                external
                variant="primary"
                size="lg"
                className="group/cta"
              >
                {ui.viewLive}
                <Icon
                  name="ArrowUpRight"
                  className="duration-fast ease-brand size-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                />
              </ButtonLink>

              {host ? (
                <span dir="ltr" className="pixel-label text-fg-subtle">
                  {host}
                </span>
              ) : null}
            </div>
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}

/** One engagement fact. Renders nothing at all when the value is unknown. */
function Fact({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <div>
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-2 text-base font-semibold">{value}</dd>
    </div>
  );
}

/* ==========================================================================
   BLOCK
   ========================================================================== */

function Block({
  index,
  kicker,
  title,
  children,
}: {
  index: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-20 md:mt-28">
      <Reveal preset="fade">
        <div dir="ltr" className="flex items-center gap-3">
          <span className="pixel-label text-graphic">{index}</span>
          <span
            aria-hidden="true"
            className="from-graphic-muted/70 h-px w-8 bg-gradient-to-r to-transparent"
          />
          <span className="pixel-label text-fg-subtle">{kicker}</span>
        </div>
      </Reveal>

      <h2 className="font-display mt-5 text-2xl font-extrabold md:text-3xl">
        {title}
      </h2>

      <div className="mt-8">{children}</div>
    </section>
  );
}
