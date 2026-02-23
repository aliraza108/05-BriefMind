"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { processText, uploadDocument } from "@/lib/api";
import { Briefing, ProcessResponse } from "@/lib/types";

export type ProcessorState = "idle" | "uploading" | "processing" | "done" | "error";

const PROCESS_STEPS = [
  "Chunking document",
  "Extracting insights",
  "Building decision map",
  "Generating concept graph",
  "Creating executive summary"
] as const;

export interface ProcessingStep {
  label: string;
  status: "pending" | "active" | "completed";
}

interface ProcessPayload {
  file?: File | null;
  text?: string;
  title?: string;
}

export function useDocumentProcessor() {
  const [state, setState] = useState<ProcessorState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<ProcessResponse | null>(null);
  const [briefing, setBriefing] = useState<Briefing | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const steps = useMemo<ProcessingStep[]>(
    () =>
      PROCESS_STEPS.map((label, index) => {
        if (index < activeStep) return { label, status: "completed" };
        if (index === activeStep && state === "processing") return { label, status: "active" };
        if (state === "done") return { label, status: "completed" };
        return { label, status: "pending" };
      }),
    [activeStep, state]
  );

  const stopSimulation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = useCallback(() => {
    stopSimulation();
    setState("idle");
    setError(null);
    setResponse(null);
    setBriefing(null);
    setProgress(0);
    setActiveStep(0);
  }, []);

  const run = useCallback(async (payload: ProcessPayload) => {
    try {
      stopSimulation();
      setError(null);
      setState("uploading");
      setProgress(8);
      setActiveStep(0);

      const request = payload.file
        ? uploadDocument(payload.file, payload.title)
        : processText(payload.text ?? "", payload.title || "Untitled Document");

      setState("processing");
      intervalRef.current = setInterval(() => {
        setProgress((current) => {
          const next = Math.min(93, current + 4);
          const step = Math.min(PROCESS_STEPS.length - 1, Math.floor(next / 20));
          setActiveStep(step);
          return next;
        });
      }, 900);

      const result = await request;
      stopSimulation();
      setResponse(result);
      setBriefing(result.briefing ?? null);
      setActiveStep(PROCESS_STEPS.length);
      setProgress(100);
      setState("done");
      return result;
    } catch (caught) {
      stopSimulation();
      const message = caught instanceof Error ? caught.message : "Something went wrong while processing.";
      setError(message);
      setState("error");
      setProgress(0);
      return null;
    }
  }, []);

  return {
    state,
    error,
    response,
    briefing,
    progress,
    steps,
    run,
    reset
  };
}

