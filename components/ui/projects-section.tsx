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
      className="relative scroll-mt-5 bg-transparent py-20 text-neutral-100"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h2 className="relative inline-block text-4xl font-bold tracking-tight text-white md:text-5xl">
            Projects
            <span className="absolute -bottom-2 left-1/2 h-1 w-full -translate-x-1/2 rounded-full bg-linear-to-r from-emerald-500 to-emerald-300" />
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400">
            Turning ideas into shipped products. Platforms I&apos;ve designed
            and built end to end.
          </p>
        </div>

        <FilterableProjects projects={projects} categories={getCategories()} />
      </div>
    </section>
  );
}
