"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingOverlay } from "@/components/shared/loading-spinner";
import { useAuth } from "@/hooks/use-auth";
import { CLIENT_DASHBOARD_PATH } from "@/lib/auth-routes";

interface RequireAuthProps {
  children: React.ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isHydrated } = useAuth();

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated) {
      const callbackUrl = encodeURIComponent(pathname);
      router.replace(`/sign-in?callbackUrl=${callbackUrl}`);
      return;
    }

    if (user?.role === "client") {
      router.replace(CLIENT_DASHBOARD_PATH);
    }
  }, [isHydrated, isAuthenticated, user, pathname, router]);

  if (!isHydrated || !isAuthenticated || user?.role === "client") {
    return <LoadingOverlay label="Loading" />;
  }

  return <>{children}</>;
}
