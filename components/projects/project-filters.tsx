"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SAAS_PROJECT_SLUGS, type Project, type ProjectCategory } from "@/data/projects";
import { ProjectGrid } from "@/components/projects/project-grid";
import { cn } from "@/lib/utils";

interface FilterableProjectsProps {
  projects: Project[];
  categories: ProjectCategory[];
}

type Filter = ProjectCategory | "AI" | "All";

const FILTER_LABELS: Record<Filter, string> = {
  All: "All work",
  SaaS: "SaaS",
  Marketplace: "Marketplaces",
  AI: "AI",
  Website: "Websites",
};

function ProjectQuerySync({
  categories,
  onChange,
}: {
  categories: ProjectCategory[];
  onChange: (filter: Filter) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const requested = searchParams.get("category");
    const matchingCategory = categories.find(
      (category) => category === requested
    );

    if (matchingCategory) onChange(matchingCategory);
  }, [categories, onChange, searchParams]);

  return null;
}

/**
 * Client wrapper around the grid so filtering stays interactive while the
 * cards themselves remain server-rendered markup passed through as children
 * would not allow — the grid is cheap enough to re-render on the client.
 *
 * Filtering is by capability — the kind of work, matching the pitch on the
 * Each project has one product type, so filter results are unambiguous.
 */
export function FilterableProjects({
  projects,
  categories,
}: FilterableProjectsProps) {
  const [active, setActive] = useState<Filter>("All");

  const filters: Filter[] = useMemo(
    () => ["All", ...categories.filter((category) => category !== "AI"), "AI"],
    [categories]
  );

  const visible = useMemo(
    () =>
      active === "All"
        ? projects
        : active === "SaaS"
          ? projects.filter((project) => SAAS_PROJECT_SLUGS.has(project.slug))
          : active === "AI"
          ? projects.filter((project) => project.capabilities.includes("AI"))
          : projects.filter((project) => project.category === active),
    [active, projects]
  );

  return (
    <>
      <Suspense fallback={null}>
        <ProjectQuerySync categories={categories} onChange={setActive} />
      </Suspense>

      <div
        role="group"
        aria-label="Filter projects by product type"
        className="mb-10 flex w-full max-w-full flex-nowrap justify-start gap-px overflow-x-auto border border-white/10 bg-[#141414] p-px [scrollbar-width:none] sm:w-fit sm:overflow-visible [&::-webkit-scrollbar]:hidden"
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
              {FILTER_LABELS[filter]}
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
          : `${visible.length} projects match ${FILTER_LABELS[active]}.`}
      </p>
    </>
  );
}
