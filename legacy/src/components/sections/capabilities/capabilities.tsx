import { ConceptScreen } from "@/components/graphics/concept-screens";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { capabilities } from "@/content/capabilities";
import { sectionCopy } from "@/content/copy";

import { CapabilityExplorer } from "./capability-explorer";

/**
 * CAPABILITIES — 02
 *
 * «إحنا مابنعملش مواقع بس.» — placed immediately after the portfolio, because
 * that is the exact moment the objection forms.
 *
 * A visitor has just scrolled three live URLs. All three are public-facing
 * websites, and all three are excellent evidence for one thing only. The
 * business owner who needs an ordering system for eleven branches has, at
 * this precise point in the page, concluded that we are a brochure shop and
 * started looking for the back button. This section is the answer, and its
 * position is most of its value.
 *
 * ─── SERVER / CLIENT SPLIT ───────────────────────────────────────────────
 * Everything expensive is rendered here, on the server: six interface
 * drawings, each assembled from a dozen fragment components, plus six icons.
 * They are handed to `<CapabilityExplorer>` as React nodes.
 *
 * The client bundle for this section is therefore one file of state and
 * layout — the graphics library never reaches the browser. That matters more
 * than it looks: the naive version of this component ships the entire
 * `graphics/` folder to every visitor so that a hover can swap a panel.
 * ─────────────────────────────────────────────────────────────────────────
 */
export function Capabilities() {
  /* Both maps are built here rather than inside the client component for the
     reason above — a node passed down is rendered output, an import is
     bundled code. */
  /**
   * A phone drawing cannot share a canvas with a dashboard drawing.
   *
   * The canvas is a 4:3.1 box, and `Phone` fills whatever it is given — so a
   * mobile screen dropped straight into it rendered as a squat, letterboxed
   * rectangle that read as a broken image rather than as a handset. Mobile
   * screens are therefore centred at a handset's own proportion inside the
   * same box, which keeps every capability's drawing the same size on the
   * page while letting each one be the right shape.
   */
  const panels = Object.fromEntries(
    capabilities.map((capability) => {
      if (!capability.screen) return [capability.id, null];

      const drawing = <ConceptScreen name={capability.screen} />;
      const isPhone = capability.screen.startsWith("app-");

      return [
        capability.id,
        isPhone ? (
          <div className="mx-auto h-full w-[43%]">{drawing}</div>
        ) : (
          drawing
        ),
      ];
    }),
  );

  const glyphs = Object.fromEntries(
    capabilities.map((capability) => [
      capability.id,
      <Icon key={capability.id} name={capability.icon} className="size-5" />,
    ]),
  );

  return (
    <section id="capabilities" className="section-y relative overflow-hidden">
      <div
        aria-hidden="true"
        className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_65%)]"
      />

      <div className="container-page">
        <SectionHeading {...sectionCopy.capabilities} />

        <CapabilityExplorer
          items={capabilities.map(({ id, kicker, title, description, href }) => ({
            id,
            kicker,
            title,
            description,
            href,
          }))}
          panels={panels}
          glyphs={glyphs}
        />
      </div>
    </section>
  );
}
