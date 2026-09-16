import { ArrowUp, Mail, Phone } from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/components/ui/brand-mark";
import { Logo } from "@/components/ui/logo";
import { socialIcons } from "@/components/ui/social-icons";
import { siteConfig, socialLinks } from "@/config/site";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

import { LanguageSwitcher } from "./language-switcher";

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const f = dict.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-[linear-gradient(180deg,var(--color-mist)_0%,var(--color-mist-2)_100%)]">
      <div aria-hidden="true" className="pointer-events-none absolute -top-48 start-1/2 h-96 w-[60rem] -translate-x-1/2 glow [--glow:color-mix(in_oklab,var(--color-aqua-200)_80%,transparent)] rtl:translate-x-1/2" />

      {/* Giant wordmark */}
      <div aria-hidden="true" className="relative select-none overflow-hidden border-b border-line" dir="ltr">
        <p className="container-x flex items-end gap-[3vw] pt-16 pb-4 sm:pt-24">
          <BrandMark className="mb-[1.5vw] size-[clamp(2.75rem,10vw,9rem)]" />
          <span className="font-[family-name:var(--font-archivo)] text-[clamp(3rem,13vw,11.5rem)] leading-[0.8] font-black tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_rgb(31_40_112/0.22)]">
            Web<span className="text-gradient [-webkit-text-stroke:0]">Craft</span>
          </span>
        </p>
      </div>

      <div className="container-x relative grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo href={localePath(locale, "/")} label="WebCraft" size={56} />
          <p className="mt-6 max-w-sm text-fg-muted">{f.description}</p>
          <p className="mt-6 font-display text-lg font-bold text-fg">{f.motto}</p>
          <LanguageSwitcher locale={locale} label={dict.common.language} variant="segmented" className="mt-8" />
        </div>

        <nav aria-label={f.services} className="md:col-span-2">
          <h2 className="label-mono text-fg-subtle">{f.services}</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={localePath(locale, `/services/${s.slug}`)} className="text-fg-muted transition-colors hover:text-brand-600">
                  {s.text[locale].name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={f.projects} className="md:col-span-2">
          <h2 className="label-mono text-fg-subtle">{f.projects}</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={localePath(locale, `/work/${p.slug}`)} className="text-fg-muted transition-colors hover:text-brand-600">
                  {p.text[locale].name}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link href={localePath(locale, "/about")} className="text-fg-muted transition-colors hover:text-brand-600">
                {dict.nav.about}
              </Link>
            </li>
            <li>
              <Link href={localePath(locale, "/faq")} className="text-fg-muted transition-colors hover:text-brand-600">
                {f.faq}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="label-mono text-fg-subtle">{f.contact}</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a href={`mailto:${siteConfig.contact.email}`} className="group flex items-center gap-3 text-fg-muted transition-colors hover:text-brand-600">
                <span className="grid size-9 place-items-center rounded-full border border-line-strong group-hover:border-brand-300">
                  <Mail className="size-4" aria-hidden="true" />
                </span>
                <bdi>{siteConfig.contact.email}</bdi>
              </a>
            </li>
            <li>
              <a href={`tel:${siteConfig.contact.phone}`} className="group flex items-center gap-3 text-fg-muted transition-colors hover:text-brand-600">
                <span className="grid size-9 place-items-center rounded-full border border-line-strong group-hover:border-brand-300">
                  <Phone className="size-4" aria-hidden="true" />
                </span>
                <bdi>{siteConfig.contact.phoneDisplay}</bdi>
              </a>
            </li>
          </ul>
          <ul className="mt-6 flex flex-wrap gap-2">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.key];
              return (
                <li key={social.key}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} ${dict.common.newTab}`}
                    className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-1.5 text-xs text-fg-muted transition-colors hover:border-brand-300 hover:text-brand-600"
                  >
                    <Icon className="size-3.5" />
                    {social.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="container-x relative flex flex-col items-center justify-between gap-4 border-t border-line py-6 pe-20 text-xs text-fg-subtle sm:flex-row sm:pe-24">
        <p>
          © <bdi>{year}</bdi> WebCraft · {siteConfig.nameAr}. {f.rights}
        </p>
        <a href="#main" className="group inline-flex items-center gap-2 transition-colors hover:text-brand-600">
          {f.backToTop}
          <span className="grid size-8 place-items-center rounded-full border border-line-strong transition-transform group-hover:-translate-y-1">
            <ArrowUp className="size-3.5" aria-hidden="true" />
          </span>
        </a>
      </div>
    </footer>
  );
}
