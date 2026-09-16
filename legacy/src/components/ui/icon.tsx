import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  ChevronDown,
  Clock,
  Code2,
  ExternalLink,
  Gauge,
  Hammer,
  KeyRound,
  Landmark,
  LifeBuoy,
  LineChart,
  Loader2,
  Mail,
  Map,
  MapPin,
  MessageSquare,
  Minus,
  PenLine,
  PenTool,
  Phone,
  Plus,
  Quote,
  ReceiptText,
  RefreshCw,
  Rocket,
  SearchCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Target,
  TrendingUp,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * WEBCRAFT — ICON REGISTRY
 *
 * Content files reference icons by string (`icon: "PenTool"`), because content
 * must never import a component — that is what keeps the content layer
 * portable to a CMS later. This module is the one place that maps those
 * strings onto real components.
 *
 * The map is explicit rather than a dynamic `lucide[name]` lookup. Explicit
 * imports are what let the bundler tree-shake 6,000 icons down to the ~35 this
 * site actually uses; a dynamic index would pull in the entire library.
 *
 * A typo in a content file therefore fails loudly at the `IconName` type
 * boundary instead of rendering an invisible gap at runtime.
 */

/* ==========================================================================
   BRAND MARKS
   --------------------------------------------------------------------------
   lucide-react v1 removed every brand glyph, so WhatsApp, LinkedIn, Facebook,
   Instagram and Behance are authored here by hand.

   These are official brand marks, and they are reproduced faithfully: a
   redrawn or "restyled" WhatsApp glyph reads as a knock-off and undermines
   exactly the trust the button is there to earn. They inherit `currentColor`
   so the design system still controls their colour.
   ========================================================================== */

type BrandIconProps = React.SVGProps<SVGSVGElement>;

export function WhatsAppIcon({ className, ...props }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={cn("size-5", className)}
      {...props}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.8 11.8 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413" />
    </svg>
  );
}

export function LinkedinIcon({ className, ...props }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={cn("size-5", className)}
      {...props}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function FacebookIcon({ className, ...props }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={cn("size-5", className)}
      {...props}
    >
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
    </svg>
  );
}

export function InstagramIcon({ className, ...props }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={cn("size-5", className)}
      {...props}
    >
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
    </svg>
  );
}

export function BehanceIcon({ className, ...props }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={cn("size-5", className)}
      {...props}
    >
      <path d="M0 4.4408h6.7385c1.9502 0 3.5061.5541 3.5061 2.9052 0 1.2015-.6011 1.9709-1.6693 2.4438 1.4906.4276 2.2189 1.5675 2.2189 3.0942 0 2.4784-2.0817 3.5464-4.2789 3.5464H0V4.4408zm2.6667 4.8873h2.9058c.9739 0 1.7147-.4276 1.7147-1.4877 0-1.0672-.8127-1.3283-1.7147-1.3283H2.6667v2.816zm0 5.1152h3.0942c1.0972 0 2.0125-.3787 2.0125-1.6693 0-1.2905-.7717-1.7147-1.9709-1.7147H2.6667v3.384zM19.3 8.6667c-2.3125 0-3.8878 1.7147-3.8878 4.0272 0 2.3936 1.4877 4.0272 3.8878 4.0272 1.8182 0 2.9962-.8127 3.5666-2.5518h-2.1268c-.2014.6541-1.0304.9975-1.6693.9975-1.2313 0-1.8767-.7191-1.8767-1.9433h5.8047c.1594-2.5148-1.1859-4.5568-3.6985-4.5568zm-2.1062 3.222c.0347-.5407.3787-1.4877 1.7871-1.4877 1.0824 0 1.5675.5946 1.7677 1.4877h-3.5548zM16.1 5.1875h4.8v1.1667h-4.8z" />
    </svg>
  );
}

/* ==========================================================================
   REGISTRY
   ========================================================================== */

export const icons = {
  // Services
  PenTool,
  Code2,
  RefreshCw,
  SearchCheck,
  TrendingUp,
  Target,
  Building2,
  Landmark,
  ShoppingBag,
  ShieldCheck,

  // Process
  MessageSquare,
  Map,
  Hammer,
  Rocket,
  LineChart,

  // Why us
  KeyRound,
  ReceiptText,
  Clock,
  PenLine,
  Gauge,
  LifeBuoy,

  // Interface
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Plus,
  Minus,
  Check,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Quote,
  Loader2,
  // Validation. The palette has no red, so the error state cannot lean on
  // colour to say "error" — this glyph does that job, and the violet is only
  // there to say "this line is different from the others".
  TriangleAlert,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

/** Brand marks are keyed separately — they are not Lucide components. */
export const brandIcons = {
  WhatsApp: WhatsAppIcon,
  Linkedin: LinkedinIcon,
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  Dribbble: BehanceIcon, // `SocialLink.icon` uses this key for Behance
} as const;

export type BrandIconName = keyof typeof brandIcons;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  className?: string;
}

/**
 * Render an icon by content-file name. Resolves Lucide icons first, then brand
 * marks.
 *
 * Returns `null` for an unknown name rather than throwing. A missing icon
 * should never take down a page that is otherwise fine — and in development
 * the gap is obvious enough to catch immediately.
 */
export function Icon({ name, className, ...props }: IconProps) {
  const LucideGlyph = icons[name as IconName];
  if (LucideGlyph) {
    return (
      <LucideGlyph
        aria-hidden="true"
        focusable="false"
        className={cn("size-5", className)}
        strokeWidth={1.6}
        {...props}
      />
    );
  }

  const BrandGlyph = brandIcons[name as BrandIconName];
  if (BrandGlyph) return <BrandGlyph className={className} {...props} />;

  return null;
}
