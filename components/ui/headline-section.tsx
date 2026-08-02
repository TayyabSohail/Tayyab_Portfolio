const STATS = [
  { value: "100", suffix: "+", label: "Projects delivered" },
  { value: "30", suffix: "+", label: "Clients served" },
  { value: "5", suffix: "+", label: "Years building products" },
];

export function HeadlineSection() {
  return (
    <section className="w-full bg-transparent py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-[0.72fr_1.28fr] md:gap-16">
          <div>
            <p className="nx-kicker">About</p>
            <h2 className="mt-5 text-4xl font-bold tracking-[-0.045em] text-white md:text-6xl">
              Building beyond the brief.
            </h2>
          </div>

          <div className="md:pt-7">
            <p className="text-xl font-semibold leading-snug tracking-tight text-neutral-100 md:text-2xl">
              Full Stack Developer shipping products that hold up in production.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-300 md:text-lg">
              Modern web platforms, AI systems and cloud infrastructure—from
              marketplaces handling real money to multi-tenant products serving
              real teams. BS in Computer Science from FAST NUCES Islamabad.
            </p>
          </div>
        </div>

        <div className="border-b border-white/10 py-6 sm:py-8">
          <dl className="grid w-full gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                className="group relative isolate flex min-h-40 flex-col justify-end overflow-hidden bg-[#050807] px-6 py-7 sm:min-h-48 sm:px-7 sm:py-8 lg:min-h-52 lg:px-9"
              >
                <div
                  aria-hidden="true"
                  className={`absolute -top-20 -right-16 -z-10 h-48 w-48 rounded-full blur-[70px] transition-opacity duration-500 group-hover:opacity-100 sm:h-56 sm:w-56 ${
                    index === 0
                      ? "bg-emerald-500/20 opacity-70"
                      : "bg-sky-500/15 opacity-60"
                  }`}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-emerald-400/80 to-transparent"
                />

                <dt className="order-2 mt-4 flex items-center gap-2.5 text-xs font-semibold tracking-[0.1em] text-neutral-300 uppercase lg:text-sm">
                  <span className="h-px w-6 shrink-0 bg-emerald-400" aria-hidden="true" />
                  {stat.label}
                </dt>
                <dd className="order-1">
                  <span className="block text-[clamp(3.75rem,8vw,5.5rem)] leading-[0.8] font-black tracking-[-0.065em] text-white">
                    {stat.value}
                    <span className="ml-1 text-emerald-400">{stat.suffix}</span>
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
