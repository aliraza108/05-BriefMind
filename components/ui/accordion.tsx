"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionContextValue {
  openItem: string | null;
  setOpenItem: (value: string | null) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

interface AccordionProps {
  type?: "single";
  collapsible?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Accordion({ className, children }: AccordionProps) {
  const [openItem, setOpenItem] = React.useState<string | null>(null);
  return (
    <AccordionContext.Provider value={{ openItem, setOpenItem }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function AccordionItem({ className, value, children, ...props }: AccordionItemProps) {
  return (
    <div className={cn("rounded-lg border border-brand-border bg-white/5", className)} data-item-value={value} {...props}>
      {children}
    </div>
  );
}

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function AccordionTrigger({ className, value, children, ...props }: AccordionTriggerProps) {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("AccordionTrigger must be used within Accordion");
  const isOpen = context.openItem === value;

  return (
    <button
      className={cn("flex w-full items-center justify-between px-4 py-3 text-left text-sm text-brand-text", className)}
      onClick={() => context.setOpenItem(isOpen ? null : value)}
      type="button"
      {...props}
    >
      <span>{children}</span>
      <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
    </button>
  );
}

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function AccordionContent({ className, value, children, ...props }: AccordionContentProps) {
  const context = React.useContext(AccordionContext);
  if (!context || context.openItem !== value) return null;

  return (
    <div className={cn("px-4 pb-4 text-sm text-brand-muted", className)} {...props}>
      {children}
    </div>
  );
}

