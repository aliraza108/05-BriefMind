"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FileClock } from "lucide-react";
import { BriefingTabs } from "@/components/briefing/BriefingTabs";
import { ProcessingState } from "@/components/briefing/ProcessingState";
import { UploadZone } from "@/components/briefing/UploadZone";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDocumentProcessor } from "@/hooks/useDocumentProcessor";
import { useBriefingStore } from "@/hooks/useBriefingStore";
import { getBriefing } from "@/lib/api";
import { DocumentRecord } from "@/lib/types";
import { useToast } from "@/components/shared/toast";

function formatRelativeTime(value?: string) {
  if (!value) return "just now";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "just now";
  const seconds = Math.round((Date.now() - date.getTime()) / 1000);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  if (Math.abs(seconds) < 60) return rtf.format(-seconds, "second");
  const minutes = Math.round(seconds / 60);
  if (Math.abs(minutes) < 60) return rtf.format(-minutes, "minute");
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return rtf.format(-hours, "hour");
  const days = Math.round(hours / 24);
  return rtf.format(-days, "day");
}

export function AppPageClient() {
  const searchParams = useSearchParams();
  const paramDocId = searchParams.get("doc_id");
  const { toast } = useToast();
  const processor = useDocumentProcessor();

  const activeDocId = useBriefingStore((state) => state.activeDocId);
  const setActiveDocId = useBriefingStore((state) => state.setActiveDocId);
  const currentBriefing = useBriefingStore((state) => state.currentBriefing);
  const setCurrentBriefing = useBriefingStore((state) => state.setCurrentBriefing);
  const docs = useBriefingStore((state) => state.sessionDocuments);
  const upsertDoc = useBriefingStore((state) => state.upsertSessionDocument);

  const [fetchingBriefing, setFetchingBriefing] = useState(false);

  const displayDocId = useMemo(() => paramDocId ?? activeDocId, [activeDocId, paramDocId]);

  useEffect(() => {
    if (!paramDocId) return;
    if (paramDocId === currentBriefing?.doc_id) return;

    let cancelled = false;
    const run = async () => {
      try {
        setFetchingBriefing(true);
        const briefing = await getBriefing(paramDocId);
        if (cancelled) return;
        setCurrentBriefing(briefing);
        setActiveDocId(briefing.doc_id);
        upsertDoc({
          doc_id: briefing.doc_id,
          title: briefing.title ?? "Untitled Document",
          word_count: briefing.word_count,
          created_at: briefing.created_at,
          status: "ready"
        });
      } catch (caught) {
        const message = caught instanceof Error ? caught.message : "Failed to load briefing";
        toast({ title: "Could not load document", description: message, variant: "error" });
      } finally {
        if (!cancelled) setFetchingBriefing(false);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [currentBriefing?.doc_id, paramDocId, setActiveDocId, setCurrentBriefing, toast, upsertDoc]);

  const submit = async (payload: { file?: File | null; text?: string; title?: string }) => {
    const result = await processor.run(payload);
    if (!result?.doc_id) {
      toast({ title: "Processing failed", description: processor.error ?? "Try again.", variant: "error" });
      return;
    }

    const doc: DocumentRecord = {
      doc_id: result.doc_id,
      title: result.title ?? payload.title ?? "Untitled Document",
      word_count: result.word_count,
      created_at: new Date().toISOString(),
      status: "ready"
    };

    upsertDoc(doc);
    setActiveDocId(result.doc_id);

    if (result.briefing) {
      setCurrentBriefing(result.briefing);
    } else {
      try {
        const briefing = await getBriefing(result.doc_id);
        setCurrentBriefing(briefing);
      } catch (caught) {
        const message = caught instanceof Error ? caught.message : "Unable to fetch briefing.";
        toast({ title: "Briefing fetch failed", description: message, variant: "error" });
      }
    }
  };

  const openDoc = async (docId: string) => {
    try {
      setFetchingBriefing(true);
      const briefing = await getBriefing(docId);
      setActiveDocId(docId);
      setCurrentBriefing(briefing);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Could not open document";
      toast({ title: "Open failed", description: message, variant: "error" });
    } finally {
      setFetchingBriefing(false);
    }
  };

  const busy = processor.state === "uploading" || processor.state === "processing";

  return (
    <div className="mx-auto w-full max-w-[1450px] px-4 py-8 lg:px-8">
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <aside className="space-y-4">
          {busy ? (
            <ProcessingState progress={processor.progress} steps={processor.steps} />
          ) : (
            <UploadZone busy={busy} onSubmit={submit} />
          )}

          <div className="rounded-xl border border-brand-border bg-brand-surface/70 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-xl text-brand-text">Previous Documents</h3>
              <Badge>{docs.length}</Badge>
            </div>
            <div className="space-y-2">
              {docs.length ? (
                docs.map((doc) => (
                  <div className="rounded-md border border-brand-border bg-black/20 p-3" key={doc.doc_id}>
                    <p className="line-clamp-1 text-sm text-brand-text">{doc.title || "Untitled"}</p>
                    <p className="mt-1 text-xs text-brand-muted">
                      {(doc.word_count ?? 0).toLocaleString("en-US")} words · {formatRelativeTime(doc.created_at)}
                    </p>
                    <Button
                      className="mt-2 h-8"
                      onClick={() => void openDoc(doc.doc_id)}
                      size="sm"
                      variant={displayDocId === doc.doc_id ? "default" : "outline"}
                    >
                      View
                    </Button>
                  </div>
                ))
              ) : (
                <div className="rounded-md border border-dashed border-brand-border p-4 text-center text-xs text-brand-muted">
                  Process a document to build session history.
                </div>
              )}
            </div>
          </div>
        </aside>

        <section>
          {fetchingBriefing ? (
            <div className="space-y-3 rounded-xl border border-brand-border bg-brand-surface/70 p-5">
              <div className="h-8 w-1/3 animate-pulse rounded-md bg-white/10" />
              <div className="h-16 animate-pulse rounded-md bg-white/5" />
              <div className="h-16 animate-pulse rounded-md bg-white/5" />
              <div className="h-16 animate-pulse rounded-md bg-white/5" />
            </div>
          ) : (
            <BriefingTabs briefing={currentBriefing} />
          )}
          {!currentBriefing ? (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-brand-border bg-brand-surface/60 p-3 text-sm text-brand-muted">
              <FileClock className="h-4 w-4 text-cyan-300" />
              Your active briefing appears here after processing.
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
