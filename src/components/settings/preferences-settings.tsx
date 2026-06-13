"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SettingsSectionCard } from "@/components/settings/settings-section-card";
import { usePreferences } from "@/hooks/use-preferences";
import {
  CATEGORY_OPTIONS,
  PROJECT_TYPE_OPTIONS,
} from "@/lib/types/settings";

export function PreferencesSettingsSection() {
  const { draft, updateDraft } = usePreferences();

  const toggleCategory = (cat: string) => {
    const next = draft.preferredCategories.includes(cat)
      ? draft.preferredCategories.filter((c) => c !== cat)
      : [...draft.preferredCategories, cat];
    updateDraft({ preferredCategories: next });
  };

  const toggleSkill = (skill: string) => {
    const next = draft.preferredSkills.includes(skill)
      ? draft.preferredSkills.filter((s) => s !== skill)
      : [...draft.preferredSkills, skill];
    updateDraft({ preferredSkills: next });
  };

  const toggleProjectType = (type: string) => {
    const next = draft.preferredProjectTypes.includes(type)
      ? draft.preferredProjectTypes.filter((t) => t !== type)
      : [...draft.preferredProjectTypes, type];
    updateDraft({ preferredProjectTypes: next });
  };

  return (
    <div className="space-y-6">
      <SettingsSectionCard
        title="Preferred Categories"
        description="Projects in these categories will be prioritized in recommendations."
      >
        <div className="flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => toggleCategory(cat)}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
            >
              <Badge
                variant={draft.preferredCategories.includes(cat) ? "default" : "outline"}
                className="cursor-pointer rounded-lg"
              >
                {cat}
              </Badge>
            </button>
          ))}
        </div>
      </SettingsSectionCard>

      <SettingsSectionCard title="Preferred Skills">
        <div className="flex flex-wrap gap-2">
          {["React", "Next.js", "TypeScript", "Node.js", "Python", "UI/UX", "AI", "DevOps"].map(
            (skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
              >
                <Badge
                  variant={draft.preferredSkills.includes(skill) ? "default" : "outline"}
                  className="cursor-pointer rounded-lg"
                >
                  {skill}
                </Badge>
              </button>
            )
          )}
        </div>
      </SettingsSectionCard>

      <SettingsSectionCard title="Preferred Budget Range">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="budget-min">Minimum ($)</Label>
            <Input
              id="budget-min"
              type="number"
              value={draft.preferredBudgetMin}
              onChange={(e) =>
                updateDraft({ preferredBudgetMin: Number(e.target.value) })
              }
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget-max">Maximum ($)</Label>
            <Input
              id="budget-max"
              type="number"
              value={draft.preferredBudgetMax}
              onChange={(e) =>
                updateDraft({ preferredBudgetMax: Number(e.target.value) })
              }
              className="rounded-xl"
            />
          </div>
        </div>
      </SettingsSectionCard>

      <SettingsSectionCard title="Preferred Project Type">
        <div className="space-y-3">
          {PROJECT_TYPE_OPTIONS.map((type) => (
            <div key={type} className="flex items-center gap-2.5">
              <Checkbox
                id={`ptype-${type}`}
                checked={draft.preferredProjectTypes.includes(type)}
                onCheckedChange={() => toggleProjectType(type)}
              />
              <Label htmlFor={`ptype-${type}`} className="cursor-pointer font-normal">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </SettingsSectionCard>

      <SettingsSectionCard title="Availability Preference">
        <Select
          value={draft.availabilityPreference}
          onValueChange={(v) =>
            updateDraft({
              availabilityPreference: v as typeof draft.availabilityPreference,
            })
          }
        >
          <SelectTrigger className="w-full rounded-xl sm:w-64" aria-label="Availability preference">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full-time">Full-time</SelectItem>
            <SelectItem value="part-time">Part-time</SelectItem>
            <SelectItem value="flexible">Flexible</SelectItem>
          </SelectContent>
        </Select>
      </SettingsSectionCard>
    </div>
  );
}
