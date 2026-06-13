export type PaymentStatus =
  | "Funded"
  | "In Progress"
  | "Awaiting Review"
  | "Approved"
  | "Released"
  | "Completed"
  | "Cancelled";

export type MilestoneStatus =
  | "Funded"
  | "In Progress"
  | "Awaiting Review"
  | "Approved"
  | "Released"
  | "Completed"
  | "Cancelled";

export type DisputeStatus = "Open" | "Under Review" | "Resolved" | "Closed";

export type TransactionMethod = "Credit Card" | "Bank Transfer" | "PayPal" | "Escrow Release";

export type EscrowTimelineStep =
  | "project-funded"
  | "funds-held"
  | "work-submitted"
  | "client-review"
  | "payment-released";

export interface EscrowOverviewStat {
  id: string;
  label: string;
  value: string;
  change: number;
  trend: "up" | "down" | "neutral";
  icon: "Wallet" | "ArrowUpRight" | "Clock" | "Target" | "FileCheck" | "CheckCircle";
  progress?: number;
}

export interface EscrowContract {
  id: string;
  projectName: string;
  clientName: string;
  freelancerName: string;
  contractValue: number;
  escrowAmount: number;
  milestoneStatus: string;
  paymentStatus: PaymentStatus;
  currentTimelineStep: EscrowTimelineStep;
  createdAt: string;
  description: string;
  milestones: EscrowMilestone[];
  timelineSteps: EscrowTimelineItem[];
}

export interface EscrowMilestone {
  id: string;
  number: number;
  title: string;
  amount: number;
  dueDate: string;
  status: MilestoneStatus;
  progress: number;
}

export interface EscrowTimelineItem {
  step: EscrowTimelineStep;
  label: string;
  date: string;
  status: "completed" | "current" | "upcoming";
}

export interface EscrowTransaction {
  id: string;
  project: string;
  contractId: string;
  amount: number;
  date: string;
  status: PaymentStatus;
  method: TransactionMethod;
  receiptId?: string;
}

export interface EscrowReceipt {
  id: string;
  receiptNumber: string;
  client: string;
  freelancer: string;
  project: string;
  amount: number;
  transactionDate: string;
  status: PaymentStatus;
  method: TransactionMethod;
  contractId: string;
}

export interface EscrowDispute {
  id: string;
  contractId: string;
  projectName: string;
  status: DisputeStatus;
  reason: string;
  openedDate: string;
  updates: DisputeUpdate[];
}

export interface DisputeUpdate {
  id: string;
  date: string;
  message: string;
  author: string;
}

export interface EscrowNotification {
  id: string;
  type: "funds-added" | "milestone-approved" | "payment-released" | "contract-completed";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface MonthlyEscrowData {
  month: string;
  revenue: number;
  released: number;
  pending: number;
}

export const PAYMENT_STATUS_ORDER: PaymentStatus[] = [
  "Funded",
  "In Progress",
  "Awaiting Review",
  "Approved",
  "Released",
  "Completed",
  "Cancelled",
];

export const ESCROW_WORKFLOW_STEPS = [
  { key: "project-funded" as EscrowTimelineStep, label: "Project Funded" },
  { key: "funds-held" as EscrowTimelineStep, label: "Funds Held in Escrow" },
  { key: "work-submitted" as EscrowTimelineStep, label: "Work Submitted" },
  { key: "client-review" as EscrowTimelineStep, label: "Client Review" },
  { key: "payment-released" as EscrowTimelineStep, label: "Payment Released" },
];
