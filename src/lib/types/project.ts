export type ProjectCategory =
  | "Web Development"
  | "Mobile Apps"
  | "Design"
  | "AI"
  | "Writing"
  | "Marketing";

export type BudgetRange =
  | "under-100"
  | "100-500"
  | "500-1000"
  | "1000-plus";

export type ExperienceLevel = "Beginner" | "Intermediate" | "Expert";

export type ProjectType = "Fixed Price" | "Hourly";

export type ProjectDuration =
  | "Less than 1 week"
  | "1-4 weeks"
  | "1-3 months"
  | "3+ months";

export type ProjectSkill =
  | "React"
  | "Next.js"
  | "Node.js"
  | "UI/UX"
  | "AI"
  | "Python";

export type SortOption =
  | "best-match"
  | "newest"
  | "highest-budget"
  | "most-proposals";

export interface Client {
  name: string;
  rating: number;
  totalProjectsPosted: number;
  memberSince: string;
  verified: boolean;
  avatar: string;
}

export interface ProjectTimelineStep {
  label: string;
  date: string;
  status: "completed" | "current" | "upcoming";
}

export interface MarketplaceProject {
  id: string;
  title: string;
  budget: string;
  budgetMin: number;
  budgetMax: number;
  postedAt: string;
  postedTime: string;
  description: string;
  skills: ProjectSkill[];
  experienceLevel: ExperienceLevel;
  proposalCount: number;
  clientRating: number;
  category: ProjectCategory;
  projectType: ProjectType;
  duration: ProjectDuration;
  budgetRange: BudgetRange;
  overview: string;
  objectives: string[];
  deliverables: string[];
  timeline: string;
  client: Client;
  timelineSteps: ProjectTimelineStep[];
}

export interface ProjectFilters {
  search: string;
  categories: ProjectCategory[];
  budgetRanges: BudgetRange[];
  experienceLevels: ExperienceLevel[];
  projectTypes: ProjectType[];
  durations: ProjectDuration[];
  skills: ProjectSkill[];
}

export const DEFAULT_FILTERS: ProjectFilters = {
  search: "",
  categories: [],
  budgetRanges: [],
  experienceLevels: [],
  projectTypes: [],
  durations: [],
  skills: [],
};

export const FILTER_OPTIONS = {
  categories: [
    "Web Development",
    "Mobile Apps",
    "Design",
    "AI",
    "Writing",
    "Marketing",
  ] as ProjectCategory[],
  budgetRanges: [
    { value: "under-100" as BudgetRange, label: "Under $100" },
    { value: "100-500" as BudgetRange, label: "$100 – $500" },
    { value: "500-1000" as BudgetRange, label: "$500 – $1,000" },
    { value: "1000-plus" as BudgetRange, label: "$1,000+" },
  ],
  experienceLevels: ["Beginner", "Intermediate", "Expert"] as ExperienceLevel[],
  projectTypes: ["Fixed Price", "Hourly"] as ProjectType[],
  durations: [
    "Less than 1 week",
    "1-4 weeks",
    "1-3 months",
    "3+ months",
  ] as ProjectDuration[],
  skills: ["React", "Next.js", "Node.js", "UI/UX", "AI", "Python"] as ProjectSkill[],
  sortOptions: [
    { value: "best-match" as SortOption, label: "Best Match" },
    { value: "newest" as SortOption, label: "Newest" },
    { value: "highest-budget" as SortOption, label: "Highest Budget" },
    { value: "most-proposals" as SortOption, label: "Most Proposals" },
  ],
};
