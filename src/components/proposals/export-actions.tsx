"use client";

import {
  Copy,
  Download,
  RefreshCw,
  Save,
  Send,
} from "lucide-react";
import { PrimaryButton } from "@/components/shared/primary-button";
import { SecondaryButton } from "@/components/shared/secondary-button";
import { Button } from "@/components/ui/button";
import { htmlToPlainText } from "@/lib/proposal-data";

interface ExportActionsProps {
  content: string;
  onCopy: () => void;
  onDownload: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
  onRegenerate: () => void;
  isGenerating: boolean;
  disabled?: boolean;
}

export function ExportActions({
  content,
  onCopy,
  onDownload,
  onSaveDraft,
  onSubmit,
  onRegenerate,
  isGenerating,
  disabled,
}: ExportActionsProps) {
  const hasContent = !!content && htmlToPlainText(content).trim().length > 0;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="flex flex-wrap gap-2">
        <SecondaryButton onClick={onCopy} disabled={!hasContent}>
          <Copy className="size-4" aria-hidden="true" />
          Copy Proposal
        </SecondaryButton>
        <SecondaryButton onClick={onDownload} disabled={!hasContent}>
          <Download className="size-4" aria-hidden="true" />
          Download PDF
        </SecondaryButton>
        <SecondaryButton onClick={onSaveDraft} disabled={!hasContent}>
          <Save className="size-4" aria-hidden="true" />
          Save Draft
        </SecondaryButton>
      </div>

      <div className="flex flex-wrap gap-2 sm:ml-auto">
        <Button
          variant="outline"
          onClick={onRegenerate}
          disabled={isGenerating || disabled}
          className="rounded-xl"
        >
          <RefreshCw className={`size-4 mr-2 ${isGenerating ? "animate-spin" : ""}`} aria-hidden="true" />
          Regenerate
        </Button>
        <PrimaryButton onClick={onSubmit} disabled={!hasContent}>
          <Send className="size-4" aria-hidden="true" />
          Submit Proposal
        </PrimaryButton>
      </div>
    </div>
  );
}
