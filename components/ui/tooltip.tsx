"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

interface TooltipProps {
  children: React.ReactNode;
}

interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const TooltipContext = React.createContext<TooltipContextValue | null>(null);

export function Tooltip({ children }: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  return <TooltipContext.Provider value={{ open, setOpen }}>{children}</TooltipContext.Provider>;
}

export function TooltipTrigger({ asChild, children }: { asChild?: boolean; children: React.ReactElement }) {
  const context = React.useContext(TooltipContext);
  if (!context) throw new Error("TooltipTrigger must be used within Tooltip");

  const props = {
    onMouseEnter: () => context.setOpen(true),
    onMouseLeave: () => context.setOpen(false),
    onFocus: () => context.setOpen(true),
    onBlur: () => context.setOpen(false)
  };

  if (asChild) {
    return React.cloneElement(children, {
      ...props,
      ...children.props
    });
  }

  return <span {...props}>{children}</span>;
}

export function TooltipContent({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(TooltipContext);
  if (!context?.open) return null;

  return (
    <div
      className={cn(
        "absolute z-20 mt-2 rounded-md border border-brand-border bg-brand-surface px-2 py-1 text-xs text-brand-text shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}

