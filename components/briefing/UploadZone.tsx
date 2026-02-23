"use client";

import { useCallback, useMemo, useState } from "react";
import { Upload, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { estimateWordCount } from "@/lib/utils";

type InputMode = "file" | "text";

interface UploadZoneProps {
  busy: boolean;
  onSubmit: (payload: { file?: File | null; text?: string; title?: string }) => Promise<void>;
}

export function UploadZone({ busy, onSubmit }: UploadZoneProps) {
  const [mode, setMode] = useState<InputMode>("file");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);

  const disabled = busy || (mode === "file" ? !file : !text.trim());

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const dropped = event.dataTransfer.files?.[0];
    if (dropped) setFile(dropped);
  }, []);

  const wordCount = useMemo(() => estimateWordCount(text), [text]);

  return (
    <div className="space-y-4">
      <Tabs className="w-full" onValueChange={(value) => setMode(value as InputMode)} value={mode}>
        <TabsList className="w-full bg-brand-surface/70">
          <TabsTrigger className="flex-1" value="file">Upload File</TabsTrigger>
          <TabsTrigger className="flex-1" value="text">Paste Text</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-3 rounded-xl border border-brand-border bg-brand-surface/70 p-4">
        <label className="text-xs font-medium uppercase tracking-[0.12em] text-brand-muted">Document title (optional)</label>
        <input
          className="h-10 w-full rounded-md border border-brand-border bg-black/20 px-3 text-sm outline-none transition focus:border-cyan-300"
          onChange={(event) => setTitle(event.target.value)}
          placeholder="FY26 Growth Strategy Report"
          value={title}
        />

        {mode === "file" ? (
          <div
            className={`dropzone-dashed relative rounded-lg border border-brand-border bg-black/20 p-8 text-center transition ${dragging ? "border-cyan-300 bg-cyan-500/10" : ""}`}
            onDragLeave={() => setDragging(false)}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto mb-3 h-8 w-8 text-cyan-300" />
            <p className="text-sm text-brand-text">Drop your document here</p>
            <p className="mt-1 text-xs text-brand-muted">or click to browse</p>
            <input
              accept=".txt,.md,.csv,.json"
              className="absolute inset-0 cursor-pointer opacity-0"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              type="file"
            />
            <div className="mt-4 flex items-center justify-center gap-2">
              {[".txt", ".md", ".csv", ".json"].map((item) => (
                <Badge key={item} variant="cyan">{item}</Badge>
              ))}
            </div>
            {file ? <p className="mt-4 text-xs text-cyan-200">Selected: {file.name}</p> : null}
          </div>
        ) : (
          <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 8 }}>
            <textarea
              className="h-56 w-full rounded-lg border border-brand-border bg-black/20 p-3 text-sm outline-none transition focus:border-cyan-300"
              onChange={(event) => setText(event.target.value)}
              placeholder="Paste raw text here..."
              value={text}
            />
            <div className="mt-2 flex items-center justify-between text-xs text-brand-muted">
              <span>Raw text input</span>
              <span>{wordCount.toLocaleString("en-US")} words</span>
            </div>
          </motion.div>
        )}

        <Button
          className="h-11 w-full gap-2"
          disabled={disabled}
          onClick={() => onSubmit({ file, text, title })}
          type="button"
        >
          <FileText className="h-4 w-4" />
          {busy ? "Generating..." : "Generate Briefing"}
        </Button>
      </div>
    </div>
  );
}

