import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink, buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Stamp } from "@/components/ui/stamp";
import { WhatsAppLink } from "@/components/ui/whatsapp-cta";
import { ui } from "@/content/copy";
import {
  founder,
  founderName,
  founderPhotoAlt,
  hasFounderPhoto,
  publishedCredentials,
} from "@/content/founder";
import { differentiators, processSteps } from "@/content/process";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, personSchema } from "@/lib/seo/schema";
import { cn } from "@/lib/utils";

/**
 * ABOUT — /about
 *
 * The full version of the story the homepage tells in two sentences.
 *
 * This page is where the length belongs. A visitor who clicks «اعرف أكتر» has
 * self-selected into wanting the detail, which is a completely different
 * reader from someone scrolling past the founder block on their way to the
 * contact section — and it is why the homepage cut is short and this is not.
 */
export const metadata: Metadata = buildMetadata({
  title: "عن ويب كرافت — مين إحنا وبنشتغل إزاي",
  description:
    "ويب كرافت استوديو مصري بيصمّم وينفّذ مواقع لأصحاب البيزنس. اعرف مين وراها، وليه بدأت، وإزاي بنشتغل من أول مكالمة لحد ما الموقع ينزل ويشتغل.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      {founder.name ? <JsonLd data={personSchema(founder)} /> : null}
      <JsonLd
        data={breadcrumbSchema([
          { name: "الرئيسية", path: "/" },
          { name: "عن ويب كرافت", path: "/about" },
        ])}
      />

      <PageHeader
        kicker="ABOUT"
        title="مين ورا ويب كرافت"
        lead="مش صفحة عن شخص. صفحة عشان تعرف بتتعامل مع مين، وتقدر توصله إزاي لو احتجت."
        backHref="/"
        backLabel={ui.backHome}
      />

      <div className="container-page pb-24 md:pb-32">
        {/* ── The person ───────────────────────────────────────────────── */}
        <section
          id="founder"
          className="grid gap-14 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20"
        >
          <Reveal preset="scale">
            <figure className="relative">
              <div className="bg-ink-850 border-border relative aspect-[4/5] w-full overflow-hidden rounded-lg border">
                {hasFounderPhoto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={founder.photo.src}
                    alt={founderPhotoAlt}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="grid size-full place-items-center">
                    <div
                      aria-hidden="true"
                      className="orb-violet absolute inset-0 opacity-70"
                    />
                    <span
                      dir="ltr"
                      className="latin-display relative text-7xl font-black text-white/90"
                    >
                      WC
                    </span>
                  </div>
                )}
              </div>

              <Stamp
                size={104}
                reverse
                className="bg-ink-900 shadow-lift absolute -bottom-8 -start-6 rounded-full"
              />
            </figure>
          </Reveal>

          <div>
            <Reveal preset="rise">
              <p className="font-display text-2xl font-bold">{founderName}</p>
              <p className="text-fg-subtle mt-1 text-sm">{founder.role}</p>
            </Reveal>

            <Reveal preset="rise" delay={0.1}>
              <p className="font-display leading-heading mt-8 text-xl font-bold md:text-2xl">
                {founder.intro}
              </p>
            </Reveal>

            <Reveal preset="rise" delay={0.16}>
              <div className="mt-8 flex flex-col gap-5">
                {founder.story.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className="text-fg-muted leading-body max-w-[62ch] text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            {publishedCredentials.length > 0 ? (
              <Reveal preset="rise" delay={0.22}>
                <dl className="border-border mt-10 grid grid-cols-2 gap-6 border-t pt-8 sm:grid-cols-3">
                  {publishedCredentials.map((credential) => (
                    <div key={credential.label}>
                      <dt className="text-fg-subtle text-xs">
                        {credential.label}
                      </dt>
                      <dd className="font-display mt-1.5 text-lg font-bold">
                        {credential.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ) : null}

            <Reveal preset="rise" delay={0.28}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <WhatsAppLink
                  context="كلام مباشر مع المؤسس"
                  label={ui.whatsappCta}
                  className={cn(
                    buttonVariants({ variant: "whatsapp", size: "lg" }),
                  )}
                >
                  <Icon name="WhatsApp" className="size-4" />
                  كلّمني على طول
                </WhatsAppLink>

                {founder.socials.email ? (
                  <a
                    href={`mailto:${founder.socials.email}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                    )}
                  >
                    <Icon name="Mail" className="size-4" />
                    <span dir="ltr">{founder.socials.email}</span>
                  </a>
                ) : null}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── How we work ──────────────────────────────────────────────── */}
        <section className="mt-24 md:mt-32">
          <Reveal preset="fade">
            <div dir="ltr" className="flex items-center gap-3">
              <span className="pixel-label text-graphic">01</span>
              <span
                aria-hidden="true"
                className="from-graphic-muted/70 h-px w-8 bg-gradient-to-r to-transparent"
              />
              <span className="pixel-label text-fg-subtle">HOW WE WORK</span>
            </div>
          </Reveal>

          <h2 className="font-display mt-5 text-2xl font-extrabold md:text-3xl">
            الخطوات الخمسة
          </h2>

          <RevealGroup as="ul" className="mt-10 grid gap-4 md:grid-cols-2">
            {processSteps.map((step) => (
              <RevealItem as="li" key={step.index}>
                <article className="card h-full">
                  <div dir="ltr" className="flex items-center gap-3">
                    <span className="pixel-label text-graphic">
                      {step.index}
                    </span>
                    {step.duration ? (
                      <span className="text-fg-subtle text-xs">
                        {step.duration}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="font-display mt-4 text-xl font-bold">
                    {step.title}
                  </h3>
                  <p className="text-fg-muted leading-body mt-2 text-sm">
                    {step.description}
                  </p>

                  <ul className="border-border mt-auto flex flex-wrap gap-2 border-t pt-5">
                    {step.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="border-border text-fg-subtle rounded-pill border px-3 py-1.5 text-xs"
                      >
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* ── What you can hold us to ──────────────────────────────────── */}
        <section className="mt-24 md:mt-32">
          <Reveal preset="fade">
            <div dir="ltr" className="flex items-center gap-3">
              <span className="pixel-label text-graphic">02</span>
              <span
                aria-hidden="true"
                className="from-graphic-muted/70 h-px w-8 bg-gradient-to-r to-transparent"
              />
              <span className="pixel-label text-fg-subtle">OUR TERMS</span>
            </div>
          </Reveal>

          <h2 className="font-display mt-5 text-2xl font-extrabold md:text-3xl">
            اللي تقدر تحاسبنا عليه
          </h2>

          <RevealGroup as="ul" className="mt-10 flex flex-col">
            {differentiators.map((item) => (
              <RevealItem as="li" key={item.title}>
                <div className="border-border grid gap-2 border-b py-6 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:gap-10">
                  <h3 className="font-display text-lg font-bold">
                    {item.title}
                  </h3>
                  <div>
                    <p className="text-fg-muted leading-body text-sm">
                      {item.description}
                    </p>
                    {item.proof ? (
                      <p className="text-fg-subtle mt-3 flex items-start gap-2.5 text-xs">
                        <Icon
                          name="Check"
                          className="text-accent mt-px size-4 shrink-0"
                        />
                        {item.proof}
                      </p>
                    ) : null}
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        <Reveal preset="rise" className="mt-20">
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href="/#work" variant="primary" size="lg">
              شوف شغلنا
              <Icon name="ArrowLeft" className="size-4" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="lg">
              كلّمنا
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </>
  );
}
