"use client";

import { Menu, Settings, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/layout/container";
import { NotificationBell } from "@/components/layout/notification-bell";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { PrimaryButton } from "@/components/shared/primary-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tooltip } from "@/components/shared/tooltip";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { navLinks } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const isScrolled = useScrollPosition(20);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "glass-nav shadow-sm" : "bg-transparent"
      )}
    >
      <Container as="div" className="flex h-16 items-center justify-between lg:h-18">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="FreelanceAI home"
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-4" aria-hidden="true" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Freelance<span className="text-primary">AI</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Tooltip content="Toggle theme">
            <ThemeToggle />
          </Tooltip>
          <Tooltip content="Notifications">
            <NotificationBell />
          </Tooltip>
          <Tooltip content="Settings">
            <Link
              href="/settings"
              className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Settings"
            >
              <Settings className="size-4" aria-hidden="true" />
            </Link>
          </Tooltip>
          <Link
            href="#"
            className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Sign In
          </Link>
          <PrimaryButton href="#" size="default">
            Get Started
          </PrimaryButton>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <NotificationBell />

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 text-left">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Sparkles className="size-4" />
                </div>
                FreelanceAI
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/notifications"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
              >
                Notifications
              </Link>
              <Link
                href="/settings"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
              >
                Settings
              </Link>
            </nav>
            <div className="mt-8 flex flex-col gap-3 border-t border-border pt-8">
              <Link
                href="#"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-center text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                Sign In
              </Link>
              <PrimaryButton href="#" size="default" className="w-full">
                Get Started
              </PrimaryButton>
            </div>
          </SheetContent>
        </Sheet>
        </div>
      </Container>
    </header>
  );
}
