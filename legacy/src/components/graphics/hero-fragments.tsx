import {
  Bar,
  Chat,
  Curve,
  Dot,
  Metric,
  Panel,
  Pill,
  Tiles,
} from "@/components/graphics/ui-fragments";

/**
 * WEBCRAFT — HERO FRAGMENTS
 *
 * Three interface corners, drawn for the hero collage and nowhere else.
 *
 * They are separate from the concept screens for a reason that is art
 * direction rather than tidiness: a concept screen is a whole application —
 * rail, toolbar, body — because the Lab is claiming a complete product. A
 * hero fragment must read at a third of that size, tilted, partly behind
 * another fragment, in the two seconds before someone starts reading the
 * headline. So each one is a single idea with the chrome stripped off: a
 * number going up, a catalogue, a conversation.
 *
 * Between them they name the three things the studio sells, before the
 * headline has been read: measurement, commerce, and a product people talk
 * to. See `sections/hero/hero-collage.tsx` for how they are stacked.
 */

/** Measurement. The only fragment with a chart, and the collage's anchor. */
export function HeroAnalytics() {
  return (
    <Panel dots className="w-full">
      <div className="flex flex-col gap-2.5">
        <span className="flex items-center justify-between">
          <span className="flex flex-col gap-1.5">
            <Bar w="w-16" tone="strong" />
            <Bar w="w-10" tone="faint" />
          </span>
          <Pill w="w-12" tone="lime" />
        </span>

        <span className="grid grid-cols-3 gap-1.5">
          <Metric accent />
          <Metric />
          <Metric />
        </span>

        <span className="border-border bg-white/[0.02] block h-20 rounded-md border p-2">
          <Curve />
        </span>
      </div>
    </Panel>
  );
}

/** Commerce. Three tiles is the smallest count that still reads as a grid. */
export function HeroCatalog() {
  return (
    <Panel className="w-full">
      <div className="flex flex-col gap-2.5">
        <span className="flex items-center gap-1.5">
          <Pill w="w-8" tone="lime" />
          <Pill w="w-6" />
          <Pill w="w-10" />
        </span>
        <Tiles count={3} />
      </div>
    </Panel>
  );
}

/** A product people talk to. The lime in the collage lives here. */
export function HeroConversation() {
  return (
    <Panel bar={false} className="w-full">
      <div className="flex flex-col gap-2.5">
        <span className="flex items-center gap-2">
          <Dot size="size-6" tone="violet" />
          <span className="flex flex-1 flex-col gap-1.5">
            <Bar w="w-14" />
            <Bar w="w-8" tone="faint" />
          </span>
          <span className="bg-lime-500/80 block size-1.5 rounded-full" />
        </span>
        <Chat />
      </div>
    </Panel>
  );
}
