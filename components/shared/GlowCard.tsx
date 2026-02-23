import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function GlowCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-cyan-400/20 bg-white/[0.03] p-4 shadow-card backdrop-blur-xl transition hover:border-cyan-300/50 hover:shadow-glow",
        className
      )}
      {...props}
    />
  );
}

