import type { ProjectTimelineStep } from "@/lib/types/project";
import type {
  ExperienceLevel,
  ProjectCategory,
  ProjectDuration,
  ProjectType,
} from "@/lib/types/project";

export type ClientProjectStatus =
  | "active"
  | "open"
  | "completed"
  | "archived"
  | "paused";

export type ClientProjectTab = "active" | "open" | "completed" | "archived";

export type ClientProjectActivityType =
  | "proposal_received"
  | "freelancer_shortlisted"
  | "project_updated"
  | "contract_created"
  | "project_posted"
  | "freelancer_hired"
  | "payment_released";

export interface ClientProjectAttachment {
  id: string;
  name: string;
  size: string;
}

export interface ClientProjectActivity {
  id: string;
  type: ClientProjectActivityType;
  title: string;
  description: string;
  timestamp: string;
}

export interface ClientProjectAnalytics {
  views: number;
  applications: number;
  shortlisted: number;
  hiringProgress: number;
}

export interface ClientProposalSummary {
  total: number;
  shortlisted: number;
  accepted: number;
  rejected: number;
}

export interface ClientManagedProject {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  skills: string[];
  budgetMin: number;
  budgetMax: number;
  budget: string;
  projectType: ProjectType;
  experienceLevel: ExperienceLevel;
  timeline: ProjectDuration;
  status: ClientProjectStatus;
  proposalCount: number;
  views: number;
  postedDate: string;
  postedAt: string;
  progress: number;
  attachments: ClientProjectAttachment[];
  analytics: ClientProjectAnalytics;
  proposalSummary: ClientProposalSummary;
  timelineSteps: ProjectTimelineStep[];
  activities: ClientProjectActivity[];
}

export interface ClientProjectFormData {
  title: string;
  description: string;
  category: ProjectCategory | "";
  skills: string[];
  budgetMin: string;
  budgetMax: string;
  projectType: ProjectType | "";
  experienceLevel: ExperienceLevel | "";
  timeline: ProjectDuration | "";
  attachments: ClientProjectAttachment[];
}

export interface ClientProjectFilters {
  search: string;
  categories: ProjectCategory[];
  budgetRanges: string[];
  dateSort: "newest" | "oldest" | "most-proposals";
}

export const DEFAULT_CLIENT_PROJECT_FORM: ClientProjectFormData = {
  title: "",
  description: "",
  category: "",
  skills: [],
  budgetMin: "",
  budgetMax: "",
  projectType: "",
  experienceLevel: "",
  timeline: "",
  attachments: [],
};

export const DEFAULT_CLIENT_PROJECT_FILTERS: ClientProjectFilters = {
  search: "",
  categories: [],
  budgetRanges: [],
  dateSort: "newest",
};

export const CLIENT_PROJECT_DRAFT_KEY = "freelanceai-client-project-draft";
export const CLIENT_PROJECTS_STORAGE_KEY = "freelanceai-client-projects";
