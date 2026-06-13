"use client";

import {
  Accessibility,
  Bell,
  Briefcase,
  LayoutDashboard,
  Lock,
  Palette,
  Shield,
  Sliders,
  User,
} from "lucide-react";
import type { SettingsSection } from "@/lib/types/settings";
import { cn } from "@/lib/utils";

const ICONS: Record<SettingsSection, typeof User> = {
  profile: User,
  account: Briefcase,
  notifications: Bell,
  security: Shield,
  appearance: Palette,
  accessibility: Accessibility,
  privacy: Lock,
  preferences: Sliders,
  dashboard: LayoutDashboard,
};

interface SettingsSidebarProps {
  sections: { id: SettingsSection; label: string; description: string }[];
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
  className?: string;
}

export function SettingsSidebar({
  sections,
  activeSection,
  onSectionChange,
  className,
}: SettingsSidebarProps) {
  return (
    <nav
      className={cn("space-y-1", className)}
      aria-label="Settings navigation"
    >
      {sections.map((section) => {
        const Icon = ICONS[section.id];
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => onSectionChange(section.id)}
            className={cn(
              "flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium">{section.label}</p>
              <p className="text-xs opacity-80">{section.description}</p>
            </div>
          </button>
        );
      })}
    </nav>
  );
}
