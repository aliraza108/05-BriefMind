"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Briefing } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { ImpactBar } from "@/components/shared/ImpactBar";
import { GlowCard } from "@/components/shared/GlowCard";

export function KeyInsights({ briefing }: { briefing: Briefing }) {
  const insights = useMemo(() => briefing.key_insights ?? [], [briefing.key_insights]);
  const themes = useMemo(
    () => Array.from(new Set(insights.map((item) => item.theme).filter(Boolean) as string[])),
    [insights]
  );
  const [activeTheme, setActiveTheme] = useState<string>("all");

  const filtered = useMemo(() => {
    if (activeTheme === "all") return insights;
    return insights.filter((insight) => insight.theme === activeTheme);
  }, [activeTheme, insights]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          className={`rounded-full border px-3 py-1 text-xs ${activeTheme === "all" ? "border-cyan-300 bg-cyan-500/15 text-cyan-100" : "border-brand-border text-brand-muted"}`}
          onClick={() => setActiveTheme("all")}
          type="button"
        >
          All Themes
        </button>
        {themes.map((theme) => (
          <button
            className={`rounded-full border px-3 py-1 text-xs ${activeTheme === theme ? "border-cyan-300 bg-cyan-500/15 text-cyan-100" : "border-brand-border text-brand-muted"}`}
            key={theme}
            onClick={() => setActiveTheme(theme)}
            type="button"
          >
            {theme}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((item, index) => (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 16 }}
            key={item.id ?? `${item.insight}-${index}`}
            transition={{ delay: index * 0.06, duration: 0.35 }}
          >
            <GlowCard className="grid gap-3 md:grid-cols-[auto_1fr]">
              <div className="min-w-16 text-center">
                <p className="font-display text-4xl text-cyan-300">{item.rank ?? index + 1}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-brand-text">{item.insight}</p>
                <ImpactBar score={item.impact_score ?? 6} />
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="cyan">{item.theme ?? "General"}</Badge>
                  {item.evidence ? <span className="text-xs text-brand-muted">Evidence: {item.evidence}</span> : null}
                </div>
              </div>
            </GlowCard>
          </motion.div>
        ))}
        {!filtered.length ? <p className="text-sm text-brand-muted">No insights available for this theme.</p> : null}
      </div>
    </div>
  );
}
