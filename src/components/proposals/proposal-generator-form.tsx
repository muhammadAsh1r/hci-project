"use client";

import { Sparkles } from "lucide-react";
import { PrimaryButton } from "@/components/shared/primary-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ProposalFormData } from "@/lib/types/proposal";

interface ProposalGeneratorFormProps {
  form: ProposalFormData;
  errors: Partial<Record<keyof ProposalFormData, string>>;
  onUpdate: (field: keyof ProposalFormData, value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function ProposalGeneratorForm({
  form,
  errors,
  onUpdate,
  onGenerate,
  isGenerating,
}: ProposalGeneratorFormProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-brand-accent text-primary-foreground">
          <Sparkles className="size-4" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">AI Proposal Generator</h3>
          <p className="text-xs text-muted-foreground">
            Fill in details and let AI craft your proposal
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="objective">
            Proposal Objective <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="objective"
            value={form.objective}
            onChange={(e) => onUpdate("objective", e.target.value)}
            placeholder="What do you aim to achieve with this proposal?"
            rows={2}
            aria-invalid={!!errors.objective}
            className="rounded-xl resize-none"
          />
          {errors.objective && (
            <p className="text-sm text-destructive" role="alert">{errors.objective}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">
            Your Experience <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="experience"
            value={form.experience}
            onChange={(e) => onUpdate("experience", e.target.value)}
            placeholder="Describe your relevant experience..."
            rows={3}
            aria-invalid={!!errors.experience}
            className="rounded-xl resize-none"
          />
          {errors.experience && (
            <p className="text-sm text-destructive" role="alert">{errors.experience}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="skills">
            Relevant Skills <span className="text-destructive">*</span>
          </Label>
          <Input
            id="skills"
            value={form.skills}
            onChange={(e) => onUpdate("skills", e.target.value)}
            placeholder="React, Next.js, TypeScript (comma separated)"
            aria-invalid={!!errors.skills}
            className="h-11 rounded-xl"
          />
          {errors.skills && (
            <p className="text-sm text-destructive" role="alert">{errors.skills}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            value={form.notes}
            onChange={(e) => onUpdate("notes", e.target.value)}
            placeholder="Any extra context for the AI..."
            rows={2}
            className="rounded-xl resize-none"
          />
        </div>

        <PrimaryButton
          onClick={onGenerate}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-primary to-brand-accent hover:from-primary/90 hover:to-brand-accent/90"
        >
          <Sparkles className="size-4" aria-hidden="true" />
          {isGenerating ? "Generating..." : "Generate Proposal"}
        </PrimaryButton>
      </div>
    </div>
  );
}
