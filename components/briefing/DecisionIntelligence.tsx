import { Badge } from "@/components/ui/badge";
import { Briefing } from "@/lib/types";

function PriorityBadge({ value }: { value?: string }) {
  const variant = value === "HIGH" ? "danger" : value === "MED" ? "warning" : "success";
  return <Badge variant={variant}>{value ?? "LOW"}</Badge>;
}

export function DecisionIntelligence({ briefing }: { briefing: Briefing }) {
  const decision = briefing.decision_intelligence;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <section className="rounded-xl border border-brand-border bg-brand-surface/70 p-4">
          <h4 className="font-display text-xl text-brand-text">Actions</h4>
          <div className="mt-3 space-y-2">
            {(decision?.actions ?? []).map((item, idx) => (
              <div className="rounded-md border border-brand-border bg-black/20 p-3 text-sm" key={`${item.action}-${idx}`}>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-brand-text">{item.action}</p>
                  <PriorityBadge value={item.priority} />
                </div>
                <p className="text-brand-muted">Timeline: {item.timeline ?? "TBD"}</p>
                <p className="text-brand-muted">Owner: {item.owner ?? "Unassigned"}</p>
                {item.rationale ? <p className="mt-1 text-brand-muted">{item.rationale}</p> : null}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-brand-border bg-brand-surface/70 p-4">
          <h4 className="font-display text-xl text-brand-text">Risks</h4>
          <div className="mt-3 space-y-2">
            {(decision?.risks ?? []).map((item, idx) => (
              <div className="rounded-md border border-rose-400/30 bg-rose-500/10 p-3 text-sm" key={`${item.risk}-${idx}`}>
                <p className="text-rose-100">{item.risk}</p>
                <p className="text-rose-200/80">Severity: {item.severity ?? "Unknown"} | Likelihood: {item.likelihood ?? "Unknown"}</p>
                {item.mitigation ? <p className="mt-1 text-rose-100/80">Mitigation: {item.mitigation}</p> : null}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-brand-border bg-brand-surface/70 p-4">
          <h4 className="font-display text-xl text-brand-text">Opportunities</h4>
          <div className="mt-3 space-y-2">
            {(decision?.opportunities ?? []).map((item, idx) => (
              <div className="rounded-md border border-emerald-400/30 bg-emerald-500/10 p-3 text-sm" key={`${item.opportunity}-${idx}`}>
                <p className="text-emerald-100">{item.opportunity}</p>
                <p className="text-emerald-200/80">Impact: {item.impact ?? "Medium"} | Effort: {item.effort ?? "Medium"}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-brand-border bg-brand-surface/70 p-4">
          <h4 className="font-display text-xl text-brand-text">Warnings</h4>
          <div className="mt-3 space-y-2">
            {(decision?.warnings ?? []).map((item, idx) => (
              <div className="rounded-md border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-100" key={`${item.warning}-${idx}`}>
                {item.warning}
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-4">
        <h4 className="font-display text-xl text-amber-100">Key Decision Required</h4>
        <p className="mt-2 text-sm text-amber-50">
          {decision?.key_decision_required?.title ?? "No explicit decision item available."}
        </p>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          <Badge variant="warning">Deadline: {decision?.key_decision_required?.deadline ?? "TBD"}</Badge>
          {(decision?.key_decision_required?.stakeholders ?? []).map((item) => (
            <Badge key={item} variant="warning">{item}</Badge>
          ))}
        </div>
      </section>
    </div>
  );
}

