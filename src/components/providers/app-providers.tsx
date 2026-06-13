"use client";

import { PreferencesProvider } from "@/hooks/use-preferences";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <PreferencesProvider>{children}</PreferencesProvider>;
}
