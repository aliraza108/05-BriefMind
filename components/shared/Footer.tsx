import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-brand-surface/70">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-xl text-brand-text">BriefMind</p>
          <p className="mt-2 max-w-xs text-sm text-brand-muted">
            Executive-grade document distillation for strategy, research, and rapid decision cycles.
          </p>
        </div>
        <div className="space-y-2 text-sm text-brand-muted">
          <p className="font-medium text-brand-text">Links</p>
          <Link className="block hover:text-brand-text" href="/">Home</Link>
          <Link className="block hover:text-brand-text" href="/app">App</Link>
          <Link className="block hover:text-brand-text" href="/docs">Docs</Link>
          <a className="block hover:text-brand-text" href="https://05-briefmind-api.vercel.app/docs" rel="noreferrer" target="_blank">API Docs</a>
        </div>
        <div className="space-y-3 text-sm text-brand-muted">
          <Badge variant="cyan">Powered by Gemini 2.5 Flash</Badge>
          <p>Built with Next.js</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-3 text-center text-xs text-brand-muted lg:px-8">
        © 2025 BriefMind. All rights reserved.
      </div>
    </footer>
  );
}

