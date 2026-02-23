"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Lightbulb,
  FolderKanban,
  Gauge,
  Network,
  MessageCircle
} from "lucide-react";
import { GlowCard } from "@/components/shared/GlowCard";

const features = [
  { title: "Executive Summary", desc: "Condensed thesis, context, and bottom-line direction.", icon: Brain },
  { title: "Key Insights Ranked", desc: "Impact-weighted takeaways with supporting evidence.", icon: Lightbulb },
  { title: "Topic Breakdown", desc: "Structured themes with traceable chunk references.", icon: FolderKanban },
  { title: "Decision Intelligence", desc: "Actions, risks, opportunities, and warnings in one view.", icon: Gauge },
  { title: "Concept Map", desc: "Visual graph linking entities, themes, and outcomes.", icon: Network },
  { title: "Ask-Anything Chat", desc: "Interactive Q&A grounded in source context.", icon: MessageCircle }
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const card = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export function FeaturesGrid() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 lg:px-8">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-3xl text-brand-text md:text-4xl">Six Intelligence Layers</h2>
      </motion.div>
      <motion.div
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        initial="hidden"
        variants={container}
        viewport={{ once: true, amount: 0.25 }}
        whileInView="visible"
      >
        {features.map((item) => (
          <motion.div key={item.title} variants={card}>
            <GlowCard className="h-full bg-gradient-to-br from-white/[0.06] to-white/[0.01] transition hover:-translate-y-1">
              <item.icon className="mb-4 h-5 w-5 text-cyan-300" />
              <h3 className="font-display text-xl text-brand-text">{item.title}</h3>
              <p className="mt-2 text-sm text-brand-muted">{item.desc}</p>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

