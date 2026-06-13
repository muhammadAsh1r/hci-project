"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  SettingsSectionCard,
} from "@/components/settings/settings-section-card";
import { useClientSettings } from "@/hooks/use-client-settings";

export function ClientProfileSettingsSection() {
  const { draft, updateDraftNested } = useClientSettings();
  const { company } = draft;

  const update = (field: keyof typeof company, value: string) => {
    updateDraftNested("company", { ...company, [field]: value });
  };

  return (
    <SettingsSectionCard
      title="Company Profile"
      description="Edit your company information visible to freelancers."
    >
      <div className="mb-6 flex items-center gap-4">
        <Avatar className="size-16">
          <AvatarFallback className="bg-gradient-to-br from-primary to-brand-secondary text-lg font-semibold text-primary-foreground">
            {company.logo}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <Label htmlFor="company-logo">Logo Initials</Label>
          <Input
            id="company-logo"
            value={company.logo}
            onChange={(e) => update("logo", e.target.value.slice(0, 3).toUpperCase())}
            className="max-w-[120px] rounded-xl"
            maxLength={3}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="company-name">Company Name</Label>
          <Input id="company-name" value={company.companyName} onChange={(e) => update("companyName", e.target.value)} className="rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company-industry">Industry</Label>
          <Input id="company-industry" value={company.industry} onChange={(e) => update("industry", e.target.value)} className="rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company-location">Location</Label>
          <Input id="company-location" value={company.location} onChange={(e) => update("location", e.target.value)} className="rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company-website">Website</Label>
          <Input id="company-website" value={company.website} onChange={(e) => update("website", e.target.value)} className="rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company-desc">Description</Label>
          <Textarea id="company-desc" value={company.description} onChange={(e) => update("description", e.target.value)} rows={4} className="rounded-xl" />
        </div>
      </div>
    </SettingsSectionCard>
  );
}
