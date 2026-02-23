"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Trash2, Library } from "lucide-react";
import { deleteDocument, listDocuments } from "@/lib/api";
import { DocumentRecord } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useToast } from "@/components/shared/toast";

export default function DocsPage() {
  const { toast } = useToast();
  const [docs, setDocs] = useState<DocumentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const response = await listDocuments();
        setDocs(response);
      } catch (caught) {
        const message = caught instanceof Error ? caught.message : "Failed to fetch documents";
        toast({ title: "Load error", description: message, variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    void run();
  }, [toast]);

  const onDelete = async (docId: string) => {
    try {
      setDeletingId(docId);
      await deleteDocument(docId);
      setDocs((current) => current.filter((doc) => doc.doc_id !== docId));
      toast({ title: "Document deleted", variant: "success" });
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Delete failed";
      toast({ title: "Delete failed", description: message, variant: "error" });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl text-brand-text">Document Library</h1>
          <p className="mt-2 text-sm text-brand-muted">All processed documents from the BriefMind API.</p>
        </div>
        <Badge variant="cyan">{docs.length} docs</Badge>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="h-40 animate-pulse rounded-xl border border-brand-border bg-brand-surface/60" key={index} />
          ))}
        </div>
      ) : docs.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {docs.map((doc) => (
            <article className="rounded-xl border border-brand-border bg-brand-surface/70 p-4" key={doc.doc_id}>
              <div className="mb-2 flex items-start justify-between gap-2">
                <h2 className="line-clamp-2 font-display text-xl text-brand-text">{doc.title || "Untitled Document"}</h2>
                <Badge variant={doc.status === "ready" ? "success" : "default"}>{doc.status ?? "ready"}</Badge>
              </div>
              <p className="text-xs text-brand-muted">{(doc.word_count ?? 0).toLocaleString("en-US")} words</p>
              <p className="text-xs text-brand-muted">Created: {formatDateTime(doc.created_at)}</p>

              <div className="mt-4 flex items-center justify-between">
                <Link href={`/app?doc_id=${doc.doc_id}`}>
                  <Button size="sm">Open Briefing</Button>
                </Link>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="icon" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete document?</DialogTitle>
                      <DialogDescription>
                        This removes the document and briefing output from the API.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-2">
                      <Button
                        disabled={deletingId === doc.doc_id}
                        onClick={() => void onDelete(doc.doc_id)}
                        variant="destructive"
                      >
                        {deletingId === doc.doc_id ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-brand-border bg-brand-surface/60 p-12 text-center">
          <Library className="mx-auto h-10 w-10 text-cyan-300" />
          <p className="mt-4 font-display text-2xl text-brand-text">No documents yet. Process your first document.</p>
          <Link className="mt-4 inline-block text-sm text-cyan-300 underline" href="/app">
            Go to App
          </Link>
        </div>
      )}
    </div>
  );
}

