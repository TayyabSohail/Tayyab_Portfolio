import { IconArrowUpRight } from "@tabler/icons-react";
import { ProjectMockup } from "@/components/mockups/project-mockup";
import type { Project } from "@/data/projects";
import { TechCapsule } from "@/components/projects/tech-capsule";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  /** Set on the first cards above the fold so screens load eagerly. */
  priority?: boolean;
  /** 1-based position, shown as the ghosted index numeral. */
  index?: number;
  className?: string;
}

/** Tech logos shown before collapsing into a "+N" chip. */
const VISIBLE_TECH = 4;

export function ProjectCard({
  project,
  priority,
  index,
  className,
}: ProjectCardProps) {
  const visibleTech = project.tech.slice(0, VISIBLE_TECH);
  const overflowCount = project.tech.length - visibleTech.length;

  return (
    // The whole card is one link, so every part of it (cover included) is
    // clickable. A stretched-link overlay was unreliable here: positioned
    // wrappers inside the card trapped it in their own stacking context.
    <a
      href={`/case-studies/${project.slug}`}
      aria-label={`${project.title}: ${project.tagline}`}
      className={cn(
        "nx-panel nx-panel-interactive group relative isolate block min-w-0 max-w-full cursor-pointer overflow-hidden",
        "focus-visible:-translate-y-1.5 focus-visible:border-emerald-500/40 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:outline-hidden",
        className
      )}
    >
      {/* Accent wash, revealed on hover. */}
      <div className="nx-grid-surface absolute inset-0 -z-10 opacity-0 transition duration-500 group-hover:opacity-70" />

      {/* The product on devices: a laptop with a phone in front for web
          products, two phones for apps. Real captures at device size. */}
      <div className="relative w-full min-w-0 max-w-full overflow-hidden border-b border-white/10 bg-neutral-950">
        <ProjectMockup
          project={project}
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />

        <span className="absolute left-4 top-4 inline-flex items-center gap-2 border border-white/10 bg-neutral-950/85 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-neutral-300 backdrop-blur-md">
          <span aria-hidden="true" className="h-px w-3 bg-emerald-400" />
          {project.category}
        </span>
      </div>

      <div className="relative p-5 sm:p-6">
        {/* Oversized index, mirroring the capability cards. */}
        {index !== undefined && (
          <span
            aria-hidden="true"
            className="absolute -top-3 right-4 -z-10 font-mono text-6xl font-bold text-white/[0.045] transition duration-300 group-hover:text-emerald-400/12"
          >
            {String(index).padStart(2, "0")}
          </span>
        )}

        <h3 className="text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-emerald-300 group-focus-visible:text-emerald-300">
          {project.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-neutral-300 transition-colors duration-300 group-hover:text-white sm:text-base">
          {project.tagline}
        </p>

        {/* Capability badges sit above the divider, distinct from the tech
            chips below it: what the work was, not what it was built with. */}
        <ul className="mt-4 flex flex-wrap items-center gap-1.5">
          {project.capabilities.map((capability) => (
            <li
              key={capability}
              className="inline-flex items-center gap-1.5 border border-white/10 bg-white/[0.035] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-neutral-300 transition-colors group-hover:border-emerald-400/25"
            >
              <span aria-hidden="true" className="h-1 w-1 bg-emerald-400" />
              {capability}
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap items-center gap-1.5 border-t border-neutral-800 pt-5">
          {visibleTech.map((tech) => (
            <TechCapsule key={tech} tool={tech} size="sm" />
          ))}
          {overflowCount > 0 && (
            <li className="inline-flex h-6 items-center rounded-full border border-white/[0.12] bg-white/[0.035] px-2.5 text-xs font-medium text-neutral-400">
              +{overflowCount}
            </li>
          )}
        </ul>

        {/* The card is the link; this full-bleed footer keeps the action
            visible on touch devices without repeating a primary button. */}
        <span className="-mx-5 -mb-5 mt-6 flex min-h-14 items-center justify-between border-t border-white/10 bg-white/[0.025] px-5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-colors duration-300 group-hover:bg-emerald-400/[0.07] group-hover:text-emerald-300 group-focus-visible:bg-emerald-400/[0.07] group-focus-visible:text-emerald-300 sm:-mx-6 sm:-mb-6 sm:px-6">
          <span className="inline-flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="h-px w-4 bg-emerald-400 transition-[width] duration-300 group-hover:w-6 group-focus-visible:w-6"
            />
            View project
          </span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-emerald-400/35 bg-emerald-400/[0.08] text-emerald-300 transition-colors duration-300 group-hover:border-emerald-400 group-hover:bg-emerald-400 group-hover:text-neutral-950 group-focus-visible:border-emerald-400 group-focus-visible:bg-emerald-400 group-focus-visible:text-neutral-950">
            <IconArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5"
            />
          </span>
        </span>
      </div>
    </a>
  );
}
