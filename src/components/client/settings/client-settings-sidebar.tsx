"use client";

import {
  Bell,
  Briefcase,
  LayoutDashboard,
  Lock,
  Palette,
  Shield,
  User,
} from "lucide-react";
import { CLIENT_SETTINGS_SECTIONS, type ClientSettingsSection } from "@/lib/types/client-settings";
import { cn } from "@/lib/utils";

const ICONS: Record<ClientSettingsSection, typeof User> = {
  profile: User,
  account: Briefcase,
  notifications: Bell,
  security: Shield,
  appearance: Palette,
  privacy: Lock,
  dashboard: LayoutDashboard,
};

interface ClientSettingsSidebarProps {
  activeSection: ClientSettingsSection;
  onSectionChange: (section: ClientSettingsSection) => void;
  className?: string;
}

export function ClientSettingsSidebar({
  activeSection,
  onSectionChange,
  className,
}: ClientSettingsSidebarProps) {
  return (
    <nav className={cn("space-y-1", className)} aria-label="Client settings navigation">
      {CLIENT_SETTINGS_SECTIONS.map((section) => {
        const Icon = ICONS[section.id];
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => onSectionChange(section.id)}
            className={cn(
              "flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
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
