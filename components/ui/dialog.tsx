"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, defaultOpen, onOpenChange, children }: DialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false);
  const current = open ?? internalOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (open === undefined) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange, open]
  );

  return <DialogContext.Provider value={{ open: current, setOpen }}>{children}</DialogContext.Provider>;
}

interface DialogTriggerProps {
  asChild?: boolean;
  children: React.ReactElement;
}

export function DialogTrigger({ asChild, children }: DialogTriggerProps) {
  const context = React.useContext(DialogContext);
  if (!context) throw new Error("DialogTrigger must be used within Dialog");

  if (asChild) {
    return React.cloneElement(children, {
      onClick: () => {
        context.setOpen(true);
        children.props.onClick?.();
      }
    });
  }

  return <button onClick={() => context.setOpen(true)}>{children}</button>;
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function DialogContent({ className, children, ...props }: DialogContentProps) {
  const context = React.useContext(DialogContext);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!context?.open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") context.setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [context]);

  if (!context || !mounted || !context.open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => context.setOpen(false)}
        type="button"
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-2xl rounded-xl border border-brand-border bg-brand-surface p-6 shadow-card",
          className
        )}
        {...props}
      >
        <button
          className="absolute right-3 top-3 rounded-md p-2 text-brand-muted transition hover:bg-white/10 hover:text-brand-text"
          onClick={() => context.setOpen(false)}
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-3 space-y-1", className)} {...props} />;
}

export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("font-display text-2xl text-brand-text", className)} {...props} />;
}

export function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-brand-muted", className)} {...props} />;
}

