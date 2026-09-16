import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Magnetic } from "@/components/motion/magnetic";
import { cn } from "@/lib/utils";

/**
 * BUTTONS
 *
 * Links that look like buttons are still links (`<a>`), and actions are
 * `<button>`s — the element always matches what a click does. Arrows mirror in
 * RTL, except the external ↗ which means "leaves the site" in both scripts.
 */

export const buttonStyles = cva(
  "group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-semibold whitespace-nowrap transition-[transform,background-color,color,box-shadow,border-color] duration-300 ease-[var(--ease-brand)] select-none focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-[linear-gradient(135deg,var(--color-brand-600),color-mix(in_oklab,var(--color-brand-600)_55%,var(--color-brand-500)))] text-white shadow-[var(--shadow-brand)] hover:-translate-y-0.5",
        secondary:
          "border border-line-strong bg-surface text-fg shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700",
        navy: "bg-navy text-white shadow-[var(--shadow-lift)] hover:-translate-y-0.5 hover:bg-navy-700",
        light: "bg-white text-navy shadow-[var(--shadow-lift)] hover:-translate-y-0.5 hover:text-brand-700",
        ghost: "text-fg hover:text-brand-600",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-[0.9375rem]",
        lg: "h-14 px-7 text-base sm:h-16 sm:px-9 sm:text-lg",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonLinkProps = VariantProps<typeof buttonStyles> & {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  arrow?: boolean;
  magnetic?: boolean;
  newTabLabel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  "aria-label"?: string;
};

function Fill({ variant }: { variant: ButtonLinkProps["variant"] }) {
  if (variant !== "primary") return null;
  return (
    <span
      aria-hidden="true"
      className="absolute inset-0 -z-0 translate-y-full rounded-full bg-[linear-gradient(135deg,var(--color-brand-700),var(--color-brand-600))] transition-transform duration-500 ease-[var(--ease-brand)] group-hover/btn:translate-y-0"
    />
  );
}

export function ButtonLink({
  href,
  children,
  className,
  variant,
  size,
  external,
  arrow = true,
  magnetic,
  newTabLabel,
  onClick,
  ...rest
}: ButtonLinkProps) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      <Fill variant={variant} />
      <span className="relative z-10">{children}</span>
      {arrow ? (
        <span className="relative z-10 grid size-5 place-items-center overflow-hidden">
          <Icon
            aria-hidden="true"
            className={cn(
              "size-[1.1em] transition-transform duration-500 ease-[var(--ease-brand)]",
              external
                ? "group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                : "group-hover/btn:translate-x-1 rtl:-scale-x-100 rtl:group-hover/btn:-translate-x-1",
            )}
          />
        </span>
      ) : null}
      {external && newTabLabel ? <span className="sr-only">{newTabLabel}</span> : null}
    </>
  );

  const classes = cn(buttonStyles({ variant, size }), className);
  const link = external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick} {...rest}>
      {content}
    </a>
  ) : (
    <Link href={href} className={classes} onClick={onClick} {...rest}>
      {content}
    </Link>
  );

  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}

/** Inline text link with an animated underline. */
export function TextLink({
  href,
  children,
  external,
  className,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}) {
  const classes = cn(
    "group/tl inline-flex items-center gap-1.5 font-semibold text-fg transition-colors hover:text-brand-600",
    className,
  );
  const inner = (
    <>
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-[var(--ease-brand)] group-hover/tl:bg-[length:100%_1px] rtl:bg-right">
        {children}
      </span>
      {external ? (
        <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover/tl:-translate-y-0.5 group-hover/tl:translate-x-0.5" />
      ) : (
        <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/tl:translate-x-1 rtl:-scale-x-100 rtl:group-hover/tl:-translate-x-1" />
      )}
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
