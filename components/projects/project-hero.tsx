import {
  IconExternalLink,
  IconBrandGithub,
  IconArrowLeft,
} from "@tabler/icons-react";
import { ProjectMockup } from "@/components/mockups/project-mockup";
import { LENSES, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectHeroProps {
  project: Project;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const lens = project.efficiency ? LENSES[project.efficiency.lens] : null;

  return (
    <header className="border-b border-white/10">
      <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-28 sm:px-6 md:pt-36">
        <a
          href="/#projects"
          className="group inline-flex items-center gap-2 border-l border-emerald-400 bg-emerald-500/[0.06] px-3.5 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-400 transition hover:text-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden"
        >
          <IconArrowLeft
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:-translate-x-1"
          />
          All projects
        </a>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="nx-kicker">
              {project.client} &middot; {project.industry}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="border-l border-emerald-400 bg-emerald-500/[0.07] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-emerald-400">
                {project.category}
              </span>
              {/* The kinds of work involved, in a lighter treatment than the
                  product type so the two read as separate dimensions. */}
              {project.capabilities
                .filter((capability) => capability !== project.category)
                .map((capability) => (
                  <span
                    key={capability}
                    className="border-l border-neutral-600 bg-white/[0.035] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-neutral-400"
                  >
                    {capability}
                  </span>
                ))}
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-[-0.045em] text-white sm:text-4xl md:text-6xl">
              {project.title}
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-300">
              {project.summary}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nx-btn nx-btn-primary order-2 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:outline-hidden"
                >
                  <IconExternalLink aria-hidden="true" className="h-4 w-4" />
                  View live
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nx-btn nx-btn-secondary order-1 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:outline-hidden"
                >
                  <IconBrandGithub aria-hidden="true" className="h-4 w-4" />
                  Source
                </a>
              )}
              {!project.liveUrl && (
                <span className="order-2 inline-flex items-center gap-2 border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm text-neutral-400">
                  {project.anonymised
                    ? "Client project, name changed on request"
                    : "Private deployment, client project"}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px border border-white/10 bg-[#020605] sm:grid-cols-4 lg:grid-cols-2">
            <Meta label="Category" value={project.category} />
            <Meta label="Year" value={project.year} />
            <Meta label="Industry" value={project.industry} />
            {lens ? (
              <Meta label="Optimization" value={lens.label} highlight />
            ) : (
              <Meta
                label="Headline"
                value={`${project.headline.value} ${project.headline.label}`}
                highlight
              />
            )}
          </div>
        </div>

        {/* The product on devices: real captures at device size, so nothing
            is zoomed or cropped. Web products get a laptop and a phone; apps
            get two phones. */}
        <div className="relative mt-14">
          <ProjectMockup
            project={project}
            priority
            centered
            sizes="(min-width: 1280px) 72rem, 100vw"
            className="aspect-[16/9] border border-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]"
          />
        </div>
      </div>
    </header>
  );
}

function Meta({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="bg-[#050807] p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500">
        {label}
      </p>
      <p
        className={cn(
          "mt-2 text-sm font-medium leading-snug text-neutral-100",
          highlight && "text-emerald-400",
        )}
      >
        {value}
      </p>
    </div>
  );
}
