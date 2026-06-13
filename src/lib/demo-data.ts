/**
 * Consolidated demo data for public /demo/* routes.
 * Used by design import tools (Builder.io, html.to.design, Figma plugins).
 */
export { DEMO_USERS, DEMO_CREDENTIALS } from "@/lib/auth-data";
export {
  freelancerProfile,
  dashboardStats,
  activeProjects,
  profileStrength,
  profileRecommendations,
  recommendedProjects,
  recentActivity,
  monthlyEarnings,
  portfolioItems,
  portfolioStats,
  skills,
  certifications,
  clientReviews,
} from "@/lib/dashboard-data";
export {
  clientDashboardStats,
  clientRecentProjects,
  clientRecentActivity,
  clientUpcomingDeadlines,
  clientRecommendedFreelancers,
  monthlySpending,
  projectsCreatedData,
  hiringActivityData,
} from "@/lib/client-dashboard-data";
export {
  marketplaceProjects,
  getProjectById,
} from "@/lib/projects-data";
export {
  escrowContracts,
  escrowOverviewStats,
  escrowSummary,
  escrowNotifications,
  escrowDisputes,
} from "@/lib/escrow-data";
export { mockNotifications as notifications } from "@/lib/notifications-data";

export const demoFreelancerUser = {
  id: "user-freelancer-demo",
  name: "Sarah Chen",
  email: "freelancer@demo.com",
  avatar: "SC",
  role: "freelancer" as const,
  title: "Senior Frontend Developer",
};

export const demoClientUser = {
  id: "user-client-demo",
  name: "Alex Rivera",
  email: "client@demo.com",
  avatar: "AR",
  role: "client" as const,
  title: "Product Manager",
};
