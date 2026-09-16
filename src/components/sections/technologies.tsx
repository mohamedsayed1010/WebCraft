import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Spotlight } from "@/components/motion/spotlight";
import { SectionHeader } from "@/components/ui/section-header";
import { projects } from "@/content/projects";
import { technologies, type TechGroup } from "@/content/technologies";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

const groups: TechGroup[] = ["frontend", "backend", "platform"];

export function Technologies({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.tech;
  const name = (slug: string) =>
    slug === "webcraft-site" ? (locale === "ar" ? "موقع ويب كرافت" : "This website") : projects.find((p) => p.slug === slug)?.text[locale].name ?? slug;

  return (
    <section id="technology" aria-labelledby="tech-title" className="section-y relative">
      <div className="container-x">
        <SectionHeader id="tech-title" index={t.index} kicker={t.kicker} title={t.title} lead={t.lead} />

        <div className="mt-16 grid gap-10 lg:grid-cols-3 lg:gap-6">
          {groups.map((group) => (
            <div key={group}>
              <h3 className="label-mono flex items-center gap-3 text-fg-subtle">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-600" />
                {t.groups[group]}
              </h3>
              <RevealGroup as="ul" className="mt-5 grid grid-cols-2 gap-3" stagger={0.05}>
                {technologies
                  .filter((tech) => tech.group === group)
                  .map((tech) => (
                    <RevealItem key={tech.name} as="li">
                      <Spotlight className="group h-full overflow-hidden rounded-card border border-white/80 bg-white/55 p-4 shadow-[var(--shadow-soft)] transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-line-strong">
                        <span
                          aria-hidden="true"
                          className="ltr inline-grid h-11 min-w-11 place-items-center rounded-xl border border-line-strong bg-gradient-to-br from-mist to-surface px-2 font-mono text-sm font-bold text-brand-600 transition-all duration-500 group-hover:border-brand-500 group-hover:bg-brand-600 group-hover:from-aqua-400 group-hover:to-brand-500 group-hover:text-white"
                        >
                          {tech.mark}
                        </span>
                        <p className="mt-4 font-semibold text-fg"><bdi>{tech.name}</bdi></p>
                        {tech.usedIn.length > 0 ? (
                          <p className="mt-1 text-xs leading-relaxed text-fg-subtle">
                            {t.usedIn}: {tech.usedIn.slice(0, 2).map(name).join(locale === "ar" ? "، " : ", ")}
                            {tech.usedIn.length > 2 ? ` +${tech.usedIn.length - 2}` : ""}
                          </p>
                        ) : null}
                      </Spotlight>
                    </RevealItem>
                  ))}
              </RevealGroup>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
