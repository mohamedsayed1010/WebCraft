import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stamp } from "@/components/ui/stamp";
import { WhatsAppLink } from "@/components/ui/whatsapp-cta";
import { buttonVariants } from "@/components/ui/button";
import { sectionCopy, ui } from "@/content/copy";
import {
  founder,
  founderName,
  founderPhotoAlt,
  hasFounderPhoto,
  publishedCredentials,
} from "@/content/founder";
import { cn } from "@/lib/utils";

/**
 * ABOUT / FOUNDER — 05
 *
 * A paper-inverted block. The inversion is doing real work: after four dark
 * sections of claims, switching to white puts the one human page on the site
 * in a different register, and the eye reads the change as "this part is
 * personal" before a single word is parsed.
 *
 * `.paper` re-points the semantic colour tokens, so every child below adapts
 * with zero conditional classes — including the accent, which becomes violet
 * because lime on white measures 1.2:1 and is illegible.
 *
 * ─── SHORT ON PURPOSE ────────────────────────────────────────────────────
 * The full three-paragraph story is good writing and it is still in the
 * project — it renders on `/about`. It does not render here. This block sits
 * one screen from the ask, and at that point in a conversion page a founder's
 * essay is not read, it is scrolled past, taking the FAQ and the contact
 * section with it.
 *
 * Two sentences answer the only two questions being asked here: why does this
 * company exist, and does the person behind it think clearly. «اعرف أكتر»
 * carries anyone who wants the rest. See `shortStory` in `content/founder.ts`.
 * ─────────────────────────────────────────────────────────────────────────
 */
export function Founder() {
  return (
    <section id="about" className="paper noise section-y relative">
      <div className="container-page relative z-10">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
          {/* ── Portrait ─────────────────────────────────────────────────
              Falls back to a monogram plate rather than a grey silhouette or a
              stock headshot. An obviously-deliberate placeholder reads as
              "photo pending"; a stock face reads as a lie.

              ⚠️  The real photo goes at `public/images/founder/portrait.webp`
              and `hasFounderPhoto` in `content/founder.ts` flips to true. It
              is the single highest-value asset still missing from this page —
              a face is the cheapest trust signal there is. */}
          <Reveal preset="scale">
            <figure className="relative">
              <div className="bg-ink-900 relative aspect-[4/5] w-full overflow-hidden rounded-lg">
                {hasFounderPhoto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={founder.photo.src}
                    alt={founderPhotoAlt}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="grid size-full place-items-center">
                    <div
                      aria-hidden="true"
                      className="orb-violet absolute inset-0 opacity-70"
                    />
                    <span
                      dir="ltr"
                      className="latin-display relative text-7xl font-black text-white/90"
                    >
                      WC
                    </span>
                  </div>
                )}
              </div>

              <Stamp
                size={104}
                reverse
                className="bg-ink-900 shadow-lift absolute -bottom-8 -start-6 rounded-full"
              />
            </figure>
          </Reveal>

          {/* ── The person ─────────────────────────────────────────────── */}
          <div>
            <SectionHeading {...sectionCopy.about} />

            <Reveal preset="rise" delay={0.1}>
              <div className="mt-10">
                <p className="font-display text-2xl font-bold">{founderName}</p>
                <p className="text-fg-subtle mt-1 text-sm">{founder.role}</p>
              </div>
            </Reveal>

            <Reveal preset="rise" delay={0.18}>
              <div className="mt-8 flex flex-col gap-4">
                {founder.shortStory.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className="text-fg-muted leading-body max-w-[54ch] text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            {/* Only credentials with a real value render — an empty stat is
                worse than a shorter list. */}
            {publishedCredentials.length > 0 ? (
              <Reveal preset="rise" delay={0.26}>
                <dl className="border-border mt-10 grid grid-cols-2 gap-6 border-t pt-8 sm:grid-cols-3">
                  {publishedCredentials.map((credential) => (
                    <div key={credential.label}>
                      <dt className="text-fg-subtle text-xs">
                        {credential.label}
                      </dt>
                      <dd className="font-display mt-1.5 text-lg font-bold">
                        {credential.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ) : null}

            <Reveal preset="rise" delay={0.32}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  href="/about"
                  className={cn(
                    buttonVariants({ variant: "violet", size: "lg" }),
                    "group/cta",
                  )}
                >
                  {ui.aboutMore}
                  <Icon
                    name="ArrowLeft"
                    className="duration-fast ease-brand size-4 transition-transform group-hover/cta:-translate-x-1"
                  />
                </Link>

                <WhatsAppLink
                  context="كلام مباشر مع المؤسس"
                  label={ui.whatsappCta}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    // The outline variant is tuned for dark; on paper its
                    // white ring vanishes, so the ink ring is set here.
                    "text-fg ring-ink-900/20 hover:bg-ink-900/[0.04] hover:ring-ink-900/40",
                  )}
                >
                  <Icon name="WhatsApp" className="size-4" />
                  كلّمني على طول
                </WhatsAppLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
