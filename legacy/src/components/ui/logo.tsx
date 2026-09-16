import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * WEBCRAFT — LOGO
 *
 * The supplied mark is a square PNG: a neon-lime disc on a near-black field,
 * with a soft lime bloom around it. Two consequences drive this component.
 *
 * 1. THE DISC IS CROPPED, NOT PLACED.
 *    The artwork's dark field is not transparent, so dropping the square onto
 *    a section that is not exactly `--color-ink-900` would show a visible
 *    rectangle. Instead the image sits inside a `rounded-full overflow-hidden`
 *    container and is scaled up ~1.2× so the lime disc fills the circle
 *    completely and every dark pixel is clipped away. The result reads as a
 *    true circular badge on any background — including the white `.paper`
 *    inversion blocks, where a square would be glaring.
 *
 * 2. THE BLOOM IS RECREATED IN CSS.
 *    Cropping to the disc necessarily discards the artwork's glow. It comes
 *    back as a `box-shadow` on the container, which is better anyway: it scales
 *    with the element, respects hover, and costs no pixels.
 *
 * `priority` is set on the header instance because the mark is almost
 * certainly the LCP element on first paint.
 */

interface LogoProps {
  className?: string;
  /** Rendered size of the disc in pixels. */
  size?: number;
  /** Show the Arabic wordmark beside the disc. */
  withWordmark?: boolean;
  /** Preload — set on the header instance only. */
  priority?: boolean;
  /** Wrap in a link home. Off for the footer, where the mark is decorative. */
  asLink?: boolean;
  /** Disables the CSS bloom, for use on light backgrounds. */
  flat?: boolean;
}

export function Logo({
  className,
  size = 44,
  withWordmark = false,
  priority = false,
  asLink = true,
  flat = false,
}: LogoProps) {
  const mark = (
    <span
      className={cn(
        "relative block shrink-0 overflow-hidden rounded-full",
        "transition-[box-shadow,transform] duration-base ease-brand",
        !flat &&
          "shadow-[0_0_0_1px_rgb(182_255_0/0.25),0_0_34px_-8px_rgb(182_255_0/0.55)]",
        !flat &&
          "group-hover/logo:shadow-[0_0_0_1px_rgb(182_255_0/0.45),0_0_52px_-6px_rgb(182_255_0/0.85)]",
        "group-hover/logo:scale-[1.04]",
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/logos/webcraft.png"
        alt=""
        width={size * 2}
        height={size * 2}
        priority={priority}
        // 1.2 is measured against the artwork: the disc spans ~84% of the
        // square, so 1/0.84 ≈ 1.19 makes it meet the container's edge exactly.
        className="size-full scale-[1.2] object-cover"
        sizes={`${size}px`}
      />
    </span>
  );

  const content = (
    <span
      className={cn(
        "group/logo inline-flex items-center gap-3",
        withWordmark && "gap-3.5",
        className,
      )}
    >
      {mark}

      {withWordmark ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.0625rem] leading-none font-extrabold tracking-normal">
            {siteConfig.nameAr}
          </span>
          <span className="pixel-label text-fg-subtle group-hover/logo:text-accent mt-1.5 transition-colors duration-fast">
            WEBCRAFT
          </span>
        </span>
      ) : null}
    </span>
  );

  if (!asLink) return content;

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.nameAr} — الصفحة الرئيسية`}
      className="rounded-pill focus-visible:outline-offset-6"
    >
      {content}
    </Link>
  );
}
