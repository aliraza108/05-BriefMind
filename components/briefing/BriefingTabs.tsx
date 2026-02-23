"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Briefing } from "@/lib/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExecutiveSummary } from "@/components/briefing/ExecutiveSummary";
import { KeyInsights } from "@/components/briefing/KeyInsights";
import { TopicBreakdown } from "@/components/briefing/TopicBreakdown";
import { DecisionIntelligence } from "@/components/briefing/DecisionIntelligence";
import { ConceptMap } from "@/components/briefing/ConceptMap";
import { ChatMode } from "@/components/briefing/ChatMode";

const tabs = [
  { value: "summary", label: "Executive Summary" },
  { value: "insights", label: "Key Insights" },
  { value: "topics", label: "Topic Breakdown" },
  { value: "decisions", label: "Decision Intelligence" },
  { value: "map", label: "Concept Map" },
  { value: "chat", label: "Chat Mode" }
];

export function BriefingTabs({ briefing }: { briefing: Briefing | null }) {
  const [tab, setTab] = useState("summary");

  if (!briefing) {
    return (
      <div className="rounded-xl border border-brand-border bg-brand-surface/70 p-8 text-center text-sm text-brand-muted">
        Upload a document or paste text to generate your first briefing.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-brand-border bg-brand-surface/70 p-4 md:p-6">
      <Tabs onValueChange={setTab} value={tab}>
        <TabsList className="w-full overflow-x-auto">
          {tabs.map((item) => (
            <TabsTrigger className="whitespace-nowrap" key={item.value} value={item.value}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <AnimatePresence mode="wait">
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="mt-5"
          exit={{ opacity: 0, x: -14 }}
          initial={{ opacity: 0, x: 14 }}
          key={tab}
          transition={{ duration: 0.25 }}
        >
          {tab === "summary" ? <ExecutiveSummary briefing={briefing} /> : null}
          {tab === "insights" ? <KeyInsights briefing={briefing} /> : null}
          {tab === "topics" ? <TopicBreakdown briefing={briefing} /> : null}
          {tab === "decisions" ? <DecisionIntelligence briefing={briefing} /> : null}
          {tab === "map" ? <ConceptMap briefing={briefing} /> : null}
          {tab === "chat" ? <ChatMode briefing={briefing} /> : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

