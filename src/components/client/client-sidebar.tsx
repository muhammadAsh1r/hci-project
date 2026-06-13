"use client";

import {
  Bell,
  FileSignature,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Menu,
  MessageSquare,
  PlusCircle,
  Settings,
  Shield,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { clientNavItems } from "@/lib/client-dashboard-data";
import { cn } from "@/lib/utils";

const iconMap = {
  LayoutDashboard,
  PlusCircle,
  FolderKanban,
  FileText,
  Users,
  FileSignature,
  Shield,
  MessageSquare,
  Bell,
  User,
  Settings,
};

function isClientNavItemActive(pathname: string, href: string): boolean {
  if (href === "/client/dashboard") return pathname === "/client/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

interface ClientSidebarProps {
  onNavigate?: () => void;
  className?: string;
}

function ClientNavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1" aria-label="Client navigation">
      {clientNavItems.map((item) => {
        const Icon = iconMap[item.icon];
        const isActive = isClientNavItemActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className="size-4" aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function ClientSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <aside
        className="hidden w-64 shrink-0 border-r border-border bg-card lg:block"
        aria-label="Client dashboard navigation"
      >
        <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col p-4">
          <div className="mb-6 px-3">
            <Link
              href="/client/dashboard"
              className="flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="size-4" />
              </div>
              <span className="font-bold">
                Freelance<span className="text-primary">AI</span>
              </span>
            </Link>
            <p className="mt-1 px-1 text-xs text-muted-foreground">Client Workspace</p>
          </div>

          <ClientNavLinks />
        </div>
      </aside>

      <div className="fixed bottom-4 left-4 z-40 lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            className="inline-flex size-12 items-center justify-center rounded-xl border border-border bg-card text-foreground shadow-lg transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Open client menu"
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs p-0">
            <SheetHeader className="border-b border-border px-6 py-5 text-left">
              <SheetTitle className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Sparkles className="size-4" />
                </div>
                Client Workspace
              </SheetTitle>
            </SheetHeader>
            <div className="p-4">
              <ClientNavLinks onNavigate={() => setMobileOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
