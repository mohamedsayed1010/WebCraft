import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { About } from "@/components/sections/about";
import { FinalCta } from "@/components/sections/final-cta";
import { Process } from "@/components/sections/process";
import { ProofStrip } from "@/components/sections/proof-strip";
import { Technologies } from "@/components/sections/technologies";
import { Why } from "@/components/sections/why";
import { getDictionary, resolveLocale } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale).pages.about;
  return buildMetadata({ locale, path: "/about", title: d.metaTitle, description: d.metaDescription });
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return (
    <>
      <PageHero
        locale={locale}
        title={dict.nav.about}
        lead={dict.footer.description}
        crumbs={[
          { name: dict.nav.home, path: "/" },
          { name: dict.nav.about, path: "/about" },
        ]}
      />
      <ProofStrip dict={dict} />
      <About dict={dict} />
      <Why dict={dict} />
      <Process copy={dict.process} />
      <Technologies locale={locale} dict={dict} />
      <FinalCta locale={locale} dict={dict} />
      <div className="h-16" />
    </>
  );
}
