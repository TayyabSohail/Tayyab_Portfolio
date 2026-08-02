"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Project, ProjectCapability } from "@/data/projects";
import { ProjectGrid } from "@/components/projects/project-grid";
import { cn } from "@/lib/utils";

interface FilterableProjectsProps {
  projects: Project[];
  capabilities: ProjectCapability[];
}

type Filter<T> = T | "All";

function ProjectQuerySync({
  capabilities,
  onChange,
}: {
  capabilities: ProjectCapability[];
  onChange: (filter: Filter<ProjectCapability>) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const requested = searchParams.get("capability");
    const matchingCapability = capabilities.find(
      (capability) => capability === requested
    );

    if (matchingCapability) onChange(matchingCapability);
  }, [capabilities, onChange, searchParams]);

  return null;
}

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
      <Suspense fallback={null}>
        <ProjectQuerySync capabilities={capabilities} onChange={setActive} />
      </Suspense>

      <div
        role="group"
        aria-label="Filter projects by capability"
        className="mb-10 flex w-full max-w-full flex-nowrap justify-start gap-px overflow-x-auto border border-white/10 bg-[#020605] p-px [scrollbar-width:none] sm:w-fit sm:overflow-visible [&::-webkit-scrollbar]:hidden"
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
                "shrink-0 whitespace-nowrap border px-3 py-2.5 text-[11px] font-medium uppercase tracking-[0.06em] transition sm:px-4 sm:text-xs sm:tracking-[0.08em]",
                "focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:outline-hidden",
                isActive
                  ? "border-emerald-400 bg-emerald-400 text-neutral-950"
                  : "border-white/15 bg-[#050807] text-neutral-300 hover:border-emerald-400/40 hover:bg-emerald-500/[0.08] hover:text-white"
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
