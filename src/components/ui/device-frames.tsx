import Image from "next/image";

import { media, type MediaKey } from "@/content/media.generated";
import { cn } from "@/lib/utils";

/**
 * Device frames for real screenshots. Frames are drawn in CSS (no image
 * asset), always LTR because a browser's chrome doesn't mirror, and every
 * screenshot carries its intrinsic size + blur placeholder so nothing shifts.
 */

export function BrowserFrame({
  shot,
  alt,
  url,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  priority,
  className,
  imageClassName,
  aspect,
}: {
  shot: MediaKey;
  alt: string;
  url?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  /** Crop to a fixed ratio (e.g. "16/10") — the screenshot anchors to the top. */
  aspect?: string;
}) {
  const img = media[shot];
  return (
    <div
      dir="ltr"
      className={cn(
        "overflow-hidden rounded-[0.9rem] border border-line bg-surface shadow-[var(--shadow-float)]",
        className,
      )}
    >
      <div className="flex h-8 items-center gap-3 border-b border-line bg-surface px-3.5 sm:h-9">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        </span>
        {url ? (
          <span className="mx-auto flex min-w-0 max-w-[70%] items-center gap-1.5 truncate rounded-md bg-mist px-3 py-0.5 font-mono text-[0.68rem] text-fg-subtle">
            <svg aria-hidden="true" viewBox="0 0 16 16" className="size-2.5 shrink-0 fill-current opacity-70">
              <path d="M8 1a4 4 0 0 0-4 4v2H3v8h10V7h-1V5a4 4 0 0 0-4-4Zm-2 6V5a2 2 0 1 1 4 0v2H6Z" />
            </svg>
            <span className="truncate">{url}</span>
          </span>
        ) : null}
      </div>
      <div className="relative overflow-hidden" style={aspect ? { aspectRatio: aspect } : undefined}>
        <Image
          src={img.src}
          width={img.width}
          height={img.height}
          alt={alt}
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={img.blurDataURL}
          className={cn("w-full", aspect && "absolute inset-0 h-full object-cover object-top", imageClassName)}
        />
      </div>
    </div>
  );
}

export function PhoneFrame({
  shot,
  alt,
  sizes = "(min-width: 1024px) 18vw, 45vw",
  priority,
  className,
  imageClassName,
}: {
  shot: MediaKey;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  const img = media[shot];
  return (
    <div
      dir="ltr"
      className={cn(
        "relative rounded-[2.4rem] border border-white bg-gradient-to-b from-[#f4f6fb] via-[#dde2ee] to-[#c5ccdc] p-[0.42rem] shadow-[var(--shadow-float),inset_0_0_0_1px_rgb(14_20_48/0.08)]",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[2rem] bg-navy ring-[3px] ring-navy" style={{ aspectRatio: "390 / 844" }}>
        <Image
          src={img.src}
          width={img.width}
          height={img.height}
          alt={alt}
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={img.blurDataURL}
          className={cn("absolute inset-0 h-full w-full object-cover object-top", imageClassName)}
        />
        <span
          aria-hidden="true"
          className="absolute top-2 left-1/2 h-[1.15rem] w-[32%] -translate-x-1/2 rounded-full bg-black"
        />
      </div>
      <span aria-hidden="true" className="absolute top-24 -right-[3px] h-12 w-[3px] rounded-r bg-mist-2" />
      <span aria-hidden="true" className="absolute top-20 -left-[3px] h-8 w-[3px] rounded-l bg-mist-2" />
    </div>
  );
}
