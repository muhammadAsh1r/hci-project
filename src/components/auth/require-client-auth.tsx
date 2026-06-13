"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingOverlay } from "@/components/shared/loading-spinner";
import { useAuth } from "@/hooks/use-auth";
import { getDashboardPathForRole } from "@/lib/auth-routes";

interface RequireClientAuthProps {
  children: React.ReactNode;
}

export function RequireClientAuth({ children }: RequireClientAuthProps) {
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

    if (user?.role !== "client") {
      router.replace(getDashboardPathForRole(user?.role ?? "freelancer"));
    }
  }, [isHydrated, isAuthenticated, user, pathname, router]);

  if (!isHydrated || !isAuthenticated || user?.role !== "client") {
    return <LoadingOverlay label="Loading" />;
  }

  return <>{children}</>;
}
