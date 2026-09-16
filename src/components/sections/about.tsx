import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { Dictionary } from "@/i18n/get-dictionary";

/** Who we are — the company in two paragraphs and four verbs. */
export function About({ dict }: { dict: Dictionary }) {
  const a = dict.about;
  return (
    <section id="about" aria-labelledby="about-title" className="section-y relative overflow-hidden">
      <div aria-hidden="true" className="absolute end-[-12rem] top-1/3 size-[30rem] glow [--glow:color-mix(in_oklab,var(--color-brand-200)_64%,transparent)]" />
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeader id="about-title" index={a.index} kicker={a.kicker} title={a.title} titleClassName="text-headline" />
          <div className="mt-8 space-y-5">
            {a.body.map((paragraph, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <p className="max-w-2xl text-lead text-fg-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <RevealGroup as="ul" className="grid grid-cols-2 gap-3 self-end lg:col-span-5" stagger={0.1}>
          {a.pillars.map((pillar, i) => (
            <RevealItem
              key={pillar.label}
              as="li"
              className={`ring-gradient group relative overflow-hidden rounded-card bg-white/55 p-5 shadow-[var(--shadow-soft)] transition-transform duration-500 hover:-translate-y-1 sm:p-6 ${i % 2 === 1 ? "lg:translate-y-8 lg:hover:translate-y-7" : ""}`}
            >
              <span aria-hidden="true" className="absolute -end-6 -top-8 font-[family-name:var(--font-archivo)] text-[6rem] leading-none font-black text-navy/[0.04] transition-colors duration-500 group-hover:text-brand-500/15">
                0{i + 1}
              </span>
              <span className="label-mono ltr text-brand-600">0{i + 1}</span>
              <p className="mt-6 font-display text-title font-extrabold text-fg">{pillar.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{pillar.detail}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
