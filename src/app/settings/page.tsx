import { Suspense } from "react";
import { PageHeaderSkeleton, ListSkeleton } from "@/components/shared/list-skeleton";
import { PageShell } from "@/components/shared/page-shell";
import { SettingsContent } from "@/components/settings/settings-content";

export const metadata = {
  title: "Settings — FreelanceAI",
  description:
    "Manage your profile, notifications, appearance, accessibility, and preferences.",
};

function SettingsFallback() {
  return (
    <PageShell bottomPadding="large">
      <PageHeaderSkeleton />
      <ListSkeleton count={2} />
    </PageShell>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<SettingsFallback />}>
      <SettingsContent />
    </Suspense>
  );
}
