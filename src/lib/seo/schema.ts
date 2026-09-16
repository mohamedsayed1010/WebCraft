import { siteConfig, socialLinks } from "@/config/site";
import { localeMeta, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Project, Service } from "@/types";

import { absoluteLocaleUrl } from "./metadata";

/**
 * JSON-LD builders. Structured data only describes what is visibly on the
 * page — no ratings, reviews or aggregate scores are ever emitted, because
 * none have been collected.
 */

const orgId = `${siteConfig.url}/#organization`;

export function organizationSchema(locale: Locale) {
  const dict = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": orgId,
    name: siteConfig.name,
    alternateName: siteConfig.nameAr,
    url: absoluteLocaleUrl(locale, "/"),
    logo: `${siteConfig.url}/brand/webcraft-logo-512.png`,
    image: `${siteConfig.url}/brand/webcraft-logo-512.png`,
    description: dict.meta.description,
    email: siteConfig.contact.email,
    sameAs: socialLinks.map((social) => social.href),
    areaServed: siteConfig.contact.location.country,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.contact.location.city[locale],
      addressCountry: siteConfig.contact.location.country,
    },
    knowsLanguage: ["ar", "en"],
  };
}

export function websiteSchema(locale: Locale) {
  const dict = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website-${locale}`,
    name: dict.meta.siteName,
    url: absoluteLocaleUrl(locale, "/"),
    inLanguage: localeMeta[locale].htmlLang,
    publisher: { "@id": orgId },
  };
}

export function serviceSchema(service: Service, locale: Locale) {
  const text = service.text[locale];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: text.name,
    description: text.seoDescription,
    serviceType: text.name,
    url: absoluteLocaleUrl(locale, `/services/${service.slug}`),
    provider: { "@id": orgId },
    areaServed: siteConfig.contact.location.country,
    inLanguage: localeMeta[locale].htmlLang,
  };
}

export function projectSchema(project: Project, locale: Locale) {
  const text = project.text[locale];
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: text.name,
    headline: text.seoTitle,
    description: text.seoDescription,
    url: absoluteLocaleUrl(locale, `/work/${project.slug}`),
    sameAs: project.liveUrl,
    creator: { "@id": orgId },
    inLanguage: localeMeta[locale].htmlLang,
    keywords: project.stack.join(", "),
  };
}

export function breadcrumbSchema(locale: Locale, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteLocaleUrl(locale, item.path),
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
