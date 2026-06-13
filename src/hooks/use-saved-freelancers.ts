"use client";

import { useCallback, useSyncExternalStore } from "react";

const SAVED_KEY = "freelanceai-saved-freelancers";
const RECENT_KEY = "freelanceai-recent-freelancers";
const COMPARE_KEY = "freelanceai-compare-freelancers";

const EMPTY_IDS: string[] = [];

const storeListeners = new Map<string, Set<() => void>>();
const snapshotCache = new Map<string, { raw: string; snapshot: string[] }>();

function subscribe(key: string, callback: () => void) {
  if (!storeListeners.has(key)) storeListeners.set(key, new Set());
  storeListeners.get(key)!.add(callback);
  const onStorage = (e: StorageEvent) => {
    if (e.key === key) callback();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    storeListeners.get(key)?.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function notify(key: string) {
  storeListeners.get(key)?.forEach((cb) => cb());
}

function getSnapshot(key: string): string[] {
  if (typeof window === "undefined") return EMPTY_IDS;

  try {
    const raw = localStorage.getItem(key) ?? "[]";
    const cached = snapshotCache.get(key);
    if (cached?.raw === raw) return cached.snapshot;

    const parsed = JSON.parse(raw) as unknown;
    const snapshot = Array.isArray(parsed) ? (parsed as string[]) : EMPTY_IDS;
    snapshotCache.set(key, { raw, snapshot });
    return snapshot;
  } catch {
    snapshotCache.set(key, { raw: "[]", snapshot: EMPTY_IDS });
    return EMPTY_IDS;
  }
}

function readStorage(key: string): string[] {
  return getSnapshot(key);
}

function writeStorage(key: string, ids: string[]) {
  const raw = JSON.stringify(ids);
  localStorage.setItem(key, raw);
  snapshotCache.set(key, { raw, snapshot: ids });
  notify(key);
}

function useStoredIds(key: string) {
  return useSyncExternalStore(
    (callback) => subscribe(key, callback),
    () => getSnapshot(key),
    () => EMPTY_IDS
  );
}

export function useSavedFreelancers() {
  const savedIds = useStoredIds(SAVED_KEY);
  const recentIds = useStoredIds(RECENT_KEY);
  const compareIds = useStoredIds(COMPARE_KEY);

  const toggleSave = useCallback((id: string) => {
    const current = readStorage(SAVED_KEY);
    const next = current.includes(id)
      ? current.filter((v) => v !== id)
      : [...current, id];
    writeStorage(SAVED_KEY, next);
  }, []);

  const isSaved = useCallback(
    (id: string) => savedIds.includes(id),
    [savedIds]
  );

  const addRecent = useCallback((id: string) => {
    const current = readStorage(RECENT_KEY);
    const next = [id, ...current.filter((v) => v !== id)].slice(0, 8);
    writeStorage(RECENT_KEY, next);
  }, []);

  const toggleCompare = useCallback((id: string) => {
    const current = readStorage(COMPARE_KEY);
    const exists = current.includes(id);
    const next = exists
      ? current.filter((v) => v !== id)
      : current.length >= 3
        ? [...current.slice(1), id]
        : [...current, id];
    writeStorage(COMPARE_KEY, next);
  }, []);

  const isInCompare = useCallback(
    (id: string) => compareIds.includes(id),
    [compareIds]
  );

  const clearCompare = useCallback(() => {
    writeStorage(COMPARE_KEY, []);
  }, []);

  return {
    savedIds,
    recentIds,
    compareIds,
    hydrated: true,
    toggleSave,
    isSaved,
    addRecent,
    toggleCompare,
    isInCompare,
    clearCompare,
  };
}
