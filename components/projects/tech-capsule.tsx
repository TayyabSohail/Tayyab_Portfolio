import { getTechMeta } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

interface TechCapsuleProps {
  tool: string;
  /** `sm` for card chips, `md` for the case-study stack. */
  size?: "sm" | "md";
  className?: string;
}

/**
 * One tool as a rounded capsule: its brand icon in a small well, then the
 * name. The single chip shape every stack listing on the site uses, so a
 * tool looks the same on a card, in the stack panel and in the marquee.
 */
export function TechCapsule({ tool, size = "md", className }: TechCapsuleProps) {
  const { icon: Icon, color } = getTechMeta(tool);
  const small = size === "sm";

  return (
    <li
      className={cn(
        "inline-flex items-center rounded-full border border-white/[0.12] bg-white/[0.035] font-medium text-neutral-200 transition-colors duration-200 hover:border-emerald-400/40 hover:bg-emerald-400/[0.06]",
        small ? "gap-1.5 py-0.5 pr-2.5 pl-0.5 text-xs" : "gap-2 py-1 pr-3.5 pl-1 text-sm",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full",
          small ? "h-5 w-5" : "h-6 w-6",
        )}
        style={{ backgroundColor: `${color}1f` }}
      >
        <Icon className={small ? "h-3 w-3" : "h-3.5 w-3.5"} style={{ color }} />
      </span>
      <span className="whitespace-nowrap">{tool}</span>
    </li>
  );
}
