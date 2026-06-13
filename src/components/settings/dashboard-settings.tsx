"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SettingsSectionCard } from "@/components/settings/settings-section-card";
import { usePreferences } from "@/hooks/use-preferences";
import {
  DASHBOARD_WIDGET_OPTIONS,
  FAVORITE_SECTION_OPTIONS,
  QUICK_ACTION_OPTIONS,
} from "@/lib/types/settings";
import { cn } from "@/lib/utils";

export function DashboardSettingsSection() {
  const { draft, updateDraft } = usePreferences();

  const toggleWidget = (id: string) => {
    const next = draft.dashboardWidgets.includes(id)
      ? draft.dashboardWidgets.filter((w) => w !== id)
      : [...draft.dashboardWidgets, id];
    updateDraft({ dashboardWidgets: next });
  };

  const toggleQuickAction = (id: string) => {
    const next = draft.quickActions.includes(id)
      ? draft.quickActions.filter((a) => a !== id)
      : [...draft.quickActions, id];
    updateDraft({ quickActions: next });
  };

  const toggleFavorite = (id: string) => {
    const next = draft.favoriteSections.includes(id)
      ? draft.favoriteSections.filter((s) => s !== id)
      : [...draft.favoriteSections, id];
    updateDraft({ favoriteSections: next });
  };

  return (
    <div className="space-y-6">
      <SettingsSectionCard title="Dashboard Layout">
        <div className="flex flex-wrap gap-2">
          {(["default", "compact", "expanded"] as const).map((layout) => (
            <button
              key={layout}
              type="button"
              onClick={() => updateDraft({ dashboardLayout: layout })}
              className={cn(
                "rounded-xl border px-4 py-2 text-sm font-medium capitalize transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                draft.dashboardLayout === layout
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/30"
              )}
              aria-pressed={draft.dashboardLayout === layout}
            >
              {layout}
            </button>
          ))}
        </div>
      </SettingsSectionCard>

      <SettingsSectionCard title="Dashboard Widgets">
        <div className="space-y-3">
          {DASHBOARD_WIDGET_OPTIONS.map((widget) => (
            <div key={widget.id} className="flex items-center gap-2.5">
              <Checkbox
                id={`widget-${widget.id}`}
                checked={draft.dashboardWidgets.includes(widget.id)}
                onCheckedChange={() => toggleWidget(widget.id)}
              />
              <Label htmlFor={`widget-${widget.id}`} className="cursor-pointer font-normal">
                {widget.label}
              </Label>
            </div>
          ))}
        </div>
      </SettingsSectionCard>

      <SettingsSectionCard title="Quick Actions">
        <div className="space-y-3">
          {QUICK_ACTION_OPTIONS.map((action) => (
            <div key={action.id} className="flex items-center gap-2.5">
              <Checkbox
                id={`action-${action.id}`}
                checked={draft.quickActions.includes(action.id)}
                onCheckedChange={() => toggleQuickAction(action.id)}
              />
              <Label htmlFor={`action-${action.id}`} className="cursor-pointer font-normal">
                {action.label}
              </Label>
            </div>
          ))}
        </div>
      </SettingsSectionCard>

      <SettingsSectionCard title="Favorite Sections">
        <div className="space-y-3">
          {FAVORITE_SECTION_OPTIONS.map((section) => (
            <div key={section.id} className="flex items-center gap-2.5">
              <Checkbox
                id={`fav-${section.id}`}
                checked={draft.favoriteSections.includes(section.id)}
                onCheckedChange={() => toggleFavorite(section.id)}
              />
              <Label htmlFor={`fav-${section.id}`} className="cursor-pointer font-normal">
                {section.label}
              </Label>
            </div>
          ))}
        </div>
      </SettingsSectionCard>
    </div>
  );
}
