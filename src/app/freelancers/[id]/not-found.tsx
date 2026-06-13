import { PageShell } from "@/components/shared/page-shell";
import { ErrorState } from "@/components/shared/error-state";

export default function FreelancerNotFound() {
  return (
    <PageShell>
      <ErrorState
        title="Freelancer Not Found"
        description="This freelancer profile doesn't exist or may have been removed."
        actionLabel="Browse Freelancers"
        actionHref="/freelancers"
        secondaryActionLabel="Go Home"
        secondaryActionHref="/"
      />
    </PageShell>
  );
}
