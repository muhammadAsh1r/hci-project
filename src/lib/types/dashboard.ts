export type AvailabilityStatus = "available" | "busy" | "away";

export interface FreelancerProfile {
  name: string;
  avatar: string;
  title: string;
  availability: AvailabilityStatus;
  email: string;
}

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  change: number;
  trend: "up" | "down" | "neutral";
  icon: "DollarSign" | "FolderKanban" | "Send" | "Gauge" | "CheckCircle" | "TrendingUp";
}

export interface MonthlyEarning {
  month: string;
  earnings: number;
  projects: number;
}

export interface ActiveProject {
  id: string;
  name: string;
  client: string;
  progress: number;
  deadline: string;
  status: "In Progress" | "Review" | "Starting Soon";
}

export interface RecommendedProject {
  id: string;
  title: string;
  matchPercentage: number;
  budget: string;
  skills: string[];
  clientRating: number;
}

export interface ActivityItem {
  id: string;
  type: "proposal" | "accepted" | "payment" | "portfolio" | "review";
  title: string;
  description: string;
  timestamp: string;
}

export interface ProfileRecommendation {
  id: string;
  label: string;
  completed: boolean;
  href: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  technologies: string[];
  description: string;
  thumbnail: string;
  views: number;
  likes: number;
  projectUrl?: string;
  overview: string;
  challenges: string[];
  solutions: string[];
  results: string[];
  gallery: string[];
  createdAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  credentialId: string;
}

export interface ClientReview {
  id: string;
  clientName: string;
  rating: number;
  review: string;
  projectCompleted: string;
  date: string;
}

export interface PortfolioStats {
  views: number;
  likes: number;
  clientContacts: number;
  savedByClients: number;
}
