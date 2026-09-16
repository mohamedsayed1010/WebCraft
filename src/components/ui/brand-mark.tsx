import { useId } from "react";

import { cn } from "@/lib/utils";

/**
 * THE WEBCRAFT MARK — the folded W.
 *
 * Four ribbon strips folded into a W: the craft is in the fold, the layers are
 * the digital product, and the spark lifting off the last stroke is the launch.
 * Source of truth: `public/brand/webcraft-mark.svg` — keep the two in sync.
 *
 * Inline (not <img>) so it's crisp at every size with zero requests, and the
 * gradient ids are per-instance so multiple marks on one page never collide.
 *
 *   tone="color"  gradient ribbons (default, light & dark grounds)
 *   tone="white"  monochrome for coloured tiles
 */
export function BrandMark({
  className,
  tone = "color",
  title,
}: {
  className?: string;
  tone?: "color" | "white";
  title?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const front = `wcf-${uid}`;
  const back = `wcb-${uid}`;
  const mono = tone === "white";

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {mono ? null : (
        <defs>
          <linearGradient id={front} x1="8" y1="16" x2="44" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#34D3C0" />
            <stop offset="1" stopColor="#4C7CFF" />
          </linearGradient>
          <linearGradient id={back} x1="18" y1="56" x2="56" y2="16" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3B47D6" />
            <stop offset="1" stopColor="#6A7BFF" />
          </linearGradient>
        </defs>
      )}
      <path fill={mono ? "rgb(255 255 255 / 0.62)" : `url(#${back})`} d="M15 54h9l10.5-28h-9z" />
      <path fill={mono ? "rgb(255 255 255 / 0.62)" : `url(#${back})`} d="M36 54h9l11-36h-9z" />
      <path fill={mono ? "#fff" : `url(#${front})`} d="M4 18h9l11 36h-9z" />
      <path fill={mono ? "#fff" : `url(#${front})`} d="M25.5 26h9L45 54h-9z" />
      <path fill={mono ? "#fff" : "#34D3C0"} d="M56.5 6.5l3.5 3.5-3.5 3.5L53 10z" />
    </svg>
  );
}
