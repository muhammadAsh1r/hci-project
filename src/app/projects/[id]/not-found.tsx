import { PageShell } from "@/components/shared/page-shell";
import { ErrorState } from "@/components/shared/error-state";

export default function ProjectNotFound() {
  return (
    <PageShell>
      <ErrorState
        title="Project Not Found"
        description="The project you're looking for doesn't exist or has been removed."
        actionLabel="Browse Projects"
        actionHref="/projects"
        secondaryActionLabel="Go Home"
        secondaryActionHref="/"
      />
    </PageShell>
  );
}
