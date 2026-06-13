"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import {
  SettingsRow,
  SettingsSectionCard,
} from "@/components/settings/settings-section-card";
import { useClientSettings } from "@/hooks/use-client-settings";
import {
  ACCENT_COLORS,
  DENSITY_OPTIONS,
  FONT_SIZE_OPTIONS,
  type ThemeMode,
} from "@/lib/types/settings";
import { cn } from "@/lib/utils";

const THEME_OPTIONS: { value: ThemeMode; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export function ClientAppearanceSettingsSection() {
  const { draft, updateDraft } = useClientSettings();

  return (
    <div className="space-y-6">
      <SettingsSectionCard title="Theme" description="Choose your preferred color scheme.">
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
                  selected ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/30"
                )}
                aria-pressed={selected}
              >
                <Icon className="size-6" />
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
                "flex items-center gap-2 rounded-xl border px-4 py-2",
                draft.accentColor === color.value ? "border-primary bg-primary/5" : "border-border"
              )}
              aria-pressed={draft.accentColor === color.value}
            >
              <span className="size-4 rounded-full" style={{ backgroundColor: color.swatch }} />
              <span className="text-sm font-medium">{color.label}</span>
            </button>
          ))}
        </div>
      </SettingsSectionCard>

      <SettingsSectionCard title="Display">
        <SettingsRow label="Font Size">
          <div className="flex gap-2">
            {FONT_SIZE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateDraft({ fontSize: opt.value })}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-sm",
                  draft.fontSize === opt.value ? "border-primary bg-primary/5" : "border-border"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </SettingsRow>
        <SettingsRow label="Layout Density">
          <div className="flex gap-2">
            {DENSITY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateDraft({ layoutDensity: opt.value })}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-sm",
                  draft.layoutDensity === opt.value ? "border-primary bg-primary/5" : "border-border"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </SettingsRow>
      </SettingsSectionCard>
    </div>
  );
}
