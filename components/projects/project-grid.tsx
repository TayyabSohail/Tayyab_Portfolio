"use client";

import { useEffect, useRef, useState, type MutableRefObject } from "react";
import type { Project } from "@/data/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { cn } from "@/lib/utils";

interface ProjectGridProps {
  projects: Project[];
  className?: string;
  priorityCount?: number;
}

export function ProjectGrid({
  projects,
  className,
  priorityCount = 0,
}: ProjectGridProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const cardRefs = useRef(new Set<HTMLDivElement>());

  useEffect(() => {
    setHasMounted(true);

    if (typeof IntersectionObserver === "undefined") {
      setVisibleCards(new Set(projects.map((project) => project.slug)));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.getAttribute("data-project-slug"))
          .filter((slug): slug is string => Boolean(slug));

        if (entering.length > 0) {
          setVisibleCards((current) => {
            const next = new Set(current);
            entering.forEach((slug) => next.add(slug));
            return next;
          });
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    cardRefs.current.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [projects]);

  if (projects.length === 0) {
    return <p className="py-16 text-center text-neutral-400">No projects match that filter.</p>;
  }

  return (
    <div className={cn("mx-auto max-w-sm sm:max-w-none", className)}>
      <MasonryColumns
        projects={projects}
        columnCount={1}
        priorityCount={priorityCount}
        hasMounted={hasMounted}
        visibleCards={visibleCards}
        cardRefs={cardRefs}
        className="flex flex-col gap-6 sm:hidden"
      />
      <MasonryColumns
        projects={projects}
        columnCount={2}
        priorityCount={priorityCount}
        hasMounted={hasMounted}
        visibleCards={visibleCards}
        cardRefs={cardRefs}
        className="hidden gap-6 sm:grid sm:grid-cols-2 lg:hidden"
      />
      <MasonryColumns
        projects={projects}
        columnCount={3}
        priorityCount={priorityCount}
        hasMounted={hasMounted}
        visibleCards={visibleCards}
        cardRefs={cardRefs}
        className="hidden gap-6 lg:grid lg:grid-cols-3"
      />
    </div>
  );
}

/**
 * Items are distributed across columns so the flow reads left-to-right,
 * top-to-bottom; every card has the same device plate, so columns stay level.
 */
function MasonryColumns({
  projects,
  columnCount,
  priorityCount,
  hasMounted,
  visibleCards,
  cardRefs,
  className,
}: {
  projects: Project[];
  columnCount: number;
  priorityCount: number;
  hasMounted: boolean;
  visibleCards: Set<string>;
  cardRefs: MutableRefObject<Set<HTMLDivElement>>;
  className: string;
}) {
  return (
    <div className={className}>
      {Array.from({ length: columnCount }, (_, columnIndex) => (
        <div key={columnIndex} className="flex min-w-0 flex-col gap-6">
          {projects
            .filter((_, index) => index % columnCount === columnIndex)
            .map((project, index) => {
              const visualIndex = columnIndex + index * columnCount;
              return (
                <div
                  key={project.slug}
                  ref={(element) => {
                    if (element) cardRefs.current.add(element);
                  }}
                  data-project-slug={project.slug}
                  className={cn(
                    "break-inside-avoid motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:ease-out",
                    hasMounted && !visibleCards.has(project.slug)
                      ? "translate-y-6 opacity-0"
                      : "translate-y-0 opacity-100",
                  )}
                >
                  <ProjectCard
                    project={project}
                    priority={visualIndex < priorityCount}
                    index={visualIndex + 1}
                  />
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
}
