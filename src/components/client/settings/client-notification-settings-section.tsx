"use client";

import {
  SettingsRow,
  SettingsSectionCard,
} from "@/components/settings/settings-section-card";
import { Switch } from "@/components/ui/switch";
import { useClientSettings } from "@/hooks/use-client-settings";

const TOGGLES = [
  { key: "proposalAlerts" as const, label: "Proposal Alerts", description: "New proposals and shortlist updates" },
  { key: "messages" as const, label: "Messages", description: "Freelancer replies and chat notifications" },
  { key: "paymentAlerts" as const, label: "Payment Alerts", description: "Escrow funding and payment releases" },
  { key: "contractUpdates" as const, label: "Contract Updates", description: "Milestone submissions and contract changes" },
  { key: "marketingEmails" as const, label: "Marketing Emails", description: "Product updates and promotions" },
  { key: "systemUpdates" as const, label: "System Updates", description: "Platform announcements and security alerts" },
];

export function ClientNotificationSettingsSection() {
  const { draft, updateDraftNested } = useClientSettings();
  const toggles = draft.notificationToggles;

  return (
    <SettingsSectionCard
      title="Notification Preferences"
      description="Choose which notifications you receive."
    >
      {TOGGLES.map((toggle) => (
        <SettingsRow key={toggle.key} label={toggle.label} description={toggle.description}>
          <Switch
            checked={toggles[toggle.key]}
            onCheckedChange={(checked) =>
              updateDraftNested("notificationToggles", { ...toggles, [toggle.key]: checked })
            }
            aria-label={toggle.label}
          />
        </SettingsRow>
      ))}
    </SettingsSectionCard>
  );
}
