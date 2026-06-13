"use client";

import { useMemo } from "react";
import { AuthContext } from "@/hooks/use-auth";
import { DEMO_USERS } from "@/lib/auth-data";
import { toAuthUser } from "@/lib/auth-utils";
import type { UserRole } from "@/lib/types/auth";

interface DemoAuthProviderProps {
  role: UserRole;
  children: React.ReactNode;
}

export function DemoAuthProvider({ role, children }: DemoAuthProviderProps) {
  const value = useMemo(() => {
    const storedUser = DEMO_USERS.find((user) => user.role === role)!;

    return {
      user: toAuthUser(storedUser),
      isAuthenticated: true,
      isHydrated: true,
      signIn: async () => ({
        success: false as const,
        error: "Authentication is disabled in demo mode.",
      }),
      signUp: async () => ({
        success: false as const,
        error: "Authentication is disabled in demo mode.",
      }),
      signOut: () => {},
    };
  }, [role]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
