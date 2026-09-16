import { siteConfig } from "@/config/site";
import type { FaqItem, Founder, Project, Service } from "@/types";
import { absoluteUrl } from "@/lib/utils";

/**
 * WEBCRAFT — STRUCTURED DATA (JSON-LD)
 *
 * Schema.org markup is how a search engine understands that we are an agency,
 * what we sell, who runs it and what our clients said. It is also what earns
 * rich results — FAQ accordions and breadcrumbs in the SERP — which lift
 * click-through on exactly the queries that convert.
 *
 * Emitted through `<JsonLd />` in `src/components/seo/`.
 *
 * INTEGRITY RULE: structured data must describe what is actually on the page.
 * Marking up reviews that are not displayed, or ratings that were never
 * collected, is a manual-action offence under Google's spam policies and can
 * remove the whole domain from results. Never generate rating schema from
 * placeholder testimonials.
 */

type Json = Record<string, unknown>;

const ORG_ID = absoluteUrl("#organization");
const SITE_ID = absoluteUrl("#website");

/** The agency itself. Rendered once, in the root layout. */
export function organizationSchema(): Json {
  const { contact, socials } = siteConfig;
  const sameAs = Object.values(socials).filter((url) => url.length > 0);

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    foundingDate: String(siteConfig.foundedYear),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(contact.email ? { email: contact.email } : {}),
    ...(contact.phone ? { telephone: contact.phone } : {}),
    ...(contact.location.city
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: contact.location.city,
            addressRegion: contact.location.region,
            addressCountry: contact.location.country,
          },
        }
      : {}),
    // We work remotely with clients regardless of location; state that rather
    // than claiming a service radius we do not have.
    areaServed: "Worldwide",
    knowsAbout: [
      "Web design",
      "Web development",
      "Search engine optimization",
      "Conversion rate optimization",
      "E-commerce",
    ],
  };
}

/** The site, with a search action. Rendered once, in the root layout. */
export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": ORG_ID },
    inLanguage: siteConfig.language,
  };
}

/** One per `/services/[slug]` page. */
export function serviceSchema(service: Service): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/services/${service.slug}#service`),
    name: service.title,
    description: service.description,
    serviceType: service.title,
    provider: { "@id": ORG_ID },
    url: absoluteUrl(`/services/${service.slug}`),
    ...(service.startingPrice
      ? {
          offers: {
            "@type": "Offer",
            description: service.startingPrice,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
}

/** One per `/work/[slug]` case study. */
export function caseStudySchema(project: Project): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": absoluteUrl(`/work/${project.slug}#article`),
    headline: project.title,
    description: project.summary,
    image: absoluteUrl(project.cover.src),
    /* `year` is optional on `Project` and is unset on all three shipped
       projects — none of them has a confirmed launch date. Interpolating it
       unguarded emitted `datePublished: "undefined-01-01"`, which is an
       invalid date in the markup of every case study on the site. Omit the
       property rather than publish a wrong one. */
    ...(project.year ? { datePublished: `${project.year}-01-01` } : {}),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: absoluteUrl(`/work/${project.slug}`),
  };
}

/**
 * FAQ rich result. Only emit for questions that are visibly answered on the
 * page — hidden FAQ markup is a policy violation.
 */
export function faqSchema(items: FaqItem[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** The founder, linked to the organisation. Powers the knowledge panel. */
export function personSchema(founder: Founder): Json {
  const sameAs = Object.values(founder.socials).filter(
    (value): value is string => typeof value === "string" && value.startsWith("http"),
  );

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl("/about#founder"),
    name: founder.name,
    jobTitle: founder.role,
    image: absoluteUrl(founder.photo.src),
    worksFor: { "@id": ORG_ID },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/** Breadcrumbs for every page below the root. */
export function breadcrumbSchema(trail: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
