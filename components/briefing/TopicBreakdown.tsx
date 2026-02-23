import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Briefing } from "@/lib/types";

export function TopicBreakdown({ briefing }: { briefing: Briefing }) {
  const topics = briefing.topic_breakdown ?? [];
  const entities = briefing.named_entities;

  return (
    <div className="space-y-6">
      <Accordion className="space-y-3" collapsible type="single">
        {topics.map((topic, index) => (
          <AccordionItem key={`${topic.theme}-${index}`} value={topic.theme}>
            <AccordionTrigger value={topic.theme}>{topic.theme}</AccordionTrigger>
            <AccordionContent className="space-y-3" value={topic.theme}>
              <p>{topic.summary ?? "No summary provided."}</p>
              {topic.key_points?.length ? (
                <ul className="list-disc space-y-1 pl-5 text-sm text-brand-muted">
                  {topic.key_points.map((point, idx) => (
                    <li key={`${point}-${idx}`}>{point}</li>
                  ))}
                </ul>
              ) : null}
              {topic.chunk_refs?.length ? (
                <div className="flex flex-wrap gap-2">
                  {topic.chunk_refs.map((ref) => (
                    <Badge key={ref}>{ref}</Badge>
                  ))}
                </div>
              ) : null}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="space-y-3 rounded-xl border border-brand-border bg-brand-surface/70 p-4">
        <h4 className="font-display text-xl text-brand-text">Named Entities</h4>
        <div className="space-y-3 text-sm">
          <div>
            <p className="mb-1 text-xs uppercase tracking-[0.12em] text-brand-muted">People</p>
            <div className="flex flex-wrap gap-2">{(entities?.people ?? []).map((item) => <Badge key={item}>{item}</Badge>)}</div>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase tracking-[0.12em] text-brand-muted">Orgs</p>
            <div className="flex flex-wrap gap-2">{(entities?.organizations ?? []).map((item) => <Badge key={item}>{item}</Badge>)}</div>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase tracking-[0.12em] text-brand-muted">Locations</p>
            <div className="flex flex-wrap gap-2">{(entities?.locations ?? []).map((item) => <Badge key={item}>{item}</Badge>)}</div>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase tracking-[0.12em] text-brand-muted">Dates</p>
            <div className="flex flex-wrap gap-2">{(entities?.dates ?? []).map((item) => <Badge key={item}>{item}</Badge>)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

