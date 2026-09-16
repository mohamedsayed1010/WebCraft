import type { Metadata } from "next";

import { About } from "@/components/sections/about";
import { AndroidShowcase } from "@/components/sections/android";
import { Contact } from "@/components/sections/contact/contact";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero/hero";
import { Process } from "@/components/sections/process";
import { ProofStrip } from "@/components/sections/proof-strip";
import { RealBusiness } from "@/components/sections/real-business";
import { SeoBand } from "@/components/sections/seo-band";
import { Services } from "@/components/sections/services/services";
import { Technologies } from "@/components/sections/technologies";
import { Why } from "@/components/sections/why";
import { Work } from "@/components/sections/work";
import { getDictionary, resolveLocale } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildMetadata({ locale, path: "/" });
}

/**
 * HOMEPAGE — told as one story:
 *   Hero → Proof → Who we are → Services → SEO → Real work → Process →
 *   Technology → Android → Why WebCraft → Live proof → CTA → Contact
 */
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <ProofStrip dict={dict} />
      <About dict={dict} />
      <Services locale={locale} dict={dict} />
      <SeoBand locale={locale} dict={dict} />
      <Work locale={locale} dict={dict} />
      <Process copy={dict.process} />
      <Technologies locale={locale} dict={dict} />
      <AndroidShowcase locale={locale} dict={dict} />
      <Why dict={dict} />
      <RealBusiness locale={locale} dict={dict} />
      <FinalCta locale={locale} dict={dict} />
      <Contact locale={locale} dict={dict} />
    </>
  );
}
