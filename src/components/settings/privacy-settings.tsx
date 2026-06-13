"use client";

import {
  SettingsRow,
  SettingsSectionCard,
} from "@/components/settings/settings-section-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { usePreferences } from "@/hooks/use-preferences";
import type { PrivacySettings } from "@/lib/types/settings";

export function PrivacySettingsSection() {
  const { draft, updateDraftNested } = usePreferences();
  const privacy = draft.privacy;

  const updatePrivacy = <K extends keyof PrivacySettings>(
    key: K,
    value: PrivacySettings[K]
  ) => {
    updateDraftNested("privacy", { ...privacy, [key]: value });
  };

  return (
    <SettingsSectionCard
      title="Privacy Settings"
      description="Control what information is visible to clients and the public."
    >
      <SettingsRow label="Profile Visibility" description="Who can view your profile">
        <Select
          value={privacy.profileVisibility}
          onValueChange={(v) =>
            updatePrivacy("profileVisibility", v as PrivacySettings["profileVisibility"])
          }
        >
          <SelectTrigger className="w-40 rounded-xl" aria-label="Profile visibility">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="clients">Clients Only</SelectItem>
            <SelectItem value="private">Private</SelectItem>
          </SelectContent>
        </Select>
      </SettingsRow>

      <SettingsRow label="Portfolio Visibility" description="Who can see your portfolio">
        <Select
          value={privacy.portfolioVisibility}
          onValueChange={(v) =>
            updatePrivacy("portfolioVisibility", v as PrivacySettings["portfolioVisibility"])
          }
        >
          <SelectTrigger className="w-40 rounded-xl" aria-label="Portfolio visibility">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="clients">Clients Only</SelectItem>
            <SelectItem value="private">Private</SelectItem>
          </SelectContent>
        </Select>
      </SettingsRow>

      <SettingsRow
        label="Show Earnings"
        description="Display earnings on your public profile"
        htmlFor="privacy-earnings"
      >
        <Switch
          id="privacy-earnings"
          checked={privacy.showEarnings}
          onCheckedChange={(v) => updatePrivacy("showEarnings", v)}
          aria-label="Show earnings"
        />
      </SettingsRow>

      <SettingsRow
        label="Show Availability"
        description="Let clients see your availability status"
        htmlFor="privacy-availability"
      >
        <Switch
          id="privacy-availability"
          checked={privacy.showAvailability}
          onCheckedChange={(v) => updatePrivacy("showAvailability", v)}
          aria-label="Show availability"
        />
      </SettingsRow>

      <SettingsRow
        label="Show Contact Information"
        description="Display email and contact details publicly"
        htmlFor="privacy-contact"
      >
        <Switch
          id="privacy-contact"
          checked={privacy.showContactInfo}
          onCheckedChange={(v) => updatePrivacy("showContactInfo", v)}
          aria-label="Show contact information"
        />
      </SettingsRow>
    </SettingsSectionCard>
  );
}
