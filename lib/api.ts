import { Briefing, ChatResponse, DocumentRecord, ProcessResponse } from "@/lib/types";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://05-briefmind-api.vercel.app";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function uploadDocument(file: File, title?: string): Promise<ProcessResponse> {
  const form = new FormData();
  form.append("file", file);
  if (title) form.append("title", title);
  const res = await fetch(`${BASE}/upload`, { method: "POST", body: form });
  return handleResponse<ProcessResponse>(res);
}

export async function processText(text: string, title: string): Promise<ProcessResponse> {
  const form = new FormData();
  form.append("text", text);
  form.append("title", title || "Untitled Document");
  const res = await fetch(`${BASE}/process`, { method: "POST", body: form });
  return handleResponse<ProcessResponse>(res);
}

export async function getBriefing(docId: string): Promise<Briefing> {
  const res = await fetch(`${BASE}/briefing/${docId}`, { cache: "no-store" });
  return handleResponse<Briefing>(res);
}

export async function chatWithDoc(docId: string, question: string): Promise<ChatResponse> {
  const res = await fetch(`${BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ doc_id: docId, question })
  });
  return handleResponse<ChatResponse>(res);
}

export async function listDocuments(): Promise<DocumentRecord[]> {
  const res = await fetch(`${BASE}/docs`, { cache: "no-store" });
  return handleResponse<DocumentRecord[]>(res);
}

export async function deleteDocument(docId: string) {
  const res = await fetch(`${BASE}/docs/${docId}`, { method: "DELETE" });
  return handleResponse<{ success?: boolean; message?: string }>(res);
}

