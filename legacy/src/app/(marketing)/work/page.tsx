import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { WhatsAppLink } from "@/components/ui/whatsapp-cta";
import { ProjectShowcase } from "@/components/work/project-showcase";
import { ui } from "@/content/copy";
import { allProjects } from "@/content/projects";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { cn } from "@/lib/utils";

/**
 * WORK INDEX — /work
 *
 * Everything shipped, in the same editorial showcase the homepage uses. The
 * two lists are the same length today — `featured` is true on all three
 * projects — and that is fine: this page exists so the link in the header,
 * the footer and the portfolio's closing row resolves to something real, and
 * so there is a canonical URL to share when someone asks for the portfolio
 * without the pitch attached.
 *
 * It reuses `ProjectShowcase` rather than defining a second card. A portfolio
 * that looks different in two places reads as two portfolios.
 */
export const metadata: Metadata = buildMetadata({
  title: "أعمالنا — مشاريع حقيقية شغّالة",
  description:
    "مشاريع بنيناها في ويب كرافت وشغّالة أونلاين دلوقتي: متجر إلكتروني كامل بلوحة تحكم، منصة مفقودات وموجودات، وموقع إخباري متعدّد الأقسام. اللينكات مفتوحة تجرّبها بنفسك.",
  path: "/work",
});

export default function WorkPage() {
  const hasWork = allProjects.length > 0;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "الرئيسية", path: "/" },
          { name: "أعمالنا", path: "/work" },
        ])}
      />

      <PageHeader
        kicker="WORK"
        title="شغل شغّال دلوقتي."
        lead="مشاريع حقيقية بنيناها لمشاكل حقيقية. كل واحد فيهم أونلاين، واللينك تحته تفتحه بنفسك."
        backHref="/"
        backLabel={ui.backHome}
      />

      <div className="container-page pb-24 md:pb-32">
        {hasWork ? (
          <div className="flex flex-col gap-28 md:gap-36 lg:gap-44">
            {allProjects.map((project, i) => (
              <ProjectShowcase
                key={project.slug}
                project={project}
                index={i + 1}
              />
            ))}
          </div>
        ) : null}

        <Reveal preset="rise" className="mt-24">
          <div className="border-border flex flex-col gap-6 border-t pt-10 md:flex-row md:items-center md:justify-between">
            <p className="font-display text-xl font-bold md:text-2xl">
              عندك مشروع مختلف؟{" "}
              <span className="text-fg-subtle font-normal">
                خلينا نبني حاجة تستاهل تتحط هنا.
              </span>
            </p>

            <WhatsAppLink
              context="مشروع جديد"
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
