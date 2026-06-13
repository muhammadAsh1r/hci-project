import { PrimaryButton } from "@/components/shared/primary-button";

interface ClientPlaceholderPageProps {
  title: string;
  description: string;
}

export function ClientPlaceholderPage({
  title,
  description,
}: ClientPlaceholderPageProps) {
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 pb-24 sm:p-6 lg:p-8">
      <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center shadow-sm sm:p-12">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          {description}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          This section will be available in the next phase.
        </p>
        <div className="mt-6">
          <PrimaryButton href="/client/dashboard" className="rounded-xl">
            Back to Dashboard
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
