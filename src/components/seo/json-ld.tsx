/**
 * JSON-LD
 *
 * The one sanctioned way to put structured data on a page.
 *
 * `src/lib/seo/schema.ts` has generated Organization, WebSite, Service,
 * FAQPage, Person and BreadcrumbList markup since the first build and its own
 * header says it is "emitted through `<JsonLd />`" — but the component was
 * never written, so none of it ever reached the HTML. This is that component.
 *
 * `dangerouslySetInnerHTML` is unavoidable for a `<script type="application/
 * ld+json">`: React escapes text children, which would emit `&quot;` inside
 * the JSON and make it unparseable. The input is not user data — it is built
 * from the content layer at render time — and `<` is escaped anyway so a
 * string in the content can never close the script tag.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
