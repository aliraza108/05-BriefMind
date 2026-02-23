import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ImpactBarProps {
  score: number;
  className?: string;
}

export function ImpactBar({ score, className }: ImpactBarProps) {
  const value = Math.max(0, Math.min(10, score));
  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center justify-between text-xs text-brand-muted">
        <span>Impact</span>
        <span className="font-mono text-brand-text">{value.toFixed(1)} / 10</span>
      </div>
      <Progress value={value * 10} />
    </div>
  );
}

