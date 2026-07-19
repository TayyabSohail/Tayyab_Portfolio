import { cn } from "@/lib/utils";

/**
 * Site background: a near-black base, a wide grid that fades out toward the
 * edges, and two soft emerald glows. Fixed and non-interactive so it sits
 * behind all content without affecting layout or hit-testing.
 */
export function GridBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-neutral-950"
    >
      {/* Grid, larger and dimmer than a typical dev-tool grid so it reads as
          texture rather than graph paper. */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:64px_64px]",
          "[background-image:linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]",
          "[mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent_100%)]"
        )}
      />

      {/* Ambient glows, tinted to the emerald accent. */}
      <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[128px]" />
      <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] translate-x-1/3 translate-y-1/3 rounded-full bg-emerald-500/5 blur-[128px]" />

      {/* Settles the whole thing toward black at the bottom of the viewport. */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-neutral-950" />
    </div>
  );
}
