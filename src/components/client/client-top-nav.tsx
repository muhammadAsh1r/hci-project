"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClientNotificationBell } from "@/components/client/client-notification-bell";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { clientNavItems } from "@/lib/client-dashboard-data";

function getPageTitle(pathname: string): string {
  const match = clientNavItems.find(
    (item) =>
      pathname === item.href ||
      (item.href !== "/client/dashboard" && pathname.startsWith(item.href))
  );
  return match?.label ?? "Client Portal";
}

function isClientDetailPage(pathname: string): boolean {
  return clientNavItems.every((item) => pathname !== item.href);
}

export function ClientTopNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const pageTitle = getPageTitle(pathname);
  const isDetailPage = isClientDetailPage(pathname);
  const TitleTag = isDetailPage ? "p" : "h1";

  return (
    <header className="sticky top-16 z-30 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="min-w-0 pl-14 lg:pl-0">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Client Portal
          </p>
          <TitleTag className="truncate text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {pageTitle}
          </TitleTag>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden max-w-xs flex-1 md:block">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="Search projects, freelancers..."
              className="h-10 rounded-xl pl-9"
              aria-label="Search client workspace"
            />
          </div>

          <ThemeToggle />
          <ClientNotificationBell />

          <Link
            href="/client/profile"
            className="hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 transition-colors hover:bg-accent sm:flex"
            aria-label="Company profile"
          >
            <Avatar size="sm">
              <AvatarFallback className="bg-gradient-to-br from-primary to-brand-secondary text-xs font-semibold text-primary-foreground">
                {user?.avatar ?? "CL"}
              </AvatarFallback>
            </Avatar>
            <span className="max-w-[120px] truncate text-sm font-medium text-foreground">
              {user?.name ?? "Client"}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
