import type {
  ClientContractStatus,
  ClientMilestoneStatus,
  ClientTransactionStatus,
} from "@/lib/types/client-contract";
import { cn } from "@/lib/utils";

export const contractStatusStyles: Record<ClientContractStatus, string> = {
  Draft: "bg-slate-50 text-slate-700 border-slate-200",
  Active: "bg-blue-50 text-blue-700 border-blue-200",
  "In Progress": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Awaiting Review": "bg-amber-50 text-amber-700 border-amber-200",
  Completed: "bg-green-50 text-green-700 border-green-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
};

export const milestoneStatusStyles: Record<ClientMilestoneStatus, string> = {
  Pending: "bg-slate-50 text-slate-600 border-slate-200",
  "In Progress": "bg-indigo-50 text-indigo-700 border-indigo-200",
  Submitted: "bg-violet-50 text-violet-700 border-violet-200",
  "Under Review": "bg-amber-50 text-amber-700 border-amber-200",
  Approved: "bg-blue-50 text-blue-700 border-blue-200",
  Paid: "bg-green-50 text-green-700 border-green-200",
};

export const transactionStatusStyles: Record<ClientTransactionStatus, string> = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Funded: "bg-blue-50 text-blue-700 border-blue-200",
  Released: "bg-green-50 text-green-700 border-green-200",
  Completed: "bg-emerald-50 text-emerald-800 border-emerald-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
};

interface ContractStatusBadgeProps {
  status: ClientContractStatus;
  className?: string;
}

export function ContractStatusBadge({ status, className }: ContractStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-medium",
        contractStatusStyles[status],
        className
      )}
    >
      {status}
    </span>
  );
}

interface MilestoneStatusBadgeProps {
  status: ClientMilestoneStatus;
  className?: string;
}

export function MilestoneStatusBadge({ status, className }: MilestoneStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-medium",
        milestoneStatusStyles[status],
        className
      )}
    >
      {status}
    </span>
  );
}

interface TransactionStatusBadgeProps {
  status: ClientTransactionStatus;
  className?: string;
}

export function TransactionStatusBadge({ status, className }: TransactionStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-medium",
        transactionStatusStyles[status],
        className
      )}
    >
      {status}
    </span>
  );
}
