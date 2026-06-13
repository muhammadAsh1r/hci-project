"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { applyPreferencesToDocument } from "@/lib/preferences-utils";
import {
  CLIENT_SETTINGS_STORAGE_KEY,
  DEFAULT_CLIENT_SETTINGS,
  type ClientSettings,
  type ClientSettingsSection,
} from "@/lib/types/client-settings";

const listeners = new Set<() => void>();
let cache: { raw: string; data: ClientSettings } | null = null;

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === CLIENT_SETTINGS_STORAGE_KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function notify() {
  listeners.forEach((cb) => cb());
}

function getSnapshot(): ClientSettings {
  if (typeof window === "undefined") return DEFAULT_CLIENT_SETTINGS;
  try {
    const raw = localStorage.getItem(CLIENT_SETTINGS_STORAGE_KEY) ?? "";
    if (cache?.raw === raw) return cache.data;
    if (!raw) {
      localStorage.setItem(CLIENT_SETTINGS_STORAGE_KEY, JSON.stringify(DEFAULT_CLIENT_SETTINGS));
      return DEFAULT_CLIENT_SETTINGS;
    }
    const parsed = JSON.parse(raw) as ClientSettings;
    const data = parsed?.company ? { ...DEFAULT_CLIENT_SETTINGS, ...parsed } : DEFAULT_CLIENT_SETTINGS;
    cache = { raw, data };
    return data;
  } catch {
    return DEFAULT_CLIENT_SETTINGS;
  }
}

function writeSettings(settings: ClientSettings) {
  const raw = JSON.stringify(settings);
  localStorage.setItem(CLIENT_SETTINGS_STORAGE_KEY, raw);
  cache = { raw, data: settings };
  notify();
}

interface ClientSettingsContextValue {
  settings: ClientSettings;
  draft: ClientSettings;
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  updateDraft: (updates: Partial<ClientSettings>) => void;
  updateDraftNested: <K extends keyof ClientSettings>(
    key: K,
    value: ClientSettings[K]
  ) => void;
  saveSettings: () => Promise<void>;
  resetDraft: () => void;
  resetToDefaults: () => void;
}

const ClientSettingsContext = createContext<ClientSettingsContextValue | null>(null);

export function ClientSettingsProvider({ children }: { children: React.ReactNode }) {
  const settings = useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_CLIENT_SETTINGS);
  const [draft, setDraft] = useState<ClientSettings>(settings);
  const [isSaving, setIsSaving] = useState(false);

  const hasUnsavedChanges = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(settings),
    [draft, settings]
  );

  const updateDraft = useCallback((updates: Partial<ClientSettings>) => {
    setDraft((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateDraftNested = useCallback(
    <K extends keyof ClientSettings>(key: K, value: ClientSettings[K]) => {
      setDraft((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const saveSettings = useCallback(async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    writeSettings(draft);
    applyPreferencesToDocument({
      theme: draft.theme,
      accentColor: draft.accentColor,
      fontSize: draft.fontSize,
      layoutDensity: draft.layoutDensity,
      increaseFontSize: false,
      reduceMotion: false,
      highContrast: false,
      keyboardNavigation: false,
      screenReaderOptimized: false,
      enhancedFocus: false,
      profile: { avatar: draft.company.logo, name: draft.company.companyName, bio: "", skills: [], location: "", portfolioLink: "", website: "" },
      notificationToggles: { projectRecommendations: true, proposalUpdates: true, paymentAlerts: true, messages: true, marketingEmails: false, systemNotifications: true },
      privacy: { profileVisibility: "public", portfolioVisibility: "public", showEarnings: false, showAvailability: true, showContactInfo: false },
      preferredCategories: [],
      preferredSkills: [],
      preferredBudgetMin: 0,
      preferredBudgetMax: 10000,
      preferredProjectTypes: [],
      availabilityPreference: "flexible",
      dashboardWidgets: draft.dashboardWidgets,
      dashboardLayout: draft.dashboardLayout,
      quickActions: [],
      favoriteSections: draft.favoriteSections,
    });
    setIsSaving(false);
  }, [draft]);

  const resetDraft = useCallback(() => {
    setDraft(settings);
  }, [settings]);

  const resetToDefaults = useCallback(() => {
    setDraft(DEFAULT_CLIENT_SETTINGS);
    writeSettings(DEFAULT_CLIENT_SETTINGS);
  }, []);

  const value = useMemo(
    () => ({
      settings,
      draft,
      hasUnsavedChanges,
      isSaving,
      updateDraft,
      updateDraftNested,
      saveSettings,
      resetDraft,
      resetToDefaults,
    }),
    [settings, draft, hasUnsavedChanges, isSaving, updateDraft, updateDraftNested, saveSettings, resetDraft, resetToDefaults]
  );

  return (
    <ClientSettingsContext.Provider value={value}>
      {children}
    </ClientSettingsContext.Provider>
  );
}

export function useClientSettings() {
  const ctx = useContext(ClientSettingsContext);
  if (!ctx) {
    throw new Error("useClientSettings must be used within ClientSettingsProvider");
  }
  return ctx;
}
