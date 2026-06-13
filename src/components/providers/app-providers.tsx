"use client";

import { AuthProvider } from "@/hooks/use-auth";
import { PreferencesProvider } from "@/hooks/use-preferences";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <PreferencesProvider>{children}</PreferencesProvider>
    </AuthProvider>
  );
}
