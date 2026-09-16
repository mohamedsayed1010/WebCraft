import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

/**
 * Share card for every route: the folded-W mark on the brand's azure ground.
 * Latin type only — `ImageResponse` ships no Arabic face, and disconnected
 * Arabic letterforms baked into a cached PNG would be worse than English. The
 * Arabic title/description tags carry the language.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "WebCraft — We Design. We Build. We Launch. We Grow.";

export default async function OpengraphImage() {
  const mark = await readFile(path.join(process.cwd(), "public/brand/webcraft-mark.svg"), "utf8");
  const markSrc = `data:image/svg+xml;base64,${Buffer.from(mark).toString("base64")}`;

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
          backgroundColor: "#EAF0FF",
          backgroundImage:
            "radial-gradient(circle at 92% 0%, rgba(76,124,255,0.45) 0%, rgba(76,124,255,0) 45%), radial-gradient(circle at 0% 100%, rgba(52,211,192,0.4) 0%, rgba(52,211,192,0) 45%)",
          color: "#0E1430",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              display: "flex",
              width: 124,
              height: 124,
              borderRadius: 30,
              backgroundColor: "#FFFFFF",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 20px 50px rgba(31,40,112,0.25)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={markSrc} width={84} height={84} alt="" />
          </div>
          <div style={{ display: "flex", fontSize: 28, letterSpacing: 7, color: "#454D6D" }}>SOFTWARE & DIGITAL PRODUCTS</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 132, fontWeight: 800, letterSpacing: -5, lineHeight: 1 }}>
            Web<span style={{ color: "#3F57E6" }}>Craft</span>
          </div>
          <div
            style={{
              display: "flex",
              width: 240,
              height: 10,
              marginTop: 34,
              borderRadius: 10,
              backgroundImage: "linear-gradient(90deg, #34D3C0, #4C7CFF)",
            }}
          />
          <div style={{ display: "flex", marginTop: 34, fontSize: 44, color: "#1F2870" }}>
            We Design. We Build. We Launch. We Grow.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(31,40,112,0.18)",
            paddingTop: 26,
            fontSize: 26,
            color: "#454D6D",
          }}
        >
          <div style={{ display: "flex" }}>UI/UX · Frontend · Backend · SEO · Web Apps · Android</div>
          <div style={{ display: "flex", color: "#3F57E6" }}>AR / EN</div>
        </div>
      </div>
    ),
    size,
  );
}
