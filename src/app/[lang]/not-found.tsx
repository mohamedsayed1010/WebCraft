import Link from "next/link";

import { ar } from "@/i18n/dictionaries/ar";
import { en } from "@/i18n/dictionaries/en";

/**
 * 404 — rendered in both languages side by side. A not-found boundary doesn't
 * receive route params, and a bilingual page is always right regardless of
 * which prefix the broken URL carried.
 */
export default function NotFound() {
  return (
    <section className=" relative flex min-h-[80svh] items-center overflow-hidden pt-32 pb-20">
      <div aria-hidden="true" className="grid-bg mask-radial absolute inset-0 opacity-60" />
      <div aria-hidden="true" className="absolute -top-40 end-[-10%] size-[36rem] glow [--glow:color-mix(in_oklab,var(--color-brand-300)_48%,transparent)]" />
      <div className="container-x relative">
        <p aria-hidden="true" className="ltr font-[family-name:var(--font-archivo)] text-[clamp(7rem,24vw,18rem)] leading-none font-black text-transparent [-webkit-text-stroke:1.5px_rgb(63_87_230/0.45)]">
          404
        </p>
        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <div dir="rtl" lang="ar" className="font-[family-name:var(--font-plex-ar)]">
            <h1 className="font-[family-name:var(--font-kufi)] text-headline leading-[1.4] font-extrabold text-fg">{ar.pages.notFound.title}</h1>
            <p className="mt-3 text-fg-muted">{ar.pages.notFound.lead}</p>
            <div className="mt-6 flex gap-4">
              <Link href="/" className="rounded-full bg-brand-600 px-5 py-2.5 font-semibold text-white">{ar.common.backHome}</Link>
              <Link href="/work" className="rounded-full border border-line-strong px-5 py-2.5 font-semibold text-fg">{ar.common.exploreWork}</Link>
            </div>
          </div>
          <div dir="ltr" lang="en" className="font-[family-name:var(--font-inter)]">
            <p className="font-[family-name:var(--font-archivo)] text-headline font-extrabold text-fg">{en.pages.notFound.title}</p>
            <p className="mt-3 text-fg-muted">{en.pages.notFound.lead}</p>
            <div className="mt-6 flex gap-4">
              <Link href="/en" className="rounded-full bg-brand-600 px-5 py-2.5 font-semibold text-white">{en.common.backHome}</Link>
              <Link href="/en/work" className="rounded-full border border-line-strong px-5 py-2.5 font-semibold text-fg">{en.common.exploreWork}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
