import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo";
import { footerNav, socialLinks } from "@/config/navigation";
import { hasWhatsApp, siteConfig } from "@/config/site";
import { WhatsAppLink } from "@/components/ui/whatsapp-cta";

/**
 * SITE FOOTER
 *
 * Deliberately richer than the header. The header is a funnel and every extra
 * link measurably dilutes the one that matters; the footer is where the
 * service pages get their internal links, which is what makes them rank.
 *
 * A server component — nothing here needs state, so it costs no client JS.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const { contact } = siteConfig;

  return (
    <footer className="noise border-border relative overflow-hidden border-t">
      <div
        aria-hidden="true"
        className="orb-violet pointer-events-none absolute -bottom-72 start-1/3 size-[42rem] rounded-full opacity-60"
      />

      <div className="container-page relative z-10 pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)]">
          {/* ── Brand block ────────────────────────────────────────────── */}
          <div>
            <Logo size={52} withWordmark asLink={false} />

            <p
              dir="ltr"
              className="latin-display text-fg-subtle mt-6 text-sm font-bold"
            >
              {siteConfig.tagline}
            </p>

            <p className="text-fg-muted leading-body mt-4 max-w-[38ch] text-sm">
              {siteConfig.shortDescription}
            </p>

            {/* Contact facts. Each renders only when configured — a footer
                link to an empty tel: or wa.me/ reads as a broken site. */}
            <ul className="mt-8 flex flex-col gap-3 text-sm">
              {hasWhatsApp ? (
                <li>
                  <WhatsAppLink
                    context="من الفوتر"
                    className="text-fg-muted hover:text-accent duration-fast inline-flex items-center gap-2.5 transition-colors"
                  >
                    <Icon name="WhatsApp" className="size-4" />
                    <span dir="ltr">{contact.whatsappDisplay}</span>
                  </WhatsAppLink>
                </li>
              ) : null}

              {contact.email ? (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-fg-muted hover:text-accent duration-fast inline-flex items-center gap-2.5 transition-colors"
                  >
                    <Icon name="Mail" className="size-4" />
                    <span dir="ltr">{contact.email}</span>
                  </a>
                </li>
              ) : null}

              <li className="text-fg-subtle inline-flex items-center gap-2.5">
                <Icon name="MapPin" className="size-4" />
                {contact.location.city}، {contact.location.countryAr}
              </li>
            </ul>

            {socialLinks.length > 0 ? (
              <ul className="mt-8 flex items-center gap-2">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="border-border text-fg-muted hover:border-accent/50 hover:text-accent duration-fast grid size-10 place-items-center rounded-full border transition-colors"
                    >
                      <Icon name={social.icon} className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* ── Link columns ───────────────────────────────────────────── */}
          {/* Two columns, not three. The «قانوني» column linked to
              /legal/privacy, /legal/terms and /legal/cookies — three routes
              that do not exist, so every one of them was a 404 shipped in the
              footer of every page. Restore the column when the pages do. */}
          <nav aria-label="روابط الفوتر">
            <div className="grid gap-10 sm:grid-cols-2">
              {footerNav.map((column) => (
                <div key={column.title}>
                  <h2 className="eyebrow text-fg">{column.title}</h2>

                  <ul className="mt-5 flex flex-col gap-3">
                    {column.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="link-underline text-fg-muted hover:text-fg duration-fast inline-block text-sm transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        {/* ── Oversized wordmark ───────────────────────────────────────
            The sign-off. Clipped by the container so it reads as a printed
            edge rather than a floating logo. */}
        <div
          aria-hidden="true"
          className="pointer-events-none mt-20 overflow-hidden"
        >
          {/* 12.4vw is measured, not guessed: Archivo Black runs ~0.84em per
              character, so eight characters need ~6.7em — at 17vw the lockup
              was half a viewport wider than the container and lost its last
              letter to the clip. */}
          <span
            dir="ltr"
            className="latin-display block bg-gradient-to-b from-white/[0.09] to-transparent bg-clip-text text-center text-[clamp(2.75rem,12.4vw,10.5rem)] font-black whitespace-nowrap text-transparent"
          >
            WEBCRAFT
          </span>
        </div>

        <div className="border-border mt-6 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center sm:flex-row sm:text-start">
          {/* The «© 2026» pair is Latin/numeric inside an RTL paragraph. Without
              its own isolate the bidi algorithm reorders the symbol and the
              digits against the Arabic that follows, and the year renders
              mangled. */}
          <p className="text-fg-subtle text-xs">
            <span dir="ltr" className="inline-block">
              © {year}
            </span>{" "}
            {siteConfig.nameAr}. كل الحقوق محفوظة.
          </p>

          <p className="text-fg-subtle text-xs">
            اتعمل في {contact.location.countryAr} بشغل، مش بقالب جاهز.
          </p>
        </div>
      </div>
    </footer>
  );
}
