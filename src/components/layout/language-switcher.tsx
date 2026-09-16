"use client";

import { Languages } from "lucide-react";
import { usePathname } from "next/navigation";

import { localeMeta, localePath, locales, stripLocale, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

/**
 * العربية / English. A real link to the same page in the other language, so it
 * works without JavaScript, is crawlable, and keeps the section hash. The html
 * `lang`/`dir` swap happens at the root layout, which is why this is a full
 * navigation rather than a client-side state flip.
 */
export function LanguageSwitcher({
  locale,
  label,
  variant = "pill",
  className,
}: {
  locale: Locale;
  label: string;
  variant?: "pill" | "segmented";
  className?: string;
}) {
  const pathname = usePathname() ?? "/";
  const base = stripLocale(pathname);

  const hrefFor = (target: Locale) => localePath(target, base);

  const withHash = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const hash = window.location.hash;
    if (hash) e.currentTarget.href = `${e.currentTarget.href.split("#")[0]}${hash}`;
  };

  if (variant === "segmented") {
    return (
      <nav aria-label={label} className={cn("inline-flex rounded-full border border-line-strong p-1", className)}>
        {locales.map((l) => (
          <a
            key={l}
            href={hrefFor(l)}
            hrefLang={localeMeta[l].htmlLang}
            lang={localeMeta[l].htmlLang}
            aria-current={l === locale ? "true" : undefined}
            onClick={withHash}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              l === locale ? "bg-brand-600 text-white" : "text-fg-muted hover:text-fg",
            )}
          >
            {localeMeta[l].label}
          </a>
        ))}
      </nav>
    );
  }

  const target = locales.find((l) => l !== locale) ?? locale;
  return (
    <a
      href={hrefFor(target)}
      hrefLang={localeMeta[target].htmlLang}
      lang={localeMeta[target].htmlLang}
      onClick={withHash}
      aria-label={`${label}: ${localeMeta[target].label}`}
      className={cn(
        "group/lang inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-3.5 text-sm font-semibold text-fg transition-colors hover:border-brand-300 hover:text-brand-600",
        className,
      )}
    >
      <Languages aria-hidden="true" className="size-4 transition-transform duration-500 group-hover/lang:rotate-12" />
      <span className={target === "ar" ? "font-[family-name:var(--font-plex-ar)]" : "font-[family-name:var(--font-inter)]"}>
        {localeMeta[target].label}
      </span>
    </a>
  );
}
