"use client";

import type { ClientProposal } from "@/lib/types/client-proposal";
import type { ContractMilestone } from "@/lib/types/client-proposal";
import { Separator } from "@/components/ui/separator";

interface ContractPreviewProps {
  proposal: ClientProposal;
  milestones: ContractMilestone[];
  startDate?: string;
  completionDate?: string;
}

export function ContractPreview({
  proposal,
  milestones,
  startDate = "Jul 1, 2026",
  completionDate = "Aug 30, 2026",
}: ContractPreviewProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Contract Preview</h3>

      <div className="space-y-4 text-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Project Name
            </p>
            <p className="mt-1 font-medium text-foreground">{proposal.projectTitle}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Freelancer
            </p>
            <p className="mt-1 font-medium text-foreground">{proposal.freelancerName}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Contract Value
            </p>
            <p className="mt-1 text-lg font-bold text-primary">{proposal.expectedBudget}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Timeline
            </p>
            <p className="mt-1 font-medium text-foreground">{proposal.deliveryTime}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Start Date
            </p>
            <p className="mt-1 font-medium text-foreground">{startDate}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Expected Completion
            </p>
            <p className="mt-1 font-medium text-foreground">{completionDate}</p>
          </div>
        </div>

        <Separator />

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Milestones
          </p>
          <ul className="space-y-3">
            {milestones.map((m, i) => (
              <li
                key={m.id}
                className="flex items-center justify-between rounded-xl border border-border px-4 py-3"
              >
                <div>
                  <p className="font-medium text-foreground">
                    {i + 1}. {m.title}
                  </p>
                  <p className="text-xs text-muted-foreground">Due: {m.dueDate}</p>
                </div>
                <p className="font-bold text-primary">{m.amount}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
