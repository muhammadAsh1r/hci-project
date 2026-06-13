"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Bold,
  Heading2,
  Italic,
  List,
  ListOrdered,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { htmlToPlainText } from "@/lib/proposal-data";
import { cn } from "@/lib/utils";

interface ProposalEditorProps {
  content: string;
  onChange: (html: string) => void;
  isTyping?: boolean;
}

function TypingPreview({ content }: { content: string }) {
  const plain = htmlToPlainText(content);
  const [typedLength, setTypedLength] = useState(0);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index += 3;
      if (index >= plain.length) {
        setTypedLength(plain.length);
        clearInterval(interval);
        return;
      }
      setTypedLength(index);
    }, 20);
    return () => clearInterval(interval);
  }, [plain]);

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="border-b border-border px-4 py-2">
        <span className="text-xs text-muted-foreground">AI is writing your proposal...</span>
      </div>
      <div className="p-6 font-mono text-sm leading-relaxed text-foreground">
        {plain.slice(0, typedLength)}
        {typedLength < plain.length && (
          <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-primary align-middle" />
        )}
      </div>
    </div>
  );
}

export function ProposalEditor({ content, onChange, isTyping }: ProposalEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  const wordCount = useMemo(() => {
    const text = htmlToPlainText(content);
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  }, [content]);

  useEffect(() => {
    if (editorRef.current && content && !initializedRef.current) {
      editorRef.current.innerHTML = content;
      initializedRef.current = true;
    }
  }, [content]);

  useEffect(() => {
    if (!content) initializedRef.current = false;
  }, [content]);

  const execCommand = useCallback(
    (command: string, value?: string) => {
      document.execCommand(command, false, value);
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    },
    [onChange]
  );

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  if (isTyping && content) {
    return <TypingPreview key={content} content={content} />;
  }

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <div
        className="flex flex-wrap items-center gap-1 border-b border-border px-3 py-2"
        role="toolbar"
        aria-label="Text formatting"
      >
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => execCommand("bold")}
          aria-label="Bold"
          className="rounded-lg"
        >
          <Bold className="size-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => execCommand("italic")}
          aria-label="Italic"
          className="rounded-lg"
        >
          <Italic className="size-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => execCommand("formatBlock", "h2")}
          aria-label="Heading"
          className="rounded-lg"
        >
          <Heading2 className="size-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => execCommand("insertUnorderedList")}
          aria-label="Bullet list"
          className="rounded-lg"
        >
          <List className="size-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => execCommand("insertOrderedList")}
          aria-label="Numbered list"
          className="rounded-lg"
        >
          <ListOrdered className="size-4" />
        </Button>
        <span className="ml-auto text-xs text-muted-foreground" aria-live="polite">
          {wordCount} words
        </span>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        className={cn(
          "min-h-[400px] p-6 text-sm leading-relaxed text-foreground outline-none",
          "prose prose-sm max-w-none",
          "[&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-base [&_h2]:font-semibold [&_h2:first-child]:mt-0",
          "[&_p]:mb-3 [&_ul]:mb-3 [&_ul]:ml-4 [&_ul]:list-disc",
          "[&_ol]:mb-3 [&_ol]:ml-4 [&_ol]:list-decimal",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        )}
        aria-label="Proposal editor"
        role="textbox"
        aria-multiline="true"
      />
    </div>
  );
}
