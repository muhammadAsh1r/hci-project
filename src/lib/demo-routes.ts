import { dashboardNavItems } from "@/lib/dashboard-data";
import { clientNavItems } from "@/lib/client-dashboard-data";

export const DEMO_ROUTES = {
  dashboard: "/demo/dashboard",
  aiProposals: "/demo/ai-proposals",
  portfolio: "/demo/portfolio",
  escrow: "/demo/escrow",
  settings: "/demo/settings",
  clientDashboard: "/demo/client-dashboard",
  projects: "/demo/projects",
  freelancers: "/demo/freelancers",
} as const;

const FREELANCER_DEMO_PATH_MAP: Record<string, string> = {
  "/dashboard": DEMO_ROUTES.dashboard,
  "/dashboard/proposals": DEMO_ROUTES.aiProposals,
  "/dashboard/portfolio": DEMO_ROUTES.portfolio,
  "/dashboard/escrow": DEMO_ROUTES.escrow,
  "/settings": DEMO_ROUTES.settings,
  "/projects": DEMO_ROUTES.projects,
  "/freelancers": DEMO_ROUTES.freelancers,
};

const CLIENT_DEMO_PATH_MAP: Record<string, string> = {
  "/client/dashboard": DEMO_ROUTES.clientDashboard,
};

export function toDemoHref(href: string, role: "freelancer" | "client" = "freelancer"): string {
  const map = role === "client" ? CLIENT_DEMO_PATH_MAP : FREELANCER_DEMO_PATH_MAP;
  return map[href] ?? href;
}

export const demoFreelancerNavItems = dashboardNavItems.map((item) => ({
  ...item,
  href: toDemoHref(item.href),
}));

export const demoClientNavItems = clientNavItems.map((item) => ({
  ...item,
  href: toDemoHref(item.href, "client"),
}));

export function isDemoFreelancerNavActive(pathname: string, href: string): boolean {
  if (href === DEMO_ROUTES.dashboard) return pathname === DEMO_ROUTES.dashboard;
  if (href === DEMO_ROUTES.projects) return pathname.startsWith(DEMO_ROUTES.projects);
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isDemoClientNavActive(pathname: string, href: string): boolean {
  if (href === DEMO_ROUTES.clientDashboard) {
    return pathname === DEMO_ROUTES.clientDashboard;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
