"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { ClientProjectFormData } from "@/lib/types/client-project";
import { cn } from "@/lib/utils";

interface PostProjectPreviewProps {
  form: ClientProjectFormData;
  className?: string;
}

export function PostProjectPreview({ form, className }: PostProjectPreviewProps) {
  const budget =
    form.budgetMin && form.budgetMax
      ? `$${Number(form.budgetMin).toLocaleString()} – $${Number(form.budgetMax).toLocaleString()}`
      : "Budget not set";

  return (
    <div
      className={cn(
        "sticky top-32 rounded-2xl border border-border bg-card p-6 shadow-sm",
        className
      )}
      aria-label="Project preview"
    >
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Live Preview
      </p>
      <h3 className="text-lg font-semibold text-foreground">
        {form.title || "Your Project Title"}
      </h3>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-lg bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
          {budget}
        </span>
        {form.projectType ? (
          <Badge variant="outline" className="rounded-lg font-normal">
            {form.projectType}
          </Badge>
        ) : null}
        {form.experienceLevel ? (
          <Badge variant="secondary" className="rounded-lg font-normal">
            {form.experienceLevel}
          </Badge>
        ) : null}
      </div>

      <Separator className="my-4" />

      <div className="space-y-3 text-sm">
        <div>
          <p className="font-medium text-foreground">Category</p>
          <p className="text-muted-foreground">{form.category || "Not selected"}</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Timeline</p>
          <p className="text-muted-foreground">{form.timeline || "Not selected"}</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Description</p>
          <p className="line-clamp-4 text-muted-foreground">
            {form.description || "Your project description will appear here..."}
          </p>
        </div>
      </div>

      {form.skills.length > 0 ? (
        <div className="mt-4">
          <p className="mb-2 text-sm font-medium text-foreground">Required Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {form.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="rounded-lg text-xs font-normal">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      ) : null}

      {form.attachments.length > 0 ? (
        <div className="mt-4">
          <p className="mb-2 text-sm font-medium text-foreground">Attachments</p>
          <ul className="space-y-1 text-xs text-muted-foreground">
            {form.attachments.map((file) => (
              <li key={file.id}>{file.name} ({file.size})</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
