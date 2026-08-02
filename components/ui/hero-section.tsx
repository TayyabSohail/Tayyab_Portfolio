import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

const impactStats = [
  { value: "100+", label: "Projects delivered" },
  { value: "30+", label: "Clients served" },
  { value: "5+", label: "Years building products" },
];

const socialLinks = [
  {
    href: "mailto:m.tayyabsohail614@gmail.com",
    label: "Email",
    icon: FaEnvelope,
  },
  {
    href: "https://wa.me/923338199915",
    label: "WhatsApp",
    icon: FaWhatsapp,
  },
  {
    href: "https://www.linkedin.com/in/muhammad-tayyab-sohail/",
    label: "LinkedIn",
    icon: FaLinkedin,
  },
  {
    href: "https://github.com/TayyabSohail",
    label: "GitHub",
    icon: FaGithub,
  },
];

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative isolate w-full overflow-hidden border-b border-emerald-500/10 px-5 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-32 lg:px-10 lg:py-36"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
        {/* Contained portrait frame—the image supports the intro rather than
            becoming the entire hero. */}
        <div className="nx-panel relative mx-auto h-[380px] w-full max-w-[340px] shadow-2xl shadow-black/50 sm:h-[430px] sm:max-w-[380px] lg:mx-0 lg:h-[480px]">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-emerald-400/70 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(52,211,153,0.035)_1px,transparent_1px)] [background-size:44px_100%]"
          />
          <Image
            src="/images/Photograph-Tayyab-Sohail-cutout.png"
            alt="Tayyab Sohail"
            fill
            sizes="(min-width: 1024px) 27rem, 90vw"
            className="z-10 object-contain object-bottom px-3 pt-10 drop-shadow-[0_18px_30px_rgba(0,0,0,0.4)]"
            priority
          />

          <div className="absolute inset-x-0 bottom-0 z-20 bg-linear-to-t from-[#030605] via-[#030605]/85 to-transparent px-6 pb-6 pt-20">
            <p className="text-3xl font-black uppercase leading-none tracking-[-0.045em] text-white sm:text-4xl">
              Tayyab Sohail
            </p>
          </div>

          <span className="absolute bottom-0 left-0 z-30 h-8 w-px bg-emerald-400" />
          <span className="absolute bottom-0 left-0 z-30 h-px w-8 bg-emerald-400" />
          <span className="absolute right-0 top-0 z-30 h-8 w-px bg-emerald-400/50" />
          <span className="absolute right-0 top-0 z-30 h-px w-8 bg-emerald-400/50" />
        </div>

        {/* Main intro panel with a clearer hierarchy and the proficiency
            animation restored as a dedicated feature. */}
        <div className="nx-panel relative shadow-2xl shadow-black/55 backdrop-blur-md">
          <div className="absolute -left-px top-8 h-20 w-0.5 bg-emerald-400" />
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-emerald-400/70 via-emerald-400/15 to-transparent" />

          <div className="p-6 sm:p-9 lg:p-10">
            <p className="max-w-2xl font-mono text-[10px] font-semibold leading-relaxed uppercase tracking-[0.12em] text-emerald-300 sm:text-xs">
              Full-Stack Developer <span className="text-white/30">·</span> AI &amp;
              Automation Engineer <span className="text-white/30">·</span> Cloud
              Architect
            </p>

            <h1 className="mt-5 max-w-2xl text-3xl font-bold leading-[1.06] tracking-[-0.04em] text-white sm:text-4xl lg:text-[2.85rem]">
              I build the products
              <span className="mt-1 block text-emerald-400">
                that move businesses forward.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-relaxed text-neutral-300 sm:text-base">
              Full-stack platforms and AI systems engineered to ship fast, scale
              cleanly, and deliver measurable results.
            </p>

            <dl className="mt-7 grid grid-cols-3 border-y border-white/10 py-5">
              {impactStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`min-w-0 px-3 first:pl-0 last:pr-0 sm:px-5 ${
                    index > 0 ? "border-l border-white/10" : ""
                  }`}
                >
                  <dd className="text-2xl font-black tracking-[-0.05em] text-white sm:text-3xl">
                    {stat.value}
                  </dd>
                  <dt className="mt-1 text-[10px] font-semibold leading-snug uppercase tracking-[0.08em] text-neutral-400 sm:text-xs">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Link
                href="/#projects"
                className="nx-btn nx-btn-primary group order-2 inline-flex min-h-12 items-center justify-center gap-2 px-5 text-sm font-bold uppercase tracking-[0.1em] focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:outline-none"
              >
                See what I build
                <FaArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="/resume/Resume_M.TayyabSohail.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="nx-btn nx-btn-secondary order-1 inline-flex min-h-12 items-center justify-center px-5 text-sm font-bold uppercase tracking-[0.1em] focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:outline-none"
              >
                View resume
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t border-white/10 px-6 py-5 sm:px-9">
            <span className="mr-auto font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-300">
              Connect
            </span>
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center border border-white/20 text-neutral-300 transition hover:border-emerald-400/70 hover:text-emerald-300 focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:outline-none"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
