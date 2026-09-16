import { Mail, Phone } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { socialIcons } from "@/components/ui/social-icons";
import { siteConfig, socialLinks } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

export function Contact({ dict, as = "h2" }: { locale: Locale; dict: Dictionary; as?: "h1" | "h2" }) {
  const c = dict.contact;

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y relative overflow-hidden bg-[linear-gradient(180deg,var(--color-canvas)_0%,var(--color-mist)_100%)]">
      <div aria-hidden="true" className="absolute end-[-10rem] bottom-0 size-[36rem] glow [--glow:color-mix(in_oklab,var(--color-brand-300)_40%,transparent)]" />
      <div className="container-x relative grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeader as={as} id="contact-title" index={c.index} kicker={c.kicker} title={c.title} lead={c.lead} />
          <Reveal delay={0.15}>
            <div className="mt-10">
              <ButtonLink href={siteConfig.contact.whatsapp} external size="lg" newTabLabel={dict.common.newTab}>
                {dict.common.whatsapp}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:self-end">
          <Reveal delay={0.2}>
            <div>
              <p className="label-mono text-fg-subtle">{c.channelsTitle}</p>
              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="group flex items-center gap-4 rounded-2xl border border-white/80 bg-white/55 p-4 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-0.5 hover:border-brand-300"
                  >
                    <span className="grid size-11 place-items-center rounded-xl bg-mist text-brand-600 transition-colors duration-500 group-hover:bg-brand-600 group-hover:text-white">
                      <Mail aria-hidden="true" className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-fg-subtle">{dict.common.email}</span>
                      <bdi className="block truncate font-semibold text-fg">{siteConfig.contact.email}</bdi>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="group flex items-center gap-4 rounded-2xl border border-white/80 bg-white/55 p-4 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-0.5 hover:border-brand-300"
                  >
                    <span className="grid size-11 place-items-center rounded-xl bg-mist text-brand-600 transition-colors duration-500 group-hover:bg-brand-600 group-hover:text-white">
                      <Phone aria-hidden="true" className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-fg-subtle">{dict.common.call}</span>
                      <bdi className="block truncate font-semibold text-fg">{siteConfig.contact.phoneDisplay}</bdi>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-10">
              <p className="label-mono text-fg-subtle">{c.socialTitle}</p>
              <ul className="mt-5 flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const Icon = socialIcons[social.key];
                  return (
                    <li key={social.key}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${social.label} ${dict.common.newTab}`}
                        className="group inline-flex min-h-11 items-center gap-2.5 rounded-full border border-white/80 bg-white/55 px-4 text-sm font-semibold text-fg shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700"
                      >
                        <Icon className="size-4 text-brand-600 transition-colors duration-500 group-hover:text-brand-700" />
                        {social.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
