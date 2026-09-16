import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ButtonLink, TextLink } from "@/components/ui/button";
import { BrowserFrame } from "@/components/ui/device-frames";
import { SectionHeader } from "@/components/ui/section-header";
import { ProjectMedia } from "@/components/work/project-media";
import { featuredProjects, moreProjects } from "@/content/projects";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn, displayUrl } from "@/lib/utils";
import type { Project } from "@/types";

export function StatusBadge({ project, dict }: { project: Project; dict: Dictionary }) {
  const live = project.status === "live";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-semibold",
        live ? "border-success/30 bg-success/10 text-success" : "border-aqua-200 bg-brand-200/40 text-aqua-700",
      )}
    >
      <span className={cn("size-1.5 rounded-full", live ? "animate-pulse bg-success" : "bg-aqua-400")} />
      {live ? dict.common.live : dict.common.demo}
    </span>
  );
}

export function Work({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const w = dict.work;
  const total = String(featuredProjects.length).padStart(2, "0");

  return (
    <section id="work" aria-labelledby="work-title" className="section-y relative">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader id="work-title" index={w.index} kicker={w.kicker} title={w.title} lead={w.lead} />
          <TextLink href={localePath(locale, "/work")} className="shrink-0">
            {dict.common.allWork}
          </TextLink>
        </div>

        <ol className="mt-16 space-y-24 sm:mt-24 lg:space-y-36">
          {featuredProjects.map((project, i) => {
            const text = project.text[locale];
            const caseHref = localePath(locale, `/work/${project.slug}`);
            const flip = i % 2 === 1;
            return (
              <li key={project.slug}>
                <article aria-labelledby={`p-${project.slug}`} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                  <div className={cn("lg:col-span-7", flip && "lg:order-2")}>
                    <ProjectMedia project={project} locale={locale} href={caseHref} viewLabel={w.cursorView} priority={i === 0} />
                  </div>

                  <div className={cn("relative lg:col-span-5", flip && "lg:order-1")}>
                    <span aria-hidden="true" className="ltr pointer-events-none absolute -top-16 end-0 font-[family-name:var(--font-archivo)] text-[9rem] leading-none font-black text-navy/[0.04] select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Reveal preset="fade">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="label-mono ltr text-fg-subtle">
                          <span className="text-brand-600">{String(i + 1).padStart(2, "0")}</span> / {total}
                        </span>
                        <StatusBadge project={project} dict={dict} />
                      </div>
                    </Reveal>
                    <Reveal delay={0.05}>
                      <p className="mt-5 text-sm font-semibold text-aqua-700">{text.category}</p>
                      <h3 id={`p-${project.slug}`} className="mt-2 text-display font-extrabold text-fg">
                        {text.name}
                      </h3>
                    </Reveal>
                    <Reveal delay={0.1}>
                      <p className="mt-5 text-lead text-fg-muted">{text.summary}</p>
                    </Reveal>

                    <RevealGroup as="ul" className="mt-7 space-y-3 border-t border-line pt-6" stagger={0.07} delay={0.15}>
                      {text.features.slice(0, 3).map((f) => (
                        <RevealItem key={f.title} as="li" className="flex gap-3">
                          <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-brand-600" />
                          <span>
                            <span className="font-semibold text-fg">{f.title}</span>
                            <span className="text-fg-muted"> — {f.detail}</span>
                          </span>
                        </RevealItem>
                      ))}
                    </RevealGroup>

                    <Reveal delay={0.2}>
                      <ul className="mt-6 flex flex-wrap gap-2" aria-label={dict.common.tech}>
                        {project.stack.map((tech) => (
                          <li key={tech} className="ltr rounded-full border border-line-strong px-2.5 py-1 font-mono text-[0.7rem] text-fg-muted">
                            {tech}
                          </li>
                        ))}
                      </ul>
                      {text.note ? <p className="mt-4 text-xs text-fg-subtle">{text.note}</p> : null}
                      <div className="mt-8 flex flex-wrap items-center gap-4">
                        <ButtonLink href={project.liveUrl} external newTabLabel={dict.common.newTab} magnetic>
                          {dict.common.viewLive}
                        </ButtonLink>
                        <TextLink href={caseHref}>{dict.common.caseStudy}</TextLink>
                      </div>
                    </Reveal>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>

        {/* More work */}
        <div className="mt-28 border-t border-line pt-14">
          <Reveal>
            <h3 className="font-display text-title font-bold text-fg">{w.moreTitle}</h3>
          </Reveal>
          <RevealGroup as="ul" className="mt-8 grid gap-6 md:grid-cols-2" stagger={0.1}>
            {moreProjects.map((project) => {
              const text = project.text[locale];
              const shot = project.desktop[0];
              return (
                <RevealItem key={project.slug} as="li" className="group relative overflow-hidden rounded-panel border border-white/80 bg-white/55 p-4 shadow-[var(--shadow-soft)] transition-colors duration-500 hover:border-line-strong sm:p-5">
                  {shot ? (
                    <div className="overflow-hidden rounded-[0.9rem]">
                      <BrowserFrame
                        shot={shot.key}
                        alt={shot.label[locale]}
                        url={displayUrl(project.liveUrl)}
                        aspect="16/9"
                        sizes="(min-width: 768px) 40vw, 90vw"
                        imageClassName="transition-transform duration-[1.4s] ease-[var(--ease-brand)] group-hover:scale-105"
                      />
                    </div>
                  ) : null}
                  <div className="mt-5 flex flex-wrap items-start justify-between gap-4 px-1">
                    <div>
                      <p className="text-xs font-semibold text-aqua-700">{text.category}</p>
                      <h4 className="mt-1 font-display text-title font-bold text-fg">
                        <a href={localePath(locale, `/work/${project.slug}`)} className="after:absolute after:inset-0">
                          {text.name}
                        </a>
                      </h4>
                      <p className="mt-2 max-w-md text-sm text-fg-muted">{text.summary}</p>
                    </div>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 text-xs font-semibold text-fg transition-colors hover:border-brand-500 hover:text-brand-600"
                    >
                      {dict.common.viewLive} ↗<span className="sr-only">{dict.common.newTab}</span>
                    </a>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
