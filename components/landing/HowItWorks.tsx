"use client";

import { motion } from "framer-motion";

const steps = ["Upload Document", "AI Distills", "Get Briefing"];

export function HowItWorks() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 lg:px-8">
      <h2 className="font-display text-3xl text-brand-text md:text-4xl">How It Works</h2>
      <div className="relative mt-10 grid gap-4 md:grid-cols-3">
        <motion.div
          className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-cyan-400/20 via-cyan-300/60 to-cyan-400/20 md:block"
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
        />
        {steps.map((step, index) => (
          <motion.div
            className="rounded-xl border border-brand-border bg-brand-surface/70 p-5 backdrop-blur"
            initial={{ opacity: 0, y: 16 }}
            key={step}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-500/10 font-mono text-cyan-300 animate-glow-pulse">
              {index + 1}
            </div>
            <p className="font-display text-xl text-brand-text">{step}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

