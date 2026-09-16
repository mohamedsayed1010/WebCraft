import {
  Archivo,
  IBM_Plex_Sans_Arabic,
  Inter,
  JetBrains_Mono,
  Noto_Kufi_Arabic,
} from "next/font/google";

/**
 * WEBCRAFT — TYPE SYSTEM
 *
 * Five self-hosted faces, each with one job. The active pair is chosen per
 * language in `styles/base.css` (`:lang(ar)` / `:lang(en)`), so components only
 * ever say `font-display` or `font-sans` and the right script shows up.
 *
 *   Noto Kufi Arabic     Arabic display — flat, angular kufi construction that
 *                        sits with the folded-W mark: geometric, even strokes.
 *   IBM Plex Sans Arabic Arabic body — open counters at 15–17px.
 *   Archivo              Latin display — heavy grotesk with a width axis for
 *                        poster-like headlines.
 *   Inter                Latin body.
 *   JetBrains Mono       Labels, indices and the code-flavoured UI details.
 *
 * Browsers only download a face when a glyph on the page needs it, so the
 * English page never pays for Kufi and vice versa.
 *
 * PERFORMANCE — `preload` is off for every face. With it on, next/font put a
 * <link rel=preload> for all 13 files (513 kB) into every page, so Arabic
 * pages preloaded Latin faces and vice versa, and on slow connections those
 * downloads competed with the page's own JavaScript. `display: swap` plus the
 * metric-matched fallback next/font generates keeps text visible and layout
 * stable while the faces a page actually uses arrive. Unused weights (Plex 500,
 * JetBrains 500) were dropped.
 */

export const fontKufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-kufi",
  display: "swap",
  preload: false,
});

export const fontPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  variable: "--font-plex-ar",
  display: "swap",
  preload: false,
  weight: ["400", "600", "700"],
});

export const fontArchivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  preload: false,
  axes: ["wdth"],
});

export const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
  weight: ["400", "700"],
});

export const fontVariables = [
  fontKufi.variable,
  fontPlexArabic.variable,
  fontArchivo.variable,
  fontInter.variable,
  fontMono.variable,
].join(" ");
