"use client";

import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";
import type { Service, ServiceText } from "@/types";

export type ExplorerService = Pick<Service, "slug" | "index" | "visual" | "stack" | "proof"> & {
  text: Omit<ServiceText, "seoTitle" | "seoDescription">;
};

import { ServiceScene } from "./service-visuals";

/**
 * SERVICES EXPLORER
 *
 * A single DOM for both layouts. Each service is a disclosure button followed
 * by its panel. On desktop, CSS grid pins every panel into the right-hand
 * column (row 1, spanning all rows), turning the buttons into a vertical tab
 * list; on mobile the same markup reads as an accordion. All panel text is
 * server-rendered (inactive panels are `hidden`), so every service stays
 * crawlable without duplicating a word.
 */
export function ServicesExplorer({
  locale,
  services,
  labels,
  projectNames,
}: {
  locale: Locale;
  services: ExplorerService[];
  labels: Dictionary["services"];
  projectNames: Record<string, string>;
}) {
  const [active, setActive] = useState(0);

  const toggle = (i: number) => {
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    setActive((current) => (current === i && !desktop ? -1 : i));
  };

  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] lg:grid-rows-[repeat(8,auto)_1fr] lg:gap-x-12 lg:gap-y-2">
      {services.map((service, i) => {
        const text = service.text;
        const isActive = active === i;
        const panelId = `service-panel-${service.slug}`;
        const buttonId = `service-tab-${service.slug}`;

        return (
          <div key={service.slug} className="contents">
            <button
              id={buttonId}
              type="button"
              aria-expanded={isActive}
              aria-controls={panelId}
              onClick={() => toggle(i)}
              className={cn(
                "group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border px-4 py-4 text-start transition-all duration-500 ease-[var(--ease-brand)] lg:col-start-1 lg:px-5",
                isActive
                  ? "border-line-strong bg-mist"
                  : "border-line bg-transparent hover:border-line-strong hover:bg-surface",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-y-3 start-0 w-[3px] rounded-full transition-all duration-500",
                  isActive ? "bg-brand-600 opacity-100" : "bg-transparent opacity-0",
                )}
              />
              <span className={cn("label-mono ltr transition-colors", isActive ? "text-brand-600" : "text-fg-subtle")}>{service.index}</span>
              <span className="min-w-0 flex-1">
                <span className={cn("block font-display text-lg font-bold transition-colors sm:text-xl", isActive ? "text-fg" : "text-fg-muted group-hover:text-fg")}>
                  {text.name}
                </span>
                <span
                  className={cn(
                    "grid text-sm text-fg-subtle transition-[grid-template-rows,opacity,margin] duration-500",
                    isActive ? "mt-1 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <span className="overflow-hidden">{text.tagline}</span>
                </span>
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-500",
                  isActive ? "rotate-45 border-brand-500 bg-brand-600 text-white" : "border-line-strong text-fg-muted",
                )}
              >
                <Plus className="size-4" />
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isActive}
              className="lg:col-start-2 lg:row-[1/span_9]"
            >
                  <motion.article
                    key={`${service.slug}-${isActive}`}
                    initial={isActive ? { opacity: 0, y: 24 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="pb-6 lg:sticky lg:top-28 lg:pb-0"
                  >
                    <motion.div
                      initial={isActive ? { clipPath: "inset(8% 8% 8% 8% round 28px)", scale: 1.04 } : false}
                      animate={{ clipPath: "inset(0% 0% 0% 0% round 28px)", scale: 1 }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ServiceScene visual={service.visual} locale={locale} />
                    </motion.div>

                    <div className="mt-8 grid gap-8 sm:grid-cols-2">
                      <div>
                        <h3 className="label-mono text-brand-600">{labels.whatLabel}</h3>
                        <p className="mt-3 text-fg">{text.what}</p>
                      </div>
                      <div>
                        <h3 className="label-mono text-aqua-700">{labels.whyLabel}</h3>
                        <p className="mt-3 text-fg-muted">{text.why}</p>
                      </div>
                    </div>

                    <div className="mt-8 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
                      <div>
                        <h3 className="label-mono text-fg-subtle">{labels.buildsLabel}</h3>
                        <ul className="mt-4 space-y-2.5">
                          {text.builds.map((b) => (
                            <li key={b} className="flex gap-3 text-sm text-fg">
                              <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-600" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="label-mono text-fg-subtle">{labels.outcomesLabel}</h3>
                        <ul className="mt-4 space-y-2.5">
                          {text.outcomes.map((o) => (
                            <li key={o} className="flex gap-3 text-sm text-fg-muted">
                              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-aqua-400" />
                              {o}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-end sm:justify-between">
                      <div className="space-y-4">
                        <div>
                          <h3 className="sr-only">{labels.stackLabel}</h3>
                          <ul className="flex flex-wrap gap-2">
                            {service.stack.map((tech) => (
                              <li key={tech} className="ltr rounded-full border border-line-strong bg-mist/60 px-3 py-1 font-mono text-xs text-fg-muted">
                                {tech}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                          <span className="text-fg-subtle">{labels.proofLabel}:</span>
                          {service.proof.map((slug) => (
                            <Link key={slug} href={localePath(locale, `/work/${slug}`)} className="font-semibold text-fg underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-600 hover:decoration-brand-500">
                              {projectNames[slug]}
                            </Link>
                          ))}
                        </p>
                      </div>
                      <ButtonLink href={localePath(locale, `/services/${service.slug}`)} variant="secondary" size="sm" className="self-start sm:self-auto">
                        {labels.cta}
                      </ButtonLink>
                    </div>
                  </motion.article>
            </div>
          </div>
        );
      })}
    </div>
  );
}
