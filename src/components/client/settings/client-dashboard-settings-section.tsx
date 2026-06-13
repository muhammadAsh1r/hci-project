"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  SettingsRow,
  SettingsSectionCard,
} from "@/components/settings/settings-section-card";
import { useClientSettings } from "@/hooks/use-client-settings";
import { cn } from "@/lib/utils";

const WIDGET_OPTIONS = [
  { id: "stats", label: "Overview Stats" },
  { id: "recent-projects", label: "Recent Projects" },
  { id: "activity", label: "Activity Feed" },
  { id: "deadlines", label: "Upcoming Deadlines" },
  { id: "recommendations", label: "Recommended Freelancers" },
  { id: "spending-chart", label: "Spending Chart" },
];

const FAVORITE_SECTIONS = [
  { id: "proposals", label: "Proposals" },
  { id: "contracts", label: "Contracts" },
  { id: "messages", label: "Messages" },
  { id: "escrow", label: "Escrow" },
  { id: "projects", label: "Projects" },
];

export function ClientDashboardSettingsSection() {
  const { draft, updateDraft } = useClientSettings();

  const toggleWidget = (id: string) => {
    const next = draft.dashboardWidgets.includes(id)
      ? draft.dashboardWidgets.filter((w) => w !== id)
      : [...draft.dashboardWidgets, id];
    updateDraft({ dashboardWidgets: next });
  };

  const toggleFavorite = (id: string) => {
    const next = draft.favoriteSections.includes(id)
      ? draft.favoriteSections.filter((s) => s !== id)
      : [...draft.favoriteSections, id];
    updateDraft({ favoriteSections: next });
  };

  return (
    <div className="space-y-6">
      <SettingsSectionCard
        title="Dashboard Customization"
        description="Choose which widgets appear on your client dashboard."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {WIDGET_OPTIONS.map((widget) => (
            <label
              key={widget.id}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-border px-4 py-3 has-checked:border-primary has-checked:bg-primary/5"
            >
              <Checkbox
                checked={draft.dashboardWidgets.includes(widget.id)}
                onCheckedChange={() => toggleWidget(widget.id)}
              />
              <span className="text-sm font-medium">{widget.label}</span>
            </label>
          ))}
        </div>
      </SettingsSectionCard>

      <SettingsSectionCard title="Layout Preference">
        <SettingsRow label="Dashboard Layout">
          <div className="flex gap-2">
            {(["default", "compact", "expanded"] as const).map((layout) => (
              <button
                key={layout}
                type="button"
                onClick={() => updateDraft({ dashboardLayout: layout })}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-sm capitalize",
                  draft.dashboardLayout === layout ? "border-primary bg-primary/5" : "border-border"
                )}
              >
                {layout}
              </button>
            ))}
          </div>
        </SettingsRow>
      </SettingsSectionCard>

      <SettingsSectionCard title="Favorite Sections" description="Pin your most-used sections for quick access.">
        <div className="flex flex-wrap gap-2">
          {FAVORITE_SECTIONS.map((section) => (
            <label
              key={section.id}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm has-checked:border-primary has-checked:bg-primary/5"
            >
              <Checkbox
                checked={draft.favoriteSections.includes(section.id)}
                onCheckedChange={() => toggleFavorite(section.id)}
              />
              {section.label}
            </label>
          ))}
        </div>
      </SettingsSectionCard>
    </div>
  );
}
