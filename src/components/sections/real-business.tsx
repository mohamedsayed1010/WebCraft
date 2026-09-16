import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { MaskedLines, Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { media } from "@/content/media.generated";
import { projects } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { displayUrl } from "@/lib/utils";

/**
 * In place of testimonials — none have been collected, so none are shown.
 * The proof is a list of live products, each one a real outbound link.
 */
export function RealBusiness({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const r = dict.realBusiness;
  return (
    <section aria-labelledby="real-title" className="relative border-t border-line bg-[linear-gradient(135deg,var(--color-tide)_0%,var(--color-canvas)_100%)] py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal preset="fade">
            <p className="label-mono text-brand-600">{r.kicker}</p>
          </Reveal>
          <h2 id="real-title" className="mt-4 text-headline font-extrabold text-fg">
            <MaskedLines lines={[r.title]} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-4 text-fg-muted">{r.lead}</p>
          </Reveal>
        </div>

        <RevealGroup as="ul" className="divide-y divide-line border-y border-line lg:col-span-8" stagger={0.06}>
          {projects.map((project) => {
            const text = project.text[locale];
            const thumb = media[(project.mobile[0] ?? project.desktop[0])!.key];
            return (
              <RevealItem key={project.slug} as="li">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-4 py-4 transition-colors sm:gap-6"
                >
                  <span aria-hidden="true" className="absolute inset-0 origin-left scale-x-0 rtl:origin-right bg-gradient-to-r from-brand-50 to-transparent transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-x-100 rtl:bg-gradient-to-l" />
                  <span className="relative size-12 shrink-0 overflow-hidden rounded-xl border border-line bg-mist sm:size-14">
                    <Image src={thumb.src} alt="" fill sizes="56px" className="object-cover object-top transition-transform duration-700 group-hover:scale-110" />
                  </span>
                  <span className="relative min-w-0 flex-1">
                    <span className="block font-display text-lg font-bold text-fg sm:text-xl">{text.name}</span>
                    <span className="block truncate text-sm text-fg-subtle">{text.category}</span>
                  </span>
                  <bdi className="relative hidden font-mono text-sm text-fg-muted transition-colors group-hover:text-brand-600 md:inline">
                    {displayUrl(project.liveUrl)}
                  </bdi>
                  <span className="relative grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-fg transition-all duration-500 group-hover:rotate-45 group-hover:border-brand-500 group-hover:bg-brand-600 group-hover:text-white">
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </span>
                  <span className="sr-only">{dict.common.newTab}</span>
                </a>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
