/**
 * BRAND ASSETS
 *
 *   node scripts/prep-brand.mjs
 *
 * Everything raster is generated from the single source mark,
 * `public/brand/webcraft-mark.svg`:
 *   src/app/icon.svg          favicon (vector, used by modern browsers)
 *   src/app/apple-icon.png    180×180 home-screen icon (white tile)
 *   public/brand/webcraft-logo-512.png  structured-data logo / OG embed
 */
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";

const svg = await readFile("public/brand/webcraft-mark.svg", "utf8");
await writeFile("src/app/icon.svg", svg.replace("<title>WebCraft</title>\n", ""));

async function tile(size, padRatio, out) {
  const inner = Math.round(size * (1 - padRatio * 2));
  const mark = await sharp(Buffer.from(svg), { density: 1600 }).resize(inner, inner).png().toBuffer();
  const r = Math.round(size * 0.22);
  const bg = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#FFFFFF"/><stop offset="1" stop-color="#EEF1F8"/></linearGradient></defs><rect width="${size}" height="${size}" rx="${r}" fill="url(#g)"/></svg>`,
  );
  const off = Math.round((size - inner) / 2);
  await sharp(bg).composite([{ input: mark, left: off, top: off }]).png({ compressionLevel: 9 }).toFile(out);
}

await tile(180, 0.16, "src/app/apple-icon.png");
await tile(512, 0.16, "public/brand/webcraft-logo-512.png");
console.log("brand assets written");
