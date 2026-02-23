"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Briefing, ChatMessage, DocumentRecord } from "@/lib/types";

interface BriefingStore {
  activeDocId: string | null;
  currentBriefing: Briefing | null;
  sessionDocuments: DocumentRecord[];
  chatHistory: Record<string, ChatMessage[]>;
  setActiveDocId: (docId: string | null) => void;
  setCurrentBriefing: (briefing: Briefing | null) => void;
  upsertSessionDocument: (doc: DocumentRecord) => void;
  setSessionDocuments: (docs: DocumentRecord[]) => void;
  removeSessionDocument: (docId: string) => void;
  addChatMessage: (docId: string, message: ChatMessage) => void;
  clearChat: (docId: string) => void;
}

export const useBriefingStore = create<BriefingStore>()(
  persist(
    (set) => ({
      activeDocId: null,
      currentBriefing: null,
      sessionDocuments: [],
      chatHistory: {},
      setActiveDocId: (docId) => set({ activeDocId: docId }),
      setCurrentBriefing: (briefing) => set({ currentBriefing: briefing }),
      upsertSessionDocument: (doc) =>
        set((state) => {
          const filtered = state.sessionDocuments.filter((item) => item.doc_id !== doc.doc_id);
          return { sessionDocuments: [doc, ...filtered].slice(0, 20) };
        }),
      setSessionDocuments: (docs) => set({ sessionDocuments: docs.slice(0, 50) }),
      removeSessionDocument: (docId) =>
        set((state) => ({
          sessionDocuments: state.sessionDocuments.filter((doc) => doc.doc_id !== docId)
        })),
      addChatMessage: (docId, message) =>
        set((state) => ({
          chatHistory: {
            ...state.chatHistory,
            [docId]: [...(state.chatHistory[docId] ?? []), message]
          }
        })),
      clearChat: (docId) =>
        set((state) => ({
          chatHistory: {
            ...state.chatHistory,
            [docId]: []
          }
        }))
    }),
    {
      name: "briefmind-session",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        activeDocId: state.activeDocId,
        sessionDocuments: state.sessionDocuments,
        chatHistory: state.chatHistory
      })
    }
  )
);

