import { cva, type VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-brand-border bg-brand-surface text-brand-text",
        cyan: "border-cyan-400/50 bg-cyan-500/10 text-cyan-300",
        success: "border-emerald-400/50 bg-emerald-500/10 text-emerald-300",
        warning: "border-amber-400/50 bg-amber-500/10 text-amber-200",
        danger: "border-rose-400/50 bg-rose-500/10 text-rose-200"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

interface BadgeProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

