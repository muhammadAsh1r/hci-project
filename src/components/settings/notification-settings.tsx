"use client";

import {
  SettingsRow,
  SettingsSectionCard,
} from "@/components/settings/settings-section-card";
import { Switch } from "@/components/ui/switch";
import { usePreferences } from "@/hooks/use-preferences";
import type { NotificationToggles } from "@/lib/types/settings";

const TOGGLES: {
  key: keyof NotificationToggles;
  label: string;
  description: string;
}[] = [
  {
    key: "projectRecommendations",
    label: "Project Recommendations",
    description: "AI-matched projects based on your skills",
  },
  {
    key: "proposalUpdates",
    label: "Proposal Updates",
    description: "When clients view or respond to proposals",
  },
  {
    key: "paymentAlerts",
    label: "Payment Alerts",
    description: "Escrow releases, milestones, and receipts",
  },
  {
    key: "messages",
    label: "Messages",
    description: "New client messages and conversation updates",
  },
  {
    key: "marketingEmails",
    label: "Marketing Emails",
    description: "Tips, features, and platform news",
  },
  {
    key: "systemNotifications",
    label: "System Notifications",
    description: "Security alerts and platform updates",
  },
];

export function NotificationSettingsSection() {
  const { draft, updateDraftNested } = usePreferences();
  const toggles = draft.notificationToggles;

  const updateToggle = (key: keyof NotificationToggles, value: boolean) => {
    updateDraftNested("notificationToggles", { ...toggles, [key]: value });
  };

  return (
    <SettingsSectionCard
      title="Notification Preferences"
      description="Choose which notifications you receive via email and in-app."
    >
      {TOGGLES.map((toggle) => (
        <SettingsRow
          key={toggle.key}
          label={toggle.label}
          description={toggle.description}
          htmlFor={`toggle-${toggle.key}`}
        >
          <Switch
            id={`toggle-${toggle.key}`}
            checked={toggles[toggle.key]}
            onCheckedChange={(v) => updateToggle(toggle.key, v)}
            aria-label={toggle.label}
          />
        </SettingsRow>
      ))}
    </SettingsSectionCard>
  );
}
