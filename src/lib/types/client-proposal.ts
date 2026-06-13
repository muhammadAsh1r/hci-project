import type { ExperienceLevel } from "@/lib/types/project";
import type { FreelancerAvailability } from "@/lib/types/freelancer";

export type ClientProposalStatus =
  | "new"
  | "shortlisted"
  | "accepted"
  | "rejected"
  | "saved";

export interface ClientSkillMatch {
  skill: string;
  percentage: number;
}

export interface PortfolioReference {
  id: string;
  title: string;
  description: string;
}

export interface ContractMilestone {
  id: string;
  title: string;
  amount: string;
  dueDate: string;
}

export interface ClientProposal {
  id: string;
  projectId: string;
  projectTitle: string;
  freelancerId: string;
  freelancerName: string;
  freelancerAvatar: string;
  freelancerTitle: string;
  rating: number;
  jobSuccessScore: number;
  experienceLevel: ExperienceLevel;
  hourlyRate: number;
  expectedBudget: string;
  expectedBudgetAmount: number;
  deliveryTime: string;
  proposalScore: number;
  coverLetterPreview: string;
  coverLetter: string;
  projectUnderstanding: string;
  proposedSolution: string;
  timeline: string;
  estimatedCost: string;
  portfolioReferences: PortfolioReference[];
  skillMatches: ClientSkillMatch[];
  overallMatch: number;
  portfolioStrength: number;
  projectsCompleted: number;
  responseTime: string;
  availability: FreelancerAvailability;
  status: ClientProposalStatus;
  submittedDate: string;
  submittedAt: string;
}

export interface ClientProposalFilters {
  search: string;
  statuses: ClientProposalStatus[];
  budgetRanges: string[];
  experienceLevels: ExperienceLevel[];
  minRating: number;
  skills: string[];
}

export const DEFAULT_CLIENT_PROPOSAL_FILTERS: ClientProposalFilters = {
  search: "",
  statuses: [],
  budgetRanges: [],
  experienceLevels: [],
  minRating: 0,
  skills: [],
};

export const CLIENT_PROPOSALS_STORAGE_KEY = "freelanceai-client-proposals";
export const CLIENT_PROPOSAL_COMPARE_KEY = "freelanceai-client-proposal-compare";

export type HiringStep =
  | "review"
  | "shortlist"
  | "confirm"
  | "contract"
  | "escrow";

export const HIRING_STEPS: { key: HiringStep; label: string; description: string }[] = [
  { key: "review", label: "Review Proposal", description: "Review freelancer qualifications" },
  { key: "shortlist", label: "Shortlist Freelancer", description: "Add to your shortlist" },
  { key: "confirm", label: "Confirm Hiring", description: "Confirm hire details" },
  { key: "contract", label: "Generate Contract", description: "Review contract terms" },
  { key: "escrow", label: "Fund Escrow", description: "Secure milestone payments" },
];
