"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, History, Sparkles } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { AiGenerationFlow } from "@/components/proposals/ai-generation-flow";
import { AiSuggestionsPanel } from "@/components/proposals/ai-suggestions-panel";
import { ExportActions } from "@/components/proposals/export-actions";
import { MatchAnalysis } from "@/components/proposals/match-analysis";
import { ProjectPanel } from "@/components/proposals/project-panel";
import { ProposalEditor } from "@/components/proposals/proposal-editor";
import { ProposalGeneratorForm } from "@/components/proposals/proposal-generator-form";
import { ProposalScoreCard } from "@/components/proposals/proposal-score-card";
import { ProposalTemplates } from "@/components/proposals/proposal-templates";
import { createToast, ProposalToast } from "@/components/proposals/proposal-toast";
import { WinProbabilityCard } from "@/components/proposals/win-probability-card";
import { useProposalGenerator } from "@/hooks/use-proposal-generator";
import { htmlToPlainText } from "@/lib/proposal-data";
import type { MarketplaceProject } from "@/lib/types/project";
import type { ToastType } from "@/components/proposals/proposal-toast";

interface ProposalWorkspaceProps {
  project: MarketplaceProject;
}

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

export function ProposalWorkspace({ project }: ProposalWorkspaceProps) {
  const {
    form,
    updateField,
    errors,
    editorContent,
    setEditorContent,
    generationStep,
    isGenerating,
    hasGenerated,
    score,
    skillMatches,
    winProbability,
    suggestions,
    applyTemplate,
    generateProposal,
    regenerateProposal,
    applySuggestion,
  } = useProposalGenerator(project);

  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [showTyping, setShowTyping] = useState(false);

  const addToast = useCallback((message: string, type: ToastType = "success") => {
    const toast = createToast(message, type);
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toast.id));
    }, 4000);
  }, []);

  const handleGenerate = useCallback(async () => {
    await generateProposal();
    setShowTyping(true);
    setTimeout(() => setShowTyping(false), 2500);
    addToast("Proposal generated successfully!");
  }, [generateProposal, addToast]);

  const handleRegenerate = useCallback(async () => {
    setShowTyping(true);
    await regenerateProposal();
    setTimeout(() => setShowTyping(false), 2500);
    addToast("Proposal regenerated with fresh content!");
  }, [regenerateProposal, addToast]);

  const handleTemplateSelect = useCallback(
    (template: Parameters<typeof applyTemplate>[0]) => {
      setSelectedTemplateId(template.id);
      applyTemplate(template);
      addToast(`${template.name} template applied`, "info");
    },
    [applyTemplate, addToast]
  );

  const handleCopy = useCallback(async () => {
    const text = htmlToPlainText(editorContent);
    await navigator.clipboard.writeText(text);
    addToast("Proposal copied to clipboard!");
  }, [editorContent, addToast]);

  const handleDownload = useCallback(() => {
    const text = htmlToPlainText(editorContent);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `proposal-${project.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    addToast("Proposal downloaded!");
  }, [editorContent, project.id, addToast]);

  const handleSaveDraft = useCallback(() => {
    addToast("Draft saved successfully!");
  }, [addToast]);

  const handleSubmit = useCallback(() => {
    addToast("Proposal submitted to client!");
  }, [addToast]);

  return (
    <>
      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Page header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
              >
                <ArrowLeft className="size-4" />
                Dashboard
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm text-muted-foreground">AI Proposals</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-brand-accent text-primary-foreground">
                <Sparkles className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  AI Proposal Generator
                </h1>
                <p className="text-sm text-muted-foreground">
                  Create winning proposals powered by AI
                </p>
              </div>
            </div>
          </div>
          <Link
            href="/dashboard/proposals/saved"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <History className="size-4" aria-hidden="true" />
            Saved Proposals
          </Link>
        </div>

        {/* 2-column layout */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Left: Project info + form + templates */}
          <div className="space-y-6 lg:col-span-2">
            <ProjectPanel project={project} />
            <ProposalGeneratorForm
              form={form}
              errors={errors}
              onUpdate={updateField}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
            <ProposalTemplates
              selectedId={selectedTemplateId}
              onSelect={handleTemplateSelect}
            />
          </div>

          {/* Right: AI workspace */}
          <div className="space-y-6 lg:col-span-3">
            <AnimatePresence mode="wait">
              {isGenerating && generationStep !== "complete" ? (
                <AiGenerationFlow
                  key="generating"
                  currentStep={generationStep}
                  isGenerating={isGenerating}
                />
              ) : hasGenerated ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <ExportActions
                    content={editorContent}
                    onCopy={handleCopy}
                    onDownload={handleDownload}
                    onSaveDraft={handleSaveDraft}
                    onSubmit={handleSubmit}
                    onRegenerate={handleRegenerate}
                    isGenerating={isGenerating}
                  />

                  <ProposalEditor
                    content={editorContent}
                    onChange={setEditorContent}
                    isTyping={showTyping}
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    {score && <ProposalScoreCard score={score} />}
                    {winProbability && <WinProbabilityCard data={winProbability} />}
                  </div>

                  {skillMatches.length > 0 && (
                    <MatchAnalysis matches={skillMatches} />
                  )}

                  <AiSuggestionsPanel
                    suggestions={suggestions}
                    onApply={applySuggestion}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center"
                >
                  <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-brand-accent/10">
                    <Sparkles className="size-8 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Your AI workspace awaits
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Fill in the proposal details on the left, choose a template, then click
                    Generate Proposal to create a professional bid powered by AI.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <ProposalToast
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />
    </>
  );
}
