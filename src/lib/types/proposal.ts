export type ProposalStatus = "Draft" | "Submitted" | "Won" | "Lost";

export type GenerationStep =
  | "analyzing"
  | "matching"
  | "generating"
  | "optimizing"
  | "complete";

export interface ProposalFormData {
  objective: string;
  experience: string;
  skills: string;
  notes: string;
}

export interface ProposalTemplate {
  id: string;
  name: string;
  icon: "Code" | "Palette" | "Brain" | "Smartphone" | "PenLine";
  description: string;
  defaults: ProposalFormData;
}

export interface GeneratedProposal {
  greeting: string;
  projectUnderstanding: string;
  relevantExperience: string;
  proposedSolution: string;
  timeline: string;
  closing: string;
}

export interface ProposalScore {
  overall: number;
  clarity: number;
  skillsMatch: number;
  professionalism: number;
  completeness: number;
}

export interface SkillMatch {
  skill: string;
  percentage: number;
}

export interface AiSuggestion {
  id: string;
  text: string;
  applied: boolean;
}

export interface SavedProposal {
  id: string;
  name: string;
  createdDate: string;
  lastEdited: string;
  projectName: string;
  projectId: string;
  status: ProposalStatus;
}

export interface WinProbability {
  percentage: number;
  factors: { label: string; positive: boolean }[];
}

export const GENERATION_STEPS: { key: GenerationStep; label: string }[] = [
  { key: "analyzing", label: "Analyzing Project..." },
  { key: "matching", label: "Matching Skills..." },
  { key: "generating", label: "Generating Proposal..." },
  { key: "optimizing", label: "Optimizing Proposal..." },
];
