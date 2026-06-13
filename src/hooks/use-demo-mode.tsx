"use client";

import { createContext, useContext } from "react";
import { DemoModeBadge } from "@/components/demo/demo-mode-badge";

interface DemoModeContextValue {
  isDemoMode: true;
}

const DemoModeContext = createContext<DemoModeContextValue | null>(null);

export function DemoModeProvider({ children }: { children: React.ReactNode }) {
  return (
    <DemoModeContext.Provider value={{ isDemoMode: true }}>
      {children}
      <DemoModeBadge />
    </DemoModeContext.Provider>
  );
}

export function useDemoMode() {
  return useContext(DemoModeContext);
}
