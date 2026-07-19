"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/data/projects";
import { ProjectGrid } from "@/components/projects/project-grid";
import { cn } from "@/lib/utils";

interface FilterableProjectsProps {
  projects: Project[];
  categories: ProjectCategory[];
}

type Filter = ProjectCategory | "All";

/**
 * Client wrapper around the grid so filtering stays interactive while the
 * cards themselves remain server-rendered markup passed through as children
 * would not allow — the grid is cheap enough to re-render on the client.
 */
export function FilterableProjects({
  projects,
  categories,
}: FilterableProjectsProps) {
  const [active, setActive] = useState<Filter>("All");

  const filters: Filter[] = useMemo(() => ["All", ...categories], [categories]);

  const visible = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((project) => project.category === active),
    [active, projects]
  );

  return (
    <>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="mb-10 flex flex-wrap justify-center gap-2"
      >
        {filters.map((filter) => {
          const isActive = filter === active;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={isActive}
              className={cn(
                "rounded-lg border px-4 py-2 text-sm font-medium transition",
                "focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:outline-hidden",
                isActive
                  ? "border-emerald-500 bg-emerald-500 text-neutral-950"
                  : "border-neutral-800 bg-neutral-900/60 text-neutral-400 backdrop-blur-sm hover:border-neutral-600 hover:text-neutral-200"
              )}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <ProjectGrid projects={visible} priorityCount={3} />
    </>
  );
}
