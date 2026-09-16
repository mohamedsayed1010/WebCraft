import { MaskedLines, Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * The rhythm every section shares: a mono index + kicker, a display heading
 * that rises line by line, and an optional lead.
 */
export function SectionHeader({
  index,
  kicker,
  title,
  lead,
  align = "start",
  className,
  as: Heading = "h2",
  titleClassName,
  id,
}: {
  id?: string;
  index?: string;
  kicker: string;
  title: string;
  lead?: string;
  align?: "start" | "center";
  className?: string;
  as?: "h1" | "h2";
  titleClassName?: string;
}) {
  return (
    <div className={cn("max-w-4xl", align === "center" && "mx-auto text-center", className)}>
      <Reveal preset="fade">
        <p className={cn("flex items-center gap-3 text-fg-muted", align === "center" && "justify-center")}>
          {index ? <span className="label-mono ltr text-brand-600">{index}</span> : null}
          <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-aqua-400 to-aqua-400 rtl:bg-gradient-to-l" />
          <span className="label-mono">{kicker}</span>
        </p>
      </Reveal>
      <Heading id={id} className={cn("mt-5 text-display font-extrabold text-fg", titleClassName)}>
        <MaskedLines lines={[title]} />
      </Heading>
      {lead ? (
        <Reveal delay={0.15}>
          <p className={cn("mt-6 max-w-2xl text-lead text-fg-muted", align === "center" && "mx-auto")}>{lead}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
