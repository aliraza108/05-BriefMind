"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { chatWithDoc } from "@/lib/api";
import { Briefing } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBriefingStore } from "@/hooks/useBriefingStore";
import { useToast } from "@/components/shared/toast";

interface ChatModeProps {
  briefing: Briefing;
}

export function ChatMode({ briefing }: ChatModeProps) {
  const docId = briefing.doc_id;
  const { toast } = useToast();
  const messages = useBriefingStore((state) => state.chatHistory[docId] ?? []);
  const addChatMessage = useBriefingStore((state) => state.addChatMessage);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messages.length) return;
    addChatMessage(docId, {
      id: crypto.randomUUID(),
      role: "assistant",
      text: "Ask me anything about this document...",
      citations: ["Briefing context"]
    });
  }, [addChatMessage, docId, messages.length]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const askQuestion = async (question: string) => {
    if (!question.trim() || sending) return;
    setSending(true);
    setInput("");

    addChatMessage(docId, {
      id: crypto.randomUUID(),
      role: "user",
      text: question
    });

    try {
      const response = await chatWithDoc(docId, question);
      addChatMessage(docId, {
        id: crypto.randomUUID(),
        role: "assistant",
        text: response.answer ?? response.response ?? "No answer received.",
        citations: response.citations,
        suggestions: response.suggested_questions ?? response.suggestions
      });
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Chat request failed.";
      toast({ title: "Chat failed", description: message, variant: "error" });
    } finally {
      setSending(false);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void askQuestion(input);
  };

  return (
    <div className="rounded-xl border border-brand-border bg-brand-surface/70">
      <div className="max-h-[430px] space-y-3 overflow-y-auto p-4">
        {messages.map((message) => (
          <div key={message.id}>
            <div className={`max-w-[85%] rounded-xl border px-3 py-2 text-sm ${message.role === "user" ? "ml-auto border-cyan-400/40 bg-cyan-500/15 text-cyan-100" : "border-brand-border bg-black/30 text-brand-text"}`}>
              {message.text}
            </div>
            {message.role === "assistant" && message.citations?.length ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {message.citations.map((citation, index) => (
                  <Badge key={`${citation}-${index}`}>Source: {citation}</Badge>
                ))}
              </div>
            ) : null}
            {message.role === "assistant" && message.suggestions?.length ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {message.suggestions.slice(0, 3).map((suggestion) => (
                  <button
                    className="rounded-full border border-brand-border px-3 py-1 text-xs text-brand-muted transition hover:border-cyan-400/50 hover:text-cyan-200"
                    key={suggestion}
                    onClick={() => void askQuestion(suggestion)}
                    type="button"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
      <form className="flex items-center gap-2 border-t border-brand-border p-3" onSubmit={onSubmit}>
        <input
          className="h-10 flex-1 rounded-md border border-brand-border bg-black/20 px-3 text-sm outline-none transition focus:border-cyan-300"
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask for implications, risks, stakeholders..."
          value={input}
        />
        <Button disabled={sending || !input.trim()} size="icon" type="submit">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

