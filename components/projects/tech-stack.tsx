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
    <section className="border-t border-neutral-800 bg-neutral-950">
      <div className="mx-auto w-full max-w-5xl px-6 py-14">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-white">
          Tech Stack
        </h2>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <li
              key={group.category}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 backdrop-blur-sm transition duration-300 hover:border-emerald-500/40"
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
                      className="inline-flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-950 px-2.5 py-1.5 text-sm text-neutral-200"
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
