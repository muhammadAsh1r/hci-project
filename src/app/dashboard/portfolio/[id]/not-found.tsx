import { DashboardShell } from "@/components/shared/page-shell";
import { ErrorState } from "@/components/shared/error-state";

export default function PortfolioNotFound() {
  return (
    <DashboardShell maxWidth="5xl">
      <ErrorState
        title="Portfolio Item Not Found"
        description="This portfolio item doesn't exist or may have been removed."
        actionLabel="View Portfolio"
        actionHref="/dashboard/portfolio"
        secondaryActionLabel="Dashboard"
        secondaryActionHref="/dashboard"
      />
    </DashboardShell>
  );
}
