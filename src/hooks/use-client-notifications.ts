"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import { SEED_CLIENT_NOTIFICATIONS } from "@/lib/client-notifications-data";
import {
  CLIENT_NOTIFICATIONS_STORAGE_KEY,
  type ClientNotification,
  type ClientNotificationCategory,
} from "@/lib/types/client-settings";

const listeners = new Set<() => void>();
let cache: { raw: string; data: ClientNotification[] } | null = null;

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === CLIENT_NOTIFICATIONS_STORAGE_KEY) cb();
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

function getSnapshot(): ClientNotification[] {
  if (typeof window === "undefined") return SEED_CLIENT_NOTIFICATIONS;
  try {
    const raw = localStorage.getItem(CLIENT_NOTIFICATIONS_STORAGE_KEY) ?? "";
    if (cache?.raw === raw) return cache.data;
    if (!raw) {
      localStorage.setItem(CLIENT_NOTIFICATIONS_STORAGE_KEY, JSON.stringify(SEED_CLIENT_NOTIFICATIONS));
      return SEED_CLIENT_NOTIFICATIONS;
    }
    const parsed = JSON.parse(raw) as ClientNotification[];
    const data = Array.isArray(parsed) ? parsed : SEED_CLIENT_NOTIFICATIONS;
    cache = { raw, data };
    return data;
  } catch {
    return SEED_CLIENT_NOTIFICATIONS;
  }
}

function writeNotifications(data: ClientNotification[]) {
  const raw = JSON.stringify(data);
  localStorage.setItem(CLIENT_NOTIFICATIONS_STORAGE_KEY, raw);
  cache = { raw, data };
  notify();
}

export function useClientNotifications() {
  const stored = useSyncExternalStore(subscribe, getSnapshot, () => SEED_CLIENT_NOTIFICATIONS);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | ClientNotificationCategory>("all");

  const filtered = useMemo(() => {
    return stored.filter((n) => {
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
  }, [stored, activeTab, search]);

  const unreadCount = useMemo(
    () => stored.filter((n) => n.status === "unread").length,
    [stored]
  );

  const markAsRead = useCallback(
    (id: string) => {
      writeNotifications(
        stored.map((n) => (n.id === id ? { ...n, status: "read" as const } : n))
      );
    },
    [stored]
  );

  const markAllRead = useCallback(() => {
    writeNotifications(stored.map((n) => ({ ...n, status: "read" as const })));
  }, [stored]);

  const deleteNotification = useCallback(
    (id: string) => {
      writeNotifications(stored.filter((n) => n.id !== id));
    },
    [stored]
  );

  return {
    notifications: filtered,
    unreadCount,
    search,
    setSearch,
    activeTab,
    setActiveTab,
    markAsRead,
    markAllRead,
    deleteNotification,
  };
}
