import { DashboardShell } from "@/components/shared/page-shell";
import { ErrorState } from "@/components/shared/error-state";

export default function ContractNotFound() {
  return (
    <DashboardShell maxWidth="5xl">
      <ErrorState
        title="Contract Not Found"
        description="This escrow contract doesn't exist or may have been removed."
        actionLabel="Back to Escrow"
        actionHref="/dashboard/escrow"
        secondaryActionLabel="Dashboard"
        secondaryActionHref="/dashboard"
      />
    </DashboardShell>
  );
}
