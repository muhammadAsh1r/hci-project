export type ClientContractStatus =
  | "Draft"
  | "Active"
  | "In Progress"
  | "Awaiting Review"
  | "Completed"
  | "Cancelled";

export type ClientMilestoneStatus =
  | "Pending"
  | "In Progress"
  | "Submitted"
  | "Under Review"
  | "Approved"
  | "Paid";

export type ClientTransactionStatus =
  | "Pending"
  | "Funded"
  | "Released"
  | "Completed"
  | "Cancelled";

export type ClientEscrowTimelineStep =
  | "project-funded"
  | "funds-held"
  | "work-submitted"
  | "review-phase"
  | "payment-released"
  | "project-completed";

export interface MilestoneSubmissionFile {
  id: string;
  name: string;
  size: string;
  type: string;
}

export interface MilestoneSubmission {
  notes: string;
  submittedDate: string;
  files: MilestoneSubmissionFile[];
}

export interface ClientContractMilestone {
  id: string;
  number: number;
  title: string;
  description: string;
  amount: number;
  dueDate: string;
  progress: number;
  status: ClientMilestoneStatus;
  submission?: MilestoneSubmission;
}

export interface ClientContract {
  id: string;
  projectId: string;
  projectName: string;
  freelancerId: string;
  freelancerName: string;
  freelancerAvatar: string;
  freelancerTitle: string;
  contractValue: number;
  escrowBalance: number;
  startDate: string;
  deadline: string;
  status: ClientContractStatus;
  description: string;
  currentTimelineStep: ClientEscrowTimelineStep;
  milestones: ClientContractMilestone[];
}

export interface ClientTransaction {
  id: string;
  project: string;
  freelancer: string;
  contractId: string;
  amount: number;
  date: string;
  status: ClientTransactionStatus;
  method: string;
  receiptId?: string;
}

export interface ClientReceipt {
  id: string;
  receiptNumber: string;
  project: string;
  freelancer: string;
  amount: number;
  date: string;
  status: ClientTransactionStatus;
  method: string;
  contractId: string;
}

export interface ClientEscrowNotification {
  id: string;
  type:
    | "milestone-submitted"
    | "work-approved"
    | "payment-released"
    | "contract-completed";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface ClientContractStats {
  active: number;
  pendingApprovals: number;
  fundsInEscrow: number;
  completed: number;
  cancelled: number;
  totalValue: number;
}

export interface ClientEscrowStats {
  totalEscrowBalance: number;
  pendingPayments: number;
  releasedFunds: number;
  upcomingMilestones: number;
}

export interface ClientTransactionFilters {
  search: string;
  project: string;
  status: string;
  amountRange: string;
  dateRange: string;
}

export const DEFAULT_TRANSACTION_FILTERS: ClientTransactionFilters = {
  search: "",
  project: "all",
  status: "all",
  amountRange: "all",
  dateRange: "all",
};

export const CLIENT_CONTRACTS_STORAGE_KEY = "freelanceai-client-contracts";
export const CLIENT_TRANSACTIONS_STORAGE_KEY = "freelanceai-client-transactions";

export const CLIENT_ESCROW_TIMELINE_STEPS: {
  key: ClientEscrowTimelineStep;
  label: string;
}[] = [
  { key: "project-funded", label: "Project Funded" },
  { key: "funds-held", label: "Funds Held" },
  { key: "work-submitted", label: "Work Submitted" },
  { key: "review-phase", label: "Review Phase" },
  { key: "payment-released", label: "Payment Released" },
  { key: "project-completed", label: "Project Completed" },
];

export type MilestoneReviewStep =
  | "review"
  | "confirm"
  | "release"
  | "success";

export const MILESTONE_REVIEW_STEPS: {
  key: MilestoneReviewStep;
  label: string;
}[] = [
  { key: "review", label: "Review Work" },
  { key: "confirm", label: "Confirm Approval" },
  { key: "release", label: "Release Payment" },
  { key: "success", label: "Complete" },
];
