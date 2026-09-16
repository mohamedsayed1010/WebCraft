/**
 * X / TWITTER CARD
 *
 * Identical to the Open Graph card, and deliberately so: `summary_large_image`
 * wants the same 1200×630 frame, and maintaining a second composition means
 * maintaining a second thing that can drift out of date.
 *
 * It has to exist as its own file rather than being inferred — Next resolves
 * `twitter-image` and `opengraph-image` independently, and without this one
 * the Twitter tags fall back to whatever `twitter.images` says, which is
 * nothing. Re-exporting keeps the two permanently in sync.
 */
export { default, size, contentType, alt } from "./opengraph-image";
