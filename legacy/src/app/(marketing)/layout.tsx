import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { WhatsAppFloating } from "@/components/ui/whatsapp-cta";
import { ui } from "@/content/copy";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";

/**
 * MARKETING LAYOUT
 *
 * Owns the persistent chrome shared by every public page: skip link, floating
 * header, footer, the always-reachable WhatsApp button — and the two pieces of
 * structured data that describe the business itself.
 *
 * Organization and WebSite markup belongs on every public page and nowhere
 * else, which is exactly the set this layout wraps. `lib/seo/schema.ts` has
 * generated both since the first build but nothing ever rendered them; see
 * `components/seo/json-ld.tsx`.
 */
export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={websiteSchema()} />

      <a href="#main" className="sr-only-focusable">
        {ui.skipToContent}
      </a>

      <SiteHeader />

      <main id="main">{children}</main>

      <SiteFooter />

      <WhatsAppFloating />
    </>
  );
}
