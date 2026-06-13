import { cn } from "@/lib/utils";

interface SettingsSectionCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function SettingsSectionCard({
  title,
  description,
  children,
  className,
}: SettingsSectionCardProps) {
  return (
    <section
      className={cn(
        "density-aware rounded-2xl border border-border bg-card p-6 shadow-sm",
        className
      )}
      aria-labelledby={`settings-${title.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <div className="mb-6">
        <h2
          id={`settings-${title.replace(/\s+/g, "-").toLowerCase()}`}
          className="text-lg font-semibold text-foreground"
        >
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

interface SettingsRowProps {
  label: string;
  description?: string;
  children: React.ReactNode;
  htmlFor?: string;
}

export function SettingsRow({
  label,
  description,
  children,
  htmlFor,
}: SettingsRowProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-border py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}
