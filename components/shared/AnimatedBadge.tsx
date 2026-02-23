import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AnimatedBadgeProps {
  label: string;
  variant?: "default" | "cyan" | "success" | "warning" | "danger";
  className?: string;
}

export function AnimatedBadge({ label, variant = "default", className }: AnimatedBadgeProps) {
  return <Badge className={cn("animate-glow-pulse", className)} variant={variant}>{label}</Badge>;
}

