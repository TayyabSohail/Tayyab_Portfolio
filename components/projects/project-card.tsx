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
        "nx-panel nx-panel-interactive group relative isolate block",
        "focus-visible:-translate-y-1.5 focus-visible:border-emerald-500/40 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:outline-hidden",
        className
      )}
    >
      {/* Accent wash, revealed on hover. */}
      <div className="nx-grid-surface absolute inset-0 -z-10 opacity-0 transition duration-500 group-hover:opacity-70" />

      <div
        className={cn(
          // `fill` needs a positioned ancestor, but a positioned wrapper also
          // stacks above the stretched link, so the overlay is raised instead
          // (see the link's z-index below).
          "relative overflow-hidden border-b border-white/10 bg-neutral-950",
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

        <span className="absolute left-4 top-4 inline-flex items-center gap-2 border border-white/10 bg-neutral-950/85 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-neutral-300 backdrop-blur-md">
          <span aria-hidden="true" className="h-px w-3 bg-emerald-400" />
          {project.category}
        </span>

        <span
          aria-hidden="true"
          className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center border border-emerald-400 bg-emerald-400 text-neutral-950 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <IconArrowUpRight className="h-6 w-6" stroke={2.5} />
        </span>
      </div>

      <div className="relative p-5 sm:p-6">
        {/* Oversized index, mirroring the capability cards. */}
        {index !== undefined && (
          <span
            aria-hidden="true"
            className="absolute -top-3 right-4 -z-10 font-mono text-6xl font-bold text-white/[0.045] transition duration-300 group-hover:text-emerald-400/12"
          >
            {String(index).padStart(2, "0")}
          </span>
        )}

        <h3 className="text-2xl font-bold tracking-tight text-white">
          {project.title}
        </h3>

        <p className="mt-2 text-base text-neutral-300 transition-colors duration-300 group-hover:text-white">
          {project.tagline}
        </p>

        {/* Capability badges sit above the divider, distinct from the tech
            chips below it: what the work was, not what it was built with. */}
        <ul className="mt-4 flex flex-wrap items-center gap-1.5">
          {project.capabilities.map((capability) => (
            <li
              key={capability}
              className="inline-flex items-center gap-1.5 border-l border-emerald-500/45 bg-emerald-500/[0.06] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-emerald-300/85 transition group-hover:bg-emerald-500/10"
            >
              <span
                aria-hidden="true"
                className="h-1 w-1 bg-emerald-400"
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
                className="inline-flex items-center gap-1.5 border border-white/[0.12] bg-neutral-950/70 px-2 py-1 text-xs text-neutral-400 transition group-hover:text-neutral-200"
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
            <li className="inline-flex items-center border border-white/[0.12] bg-neutral-950/70 px-2 py-1 text-xs text-neutral-400">
              +{overflowCount}
            </li>
          )}
        </ul>

        {/* Visual button — the whole card is already the link, so this is a
            styled span (a nested <a> would be invalid). It carries the
            clickable affordance on touch, where hover cues never fire. */}
        <span className="mt-6 inline-flex w-full items-center justify-between border-t border-white/15 pt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400 transition-colors group-hover:text-emerald-300">
          Open case study
          <IconArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
