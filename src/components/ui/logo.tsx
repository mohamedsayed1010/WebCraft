import Link from "next/link";

import { cn } from "@/lib/utils";

import { BrandMark } from "./brand-mark";

/**
 * Lockup: folded-W mark + wordmark. The wordmark is set in Archivo at a tight,
 * slightly expanded cut — "Web" in navy, "Craft" in the brand blue — with the
 * Arabic name beneath in Kufi so the lockup is bilingual by construction.
 */
export function Logo({
  href,
  label,
  size = 40,
  wordmark = true,
  className,
}: {
  href: string;
  label: string;
  size?: number;
  wordmark?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} aria-label={label} className={cn("group/logo inline-flex items-center gap-2.5", className)}>
      <span className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }}>
        <BrandMark className="size-full transition-transform duration-700 ease-[var(--ease-brand)] group-hover/logo:-translate-y-0.5 group-hover/logo:scale-105" />
      </span>
      {wordmark ? <Wordmark /> : null}
    </Link>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex flex-col leading-none", className)} aria-hidden="true">
      <span className="font-[family-name:var(--font-archivo)] text-[1.2rem] font-extrabold tracking-[-0.03em] text-fg [font-stretch:108%]">
        Web<span className="text-brand-600">Craft</span>
      </span>
      <span className="mt-1 font-[family-name:var(--font-kufi)] text-[0.66rem] font-semibold text-fg-subtle">ويب كرافت</span>
    </span>
  );
}
