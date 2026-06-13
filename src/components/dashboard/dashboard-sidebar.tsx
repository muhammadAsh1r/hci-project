"use client";

import {
  Bell,
  Briefcase,
  LayoutDashboard,
  Search,
  Settings,
  Shield,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardNavItems } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

const iconMap = {
  LayoutDashboard,
  Briefcase,
  Search,
  Sparkles,
  Shield,
  Bell,
  Settings,
};

function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") return pathname === "/dashboard";
  if (href === "/projects") return pathname.startsWith("/projects");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside
        className="hidden w-64 shrink-0 border-r border-border bg-card lg:block"
        aria-label="Dashboard navigation"
      >
        <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col p-4">
          <div className="mb-6 px-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="size-4" />
              </div>
              <span className="font-bold">
                Freelance<span className="text-primary">AI</span>
              </span>
            </Link>
            <p className="mt-1 px-1 text-xs text-muted-foreground">Freelancer Workspace</p>
          </div>

          <nav className="flex flex-1 flex-col gap-1" aria-label="Freelancer dashboard navigation">
            {dashboardNavItems.map((item) => {
              const Icon = iconMap[item.icon];
              const isActive = isNavItemActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-card lg:hidden"
        aria-label="Mobile dashboard navigation"
      >
        {dashboardNavItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = isNavItemActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="size-5" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
