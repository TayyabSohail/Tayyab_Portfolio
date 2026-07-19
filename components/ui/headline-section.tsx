import { getTechMeta } from "@/lib/tech-icons";
import { GithubStats } from "@/components/ui/github-stats";

const STATS = [
  { value: "30+", label: "Projects delivered" },
  { value: "2+", label: "Years building products" },
  { value: "9", label: "Case studies published" },
];

const FOCUS = [
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "Supabase",
  "PostgreSQL",
  "AWS",
  "AI / RAG",
];

export function HeadlineSection() {
  return (
    <section className="w-full bg-transparent py-16 md:py-24">
      <div className="mx-auto w-full max-w-5xl px-6 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          About Me
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-xl font-semibold leading-tight tracking-tight text-neutral-200 md:text-2xl">
          Full Stack Developer building production systems across the modern
          web, AI and cloud.
        </p>

        <p className="mx-auto mt-6 max-w-2xl text-justify text-lg leading-relaxed text-neutral-400 [text-wrap:pretty] hyphens-auto">
          I work end to end, building responsive frontends in Next.js and
          TypeScript backed by reliable services on Supabase, PostgreSQL and
          AWS. I hold a BS in Computer Science from FAST NUCES Islamabad, and
          I&apos;ve shipped marketplaces, SaaS platforms and multi-tenant AI
          systems with a bias toward performance and things that hold up in
          production.
        </p>

        <dl className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 backdrop-blur-sm transition duration-300 hover:border-emerald-500/40"
            >
              {/* Accent wash that lifts on hover. */}
              <div className="absolute inset-0 bg-linear-to-br from-emerald-500/8 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              <dt className="sr-only">{stat.label}</dt>
              <dd className="relative">
                <span className="block text-4xl font-bold tracking-tight text-white">
                  {stat.value}
                </span>
                <span className="mt-2 block text-sm text-neutral-400">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {FOCUS.map((item) => {
            const { icon: Icon, color } = getTechMeta(item);
            return (
              <li
                key={item}
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-300 backdrop-blur-sm transition hover:border-neutral-600"
              >
                <Icon
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0"
                  style={{ color }}
                />
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
