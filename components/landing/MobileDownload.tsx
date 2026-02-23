"use client";

import { motion } from "framer-motion";
import { Apple, Laptop2, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function DownloadButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <a className="block" href="#download">
      <Button
        className="w-full justify-between rounded-full border border-brand-border bg-black/50 px-5 text-left text-brand-text hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-200"
        variant="outline"
      >
        <span className="flex items-center gap-3">
          {icon}
          <span className="text-sm">{label}</span>
        </span>
        <Badge variant="warning">Coming Soon</Badge>
      </Button>
    </a>
  );
}

export function MobileDownload() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 lg:px-8">
      <div className="overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-[#0B1220] via-[#0C1628] to-[#09101A] p-6 md:p-8">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-display text-3xl text-brand-text md:text-4xl">BriefMind in Your Pocket</h2>
            <p className="mt-3 max-w-xl text-brand-muted">
              Process documents on the go. Available for iOS and Android.
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <DownloadButton icon={<Apple className="h-4 w-4" />} label="Download on the App Store" />
              <DownloadButton icon={<Smartphone className="h-4 w-4" />} label="Get it on Google Play" />
            </div>
            <div className="mt-3 max-w-md">
              <DownloadButton icon={<Laptop2 className="h-4 w-4" />} label="Download Desktop App (Windows / Mac)" />
            </div>
          </motion.div>

          <motion.div
            className="relative hidden h-64 overflow-hidden rounded-2xl border border-white/10 bg-black/30 lg:block"
            initial={{ opacity: 0, scale: 0.97 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(0,212,255,0.22),transparent_40%),radial-gradient(circle_at_20%_80%,rgba(14,165,233,0.2),transparent_35%)]" />
            <div className="absolute left-1/2 top-1/2 h-56 w-28 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-cyan-300/40 bg-black/40 shadow-[0_0_40px_rgba(0,212,255,0.2)]" />
            <div className="absolute left-1/2 top-1/2 h-44 w-20 -translate-x-1/2 -translate-y-1/2 rounded-[1.2rem] border border-cyan-400/20 bg-gradient-to-b from-cyan-500/10 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

