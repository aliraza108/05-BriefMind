import { Briefing } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { GlowCard } from "@/components/shared/GlowCard";

export function ExecutiveSummary({ briefing }: { briefing: Briefing }) {
  const summary = briefing.executive_summary;
  const findings = summary?.findings?.slice(0, 3) ?? [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-3xl text-brand-text">{summary?.headline ?? "Executive Brief Ready"}</h3>
        <Badge variant="cyan">{summary?.read_time ?? "~2 min read"}</Badge>
      </div>
      <GlowCard>
        <p className="text-sm text-brand-muted">{summary?.context ?? "Context will appear once briefing content is loaded."}</p>
      </GlowCard>
      <GlowCard className="border-cyan-400/40 bg-cyan-500/10">
        <p className="text-sm font-medium text-cyan-100">{summary?.core_message ?? "Core strategic message unavailable."}</p>
      </GlowCard>

      <div className="grid gap-3 md:grid-cols-3">
        {findings.length > 0
          ? findings.map((finding, index) => (
              <GlowCard key={`${finding.title}-${index}`}>
                <p className="font-display text-2xl text-cyan-300">{index + 1}</p>
                <p className="mt-2 text-sm text-brand-text">{finding.detail}</p>
              </GlowCard>
            ))
          : [1, 2, 3].map((item) => (
              <GlowCard key={item}><p className="text-sm text-brand-muted">Finding slot {item}</p></GlowCard>
            ))}
      </div>

      <div className="rounded-lg border border-amber-400/40 bg-amber-500/10 p-4 text-sm text-amber-100">
        <p className="font-semibold uppercase tracking-[0.12em] text-amber-300">Bottom line</p>
        <p className="mt-2">{summary?.bottom_line ?? "Bottom line summary is not available."}</p>
      </div>
    </div>
  );
}

