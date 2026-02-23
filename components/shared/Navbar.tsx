"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/app", label: "App" },
  { href: "/docs", label: "Docs" },
  { href: "https://05-briefmind-api.vercel.app/docs", label: "API", external: true }
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link className="group flex items-center gap-3" href="/">
          <div className="rounded-md border border-cyan-400/60 bg-cyan-500/10 px-2 py-1 font-display text-lg text-cyan-300 transition group-hover:shadow-glow">
            B
          </div>
          <div>
            <p className="font-display text-xl text-brand-text">BriefMind</p>
            <p className="text-xs text-brand-muted">Knowledge Distillation Engine</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            if (link.external) {
              return (
                <a
                  className="text-sm text-brand-muted transition hover:text-brand-text"
                  href={link.href}
                  rel="noreferrer"
                  target="_blank"
                  key={link.href}
                >
                  {link.label}
                </a>
              );
            }

            return (
              <Link
                className={cn(
                  "relative text-sm text-brand-muted transition hover:text-brand-text",
                  active && "text-brand-text"
                )}
                href={link.href}
                key={link.href}
              >
                {link.label}
                {active ? <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-brand-cyan" /> : null}
              </Link>
            );
          })}
        </nav>

        <button
          className="rounded-md border border-brand-border p-2 text-brand-text md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          type="button"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-brand-border bg-brand-surface/95 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                className="text-sm text-brand-muted transition hover:text-brand-text"
                href={link.href}
                key={link.href}
                onClick={() => setOpen(false)}
                target={link.external ? "_blank" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

