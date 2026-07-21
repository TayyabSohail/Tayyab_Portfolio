"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCapability } from "@/data/projects";
import { ProjectGrid } from "@/components/projects/project-grid";
import { cn } from "@/lib/utils";

interface FilterableProjectsProps {
  projects: Project[];
  capabilities: ProjectCapability[];
}

type Filter<T> = T | "All";

/**
 * Client wrapper around the grid so filtering stays interactive while the
 * cards themselves remain server-rendered markup passed through as children
 * would not allow — the grid is cheap enough to re-render on the client.
 *
 * Filtering is by capability — the kind of work, matching the pitch on the
 * homepage. Product type stays on the cards as context but is not a filter.
 */
export function FilterableProjects({
  projects,
  capabilities,
}: FilterableProjectsProps) {
  const [active, setActive] = useState<Filter<ProjectCapability>>("All");

  const filters: Filter<ProjectCapability>[] = useMemo(
    () => ["All", ...capabilities],
    [capabilities]
  );

  const visible = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((project) => project.capabilities.includes(active)),
    [active, projects]
  );

  return (
    <>
      <div
        role="group"
        aria-label="Filter projects by capability"
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

      {/* Announced without stealing focus, so the result count reaches a
          screen reader after a chip is pressed. */}
      <p aria-live="polite" className="sr-only">
        {active === "All"
          ? `Showing all ${visible.length} projects.`
          : `${visible.length} projects match ${active}.`}
      </p>
    </>
  );
}
