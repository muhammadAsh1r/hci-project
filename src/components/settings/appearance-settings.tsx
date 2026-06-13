"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import {
  SettingsRow,
  SettingsSectionCard,
} from "@/components/settings/settings-section-card";
import { usePreferences } from "@/hooks/use-preferences";
import {
  ACCENT_COLORS,
  DENSITY_OPTIONS,
  FONT_SIZE_OPTIONS,
  type ThemeMode,
} from "@/lib/types/settings";
import { cn } from "@/lib/utils";

const THEME_OPTIONS: { value: ThemeMode; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light Mode", icon: Sun },
  { value: "dark", label: "Dark Mode", icon: Moon },
  { value: "system", label: "System Default", icon: Monitor },
];

export function AppearanceSettingsSection() {
  const { draft, updateDraft } = usePreferences();

  return (
    <div className="space-y-6">
      <SettingsSectionCard
        title="Theme"
        description="Choose how FreelanceAI looks on your device."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {THEME_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const selected = draft.theme === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateDraft({ theme: opt.value })}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border p-4 transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  selected
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-primary/30"
                )}
                aria-pressed={selected}
              >
                <Icon className="size-6" aria-hidden="true" />
                <span className="text-sm font-medium">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </SettingsSectionCard>

      <SettingsSectionCard title="Accent Color">
        <div className="flex flex-wrap gap-3">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => updateDraft({ accentColor: color.value })}
              className={cn(
                "flex items-center gap-2 rounded-xl border px-4 py-2 transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                draft.accentColor === color.value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30"
              )}
              aria-pressed={draft.accentColor === color.value}
              aria-label={`Accent color: ${color.label}`}
            >
              <span
                className="size-4 rounded-full"
                style={{ backgroundColor: color.swatch }}
                aria-hidden="true"
              />
              <span className="text-sm font-medium">{color.label}</span>
            </button>
          ))}
        </div>
      </SettingsSectionCard>

      <SettingsSectionCard title="Font Size">
        <div className="flex flex-wrap gap-2">
          {FONT_SIZE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => updateDraft({ fontSize: opt.value })}
              className={cn(
                "rounded-xl border px-4 py-2 text-sm font-medium transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                draft.fontSize === opt.value
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/30"
              )}
              aria-pressed={draft.fontSize === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </SettingsSectionCard>

      <SettingsSectionCard title="Layout Density">
        {DENSITY_OPTIONS.map((opt) => (
          <SettingsRow key={opt.value} label={opt.label}>
            <button
              type="button"
              onClick={() => updateDraft({ layoutDensity: opt.value })}
              className={cn(
                "rounded-xl border px-4 py-1.5 text-sm font-medium transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                draft.layoutDensity === opt.value
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/30"
              )}
              aria-pressed={draft.layoutDensity === opt.value}
            >
              {draft.layoutDensity === opt.value ? "Selected" : "Select"}
            </button>
          </SettingsRow>
        ))}
      </SettingsSectionCard>
    </div>
  );
}
