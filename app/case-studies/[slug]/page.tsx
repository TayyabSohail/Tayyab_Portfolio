import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconLayoutGrid,
} from "@tabler/icons-react";
import {
  projects,
  getProjectBySlug,
  getAdjacentProjects,
  type Project,
} from "@/data/projects";
import { ProjectHero } from "@/components/projects/project-hero";
import { TechStack } from "@/components/projects/tech-stack";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Case study not found | Tayyab" };
  }

  const title = `${project.title} | Case Study | Tayyab`;

  return {
    title,
    description: project.summary,
    alternates: { canonical: `/case-studies/${project.slug}` },
    openGraph: {
      title,
      description: project.summary,
      url: `/case-studies/${project.slug}`,
      type: "article",
      images: [
        {
          url: project.coverImage,
          width: project.coverWidth,
          height: project.coverHeight,
          alt: `${project.title} cover image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
      images: [project.coverImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(project.slug);

  return (
    <main className="pb-28">
      <ProjectHero project={project} />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
        {/* Lede */}
        <section className="border-b border-white/10 py-16 md:py-24">
          <p className="max-w-4xl text-xl font-medium leading-snug tracking-tight text-neutral-100 sm:text-2xl md:text-3xl md:leading-snug">
            {project.description}
          </p>
        </section>

        {/* Problem → approach, side by side on desktop. */}
        <section className="border-b border-white/10 py-16 md:py-24">
          <div className="grid grid-cols-1 gap-px border border-white/10 bg-white/10 md:grid-cols-2">
            <div className="nx-panel p-5 sm:p-7 md:p-9">
              <SectionLabel>The problem</SectionLabel>
              <p className="text-base leading-relaxed text-neutral-300 sm:text-lg md:text-justify md:hyphens-auto">
                {project.problem}
              </p>
            </div>
            <div className="nx-panel p-5 sm:p-7 md:p-9">
              <SectionLabel>My approach</SectionLabel>
              <p className="text-base leading-relaxed text-neutral-300 sm:text-lg md:text-justify md:hyphens-auto">
                {project.approach}
              </p>
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section className="border-b border-white/10 py-16 md:py-24">
          <h2 className="mb-8 text-3xl font-bold tracking-tight text-white md:text-4xl">
            How it&apos;s built
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-neutral-300 sm:text-lg md:text-justify md:hyphens-auto">
            {project.architecture}
          </p>

          <h3 className="mt-14 mb-6 text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Key features
          </h3>
          <ul className="grid grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
            {project.keyFeatures.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 bg-[#050807] px-5 py-4 text-base text-neutral-300 transition hover:bg-emerald-500/[0.055] hover:text-white"
              >
                <IconCheck
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-emerald-400"
                  stroke={3}
                />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* Challenges, after the build details: the hard parts land better once
            the reader knows what was being built. */}
        <section className="border-b border-white/10 py-16 md:py-24">
          <h2 className="mb-8 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Challenges &amp; Solutions
          </h2>
          <ol className="grid gap-px border border-white/10 bg-white/10">
            {project.challenges.map((item, index) => (
              <li
                key={item.challenge}
                className="nx-panel nx-panel-interactive p-5 sm:p-6 md:p-8"
              >
                <div className="flex gap-3 sm:gap-5">
                  <span
                    aria-hidden="true"
                    className="font-mono text-2xl font-bold text-neutral-700 sm:text-3xl"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="text-base font-medium leading-relaxed text-neutral-100 sm:text-lg md:text-justify md:hyphens-auto">
                      {item.challenge}
                    </p>
                    <p className="mt-5 border-l-2 border-emerald-500 pl-4 text-sm leading-relaxed text-neutral-400 sm:pl-5 sm:text-base md:text-justify md:hyphens-auto">
                      {item.solution}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Results last: the payoff, read after the work that produced it. */}
        <section className="py-16 md:py-24">
          <h2 className="mb-8 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Results
          </h2>
          <ul className="grid grid-cols-1 gap-px border border-white/10 bg-white/10 md:grid-cols-3">
            {project.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="nx-panel nx-panel-interactive p-7"
              >
                <Metric text={outcome} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Stack last: the reader wants to know what the product does before
          what it was built with. */}
      <TechStack groups={project.techStack} />

      {/* Prev / next */}
      <nav
        aria-label="Project navigation"
        className="mx-auto w-full max-w-6xl px-5 sm:px-6"
      >
        <div className="grid grid-cols-1 gap-4 border-t border-neutral-800 pt-12 sm:grid-cols-2">
          {previous && <AdjacentLink project={previous} direction="previous" />}
          {next && (
            <AdjacentLink
              project={next}
              direction="next"
              className="sm:col-start-2"
            />
          )}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/#projects"
            className="nx-btn nx-btn-secondary inline-flex items-center gap-2 px-6 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden"
          >
            <IconLayoutGrid aria-hidden="true" className="h-4 w-4" />
            All projects
          </Link>
        </div>
      </nav>
    </main>
  );
}

/** Previous / next case study, with a cover thumbnail for context. */
function AdjacentLink({
  project,
  direction,
  className,
}: {
  project: Project;
  direction: "previous" | "next";
  className?: string;
}) {
  const isNext = direction === "next";

  return (
    <Link
      href={`/case-studies/${project.slug}`}
      className={cn(
        "nx-panel nx-panel-interactive group flex items-center gap-4 p-4 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden",
        isNext && "flex-row-reverse text-right",
        className
      )}
    >
      <div className="relative h-16 w-20 shrink-0 overflow-hidden border border-white/10 bg-neutral-950">
        <Image
          src={project.coverImage}
          alt=""
          aria-hidden="true"
          fill
          sizes="80px"
          className={cn(
            project.coverFrame === "native"
              ? "object-contain p-1.5"
              : project.coverFit === "cover"
              ? "object-cover"
              : "object-contain p-1.5"
          )}
        />
      </div>

      <div className="min-w-0">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-neutral-400",
            isNext && "flex-row-reverse"
          )}
        >
          {isNext ? (
            <IconArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          ) : (
            <IconArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
          )}
          {direction}
        </span>
        <span className="mt-1 block truncate text-lg font-bold text-white transition group-hover:text-emerald-400">
          {project.title}
        </span>
        <span className="mt-0.5 block truncate text-sm text-neutral-400">
          {project.tagline}
        </span>
      </div>
    </Link>
  );
}

/**
 * Renders an outcome as a stat card. When the sentence leads with a figure
 * (e.g. "40% increase in engagement…") the figure is pulled out and enlarged;
 * otherwise the sentence is shown as-is.
 */
function Metric({ text }: { text: string }) {
  // Leading figure: an optional currency symbol, digits, then an optional
  // unit. The currency prefix keeps sums like "$12k saved" intact.
  const match = text.match(
    /^(<?[$£€]?\d[\d,.]*\s?(?:×|x|%|ms|\+)?(?:\s?million|\s?M\+?|\s?k\+?)?)\s*(.*)$/i
  );

  if (!match) {
    return (
      <p className="text-base leading-relaxed text-neutral-200">{text}</p>
    );
  }

  const [, figure, rest] = match;
  return (
    <>
      <span className="block text-4xl font-bold tracking-tight text-emerald-400">
        {figure.trim()}
      </span>
      <span className="mt-3 block text-base leading-relaxed text-neutral-400">
        {rest}
      </span>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-emerald-400">
      {children}
    </h2>
  );
}
