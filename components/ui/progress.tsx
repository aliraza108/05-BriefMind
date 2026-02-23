import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  className?: string;
}

export function Progress({ value, className }: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-white/10", className)}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-brand-cyan shadow-[0_0_16px_rgba(0,212,255,0.55)] transition-all duration-500"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

