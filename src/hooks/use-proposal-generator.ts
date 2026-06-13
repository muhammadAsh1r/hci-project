"use client";

import { useCallback, useState } from "react";
import {
  calculateProposalScore,
  calculateSkillMatches,
  calculateWinProbability,
  defaultSuggestions,
  generateMockProposal,
  proposalToHtml,
} from "@/lib/proposal-data";
import type {
  AiSuggestion,
  GenerationStep,
  ProposalFormData,
  ProposalScore,
  ProposalTemplate,
  SkillMatch,
  WinProbability,
} from "@/lib/types/proposal";
import type { MarketplaceProject } from "@/lib/types/project";
import { GENERATION_STEPS } from "@/lib/types/proposal";

const STEP_DURATION = 900;

export function useProposalGenerator(project: MarketplaceProject) {
  const [form, setForm] = useState<ProposalFormData>({
    objective: "",
    experience: "",
    skills: project.skills.join(", "),
    notes: "",
  });
  const [editorContent, setEditorContent] = useState("");
  const [generationStep, setGenerationStep] = useState<GenerationStep | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [score, setScore] = useState<ProposalScore | null>(null);
  const [skillMatches, setSkillMatches] = useState<SkillMatch[]>([]);
  const [winProbability, setWinProbability] = useState<WinProbability | null>(null);
  const [suggestions, setSuggestions] = useState<AiSuggestion[]>(defaultSuggestions);
  const [errors, setErrors] = useState<Partial<Record<keyof ProposalFormData, string>>>({});

  const updateField = useCallback(
    (field: keyof ProposalFormData, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  const validate = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof ProposalFormData, string>> = {};
    if (!form.objective.trim()) newErrors.objective = "Proposal objective is required";
    if (!form.experience.trim()) newErrors.experience = "Experience description is required";
    if (!form.skills.trim()) newErrors.skills = "Relevant skills are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const applyTemplate = useCallback((template: ProposalTemplate) => {
    setForm(template.defaults);
    setErrors({});
  }, []);

  const generateProposal = useCallback(async () => {
    if (!validate()) return;

    setIsGenerating(true);
    setHasGenerated(false);
    setEditorContent("");

    for (const step of GENERATION_STEPS) {
      setGenerationStep(step.key);
      await new Promise((r) => setTimeout(r, STEP_DURATION));
    }

    const proposal = generateMockProposal(project, form);
    const html = proposalToHtml(proposal);
    const proposalScore = calculateProposalScore(form, project);
    const matches = calculateSkillMatches(project, form.skills);
    const winProb = calculateWinProbability(proposalScore);

    setEditorContent(html);
    setScore(proposalScore);
    setSkillMatches(matches);
    setWinProbability(winProb);
    setGenerationStep("complete");
    setHasGenerated(true);
    setIsGenerating(false);
  }, [form, project, validate]);

  const regenerateProposal = useCallback(async () => {
    setHasGenerated(false);
    await generateProposal();
  }, [generateProposal]);

  const applySuggestion = useCallback((id: string) => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, applied: true } : s))
    );
    setEditorContent((prev) => {
      const suggestion = defaultSuggestions.find((s) => s.id === id);
      if (!suggestion || !prev) return prev;
      return prev + `<p><em>✦ ${suggestion.text}</em></p>`;
    });
  }, []);

  return {
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
    validate,
  };
}
