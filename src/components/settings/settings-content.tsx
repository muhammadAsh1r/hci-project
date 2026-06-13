"use client";

import { SlidersHorizontal } from "lucide-react";
import { useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AccessibilitySettingsSection } from "@/components/settings/accessibility-settings";
import { AccountSettingsSection } from "@/components/settings/account-settings";
import { AppearanceSettingsSection } from "@/components/settings/appearance-settings";
import { DashboardSettingsSection } from "@/components/settings/dashboard-settings";
import { NotificationSettingsSection } from "@/components/settings/notification-settings";
import { PreferencesSettingsSection } from "@/components/settings/preferences-settings";
import { PrivacySettingsSection } from "@/components/settings/privacy-settings";
import { ProfileSettingsSection } from "@/components/settings/profile-settings";
import { SecuritySettingsSection } from "@/components/settings/security-settings";
import {
  SaveSuccessBanner,
  SettingsSaveBar,
} from "@/components/settings/settings-save-bar";
import { SettingsSidebar } from "@/components/settings/settings-sidebar";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { PageHeader } from "@/components/shared/page-header";
import { PageShell } from "@/components/shared/page-shell";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePreferences } from "@/hooks/use-preferences";
import { SETTINGS_SECTIONS, type SettingsSection } from "@/lib/types/settings";

const SECTION_COMPONENTS: Record<SettingsSection, React.ComponentType> = {
  profile: ProfileSettingsSection,
  account: AccountSettingsSection,
  notifications: NotificationSettingsSection,
  security: SecuritySettingsSection,
  appearance: AppearanceSettingsSection,
  accessibility: AccessibilitySettingsSection,
  privacy: PrivacySettingsSection,
  preferences: PreferencesSettingsSection,
  dashboard: DashboardSettingsSection,
};

function isValidSection(s: string | null): s is SettingsSection {
  return SETTINGS_SECTIONS.some((sec) => sec.id === s);
}

export function SettingsContent() {
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get("section");
  const activeSection: SettingsSection = isValidSection(sectionParam)
    ? sectionParam
    : "profile";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const { showToast, ToastContainer } = useToast();

  const {
    hasUnsavedChanges,
    isSaving,
    savePreferences,
    resetDraft,
    resetToDefaults,
  } = usePreferences();

  const handleSectionChange = useCallback((section: SettingsSection) => {
    setSidebarOpen(false);
    window.history.replaceState(null, "", `/settings?section=${section}`);
  }, []);

  const handleSave = useCallback(async () => {
    await savePreferences();
    setShowSuccess(true);
    showToast("Settings saved successfully");
    setTimeout(() => setShowSuccess(false), 3000);
  }, [savePreferences, showToast]);

  const ActiveComponent = SECTION_COMPONENTS[activeSection];
  const activeLabel = SETTINGS_SECTIONS.find((s) => s.id === activeSection)?.label;

  return (
    <PageShell bottomPadding="large">
        <PageHeader
          title="Settings"
          description="Manage your profile, preferences, notifications, and accessibility."
          breadcrumbs={[{ label: "Settings", href: "/settings" }, { label: activeLabel ?? "Profile" }]}
          actions={
            <button
              type="button"
              onClick={() => setResetDialogOpen(true)}
              className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              Reset to defaults
            </button>
          }
        />

        <SaveSuccessBanner show={showSuccess} />

        <div className="flex gap-8">
          <div className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24">
              <SettingsSidebar
                sections={SETTINGS_SECTIONS}
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
              />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-6 lg:hidden">
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-border bg-card text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Open settings menu"
                >
                  <SlidersHorizontal className="size-4" />
                  {activeLabel}
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-xs overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Settings</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <SettingsSidebar
                      sections={SETTINGS_SECTIONS}
                      activeSection={activeSection}
                      onSectionChange={handleSectionChange}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <ActiveComponent />
          </div>
        </div>

      <SettingsSaveBar
        hasUnsavedChanges={hasUnsavedChanges}
        isSaving={isSaving}
        onSave={handleSave}
        onReset={resetDraft}
      />

      <ConfirmDialog
        open={resetDialogOpen}
        onOpenChange={setResetDialogOpen}
        title="Reset to defaults?"
        description="All settings will revert to default values. You must save to persist this change."
        confirmLabel="Reset"
        variant="destructive"
        onConfirm={() => {
          resetToDefaults();
          setResetDialogOpen(false);
          showToast("Settings reset to defaults — save to apply");
        }}
      />

      <ToastContainer />
    </PageShell>
  );
}
