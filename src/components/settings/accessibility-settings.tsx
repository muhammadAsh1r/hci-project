"use client";

import {
  SettingsRow,
  SettingsSectionCard,
} from "@/components/settings/settings-section-card";
import { Switch } from "@/components/ui/switch";
import { usePreferences } from "@/hooks/use-preferences";

const ACCESSIBILITY_OPTIONS = [
  {
    key: "increaseFontSize" as const,
    label: "Increase Font Size",
    description: "Enlarge text across the entire platform",
  },
  {
    key: "reduceMotion" as const,
    label: "Reduce Motion",
    description: "Minimize animations and transitions",
  },
  {
    key: "highContrast" as const,
    label: "High Contrast Mode",
    description: "Increase contrast for better readability",
  },
  {
    key: "keyboardNavigation" as const,
    label: "Keyboard Navigation Mode",
    description: "Enhanced focus indicators for keyboard users",
  },
  {
    key: "screenReaderOptimized" as const,
    label: "Screen Reader Optimization",
    description: "Optimize layout for assistive technologies",
  },
  {
    key: "enhancedFocus" as const,
    label: "Focus Indicator Enhancement",
    description: "Stronger visible focus rings on interactive elements",
  },
];

export function AccessibilitySettingsSection() {
  const { draft, updateDraft } = usePreferences();

  return (
    <SettingsSectionCard
      title="Accessibility Controls"
      description="Customize the platform for your accessibility needs. Changes preview live — save to persist."
    >
      {ACCESSIBILITY_OPTIONS.map((opt) => (
        <SettingsRow
          key={opt.key}
          label={opt.label}
          description={opt.description}
          htmlFor={`a11y-${opt.key}`}
        >
          <Switch
            id={`a11y-${opt.key}`}
            checked={draft[opt.key]}
            onCheckedChange={(v) => updateDraft({ [opt.key]: v })}
            aria-label={opt.label}
          />
        </SettingsRow>
      ))}
    </SettingsSectionCard>
  );
}
