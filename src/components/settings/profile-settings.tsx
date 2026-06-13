"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  SettingsSectionCard,
} from "@/components/settings/settings-section-card";
import { usePreferences } from "@/hooks/use-preferences";

export function ProfileSettingsSection() {
  const { draft, updateDraftNested } = usePreferences();
  const { profile } = draft;

  const updateProfile = (field: keyof typeof profile, value: string | string[]) => {
    updateDraftNested("profile", { ...profile, [field]: value });
  };

  return (
    <SettingsSectionCard
      title="Profile Settings"
      description="Update your public profile information visible to clients."
    >
      <div className="mb-6 flex items-center gap-4">
        <Avatar className="size-16">
          <AvatarFallback className="bg-gradient-to-br from-primary to-brand-secondary text-lg font-semibold text-primary-foreground">
            {profile.avatar}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium text-foreground">Profile Photo</p>
          <p className="text-xs text-muted-foreground">
            JPG or PNG. Max 2MB. (Preview only)
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="profile-name">Full Name</Label>
          <Input
            id="profile-name"
            value={profile.name}
            onChange={(e) => updateProfile("name", e.target.value)}
            className="rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="profile-bio">Bio</Label>
          <Textarea
            id="profile-bio"
            value={profile.bio}
            onChange={(e) => updateProfile("bio", e.target.value)}
            rows={4}
            className="rounded-xl"
          />
          <p className="text-xs text-muted-foreground">
            Brief professional summary for your profile.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="profile-location">Location</Label>
          <Input
            id="profile-location"
            value={profile.location}
            onChange={(e) => updateProfile("location", e.target.value)}
            className="rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label>Skills</Label>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="rounded-lg">
                {skill}
              </Badge>
            ))}
          </div>
          <Input
            placeholder="Add skill and press Enter"
            className="rounded-xl"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const val = (e.target as HTMLInputElement).value.trim();
                if (val && !profile.skills.includes(val)) {
                  updateProfile("skills", [...profile.skills, val]);
                  (e.target as HTMLInputElement).value = "";
                }
              }
            }}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="profile-portfolio">Portfolio Link</Label>
          <Input
            id="profile-portfolio"
            value={profile.portfolioLink}
            onChange={(e) => updateProfile("portfolioLink", e.target.value)}
            className="rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="profile-website">Website</Label>
          <Input
            id="profile-website"
            type="url"
            value={profile.website}
            onChange={(e) => updateProfile("website", e.target.value)}
            className="rounded-xl"
          />
        </div>
      </div>
    </SettingsSectionCard>
  );
}
