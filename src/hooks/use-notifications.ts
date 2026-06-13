"use client";

import { useSyncExternalStore, useCallback, useMemo, useState } from "react";
import { mockNotifications } from "@/lib/notifications-data";
import type { AppNotification, NotificationCategory } from "@/lib/types/settings";

const NOTIFICATIONS_KEY = "freelanceai-notifications";

const listeners = new Set<() => void>();
let snapshotCache: { raw: string; data: AppNotification[] } | null = null;

function subscribe(callback: () => void) {
  listeners.add(callback);
  const onStorage = (e: StorageEvent) => {
    if (e.key === NOTIFICATIONS_KEY) callback();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function notify() {
  listeners.forEach((cb) => cb());
}

function getSnapshot(): AppNotification[] {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_KEY) ?? JSON.stringify(mockNotifications);
    if (snapshotCache?.raw === raw) return snapshotCache.data;
    const parsed = JSON.parse(raw) as AppNotification[];
    const data = Array.isArray(parsed) ? parsed : mockNotifications;
    snapshotCache = { raw, data };
    return data;
  } catch {
    return mockNotifications;
  }
}

function writeNotifications(data: AppNotification[]) {
  const raw = JSON.stringify(data);
  localStorage.setItem(NOTIFICATIONS_KEY, raw);
  snapshotCache = { raw, data };
  notify();
}

function useStoredNotifications() {
  return useSyncExternalStore(subscribe, getSnapshot, () => mockNotifications);
}

export function useNotifications() {
  const storedNotifications = useStoredNotifications();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | NotificationCategory>("all");

  const persist = useCallback((next: AppNotification[]) => {
    writeNotifications(next);
  }, []);

  const filtered = useMemo(() => {
    return storedNotifications.filter((n) => {
      if (activeTab !== "all" && n.category !== activeTab) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          n.title.toLowerCase().includes(q) ||
          n.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [storedNotifications, activeTab, search]);

  const unreadCount = useMemo(
    () => storedNotifications.filter((n) => n.status === "unread").length,
    [storedNotifications]
  );

  const markAsRead = useCallback(
    (id: string) => {
      persist(
        storedNotifications.map((n) =>
          n.id === id ? { ...n, status: "read" as const } : n
        )
      );
    },
    [storedNotifications, persist]
  );

  const markAllRead = useCallback(() => {
    persist(
      storedNotifications.map((n) => ({ ...n, status: "read" as const }))
    );
  }, [storedNotifications, persist]);

  const deleteNotification = useCallback(
    (id: string) => {
      persist(storedNotifications.filter((n) => n.id !== id));
    },
    [storedNotifications, persist]
  );

  return {
    notifications: filtered,
    allNotifications: storedNotifications,
    unreadCount,
    search,
    setSearch,
    activeTab,
    setActiveTab,
    markAsRead,
    markAllRead,
    deleteNotification,
    hydrated: true,
  };
}
