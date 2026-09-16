import { cn } from "@/lib/utils";

/**
 * WEBCRAFT — UI FRAGMENTS
 *
 * A small library of interface parts, drawn in code.
 *
 * ─── WHY THIS EXISTS RATHER THAN A FOLDER OF IMAGES ──────────────────────
 * Three sections need to show what a digital product looks like: the hero
 * («abstract UI fragments» behind the pitch), Capabilities, and the Concept
 * Lab. None of them may use a screenshot, because we do not have client work
 * in those categories and putting someone else's dashboard on the page would
 * be a lie — see the rule at the head of `content/projects.ts`.
 *
 * The alternative to a screenshot is not a stock illustration and not a 3D
 * blob. It is drawing the interface ourselves, which is both the honest option
 * and the one that actually proves the claim: a studio that can draw a
 * credible product surface in CSS is demonstrating the skill it is selling.
 *
 * ─── THE RULES THESE PIECES OBEY ─────────────────────────────────────────
 *   1. No text. Every label is a bar, so nothing here can be misread as a
 *      real product, a real client, or a real number. It also means the whole
 *      library is language-neutral in a document that runs right-to-left.
 *   2. `dir="ltr"` on every shell. These are pictures of interfaces, not
 *      content; letting the bidi algorithm mirror a chart's axis would put
 *      the "growth" line running the wrong way.
 *   3. Decorative, always. Everything is `aria-hidden`, so a screen reader
 *      never announces a wall of meaningless divs.
 *   4. Server components. No hooks, no "use client" — these render to static
 *      markup and cost the visitor zero JavaScript.
 *   5. Brand ink only. Violet is the graphic colour, lime marks exactly one
 *      thing per fragment, and the rest is the ink ramp. A fragment that
 *      introduces a hue is a fragment that breaks the palette.
 * ─────────────────────────────────────────────────────────────────────────
 */

/* ==========================================================================
   SHELL
   ========================================================================== */

/**
 * The panel every fragment sits in.
 *
 * `dots` draws the three-circle window bar — the same device the portfolio's
 * browser frame uses, which quietly ties the invented interfaces to the real
 * screenshots two sections above them.
 */
export function Panel({
  children,
  className,
  dots = false,
  bar = true,
}: {
  children: React.ReactNode;
  className?: string;
  /** Window dots in the title bar. Use for "app" fragments, not for cards. */
  dots?: boolean;
  /** Draw the title bar at all. */
  bar?: boolean;
}) {
  return (
    <div
      dir="ltr"
      aria-hidden="true"
      className={cn(
        "border-border bg-ink-850/80 rounded-lg overflow-hidden border",
        "shadow-[0_30px_70px_-40px_rgb(0_0_0/0.95)]",
        className,
      )}
    >
      {bar ? (
        <div className="border-border bg-ink-800/70 flex h-7 items-center gap-2 border-b px-3">
          {dots ? (
            <span className="flex shrink-0 items-center gap-1">
              <span className="bg-ink-500 size-1.5 rounded-full" />
              <span className="bg-ink-500 size-1.5 rounded-full" />
              <span className="bg-ink-500 size-1.5 rounded-full" />
            </span>
          ) : (
            <Bar w="w-14" />
          )}
          <span className="bg-ink-700 ms-auto h-2 w-10 rounded-full" />
        </div>
      ) : null}

      <div className="p-3">{children}</div>
    </div>
  );
}

/* ==========================================================================
   ATOMS
   --------------------------------------------------------------------------
   The vocabulary. Every fragment below is assembled from these five.
   ========================================================================== */

/** A line of "text". Width is a Tailwind class so callers control the rag. */
export function Bar({
  w = "w-16",
  tone = "base",
  className,
}: {
  w?: string;
  tone?: "strong" | "base" | "faint" | "lime" | "violet";
  className?: string;
}) {
  const tones = {
    strong: "bg-white/25",
    base: "bg-white/12",
    faint: "bg-white/[0.07]",
    lime: "bg-lime-500/70",
    violet: "bg-violet-400/60",
  } as const;

  return <span className={cn("block h-1.5 rounded-full", tones[tone], w, className)} />;
}

/** A circular mark — an avatar, a category dot, an icon plate. */
export function Dot({
  size = "size-5",
  tone = "violet",
}: {
  size?: string;
  tone?: "violet" | "lime" | "ink";
}) {
  const tones = {
    violet: "bg-violet-500/25 ring-violet-400/30",
    lime: "bg-lime-500/20 ring-lime-500/35",
    ink: "bg-white/[0.07] ring-white/10",
  } as const;

  return <span className={cn("block shrink-0 rounded-full ring-1", size, tones[tone])} />;
}

/** A status chip. */
export function Pill({
  w = "w-10",
  tone = "ink",
}: {
  w?: string;
  tone?: "lime" | "violet" | "ink";
}) {
  const tones = {
    lime: "bg-lime-500/18 ring-lime-500/35",
    violet: "bg-violet-500/20 ring-violet-400/30",
    ink: "bg-white/[0.06] ring-white/10",
  } as const;

  return <span className={cn("block h-3.5 rounded-full ring-1", tones[tone], w)} />;
}

/** A soft-cornered block — an image slot, a map, a media tile. */
export function Block({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "violet" | "lime";
}) {
  const tones = {
    ink: "bg-white/[0.05]",
    violet: "bg-gradient-to-br from-violet-500/30 to-violet-500/[0.06]",
    lime: "bg-gradient-to-br from-lime-500/20 to-lime-500/[0.04]",
  } as const;

  return <span className={cn("block rounded-md", tones[tone], className)} />;
}

/** The hairline that separates rows inside a fragment. */
function Rule() {
  return <span className="bg-border block h-px w-full" />;
}

/* ==========================================================================
   CHARTS
   --------------------------------------------------------------------------
   Drawn as SVG with a fixed viewBox and `preserveAspectRatio="none"`, so a
   chart stretches to whatever box the composition gives it without any of the
   fragments needing to know their own size.
   ========================================================================== */

/** Column chart. The tallest column is lime — the one thing being asserted. */
export function Bars({
  values = [34, 52, 41, 68, 57, 82, 74],
  className,
}: {
  values?: number[];
  className?: string;
}) {
  const peak = Math.max(...values);

  return (
    <span className={cn("flex h-full w-full items-end gap-1.5", className)}>
      {values.map((value, i) => (
        <span
          key={i}
          style={{ height: `${value}%` }}
          className={cn(
            "block flex-1 rounded-t-[3px]",
            value === peak
              ? "bg-gradient-to-t from-lime-500/25 to-lime-500/80"
              : "bg-gradient-to-t from-violet-500/10 to-violet-500/45",
          )}
        />
      ))}
    </span>
  );
}

/**
 * Area chart.
 *
 * The path is hand-written rather than generated: a curve that reads as real
 * data has a dip in it, and an algorithm given random numbers produces noise
 * instead. This one rises, corrects, and rises further — the shape a business
 * owner recognises.
 */
export function Curve({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 72"
      preserveAspectRatio="none"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wc-curve-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-violet-500)" stopOpacity="0.42" />
          <stop offset="100%" stopColor="var(--color-violet-500)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        d="M0 58 C 18 54, 26 40, 44 41 C 62 42, 70 28, 88 32 C 104 36, 110 50, 126 45 C 144 39, 150 18, 170 14 C 182 12, 192 8, 200 6 L 200 72 L 0 72 Z"
        fill="url(#wc-curve-fill)"
      />
      <path
        d="M0 58 C 18 54, 26 40, 44 41 C 62 42, 70 28, 88 32 C 104 36, 110 50, 126 45 C 144 39, 150 18, 170 14 C 182 12, 192 8, 200 6"
        fill="none"
        stroke="var(--color-lime-500)"
        strokeWidth="1.6"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Donut. `value` is 0–100 and drives the lime arc. */
export function Ring({
  value = 68,
  className,
}: {
  value?: number;
  className?: string;
}) {
  const circumference = 2 * Math.PI * 26;

  return (
    <svg viewBox="0 0 64 64" className={cn("size-full", className)} aria-hidden="true">
      <circle
        cx="32"
        cy="32"
        r="26"
        fill="none"
        stroke="var(--color-border-strong)"
        strokeWidth="5"
      />
      <circle
        cx="32"
        cy="32"
        r="26"
        fill="none"
        stroke="var(--color-lime-500)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={`${(value / 100) * circumference} ${circumference}`}
        transform="rotate(-90 32 32)"
      />
    </svg>
  );
}

/* ==========================================================================
   COMPOSITE PARTS
   ========================================================================== */

/** A stat tile: caption, figure, trend. The figure is the only lime mark. */
export function Metric({
  accent = false,
  className,
}: {
  accent?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "border-border bg-white/[0.02] flex flex-col gap-2 rounded-md border p-2.5",
        className,
      )}
    >
      <Bar w="w-8" tone="faint" />
      <span className="flex items-end gap-1.5">
        <span
          className={cn(
            "block h-2.5 w-11 rounded-sm",
            accent ? "bg-lime-500/75" : "bg-white/25",
          )}
        />
        <span className="bg-violet-400/50 mb-0.5 block h-1.5 w-4 rounded-full" />
      </span>
    </span>
  );
}

/** A table of records: mark, two lines of text, a status chip. */
export function Rows({
  count = 4,
  className,
  status = true,
}: {
  count?: number;
  className?: string;
  status?: boolean;
}) {
  const widths = ["w-24", "w-16", "w-20", "w-28", "w-14", "w-24"];

  return (
    <span className={cn("flex flex-col", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="flex flex-col">
          {i > 0 ? <Rule /> : null}
          <span className="flex items-center gap-2.5 py-2.5">
            <Dot size="size-5" tone={i === 0 ? "lime" : "ink"} />
            <span className="flex min-w-0 flex-1 flex-col gap-1.5">
              <Bar w={widths[i % widths.length]} />
              <Bar w="w-10" tone="faint" />
            </span>
            {status ? (
              <Pill w="w-9" tone={i === 0 ? "lime" : i === 2 ? "violet" : "ink"} />
            ) : null}
          </span>
        </span>
      ))}
    </span>
  );
}

/** Sidebar navigation, as it reads at a glance: one active item, five quiet. */
export function SideNav({ items = 6 }: { items?: number }) {
  return (
    <span className="flex flex-col gap-1.5">
      {Array.from({ length: items }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "flex items-center gap-2 rounded-sm px-1.5 py-1.5",
            i === 1 && "bg-violet-500/14 ring-violet-400/25 ring-1",
          )}
        >
          <span
            className={cn(
              "block size-2 rounded-[3px]",
              i === 1 ? "bg-violet-300" : "bg-white/15",
            )}
          />
          <Bar w={i === 1 ? "w-12" : "w-10"} tone={i === 1 ? "strong" : "faint"} />
        </span>
      ))}
    </span>
  );
}

/** A payment card face. The one fragment allowed a violet gradient fill. */
export function PayCard({
  className,
  tone = "violet",
}: {
  className?: string;
  tone?: "violet" | "ink";
}) {
  return (
    <span
      className={cn(
        "relative flex aspect-[1.586] flex-col justify-between overflow-hidden rounded-lg p-3",
        "ring-1 ring-white/12",
        tone === "violet"
          ? "bg-gradient-to-br from-violet-500 via-violet-600 to-violet-800"
          : "bg-gradient-to-br from-ink-700 to-ink-900",
        className,
      )}
    >
      <span className="flex items-start justify-between">
        <span className="bg-lime-500/85 block size-5 rounded-[5px]" />
        <span className="bg-white/25 block h-1.5 w-8 rounded-full" />
      </span>

      <span className="flex flex-col gap-2">
        <span className="flex gap-1.5">
          <span className="bg-white/45 block h-1.5 w-6 rounded-full" />
          <span className="bg-white/25 block h-1.5 w-6 rounded-full" />
          <span className="bg-white/25 block h-1.5 w-6 rounded-full" />
          <span className="bg-white/45 block h-1.5 w-6 rounded-full" />
        </span>
        <span className="bg-white/20 block h-1.5 w-12 rounded-full" />
      </span>
    </span>
  );
}

/** An assistant thread: two prompts, one answer, one composer. */
export function Chat() {
  return (
    <span className="flex flex-col gap-2">
      <span className="flex justify-end">
        <span className="bg-white/[0.07] flex flex-col gap-1.5 rounded-lg rounded-tr-sm px-2.5 py-2">
          <Bar w="w-20" />
          <Bar w="w-12" tone="faint" />
        </span>
      </span>

      <span className="flex items-start gap-2">
        <Dot size="size-5" tone="violet" />
        <span className="bg-violet-500/12 ring-violet-400/20 flex flex-1 flex-col gap-1.5 rounded-lg rounded-tl-sm px-2.5 py-2 ring-1">
          <Bar w="w-full" />
          <Bar w="w-4/5" />
          <Bar w="w-16" tone="lime" />
        </span>
      </span>

      <span className="border-border mt-1 flex items-center gap-2 rounded-full border px-2.5 py-1.5">
        <Bar w="w-16" tone="faint" />
        <span className="bg-lime-500/80 ms-auto block size-4 rounded-full" />
      </span>
    </span>
  );
}

/** Three-column board. Column two carries the active card. */
export function Board() {
  const columns = [2, 3, 1];

  return (
    <span className="grid grid-cols-3 gap-2">
      {columns.map((cards, col) => (
        <span key={col} className="flex flex-col gap-1.5">
          <Bar w="w-10" tone="faint" />
          {Array.from({ length: cards }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "flex flex-col gap-1.5 rounded-md p-2",
                col === 1 && i === 0
                  ? "bg-violet-500/14 ring-violet-400/25 ring-1"
                  : "bg-white/[0.04] ring-white/[0.06] ring-1",
              )}
            >
              <Bar w="w-full" tone="faint" />
              <span className="flex items-center gap-1.5">
                <Dot size="size-3" tone={col === 1 && i === 0 ? "lime" : "ink"} />
                <Bar w="w-6" tone="faint" />
              </span>
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

/** Product tiles — the storefront/catalogue shape. */
export function Tiles({ count = 6 }: { count?: number }) {
  return (
    <span className="grid grid-cols-3 gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="flex flex-col gap-1.5">
          <Block
            className="aspect-[4/3] w-full"
            tone={i === 0 ? "lime" : i === 3 ? "violet" : "ink"}
          />
          <Bar w="w-full" tone="faint" />
          <Bar w="w-8" tone={i === 0 ? "lime" : "base"} />
        </span>
      ))}
    </span>
  );
}

/* ==========================================================================
   PHONE
   --------------------------------------------------------------------------
   The one fragment with a device around it. A mobile interface drawn without
   its frame reads as a narrow website; the frame is what makes the category
   legible at a glance, which is the entire job of these pieces.
   ========================================================================== */

export function Phone({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      dir="ltr"
      aria-hidden="true"
      className={cn(
        "border-border-strong bg-ink-900 relative overflow-hidden rounded-[1.75rem] border-[6px]",
        "shadow-[0_36px_80px_-40px_rgb(0_0_0/0.95)]",
        className,
      )}
    >
      {/* The notch. A rounded bar rather than a cut-out — a real cut-out needs
          a mask, and a mask on a decorative frame is cost with no return. */}
      <span className="bg-ink-800 absolute top-1.5 left-1/2 z-10 block h-1.5 w-12 -translate-x-1/2 rounded-full" />
      <div className="px-3 pt-6 pb-4">{children}</div>
    </div>
  );
}
