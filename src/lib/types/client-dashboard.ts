export interface ClientDashboardStat {
  id: string;
  label: string;
  value: string;
  change: number;
  trend: "up" | "down" | "neutral";
  icon:
    | "FolderKanban"
    | "FolderOpen"
    | "Send"
    | "Users"
    | "Shield"
    | "CheckCircle";
}

export interface ClientMonthlySpending {
  month: string;
  spending: number;
  projects: number;
}

export type ClientProjectStatus = "Active" | "Open" | "In Review" | "Completed";

export interface ClientProject {
  id: string;
  name: string;
  status: ClientProjectStatus;
  budget: string;
  proposalCount: number;
  postedDate: string;
}

export type ClientActivityType =
  | "project_posted"
  | "proposal_received"
  | "freelancer_hired"
  | "payment_released";

export interface ClientActivityItem {
  id: string;
  type: ClientActivityType;
  title: string;
  description: string;
  timestamp: string;
  href?: string;
}

export interface ClientRecommendedFreelancer {
  id: string;
  name: string;
  avatar: string;
  skills: string[];
  rating: number;
  hourlyRate: number;
}

export interface ClientDeadline {
  id: string;
  projectName: string;
  deadline: string;
  progress: number;
  status: string;
}
