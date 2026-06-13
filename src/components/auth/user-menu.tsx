"use client";

import { LayoutDashboard, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

interface UserMenuProps {
  onNavigate?: () => void;
  className?: string;
}

export function UserMenu({ onNavigate, className }: UserMenuProps) {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  if (!user) return null;

  const handleSignOut = () => {
    signOut();
    setOpen(false);
    onNavigate?.();
    router.push("/");
    router.refresh();
  };

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div ref={menuRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-xl border border-border bg-card px-2 py-1.5 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Account menu"
      >
        <Avatar size="sm">
          <AvatarFallback className="bg-gradient-to-br from-primary to-brand-secondary text-xs font-semibold text-primary-foreground">
            {user.avatar}
          </AvatarFallback>
        </Avatar>
        <span className="hidden max-w-[120px] truncate text-sm font-medium text-foreground sm:inline">
          {user.name.split(" ")[0]}
        </span>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-card shadow-lg"
        >
          <div className="border-b border-border px-4 py-3">
            <p className="truncate text-sm font-medium text-foreground">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            <p className="mt-1 text-xs capitalize text-primary">{user.role}</p>
          </div>

          <div className="p-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <item.icon className="size-4 text-muted-foreground" aria-hidden="true" />
                {item.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-border p-1">
            <button
              type="button"
              role="menuitem"
              onClick={handleSignOut}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <LogOut className="size-4" aria-hidden="true" />
              Sign Out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function UserMenuMobile({ onNavigate }: { onNavigate?: () => void }) {
  const { user, signOut } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const handleSignOut = () => {
    signOut();
    onNavigate?.();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="space-y-3 border-t border-border pt-6">
      <div className="flex items-center gap-3 rounded-xl bg-muted/40 px-4 py-3">
        <Avatar>
          <AvatarFallback className="bg-gradient-to-br from-primary to-brand-secondary text-sm font-semibold text-primary-foreground">
            {user.avatar}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{user.name}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <Link
        href="/dashboard"
        onClick={onNavigate}
        className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
      >
        <User className="size-5 text-muted-foreground" aria-hidden="true" />
        Dashboard
      </Link>

      <button
        type="button"
        onClick={handleSignOut}
        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-base font-medium text-destructive transition-colors hover:bg-destructive/10"
      >
        <LogOut className="size-5" aria-hidden="true" />
        Sign Out
      </button>
    </div>
  );
}
