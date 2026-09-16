import Link from "next/link";

import { MaskedLines, Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { localePath, type Locale } from "@/i18n/config";
import { breadcrumbSchema } from "@/lib/seo/schema";

/** Shared header for inner pages: breadcrumb (visible + JSON-LD), h1, lead. */
export function PageHero({
  locale,
  crumbs,
  title,
  lead,
  children,
}: {
  locale: Locale;
  crumbs: { name: string; path: string }[];
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
      <JsonLd data={breadcrumbSchema(locale, crumbs)} />
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="grid-bg mask-radial absolute inset-0 opacity-60" />
        <div className="absolute -top-40 end-[-10%] size-[36rem] glow [--glow:color-mix(in_oklab,var(--color-brand-300)_48%,transparent)]" />
        <div className="absolute bottom-[-12rem] start-[-8%] size-[28rem] glow [--glow:color-mix(in_oklab,var(--color-brand-50)_100%,transparent)]" />
      </div>
      <div className="container-x">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-fg-subtle">
            {crumbs.map((crumb, i) => {
              const last = i === crumbs.length - 1;
              return (
                <li key={crumb.path} className="flex items-center gap-2">
                  {last ? (
                    <span aria-current="page" className="text-fg-muted">{crumb.name}</span>
                  ) : (
                    <>
                      <Link href={localePath(locale, crumb.path)} className="transition-colors hover:text-brand-600">
                        {crumb.name}
                      </Link>
                      <span aria-hidden="true">/</span>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <h1 className="mt-8 max-w-5xl text-mega font-black text-fg">
          <MaskedLines lines={[title]} />
        </h1>
        {lead ? (
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-lead text-fg-muted">{lead}</p>
          </Reveal>
        ) : null}
        {children}
      </div>
    </section>
  );
}
