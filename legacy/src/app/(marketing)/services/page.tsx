import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { WhatsAppLink } from "@/components/ui/whatsapp-cta";
import { ui } from "@/content/copy";
import { serviceGroups, servicesByGroup } from "@/content/services";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { cn } from "@/lib/utils";

/**
 * SERVICES INDEX — /services
 *
 * The full catalogue, which the homepage deliberately no longer carries. The
 * homepage summarises the three stages in about six seconds; this is where a
 * visitor who wants to compare the ten offerings reads them properly, and it
 * is the hub that links every `/services/[slug]` landing page — which is what
 * makes those pages rank.
 */
export const metadata: Metadata = buildMetadata({
  title: "خدماتنا — تصميم وبرمجة وتطوير مواقع",
  description:
    "عشر خدمات مقسومة على تلات مراحل: نصمّم، نبني، نكبّر. تصميم مواقع، برمجة وتنفيذ، متاجر إلكترونية، تحسين الظهور في جوجل وصيانة — لأصحاب البيزنس في مصر.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "الرئيسية", path: "/" },
          { name: "خدماتنا", path: "/services" },
        ])}
      />

      <PageHeader
        kicker="SERVICES"
        title="بنعمل إيه بالظبط"
        lead="عشر خدمات، مقسومة على تلات مراحل بيمر بيها أي بيزنس. تقدر تبدأ من المرحلة اللي انت واقف فيها."
        backHref="/"
        backLabel={ui.backHome}
      />

      <div className="container-page pb-24 md:pb-32">
        <div className="flex flex-col gap-20 md:gap-28">
          {serviceGroups.map((group) => (
            <section key={group.id}>
              <div className="grid gap-8 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-14">
                {/* Sticky on desktop so the stage name stays with its cards
                    while they scroll past. */}
                <Reveal preset="rise">
                  <div className="lg:sticky lg:top-28">
                    <div dir="ltr" className="flex items-center gap-3">
                      <span className="pixel-label text-graphic">
                        {group.index}
                      </span>
                      <span className="pixel-label text-fg-subtle">
                        {group.kicker}
                      </span>
                    </div>

                    <h2 className="font-display mt-4 text-3xl font-extrabold">
                      {group.title}
                    </h2>

                    <p className="text-fg-muted leading-body mt-3 text-sm">
                      {group.description}
                    </p>
                  </div>
                </Reveal>

                <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2">
                  {servicesByGroup(group.id).map((service) => (
                    <RevealItem as="li" key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="group card card-interactive"
                      >
                        <span aria-hidden="true" className="chip-icon">
                          <Icon name={service.icon} className="size-5" />
                        </span>

                        <h3 className="font-display mt-5 text-xl font-bold">
                          {service.title}
                        </h3>

                        <p className="text-fg-muted leading-body mt-2 text-sm">
                          {service.promise}
                        </p>

                        <span className="text-fg-subtle group-hover:text-accent duration-fast mt-auto flex items-center gap-1.5 pt-6 text-sm font-semibold transition-colors">
                          {ui.learnMore}
                          <Icon
                            name="ArrowLeft"
                            className="duration-fast size-4 transition-transform group-hover:-translate-x-1"
                          />
                        </span>
                      </Link>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </section>
          ))}
        </div>

        <Reveal preset="rise" className="mt-24">
          <div className="border-border flex flex-col gap-6 border-t pt-10 md:flex-row md:items-center md:justify-between">
            <p className="font-display text-xl font-bold md:text-2xl">
              مش عارف تبدأ منين؟{" "}
              <span className="text-fg-subtle font-normal">
                احكيلنا عن مشروعك وهنقولك.
              </span>
            </p>

            <WhatsAppLink
              context="مش عارف أبدأ منين"
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
