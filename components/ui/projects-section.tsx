import { projects, getCategories } from "@/data/projects";
import { FilterableProjects } from "@/components/projects/project-filters";

/**
 * Homepage projects section. Renders the same ProjectCard grid as
 * /projects so both surfaces stay visually identical — this reads from
 * data/projects.ts rather than keeping its own copy of the list.
 */
export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative scroll-mt-28 py-20 text-neutral-100"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
        <div className="mb-12 grid gap-6 border-b border-white/10 pb-10 md:grid-cols-[1fr_0.9fr] md:items-end">
          <div>
            <p className="nx-kicker">Selected work</p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.045em] text-white md:text-6xl">
              Projects
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-neutral-300 md:justify-self-end md:text-lg">
            Turning ideas into shipped products. Full-stack, AI and cloud
            automation work, designed and built end to end.
          </p>
        </div>

        <FilterableProjects
          projects={projects}
          categories={getCategories()}
        />
      </div>
    </section>
  );
}
