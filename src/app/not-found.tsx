import { PageShell } from "@/components/shared/page-shell";
import { ErrorState } from "@/components/shared/error-state";

export default function NotFound() {
  return (
    <PageShell>
      <ErrorState
        title="Page Not Found"
        description="The page you're looking for doesn't exist or may have been moved."
        actionLabel="Back to Home"
        actionHref="/"
        secondaryActionLabel="Find Projects"
        secondaryActionHref="/projects"
      />
    </PageShell>
  );
}
