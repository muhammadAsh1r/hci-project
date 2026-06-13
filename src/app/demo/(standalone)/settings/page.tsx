import { Suspense } from "react";
import { PageHeaderSkeleton, ListSkeleton } from "@/components/shared/list-skeleton";
import { PageShell } from "@/components/shared/page-shell";
import { SettingsContent } from "@/components/settings/settings-content";

export const metadata = {
  title: "Settings Demo — FreelanceAI",
  description:
    "Settings demo with profile, notifications, appearance, and preferences.",
};

function SettingsFallback() {
  return (
    <PageShell bottomPadding="large">
      <PageHeaderSkeleton />
      <ListSkeleton count={2} />
    </PageShell>
  );
}

export default function DemoSettingsPage() {
  return (
    <Suspense fallback={<SettingsFallback />}>
      <SettingsContent />
    </Suspense>
  );
}
