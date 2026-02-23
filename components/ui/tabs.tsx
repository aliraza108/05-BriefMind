"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

interface TabsProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

export function Tabs({ value, defaultValue, onValueChange, className, children }: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const current = value ?? internalValue;
  const setValue = React.useCallback(
    (next: string) => {
      if (value === undefined) setInternalValue(next);
      onValueChange?.(next);
    },
    [onValueChange, value]
  );

  return (
    <TabsContext.Provider value={{ value: current, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("inline-flex rounded-lg border border-brand-border bg-black/20 p-1", className)}>
      {children}
    </div>
  );
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function TabsTrigger({ className, value, children, ...props }: TabsTriggerProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used inside Tabs");
  const active = context.value === value;

  return (
    <button
      className={cn(
        "rounded-md px-3 py-2 text-sm transition-colors",
        active
          ? "bg-brand-cyan text-brand-bg shadow-[0_0_20px_rgba(0,212,255,0.45)]"
          : "text-brand-muted hover:text-brand-text",
        className
      )}
      onClick={() => context.setValue(value)}
      role="tab"
      aria-selected={active}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({ className, value, children, ...props }: TabsContentProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used inside Tabs");
  if (context.value !== value) return null;

  return (
    <div className={cn("mt-4", className)} role="tabpanel" {...props}>
      {children}
    </div>
  );
}

