import Image from "next/image";
import Link from "next/link";
import {
  IconExternalLink,
  IconBrandGithub,
  IconArrowLeft,
} from "@tabler/icons-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectHeroProps {
  project: Project;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const hasLinks = Boolean(project.liveUrl || project.githubUrl);

  return (
    <header className="border-b border-white/10">
      <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-28 sm:px-6 md:pt-36">
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 border-l border-emerald-400 bg-emerald-500/[0.06] px-3.5 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-400 transition hover:text-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden"
        >
          <IconArrowLeft
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:-translate-x-1"
          />
          All projects
        </Link>

        <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="nx-kicker">Case study</p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="border-l border-emerald-400 bg-emerald-500/[0.07] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-emerald-400">
                {project.category}
              </span>
              {/* The kinds of work involved, in a lighter treatment than the
                  product type so the two read as separate dimensions. */}
              {project.capabilities.map((capability) => (
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

            <p className="mt-5 text-lg leading-relaxed text-neutral-300">
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
              {!hasLinks && project.liveUnavailableReason && (
                <p className="text-sm text-neutral-300">
                  {project.liveUnavailableReason}
                </p>
              )}
            </div>
          </div>

          {/* Logos are contained so they are not cropped; screenshots fill. */}
          <div
            className={cn(
              "nx-panel relative bg-neutral-950",
              project.coverFrame === "native"
                ? "aspect-[40/21]"
                : "aspect-4/3"
            )}
          >
            {project.coverFit === "mark" && (
              <>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 [background-image:radial-gradient(#ffffff0f_1px,transparent_1px)] [background-size:16px_16px]"
                />
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl"
                />
              </>
            )}
            <Image
              src={project.coverImage}
              alt={`${project.title} cover image`}
              fill
              sizes="(min-width: 1024px) 32rem, 100vw"
              priority
              className={cn(
                project.coverFit === "mark"
                  ? "object-contain p-[20%]"
                  : project.coverFit === "cover"
                    ? "object-cover"
                    : "object-contain p-3"
              )}
            />
          </div>
        </div>
      </div>

    </header>
  );
}
