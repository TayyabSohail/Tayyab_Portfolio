import type { Project } from "@/data/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { cn } from "@/lib/utils";

interface ProjectGridProps {
  projects: Project[];
  className?: string;
  /** Number of leading cards treated as above the fold. */
  priorityCount?: number;
}

/**
 * Cover aspect ratios, cycled by position. Equal column widths with varying
 * card heights let the masonry columns interlock instead of forming rigid
 * rows. Assigned by index rather than by data, so the rhythm holds for any
 * list length or filtered subset.
 */
const RATIOS = ["aspect-4/3", "aspect-square", "aspect-3/4", "aspect-16/10"];

export function ProjectGrid({
  projects,
  className,
  priorityCount = 0,
}: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <p className="py-16 text-center text-neutral-400">
        No projects match that filter.
      </p>
    );
  }

  return (
    // CSS columns give true masonry flow: cards fill the shortest gap rather
    // than aligning into rows.
    <div
      className={cn(
        // Below sm the grid collapses to one column, so cap and centre it —
        // otherwise a single card stretches edge to edge on narrow screens.
        "mx-auto max-w-sm columns-1 gap-6",
        "sm:max-w-none sm:columns-2 lg:columns-3",
        className,
      )}
    >
      {projects.map((project, index) => (
        <ProjectCard
          key={project.slug}
          project={project}
          priority={index < priorityCount}
          index={index + 1}
          coverRatio={RATIOS[index % RATIOS.length]}
          // break-inside prevents a card splitting across two columns.
          className="mb-6 break-inside-avoid"
        />
      ))}
    </div>
  );
}
