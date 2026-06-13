"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PostProjectContent } from "@/components/client/projects/post-project-content";
import { LoadingOverlay } from "@/components/shared/loading-spinner";

function PostProjectPageInner() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit") ?? undefined;
  return <PostProjectContent editId={editId} />;
}

export function PostProjectPageClient() {
  return (
    <Suspense fallback={<LoadingOverlay label="Loading" />}>
      <PostProjectPageInner />
    </Suspense>
  );
}
