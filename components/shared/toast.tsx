"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "default" | "success" | "error";

interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
}

interface ToastContextValue {
  toast: (payload: Omit<ToastMessage, "id">) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = React.useState<ToastMessage[]>([]);

  const toast = React.useCallback((payload: Omit<ToastMessage, "id">) => {
    const id = crypto.randomUUID();
    setMessages((current) => [...current, { ...payload, id }]);
    window.setTimeout(() => {
      setMessages((current) => current.filter((item) => item.id !== id));
    }, 4500);
  }, []);

  const remove = React.useCallback((id: string) => {
    setMessages((current) => current.filter((item) => item.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex w-full max-w-sm flex-col gap-2">
        {messages.map((item) => (
          <div
            key={item.id}
            className={cn(
              "pointer-events-auto rounded-lg border p-3 text-sm shadow-card backdrop-blur",
              item.variant === "error" && "border-rose-400/60 bg-rose-950/70 text-rose-100",
              item.variant === "success" && "border-emerald-400/60 bg-emerald-950/70 text-emerald-100",
              (!item.variant || item.variant === "default") && "border-brand-border bg-brand-surface/95 text-brand-text"
            )}
          >
            <div className="flex items-start gap-2">
              <div className="min-w-0 flex-1">
                <p className="font-medium">{item.title}</p>
                {item.description ? <p className="mt-1 text-xs opacity-90">{item.description}</p> : null}
              </div>
              <button className="rounded p-1 hover:bg-white/10" onClick={() => remove(item.id)} type="button">
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

