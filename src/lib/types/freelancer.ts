export type FreelancerAvailability = "available" | "busy" | "away";

export type ExperienceLevel = "Beginner" | "Intermediate" | "Expert";

export type FreelancerSortOption =
  | "best-match"
  | "highest-rated"
  | "most-experienced"
  | "lowest-rate"
  | "highest-rate"
  | "recently-active";

export type TrustBadge =
  | "Top Rated"
  | "Verified Identity"
  | "100% Completion"
  | "Fast Response"
  | "Rising Talent"
  | "Expert Level";

export interface FreelancerSkill {
  name: string;
  proficiency: number;
}

export interface FreelancerPortfolioItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  thumbnail: string;
}

export interface WorkHistoryItem {
  id: string;
  projectName: string;
  client: string;
  duration: string;
  earnings: number;
  feedback: string;
  rating: number;
}

export interface FreelancerCertification {
  id: string;
  name: string;
  provider: string;
  issueDate: string;
  credentialId: string;
}

export interface FreelancerReview {
  id: string;
  clientName: string;
  clientAvatar: string;
  rating: number;
  review: string;
  projectName: string;
  projectBudget: string;
  date: string;
}

export interface RatingBreakdown {
  communication: number;
  quality: number;
  timeliness: number;
  professionalism: number;
}

export interface FreelancerProfile {
  id: string;
  name: string;
  avatar: string;
  title: string;
  role: string;
  location: string;
  bio: string;
  about: string;
  experience: string;
  specializations: string[];
  careerHighlights: string[];
  skills: FreelancerSkill[];
  hourlyRate: number;
  jobSuccessScore: number;
  rating: number;
  totalReviews: number;
  projectsCompleted: number;
  availability: FreelancerAvailability;
  responseTime: string;
  experienceLevel: ExperienceLevel;
  languages: string[];
  trustBadges: TrustBadge[];
  lastActive: string;
  portfolio: FreelancerPortfolioItem[];
  workHistory: WorkHistoryItem[];
  certifications: FreelancerCertification[];
  reviews: FreelancerReview[];
  ratingBreakdown: RatingBreakdown;
  ratingDistribution: { stars: number; count: number }[];
}

export interface FreelancerFilters {
  search: string;
  skills: string[];
  experienceLevels: ExperienceLevel[];
  rateMin: number;
  rateMax: number;
  availability: FreelancerAvailability[];
  locations: string[];
  minRating: number;
  minJobSuccess: number;
  languages: string[];
}

export const DEFAULT_FREELANCER_FILTERS: FreelancerFilters = {
  search: "",
  skills: [],
  experienceLevels: [],
  rateMin: 0,
  rateMax: 200,
  availability: [],
  locations: [],
  minRating: 0,
  minJobSuccess: 0,
  languages: [],
};

export const FREELANCER_FILTER_OPTIONS = {
  skills: [
    "React", "Next.js", "Node.js", "Python", "UI/UX", "AI",
    "TypeScript", "Figma", "Mobile", "DevOps", "SEO", "Content",
  ],
  experienceLevels: ["Beginner", "Intermediate", "Expert"] as ExperienceLevel[],
  availability: ["available", "busy", "away"] as FreelancerAvailability[],
  locations: [
    "San Francisco, US", "New York, US", "London, UK", "Toronto, CA",
    "Berlin, DE", "Remote", "Sydney, AU", "Singapore",
  ],
  languages: ["English", "Spanish", "French", "German", "Portuguese", "Mandarin"],
  sortOptions: [
    { value: "best-match" as FreelancerSortOption, label: "Best Match" },
    { value: "highest-rated" as FreelancerSortOption, label: "Highest Rated" },
    { value: "most-experienced" as FreelancerSortOption, label: "Most Experienced" },
    { value: "lowest-rate" as FreelancerSortOption, label: "Lowest Rate" },
    { value: "highest-rate" as FreelancerSortOption, label: "Highest Rate" },
    { value: "recently-active" as FreelancerSortOption, label: "Recently Active" },
  ],
};

export const AVAILABILITY_LABELS: Record<FreelancerAvailability, { label: string; color: string }> = {
  available: { label: "Available", color: "bg-green-500" },
  busy: { label: "Busy", color: "bg-amber-500" },
  away: { label: "Away", color: "bg-gray-400" },
};
