"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingOverlay } from "@/components/shared/loading-spinner";
import { useAuth } from "@/hooks/use-auth";
import {
  CLIENT_NOTIFICATIONS_PATH,
  CLIENT_SETTINGS_PATH,
  getDashboardPathForRole,
} from "@/lib/auth-routes";

interface RequireFreelancerAuthProps {
  children: React.ReactNode;
  /** Redirect clients to the matching client route when set */
  clientRedirect?: "notifications" | "settings" | "dashboard";
}

export function RequireFreelancerAuth({
  children,
  clientRedirect = "dashboard",
}: RequireFreelancerAuthProps) {
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
      const destination =
        clientRedirect === "notifications"
          ? CLIENT_NOTIFICATIONS_PATH
          : clientRedirect === "settings"
            ? CLIENT_SETTINGS_PATH
            : getDashboardPathForRole("client");
      router.replace(destination);
    }
  }, [isHydrated, isAuthenticated, user, pathname, router, clientRedirect]);

  if (!isHydrated || !isAuthenticated || user?.role === "client") {
    return <LoadingOverlay label="Loading" />;
  }

  return <>{children}</>;
}
