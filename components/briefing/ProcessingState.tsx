"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ProcessingStep } from "@/hooks/useDocumentProcessor";

interface ProcessingStateProps {
  progress: number;
  steps: ProcessingStep[];
}

export function ProcessingState({ progress, steps }: ProcessingStateProps) {
  return (
    <div className="space-y-4 rounded-xl border border-brand-border bg-brand-surface/80 p-5">
      <h3 className="font-display text-xl text-brand-text">Processing Document</h3>
      <p className="text-sm text-brand-muted">Processing... ~15 seconds</p>
      <Progress value={progress} />
      <div className="space-y-2">
        {steps.map((step) => (
          <motion.div
            animate={{ opacity: 1, scale: step.status === "completed" ? 1.01 : 1 }}
            className={cn(
              "flex items-center gap-2 rounded-md border px-3 py-2 text-sm",
              step.status === "completed" && "border-emerald-400/40 bg-emerald-500/10",
              step.status === "active" && "border-cyan-400/40 bg-cyan-500/10",
              step.status === "pending" && "border-brand-border bg-black/20"
            )}
            key={step.label}
          >
            {step.status === "completed" ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
            ) : step.status === "active" ? (
              <Loader2 className="h-4 w-4 animate-spin text-cyan-300" />
            ) : (
              <div className="h-2 w-2 rounded-full bg-brand-muted" />
            )}
            <span className="text-brand-text">{step.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

