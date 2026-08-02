import type { TechGroup } from "@/data/projects";
import { getTechMeta } from "@/lib/tech-icons";

interface TechStackProps {
  groups: TechGroup[];
}

/**
 * Grouped stack grid. Each card leads with its category, then lists the tools
 * as individual labelled chips, so an icon is always attached to the tool it
 * represents rather than floating above the heading.
 */
export function TechStack({ groups }: TechStackProps) {
  if (groups.length === 0) return null;

  return (
    <section>
      <div className="mx-auto w-full max-w-6xl border-t border-white/10 px-5 py-16 sm:px-6 md:py-24">
        <p className="nx-kicker">Implementation stack</p>
        <h2 className="mt-4 mb-8 text-3xl font-bold tracking-[-0.04em] text-white md:text-5xl">
          Tech Stack
        </h2>

        <ul className="grid grid-cols-1 gap-px border border-white/10 bg-[#020605] sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <li
              key={group.category}
              className="nx-panel nx-panel-interactive p-5"
            >
              <h3 className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                {group.category}
              </h3>

              <ul className="mt-4 flex flex-wrap gap-2">
                {group.tools.map((tool) => {
                  const { icon: Icon, color } = getTechMeta(tool);
                  return (
                    <li
                      key={tool}
                      className="inline-flex items-center gap-2 border border-white/[0.08] bg-neutral-950/70 px-2.5 py-1.5 text-sm text-neutral-300"
                    >
                      <Icon
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0"
                        style={{ color }}
                      />
                      {tool}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
