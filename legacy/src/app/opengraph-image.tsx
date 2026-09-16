import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

/**
 * THE SHARE CARD
 *
 * Sitting at the root of `app/`, this generates the Open Graph image for every
 * route that does not declare a more specific one — which today is all of
 * them.
 *
 * ─── WHAT IT REPLACED ────────────────────────────────────────────────────
 * `siteConfig.ogImage` pointed at `/images/og/default.png`, and that file has
 * never existed: `public/images/og/` contains a `.gitkeep` and nothing else.
 * Every OG and Twitter tag on the site therefore advertised a 404, so a link
 * pasted into WhatsApp — which is the primary way this business is shared —
 * rendered as a bare grey rectangle with a URL under it. On a site whose main
 * conversion path *is* WhatsApp, that was the most expensive broken thing in
 * the project and the least visible.
 *
 * `lib/seo/metadata.ts` now omits `images` unless a page passes a real
 * `ogImage`, which is what lets this file be picked up.
 *
 * ─── WHY THE CARD IS LATIN ───────────────────────────────────────────────
 * `ImageResponse` rasterises with the fonts it is given, and its built-in face
 * carries no Arabic. Rendering «ويب كرافت» through it produces either tofu or
 * a line of disconnected, misspelled letterforms — the same cursive-join
 * failure documented in `components/motion/reveal.tsx`, except baked into a
 * PNG that gets cached by every platform that touches it.
 *
 * Loading a real Arabic face would mean a network fetch at build time, and a
 * share card that silently breaks when a CDN is slow is worse than one that is
 * Latin. So the card uses the brand's Latin lockup, which the identity already
 * defines for exactly this purpose — WEBCRAFT over WE DESIGN. WE BUILD. WE
 * GROW. — and the Arabic does its work in the title and description tags
 * beside it, where it renders as text.
 *
 * The composition is the brand hierarchy at poster scale: near-black ground,
 * a violet bloom for depth, one lime rule, and the disc the mark is built on.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#0B0B0B",
          // The violet bloom, top-left, and a much fainter lime one bottom
          // right. Satori supports radial gradients in backgroundImage but not
          // `filter: blur`, which is why the depth has to come from gradient
          // stops — the same constraint, and the same solution, as the `orb-*`
          // utilities in `styles/utilities.css`.
          //
          // The stops are tight on purpose. The first pass ran the violet out
          // to 62% and the lime to 66%, and the two washes met in the middle:
          // the card came back as a purple-to-olive gradient with the brand's
          // near-black ground nowhere in it. The identity is ~70% ink, and a
          // share card is the one surface where that ratio is judged at a
          // glance and at thumbnail size.
          backgroundImage:
            "radial-gradient(circle at 8% 4%, rgba(109,40,255,0.60) 0%, rgba(109,40,255,0.18) 20%, rgba(109,40,255,0.04) 34%, rgba(109,40,255,0) 46%), radial-gradient(circle at 100% 108%, rgba(182,255,0,0.16) 0%, rgba(182,255,0,0.03) 20%, rgba(182,255,0,0) 34%)",
        }}
      >
        {/* ── The mark ─────────────────────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              backgroundColor: "#b6ff00",
              display: "flex",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 6,
              color: "#8a8a8a",
              textTransform: "uppercase",
            }}
          >
            {siteConfig.name}
          </div>
        </div>

        {/* ── The lockup ───────────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 148,
              fontWeight: 800,
              letterSpacing: -6,
              color: "#ffffff",
              lineHeight: 1,
            }}
          >
            WEBCRAFT
          </div>

          <div
            style={{
              display: "flex",
              width: 240,
              height: 5,
              marginTop: 36,
              backgroundColor: "#b6ff00",
            }}
          />

          <div
            style={{
              display: "flex",
              marginTop: 36,
              fontSize: 40,
              letterSpacing: 2,
              color: "#d9d9d9",
            }}
          >
            {siteConfig.tagline}
          </div>
        </div>

        {/* ── The footer rail ──────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: 28,
            fontSize: 26,
            color: "#8a8a8a",
          }}
        >
          <div style={{ display: "flex" }}>
            WEB DESIGN · DEVELOPMENT · DIGITAL PRODUCTS
          </div>
          <div style={{ display: "flex", color: "#b6ff00" }}>
            {siteConfig.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
