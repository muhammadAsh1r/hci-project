import type { MilestoneStatus, PaymentStatus } from "@/lib/types/escrow";
import { cn } from "@/lib/utils";

export const paymentStatusStyles: Record<PaymentStatus, string> = {
  Funded: "bg-blue-50 text-blue-700 border-blue-200",
  "In Progress": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Awaiting Review": "bg-amber-50 text-amber-700 border-amber-200",
  Approved: "bg-violet-50 text-violet-700 border-violet-200",
  Released: "bg-green-50 text-green-700 border-green-200",
  Completed: "bg-emerald-50 text-emerald-800 border-emerald-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
};

export const milestoneStatusStyles: Record<MilestoneStatus, string> = paymentStatusStyles;

interface PaymentStatusBadgeProps {
  status: PaymentStatus | MilestoneStatus;
  className?: string;
}

export function PaymentStatusBadge({ status, className }: PaymentStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-medium",
        paymentStatusStyles[status as PaymentStatus] ?? "bg-muted text-muted-foreground border-border",
        className
      )}
    >
      {status}
    </span>
  );
}
