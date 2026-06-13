"use client";

import { useCallback, useSyncExternalStore } from "react";
import { SEED_CLIENT_PROFILE } from "@/lib/client-profile-data";
import {
  CLIENT_PROFILE_STORAGE_KEY,
  type ClientCompanyProfile,
} from "@/lib/types/client-profile";

const listeners = new Set<() => void>();
let cache: { raw: string; data: ClientCompanyProfile } | null = null;

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === CLIENT_PROFILE_STORAGE_KEY) cb();
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

function getSnapshot(): ClientCompanyProfile {
  if (typeof window === "undefined") return SEED_CLIENT_PROFILE;
  try {
    const raw = localStorage.getItem(CLIENT_PROFILE_STORAGE_KEY) ?? "";
    if (cache?.raw === raw) return cache.data;
    if (!raw) {
      localStorage.setItem(CLIENT_PROFILE_STORAGE_KEY, JSON.stringify(SEED_CLIENT_PROFILE));
      return SEED_CLIENT_PROFILE;
    }
    const parsed = JSON.parse(raw) as ClientCompanyProfile;
    const data = parsed?.companyName ? parsed : SEED_CLIENT_PROFILE;
    cache = { raw, data };
    return data;
  } catch {
    return SEED_CLIENT_PROFILE;
  }
}

function writeProfile(profile: ClientCompanyProfile) {
  const raw = JSON.stringify(profile);
  localStorage.setItem(CLIENT_PROFILE_STORAGE_KEY, raw);
  cache = { raw, data: profile };
  notify();
}

export function useClientProfile() {
  const profile = useSyncExternalStore(subscribe, getSnapshot, () => SEED_CLIENT_PROFILE);

  const updateProfile = useCallback(
    (updates: Partial<ClientCompanyProfile>) => {
      writeProfile({ ...getSnapshot(), ...updates });
    },
    []
  );

  return { profile, updateProfile };
}
