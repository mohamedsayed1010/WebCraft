import { Blocks, Boxes, Code, Globe, MonitorSmartphone, Smartphone } from "lucide-react";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { displayUrl, projects } from "@/content/projects";
import type { Dictionary } from "@/i18n/get-dictionary";

const icons = [Globe, Code, MonitorSmartphone, Blocks, Boxes, Smartphone];

/**
 * Credibility before claims — capabilities stated plainly, followed by a
 * marquee of real, clickable production domains. No numbers anywhere.
 */
export function ProofStrip({ dict }: { dict: Dictionary }) {
  const p = dict.proof;
  const domains = projects.map((project) => ({ url: project.liveUrl, label: displayUrl(project.liveUrl) }));

  return (
    <section id="proof" aria-labelledby="proof-title" className="relative border-y border-line bg-[linear-gradient(90deg,var(--color-tide)_0%,var(--color-mist)_100%)]">
      <div className="container-x py-14 sm:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          <h2 id="proof-title" className="shrink-0 font-display text-title font-extrabold text-fg lg:max-w-[14rem]">
            <span className="text-gradient">{p.title}</span>
          </h2>
          <RevealGroup as="ul" className="grid flex-1 grid-cols-1 gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {p.items.map((item, i) => {
              const Icon = icons[i] ?? Globe;
              return (
                <RevealItem key={item.title} as="li" className="group flex gap-4 bg-white/55 p-5 transition-colors duration-500 hover:bg-white/85">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line-strong text-brand-600 transition-all duration-500 group-hover:rotate-[-8deg] group-hover:border-brand-300 group-hover:bg-brand-600 group-hover:text-white">
                    <Icon className="size-[1.15rem]" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold text-fg">{item.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-fg-muted">{item.detail}</span>
                  </span>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>

      {/* Live domains marquee */}
      <div data-loop className="mask-fade-x group relative overflow-hidden border-t border-line py-5" dir="ltr">
        <ul className="flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused] [--marquee-dir:1] [--marquee-duration:38s]">
          {[...domains, ...domains, ...domains, ...domains].map((d, i) => (
            <li key={`${d.label}-${i}`} aria-hidden={i >= domains.length ? true : undefined}>
              <a
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={i >= domains.length ? -1 : undefined}
                className="flex items-center gap-3 font-mono text-sm whitespace-nowrap text-fg-subtle transition-colors hover:text-brand-600"
              >
                <span className="size-1.5 rounded-full bg-success shadow-[0_0_10px_2px_rgb(74_222_128/0.5)]" />
                {d.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
