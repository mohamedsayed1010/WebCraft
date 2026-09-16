import type { Locale } from "@/i18n/config";
import type { Project } from "@/types";

import { ProjectStage } from "./project-stage";

/**
 * Server wrapper for the interactive portfolio stage.
 *
 * Picks out just the strings and screenshot keys the stage renders, in the
 * current language, before crossing into the client component. Client props
 * are serialised into the HTML, and handing over full `Project` records put
 * both languages' copy for every featured project on every page.
 */
export function ProjectMedia({
  project,
  locale,
  href,
  viewLabel,
  priority,
  className,
}: {
  project: Project;
  locale: Locale;
  href: string;
  viewLabel: string;
  priority?: boolean;
  className?: string;
}) {
  const text = project.text[locale];
  const shot = (s: Project["desktop"][number] | undefined) => (s ? { key: s.key, label: s.label[locale] } : undefined);

  return (
    <ProjectStage
      stage={{
        name: text.name,
        category: text.category,
        tone: project.tone,
        liveUrl: project.liveUrl,
        showcase: project.showcase,
        desktop: shot(project.desktop[0]),
        phone: shot(project.mobile[0]),
        phone2: shot(project.mobile[1]),
      }}
      locale={locale}
      href={href}
      viewLabel={viewLabel}
      priority={priority}
      className={className}
    />
  );
}
