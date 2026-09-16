import type { Metadata } from "next";

import { Contact } from "@/components/sections/contact/contact";
import { JsonLd } from "@/components/seo/json-ld";
import { getDictionary, resolveLocale } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale).pages.contact;
  return buildMetadata({ locale, path: "/contact", title: d.metaTitle, description: d.metaDescription });
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return (
    <div className="pt-20">
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: dict.nav.home, path: "/" },
          { name: dict.nav.contact, path: "/contact" },
        ])}
      />
      <Contact locale={locale} dict={dict} as="h1" />
    </div>
  );
}
