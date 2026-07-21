import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import type { Project } from "@/data/projects";
import { getTechMeta } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  /** Set on the first cards above the fold so covers load eagerly. */
  priority?: boolean;
  /** 1-based position, shown as the ghosted index numeral. */
  index?: number;
  /** Tailwind aspect class for the cover, varied to drive the masonry flow. */
  coverRatio?: string;
  className?: string;
}

/** Tech logos shown before collapsing into a "+N" chip. */
const VISIBLE_TECH = 4;

export function ProjectCard({
  project,
  priority,
  index,
  coverRatio = "aspect-4/3",
  className,
}: ProjectCardProps) {
  // Only images whose aspect ratio matches the 4:3 frame are cropped to fill.
  const isContained = project.coverFit !== "cover";
  const isMark = project.coverFit === "mark";

  const visibleTech = project.tech.slice(0, VISIBLE_TECH);
  const overflowCount = project.tech.length - visibleTech.length;

  return (
    // The whole card is one link, so every part of it (cover included) is
    // clickable. A stretched-link overlay was unreliable here: positioned
    // wrappers inside the card trapped it in their own stacking context.
    <Link
      href={`/case-studies/${project.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title}: ${project.tagline} (opens in a new tab)`}
      className={cn(
        "group relative isolate block overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm",
        "transition duration-300 hover:-translate-y-1.5 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-black/60",
        "focus-visible:-translate-y-1.5 focus-visible:border-emerald-500/40 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:outline-hidden",
        className
      )}
    >
      {/* Accent wash, revealed on hover. */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

      <div
        className={cn(
          // `fill` needs a positioned ancestor, but a positioned wrapper also
          // stacks above the stretched link, so the overlay is raised instead
          // (see the link's z-index below).
          "relative overflow-hidden border-b border-neutral-800 bg-neutral-950",
          coverRatio
        )}
      >
        {/* Small marks get a patterned plate and glow so the frame never
            reads as empty space around a logo. */}
        {isMark && (
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
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className={cn(
            "transition duration-500",
            isMark
              ? "object-contain p-[22%] group-hover:scale-[1.08]"
              : isContained
                ? "object-contain p-3 group-hover:scale-[1.03]"
                : "object-cover group-hover:scale-105"
          )}
        />

        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-neutral-950/80 px-3 py-1.5 text-xs font-medium text-neutral-200 shadow-lg backdrop-blur-md">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-emerald-400"
          />
          {project.category}
        </span>

        <span
          aria-hidden="true"
          className="absolute right-4 top-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-emerald-500 text-neutral-950 opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <IconArrowUpRight className="h-6 w-6" stroke={2.5} />
        </span>
      </div>

      <div className="relative p-6">
        {/* Oversized index, mirroring the capability cards. */}
        {index !== undefined && (
          <span
            aria-hidden="true"
            className="absolute -top-3 right-4 -z-10 font-mono text-6xl font-bold text-white/[0.04] transition duration-300 group-hover:text-emerald-400/10"
          >
            {String(index).padStart(2, "0")}
          </span>
        )}

        <h3 className="text-2xl font-bold tracking-tight text-white">
          {project.title}
        </h3>

        <p className="mt-2 flex items-center gap-2 text-base text-neutral-400 transition-colors duration-300 group-hover:text-neutral-200">
          {project.tagline}
          <IconArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 shrink-0 -translate-x-2 text-emerald-400 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          />
        </p>

        {/* Capability badges sit above the divider, distinct from the tech
            chips below it: what the work was, not what it was built with. */}
        <ul className="mt-4 flex flex-wrap items-center gap-1.5">
          {project.capabilities.map((capability) => (
            <li
              key={capability}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300/90 transition group-hover:border-emerald-500/40 group-hover:text-emerald-300"
            >
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-emerald-400"
              />
              {capability}
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap items-center gap-1.5 border-t border-neutral-800 pt-5">
          {visibleTech.map((tech) => {
            const { icon: Icon, color } = getTechMeta(tech);
            return (
              <li
                key={tech}
                className="inline-flex items-center gap-1.5 rounded-md border border-neutral-800 bg-neutral-950/80 px-2 py-1 text-xs text-neutral-400 transition group-hover:border-neutral-700 group-hover:text-neutral-300"
              >
                <Icon
                  aria-hidden="true"
                  className="h-3.5 w-3.5 shrink-0"
                  style={{ color }}
                />
                {tech}
              </li>
            );
          })}
          {overflowCount > 0 && (
            <li className="inline-flex items-center rounded-md border border-neutral-800 bg-neutral-950/80 px-2 py-1 text-xs text-neutral-500">
              +{overflowCount}
            </li>
          )}
        </ul>
      </div>
    </Link>
  );
}
