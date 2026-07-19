import Image from "next/image";
import Link from "next/link";
import {
  IconExternalLink,
  IconBrandGithub,
  IconArrowLeft,
} from "@tabler/icons-react";
import type { Project } from "@/data/projects";
import { TechStack } from "@/components/projects/tech-stack";
import { cn } from "@/lib/utils";

interface ProjectHeroProps {
  project: Project;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const hasLinks = Boolean(project.liveUrl || project.githubUrl);

  return (
    <header className="border-b border-neutral-800 bg-neutral-950">
      <div className="mx-auto w-full max-w-5xl px-6 pb-14 pt-28 md:pt-32">
        <Link
          href="/#case-studies"
          className="inline-flex items-center gap-1.5 rounded-sm text-sm text-neutral-400 transition hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden"
        >
          <IconArrowLeft aria-hidden="true" className="h-4 w-4" />
          All case studies
        </Link>

        <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                {project.category}
              </span>
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-5xl">
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
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:outline-hidden"
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
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-neutral-500 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:outline-hidden"
                >
                  <IconBrandGithub aria-hidden="true" className="h-4 w-4" />
                  Source
                </a>
              )}
              {!hasLinks && project.liveUnavailableReason && (
                <p className="text-sm text-neutral-500">
                  {project.liveUnavailableReason}
                </p>
              )}
            </div>
          </div>

          {/* Logos are contained so they are not cropped; screenshots fill. */}
          <div className="relative aspect-4/3 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950">
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

      <TechStack groups={project.techStack} />
    </header>
  );
}
