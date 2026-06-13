"use client";

export function FreelancerCardSkeleton() {
  return (
    <div
      className="animate-pulse rounded-2xl border border-border bg-card p-6"
      aria-hidden="true"
    >
      <div className="flex items-start gap-4">
        <div className="size-14 shrink-0 rounded-full bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-40 rounded-lg bg-muted" />
          <div className="h-4 w-28 rounded-lg bg-muted" />
          <div className="h-3 w-24 rounded-lg bg-muted" />
        </div>
        <div className="h-6 w-16 rounded-lg bg-muted" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-4 w-full rounded-lg bg-muted" />
        <div className="h-4 w-3/4 rounded-lg bg-muted" />
      </div>
      <div className="mt-4 flex gap-2">
        <div className="h-6 w-16 rounded-lg bg-muted" />
        <div className="h-6 w-16 rounded-lg bg-muted" />
        <div className="h-6 w-16 rounded-lg bg-muted" />
      </div>
      <div className="mt-6 flex gap-2 border-t border-border pt-4">
        <div className="h-10 flex-1 rounded-xl bg-muted" />
        <div className="h-10 flex-1 rounded-xl bg-muted" />
        <div className="size-10 rounded-xl bg-muted" />
      </div>
    </div>
  );
}
