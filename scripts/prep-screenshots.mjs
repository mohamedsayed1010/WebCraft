import sharp from "sharp";
import { mkdir } from "node:fs/promises";

// Raw captures live outside `public/` so they are never served — two of them
// contain real end-user personal data. Only the cropped WebP output is public.
const SRC = "design/raw-screenshots";
const OUT = "public/images/work";
const CHROME = 101;        // browser tab strip + URL bar height, measured
const RIGHT = 1901;        // drops the 19px scrollbar gutter present on some shots
const OUT_W = 1600;

const jobs = [
  // ── Bay3 ────────────────────────────────────────────────────────────────
  ["EcomarcePage.png",      "bay3/storefront",       CHROME],
  ["Products.png",          "bay3/catalog",          CHROME],
  ["productsdetails.png",   "bay3/product",          CHROME],
  ["AdminEcomarce.png",     "bay3/admin-dashboard",  CHROME],
  ["AdminMangeProducts.png","bay3/admin-products",   CHROME],
  ["reviewsEcomarce.png",   "bay3/admin-reviews",    CHROME],
  ["SalesCatgorey.png",     "bay3/admin-analytics",  CHROME],
  // ── حاجتي ضاعت ──────────────────────────────────────────────────────────
  ["HomePage.png",          "hajaty-day3a/home",     CHROME],
  // ── الخبر الجديد ────────────────────────────────────────────────────────
  // 156, not 101: the browser's translate bubble overhangs the page by ~55px
  // on this capture and would read as part of the site's own UI.
  ["News.png",              "alkhabar-aljadid/home", 170],
  ["news2.png",             "alkhabar-aljadid/sections", CHROME],
  ["news3.png",             "alkhabar-aljadid/regional", CHROME],
];

const manifest = {};

for (const [file, out, top] of jobs) {
  const src = sharp(`${SRC}/${file}`);
  const { height } = await src.metadata();
  const region = { left: 0, top, width: RIGHT, height: height - top };

  const pipeline = sharp(`${SRC}/${file}`).extract(region).resize({ width: OUT_W });
  const info = await pipeline.clone().webp({ quality: 86, effort: 6 }).toFile(`${OUT}/${out}.webp`);

  const blur = await sharp(`${SRC}/${file}`)
    .extract(region)
    .resize({ width: 14 })
    .webp({ quality: 40 })
    .toBuffer();

  manifest[out] = {
    src: `/images/work/${out}.webp`,
    width: info.width,
    height: info.height,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
    bytes: info.size,
  };
  console.log(out, info.width + "x" + info.height, (info.size / 1024).toFixed(0) + "kB", "blur:" + blur.length + "b");
}

await mkdir("docs", { recursive: true });
console.log("
" + JSON.stringify(manifest, null, 2));
