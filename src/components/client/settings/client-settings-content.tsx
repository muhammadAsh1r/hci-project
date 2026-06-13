"use client";

import { Suspense, useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { ClientAccountSettingsSection } from "@/components/client/settings/client-account-settings-section";
import { SecuritySettingsSection } from "@/components/settings/security-settings";
import { ClientAppearanceSettingsSection } from "@/components/client/settings/client-appearance-settings-section";
import { ClientDashboardSettingsSection } from "@/components/client/settings/client-dashboard-settings-section";
import { ClientNotificationSettingsSection } from "@/components/client/settings/client-notification-settings-section";
import { ClientPrivacySettingsSection } from "@/components/client/settings/client-privacy-settings-section";
import { ClientProfileSettingsSection } from "@/components/client/settings/client-profile-settings-section";
import { ClientSettingsSidebar } from "@/components/client/settings/client-settings-sidebar";
import {
  SaveSuccessBanner,
  SettingsSaveBar,
} from "@/components/settings/settings-save-bar";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { ClientSettingsProvider, useClientSettings } from "@/hooks/use-client-settings";
import { useToast } from "@/hooks/use-toast";
import {
  CLIENT_SETTINGS_SECTIONS,
  type ClientSettingsSection,
} from "@/lib/types/client-settings";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const SECTION_COMPONENTS: Record<ClientSettingsSection, React.ComponentType> = {
  profile: ClientProfileSettingsSection,
  account: ClientAccountSettingsSection,
  notifications: ClientNotificationSettingsSection,
  security: SecuritySettingsSection,
  appearance: ClientAppearanceSettingsSection,
  privacy: ClientPrivacySettingsSection,
  dashboard: ClientDashboardSettingsSection,
};

function isValidSection(s: string | null): s is ClientSettingsSection {
  return CLIENT_SETTINGS_SECTIONS.some((sec) => sec.id === s);
}

function ClientSettingsInner() {
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get("section");
  const activeSection: ClientSettingsSection = isValidSection(sectionParam)
    ? sectionParam
    : "profile";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const { showToast, ToastContainer } = useToast();

  const {
    hasUnsavedChanges,
    isSaving,
    saveSettings,
    resetDraft,
    resetToDefaults,
  } = useClientSettings();

  const handleSectionChange = useCallback((section: ClientSettingsSection) => {
    setSidebarOpen(false);
    window.history.replaceState(null, "", `/client/settings?section=${section}`);
  }, []);

  const handleSave = useCallback(async () => {
    await saveSettings();
    setShowSuccess(true);
    showToast("Settings saved successfully", "success");
    setTimeout(() => setShowSuccess(false), 3000);
  }, [saveSettings, showToast]);

  const ActiveComponent = SECTION_COMPONENTS[activeSection];
  const activeLabel = CLIENT_SETTINGS_SECTIONS.find((s) => s.id === activeSection)?.label;

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 pb-32 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Settings</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your company profile, notifications, security, and preferences.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setResetOpen(true)}
          className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Reset to defaults
        </button>
      </div>

      <SaveSuccessBanner show={showSuccess} />

      <div className="flex gap-8">
        <aside className="hidden w-56 shrink-0 lg:block">
          <ClientSettingsSidebar
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-4 lg:hidden">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-medium">
                <SlidersHorizontal className="size-4" />
                {activeLabel ?? "Settings"}
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs">
                <SheetHeader>
                  <SheetTitle>Settings</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <ClientSettingsSidebar
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
        open={resetOpen}
        onOpenChange={setResetOpen}
        title="Reset all settings?"
        description="This will restore all settings to their default values. This action cannot be undone."
        confirmLabel="Reset All"
        variant="destructive"
        onConfirm={() => {
          resetToDefaults();
          setResetOpen(false);
          showToast("Settings reset to defaults");
        }}
      />

      <ToastContainer />
    </div>
  );
}

export function ClientSettingsContent() {
  return (
    <ClientSettingsProvider>
      <Suspense fallback={<div className="p-8"><ListSkeleton count={4} /></div>}>
        <ClientSettingsInner />
      </Suspense>
    </ClientSettingsProvider>
  );
}
