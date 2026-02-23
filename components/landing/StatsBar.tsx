"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { label: "Documents Processed", value: 50000, suffix: "+" },
  { label: "Avg Read Time", value: 2, suffix: " Min" },
  { label: "Intelligence Layers", value: 6, suffix: "" },
  { label: "Page Max", value: 500, suffix: "" }
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const visible = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!visible) return;
    let frame = 0;
    const start = performance.now();
    const duration = 900;

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setDisplay(Math.round(progress * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, visible]);

  const formatted = useMemo(() => new Intl.NumberFormat("en-US").format(display), [display]);
  return (
    <span ref={ref} className="font-display text-2xl text-brand-text md:text-4xl">
      {formatted}
      {suffix}
    </span>
  );
}

export function StatsBar() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-8 lg:px-8">
      <motion.div
        className="grid gap-4 rounded-xl border border-brand-border bg-brand-surface/60 p-5 backdrop-blur md:grid-cols-4"
        initial={{ opacity: 0, y: 14 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        {stats.map((item) => (
          <div key={item.label}>
            <Counter suffix={item.suffix} value={item.value} />
            <p className="text-xs text-brand-muted md:text-sm">{item.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

