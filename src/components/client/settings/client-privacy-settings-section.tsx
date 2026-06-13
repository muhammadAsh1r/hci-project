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
import { useClientSettings } from "@/hooks/use-client-settings";

export function ClientPrivacySettingsSection() {
  const { draft, updateDraftNested } = useClientSettings();
  const privacy = draft.privacy;

  return (
    <SettingsSectionCard
      title="Privacy Settings"
      description="Control who can see your company and project information."
    >
      <SettingsRow label="Company Visibility" description="Who can view your company profile">
        <Select
          value={privacy.companyVisibility}
          onValueChange={(v) =>
            updateDraftNested("privacy", { ...privacy, companyVisibility: v as typeof privacy.companyVisibility })
          }
        >
          <SelectTrigger className="w-[180px] rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="verified-only">Verified Only</SelectItem>
            <SelectItem value="private">Private</SelectItem>
          </SelectContent>
        </Select>
      </SettingsRow>

      <SettingsRow label="Profile Visibility" description="Who can view your client profile">
        <Select
          value={privacy.profileVisibility}
          onValueChange={(v) =>
            updateDraftNested("privacy", { ...privacy, profileVisibility: v as typeof privacy.profileVisibility })
          }
        >
          <SelectTrigger className="w-[180px] rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="freelancers">Freelancers Only</SelectItem>
            <SelectItem value="private">Private</SelectItem>
          </SelectContent>
        </Select>
      </SettingsRow>

      <SettingsRow label="Project Visibility" description="Who can see your posted projects">
        <Select
          value={privacy.projectVisibility}
          onValueChange={(v) =>
            updateDraftNested("privacy", { ...privacy, projectVisibility: v as typeof privacy.projectVisibility })
          }
        >
          <SelectTrigger className="w-[180px] rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="invite-only">Invite Only</SelectItem>
            <SelectItem value="private">Private</SelectItem>
          </SelectContent>
        </Select>
      </SettingsRow>

      <SettingsRow label="Contact Visibility" description="Who can contact you directly">
        <Select
          value={privacy.contactVisibility}
          onValueChange={(v) =>
            updateDraftNested("privacy", { ...privacy, contactVisibility: v as typeof privacy.contactVisibility })
          }
        >
          <SelectTrigger className="w-[180px] rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="hired-only">Hired Freelancers</SelectItem>
            <SelectItem value="private">Private</SelectItem>
          </SelectContent>
        </Select>
      </SettingsRow>
    </SettingsSectionCard>
  );
}
