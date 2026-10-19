import type { TechGroup } from "@/data/projects";
import { TechCapsule } from "@/components/projects/tech-capsule";

interface TechStackProps {
  groups: TechGroup[];
}

/**
 * The stack as one panel: a two-column grid of categories, each a small mono
 * label over its tools as capsules. The icon sits inside the capsule, so it
 * is always attached to the tool it represents.
 */
export function TechStack({ groups }: TechStackProps) {
  if (groups.length === 0) return null;

  const toolCount = groups.reduce((total, group) => total + group.tools.length, 0);

  return (
    <section>
      <div className="mx-auto w-full max-w-6xl border-t border-white/10 px-5 py-16 sm:px-6 md:py-24">
        <p className="nx-kicker">Implementation stack</p>
        <h2 className="mt-4 mb-8 text-3xl font-bold tracking-[-0.04em] text-white md:text-5xl">
          Tech Stack
        </h2>

        <div className="nx-panel nx-panel-static p-6 sm:p-8 md:p-10">
          <div aria-hidden="true" className="nx-grid-surface absolute inset-0 opacity-20" />
          <span aria-hidden="true" className="absolute top-10 left-0 h-14 w-px bg-emerald-400/80" />

          <div className="relative flex items-baseline justify-between gap-4">
            <p className="font-mono text-sm font-semibold tracking-[0.32em] text-neutral-300 uppercase">
              [ Stack ]
            </p>
            <p className="font-mono text-[0.6rem] tracking-[0.16em] text-neutral-500 uppercase">
              {toolCount} tools · {groups.length} categories
            </p>
          </div>

          <dl className="relative mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {groups.map((group) => (
              <div key={group.category}>
                <dt className="font-mono text-[0.62rem] font-semibold tracking-[0.18em] text-neutral-500 uppercase">
                  {group.category}
                </dt>
                <dd className="mt-3">
                  <ul className="flex flex-wrap gap-2">
                    {group.tools.map((tool) => (
                      <TechCapsule key={tool} tool={tool} />
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
