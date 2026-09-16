import type { Metadata } from "next";

import { Contact } from "@/components/sections/contact/contact";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

/**
 * CONTACT — /contact
 *
 * A canonical URL for the ask, so the footer link, the service pages and
 * anything shared in a message resolve to a real page rather than to a
 * fragment on a very long homepage.
 *
 * It renders the same `<Contact />` section the homepage ends on, deliberately
 * and with no variant: a visitor arriving here from a service page should meet
 * the identical block they would have scrolled to, and a second contact
 * design would be a second place to keep the WhatsApp copy correct.
 *
 * The section carries `id="contact"`, which also makes `/#contact` — the
 * fallback every WhatsApp affordance uses when no number is configured — land
 * correctly if it is ever reached from here.
 */
export const metadata: Metadata = buildMetadata({
  title: "كلّمنا — ابدأ مشروعك",
  description:
    "ابعتلنا على الواتساب أو املا النموذج، وهنرد عليك في نفس يوم الشغل بخطوة واضحة — من غير أي التزام ومن غير مكالمات مبيعات.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "الرئيسية", path: "/" },
          { name: "كلّمنا", path: "/contact" },
        ])}
      />

      {/* Clears the fixed header — the section's own top padding assumes a
          section above it, and on a standalone route there is none. */}
      <div className="pt-20 md:pt-24">
        <Contact />
      </div>
    </>
  );
}
