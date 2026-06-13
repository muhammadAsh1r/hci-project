"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import {
  applyPreferencesToDocument,
  mergePreferences,
  PREFERENCES_STORAGE_KEY,
} from "@/lib/preferences-utils";
import type { UserPreferences } from "@/lib/types/settings";
import { DEFAULT_USER_PREFERENCES } from "@/lib/types/settings";

interface PreferencesContextValue {
  preferences: UserPreferences;
  draft: UserPreferences;
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  updateDraft: (updates: Partial<UserPreferences>) => void;
  updateDraftNested: <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => void;
  updateAndSave: (updates: Partial<UserPreferences>) => void;
  savePreferences: () => Promise<void>;
  resetDraft: () => void;
  resetToDefaults: () => void;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

const prefListeners = new Set<() => void>();
let prefSnapshotCache: { raw: string; data: UserPreferences } | null = null;

function subscribePreferences(callback: () => void) {
  prefListeners.add(callback);
  const onStorage = (e: StorageEvent) => {
    if (e.key === PREFERENCES_STORAGE_KEY) callback();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    prefListeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function notifyPreferences() {
  prefListeners.forEach((cb) => cb());
}

function getPreferencesSnapshot(): UserPreferences {
  try {
    const raw =
      localStorage.getItem(PREFERENCES_STORAGE_KEY) ??
      JSON.stringify(DEFAULT_USER_PREFERENCES);
    if (prefSnapshotCache?.raw === raw) return prefSnapshotCache.data;
    const parsed = JSON.parse(raw) as Partial<UserPreferences>;
    const data = mergePreferences(parsed);
    prefSnapshotCache = { raw, data };
    return data;
  } catch {
    return DEFAULT_USER_PREFERENCES;
  }
}

function persistPreferences(prefs: UserPreferences) {
  const raw = JSON.stringify(prefs);
  localStorage.setItem(PREFERENCES_STORAGE_KEY, raw);
  prefSnapshotCache = { raw, data: prefs };
  applyPreferencesToDocument(prefs);
  notifyPreferences();
}

function useStoredPreferences() {
  return useSyncExternalStore(
    subscribePreferences,
    getPreferencesSnapshot,
    () => DEFAULT_USER_PREFERENCES
  );
}

export function PreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const preferences = useStoredPreferences();
  const [draft, setDraft] = useState<UserPreferences | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const activeDraft = draft ?? preferences;

  useEffect(() => {
    applyPreferencesToDocument(activeDraft);
  }, [activeDraft]);

  useEffect(() => {
    const onSystemThemeChange = () => {
      if (activeDraft.theme === "system") applyPreferencesToDocument(activeDraft);
    };
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", onSystemThemeChange);
    return () =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", onSystemThemeChange);
  }, [activeDraft.theme, activeDraft]);

  const hasUnsavedChanges = useMemo(
    () => draft !== null && JSON.stringify(draft) !== JSON.stringify(preferences),
    [draft, preferences]
  );

  const ensureDraft = useCallback(
    (updater: (prev: UserPreferences) => UserPreferences) => {
      setDraft((prev) => updater(prev ?? preferences));
    },
    [preferences]
  );

  const updateDraft = useCallback(
    (updates: Partial<UserPreferences>) => {
      ensureDraft((prev) => ({ ...prev, ...updates }));
    },
    [ensureDraft]
  );

  const updateDraftNested = useCallback(
    <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
      ensureDraft((prev) => ({ ...prev, [key]: value }));
    },
    [ensureDraft]
  );

  const savePreferences = useCallback(async () => {
    if (!draft) return;
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    persistPreferences(draft);
    setDraft(null);
    setIsSaving(false);
  }, [draft]);

  const resetDraft = useCallback(() => {
    setDraft(null);
  }, []);

  const resetToDefaults = useCallback(() => {
    setDraft(DEFAULT_USER_PREFERENCES);
  }, []);

  const updateAndSave = useCallback((updates: Partial<UserPreferences>) => {
    const next = { ...getPreferencesSnapshot(), ...updates };
    persistPreferences(next);
    setDraft(null);
  }, []);

  const value = useMemo(
    () => ({
      preferences,
      draft: activeDraft,
      hasUnsavedChanges,
      isSaving,
      updateDraft,
      updateDraftNested,
      updateAndSave,
      savePreferences,
      resetDraft,
      resetToDefaults,
    }),
    [
      preferences,
      activeDraft,
      hasUnsavedChanges,
      isSaving,
      updateDraft,
      updateDraftNested,
      updateAndSave,
      savePreferences,
      resetDraft,
      resetToDefaults,
    ]
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error("usePreferences must be used within PreferencesProvider");
  }
  return ctx;
}
