"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingOverlay } from "@/components/shared/loading-spinner";
import { useAuth } from "@/hooks/use-auth";

interface RequireAuthProps {
  children: React.ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isHydrated } = useAuth();

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      const callbackUrl = encodeURIComponent(pathname);
      router.replace(`/sign-in?callbackUrl=${callbackUrl}`);
    }
  }, [isHydrated, isAuthenticated, pathname, router]);

  if (!isHydrated) {
    return <LoadingOverlay label="Checking authentication" />;
  }

  if (!isAuthenticated) {
    return <LoadingOverlay label="Redirecting to sign in" />;
  }

  return <>{children}</>;
}
