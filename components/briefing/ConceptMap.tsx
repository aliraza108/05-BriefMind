"use client";

import { useMemo, useState } from "react";
import { Briefing, GraphLink, GraphNode } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const typeColor: Record<string, string> = {
  theme: "#00D4FF",
  entity: "#8B5CF6",
  action: "#10B981",
  risk: "#EF4444",
  opportunity: "#F59E0B"
};

function buildFallbackMap() {
  const nodes: GraphNode[] = [
    { id: "theme:market", label: "Market Shift", type: "theme", value: 9 },
    { id: "entity:teams", label: "Ops Teams", type: "entity", value: 6 },
    { id: "action:pilot", label: "Run Pilot", type: "action", value: 7 },
    { id: "risk:governance", label: "Governance Risk", type: "risk", value: 6 },
    { id: "opp:margin", label: "Margin Lift", type: "opportunity", value: 8 }
  ];
  const links: GraphLink[] = [
    { source: "theme:market", target: "action:pilot", relation: "drives" },
    { source: "action:pilot", target: "entity:teams", relation: "owned by" },
    { source: "action:pilot", target: "risk:governance", relation: "constrained by" },
    { source: "action:pilot", target: "opp:margin", relation: "enables" }
  ];
  return { nodes, links };
}

export function ConceptMap({ briefing }: { briefing: Briefing }) {
  const payload = briefing.concept_map?.nodes?.length ? briefing.concept_map : buildFallbackMap();
  const [activeNode, setActiveNode] = useState<string | null>(payload.nodes[0]?.id ?? null);

  const layout = useMemo(
    () =>
      payload.nodes.map((node, index) => {
        const angle = (index / Math.max(payload.nodes.length, 1)) * Math.PI * 2;
        return {
          ...node,
          x: 50 + Math.cos(angle) * 38,
          y: 50 + Math.sin(angle) * 32
        };
      }),
    [payload.nodes]
  );

  const edges = useMemo(
    () =>
      payload.links.filter(
        (link) => !activeNode || link.source === activeNode || link.target === activeNode
      ),
    [activeNode, payload.links]
  );

  const lookup = useMemo(() => Object.fromEntries(layout.map((node) => [node.id, node])), [layout]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-brand-border bg-brand-surface/70 p-3">
        <div className="relative h-[360px] overflow-hidden rounded-lg border border-brand-border bg-black/30">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {payload.links.map((link, index) => {
              const source = lookup[link.source];
              const target = lookup[link.target];
              if (!source || !target) return null;
              const highlighted = edges.some((edge) => edge.source === link.source && edge.target === link.target);
              return (
                <line
                  key={`${link.source}-${link.target}-${index}`}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={highlighted ? "#00D4FF" : "rgba(148, 163, 184, 0.35)"}
                  strokeWidth={highlighted ? 0.45 : 0.22}
                />
              );
            })}
          </svg>

          {layout.map((node) => {
            const active = activeNode === node.id;
            return (
              <button
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2 py-1 text-[11px] transition",
                  active
                    ? "border-cyan-300 bg-cyan-500/20 text-cyan-100 shadow-glow"
                    : "border-brand-border bg-black/60 text-brand-muted hover:border-cyan-500/60"
                )}
                key={node.id}
                onClick={() => setActiveNode(node.id)}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  fontSize: `${Math.max(10, Math.min(14, 10 + (node.value ?? 5) / 3))}px`
                }}
                type="button"
              >
                {node.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-brand-border bg-brand-surface/70 p-4 text-sm">
        <h4 className="mb-3 font-display text-xl text-brand-text">Legend</h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(typeColor).map(([type, color]) => (
            <Badge key={type} style={{ borderColor: `${color}88`, color }}>
              {type}
            </Badge>
          ))}
        </div>
        <div className="mt-4 space-y-1 text-brand-muted">
          {edges.map((edge, index) => (
            <p key={`${edge.source}-${edge.target}-${index}`}>
              {lookup[edge.source]?.label} ? {lookup[edge.target]?.label}
              {edge.relation ? ` (${edge.relation})` : ""}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

