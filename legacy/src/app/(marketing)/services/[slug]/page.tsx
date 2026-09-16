import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/layout/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink, buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { WhatsAppLink } from "@/components/ui/whatsapp-cta";
import { ui } from "@/content/copy";
import { getService, serviceSlugs, services } from "@/content/services";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

/**
 * SERVICE PAGE — /services/[slug]
 *
 * The ten routes the homepage links into and the footer links into, and the
 * pages that actually earn organic traffic: someone searching «تصميم متجر
 * إلكتروني في مصر» lands here, not on the homepage.
 *
 * ─── THE SHAPE, AND WHY IT IS THIS SHAPE ─────────────────────────────────
 * The order answers a buyer's questions in the order they are asked:
 *
 *   headline + promise   what this is
 *   problemsSolved       whether it is *my* problem — and this block goes
 *                        first, before the deliverables, because a visitor
 *                        who does not recognise their own situation in it
 *                        never reads the rest
 *   deliverables         what I actually receive
 *   bestFor + timeline   whether I am the right kind of client, and how long
 *   related              where to go if this was not it
 *   ask                  WhatsApp, with the service name already in the
 *                        opening message
 *
 * `startingPrice` is intentionally not rendered. The values in
 * `content/services.ts` are empty pending real commercial terms, and a price
 * on a page is quotable back at you on a call.
 * ─────────────────────────────────────────────────────────────────────────
 */

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug as Service["slug"]);

  if (!service) return {};

  return buildMetadata({
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug as Service["slug"]);

  if (!service) notFound();

  const related = service.related
    .map((relatedSlug) => services.find((item) => item.slug === relatedSlug))
    .filter((item): item is Service => item !== undefined);

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "الرئيسية", path: "/" },
          { name: "خدماتنا", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />

      <PageHeader
        kicker={service.slug.replace(/-/g, " ").toUpperCase()}
        title={service.headline}
        lead={service.description}
        backHref="/services"
        backLabel="كل الخدمات"
      >
        <Reveal preset="rise" delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <WhatsAppLink
              context={service.title}
              label={ui.whatsappCta}
              className={cn(buttonVariants({ variant: "whatsapp", size: "lg" }))}
            >
              <Icon name="WhatsApp" className="size-4" />
              {ui.whatsappCta}
            </WhatsAppLink>

            <ButtonLink href="/#work" variant="outline" size="lg">
              {heroSecondary}
              <Icon name="ArrowLeft" className="size-4" />
            </ButtonLink>
          </div>
        </Reveal>

        {service.timeline ? (
          <Reveal preset="fade" delay={0.28}>
            <p className="text-fg-subtle mt-6 flex items-center gap-2 text-sm">
              <Icon name="Clock" className="text-graphic size-4" />
              مدة التنفيذ التقريبية: {service.timeline}
            </p>
          </Reveal>
        ) : null}
      </PageHeader>

      <div className="container-page pb-24 md:pb-32">
        {/* ── The problem ────────────────────────────────────────────────
            First, deliberately. Recognition before offer. */}
        <Block index="01" kicker="THE PROBLEM" title="ده كلامك؟">
          <RevealGroup as="ul" className="grid gap-3 sm:grid-cols-2">
            {service.problemsSolved.map((problem) => (
              <RevealItem as="li" key={problem}>
                <div className="border-border flex h-full items-start gap-3 rounded-lg border p-5">
                  <Icon
                    name="TriangleAlert"
                    className="text-graphic mt-0.5 size-4 shrink-0"
                  />
                  <span className="text-fg-muted leading-body text-sm">
                    {problem}
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Block>

        {/* ── What you get ─────────────────────────────────────────────── */}
        <Block index="02" kicker="DELIVERABLES" title="بتستلم إيه بالظبط">
          <RevealGroup as="ul" className="flex flex-col">
            {service.deliverables.map((item) => (
              <RevealItem as="li" key={item}>
                <div className="border-border flex items-start gap-3.5 border-b py-4">
                  <Icon
                    name="Check"
                    className="text-accent mt-0.5 size-4 shrink-0"
                  />
                  <span className="leading-body text-base">{item}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Block>

        {/* ── Who it is for ────────────────────────────────────────────── */}
        <Block index="03" kicker="BEST FOR" title="مناسبة لمين">
          <Reveal preset="rise">
            <ul className="flex flex-wrap gap-2.5">
              {service.bestFor.map((audience) => (
                <li
                  key={audience}
                  className="border-graphic-line bg-graphic-fill text-fg-muted rounded-pill border px-4 py-2 text-sm font-semibold"
                >
                  {audience}
                </li>
              ))}
            </ul>
          </Reveal>
        </Block>

        {/* ── Related ──────────────────────────────────────────────────── */}
        {related.length > 0 ? (
          <Block index="04" kicker="RELATED" title="خدمات ليها علاقة">
            <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-3">
              {related.map((item) => (
                <RevealItem as="li" key={item.slug}>
                  <Link
                    href={`/services/${item.slug}`}
                    className="group card card-interactive"
                  >
                    <span aria-hidden="true" className="chip-icon">
                      <Icon name={item.icon} className="size-5" />
                    </span>
                    <h3 className="font-display mt-5 text-lg font-bold">
                      {item.title}
                    </h3>
                    <p className="text-fg-muted leading-body mt-2 text-sm">
                      {item.promise}
                    </p>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </Block>
        ) : null}

        {/* ── The ask ──────────────────────────────────────────────────── */}
        <Reveal preset="rise" className="mt-20 md:mt-28">
          <div className="border-border flex flex-col gap-6 border-t pt-10 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-extrabold md:text-3xl">
                محتاج {service.title}؟
              </h2>
              <p className="text-fg-muted leading-body mt-3 max-w-[42ch]">
                ابعتلنا سطرين عن مشروعك وهنرد عليك في نفس اليوم بخطوة واضحة.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <WhatsAppLink
                context={service.title}
                label={ui.whatsappCta}
                className={cn(
                  buttonVariants({ variant: "whatsapp", size: "lg" }),
                )}
              >
                <Icon name="WhatsApp" className="size-4" />
                {ui.whatsappCta}
              </WhatsAppLink>

              <ButtonLink href="/contact" variant="outline" size="lg">
                ابعت التفاصيل
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}

/** Shared label — the header's second button on every service page. */
const heroSecondary = "شوف شغلنا";

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
    <section className="mt-20 md:mt-24">
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
