"use client";
import { cn } from "@/lib/utils";

export function GridBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      <div
        className={cn(
          "absolute inset-0 h-full w-full",
          "[background-size:20px_20px]",
          "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
          "bg-black"
        )}
      />
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    </div>
  );
}
