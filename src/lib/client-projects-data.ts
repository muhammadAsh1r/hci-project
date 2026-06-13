import type {
  ClientManagedProject,
  ClientProjectFormData,
} from "@/lib/types/client-project";
import type {
  ExperienceLevel,
  ProjectCategory,
  ProjectDuration,
} from "@/lib/types/project";
import { FILTER_OPTIONS } from "@/lib/types/project";

export const CATEGORY_SKILL_SUGGESTIONS: Record<ProjectCategory, string[]> = {
  "Web Development": ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS"],
  "Mobile Apps": ["React Native", "Swift", "Kotlin", "Flutter", "Firebase"],
  Design: ["Figma", "UI/UX", "Adobe XD", "Prototyping", "Design Systems"],
  AI: ["Python", "Machine Learning", "OpenAI", "TensorFlow", "NLP"],
  Writing: ["SEO", "Copywriting", "Technical Writing", "Blog Posts", "Editing"],
  Marketing: ["Social Media", "Google Ads", "Analytics", "Email Marketing", "Branding"],
};

export const CATEGORY_SUGGESTIONS: ProjectCategory[] = FILTER_OPTIONS.categories;

export const BUDGET_RECOMMENDATIONS: Record<
  ProjectCategory,
  Record<ExperienceLevel, { min: number; max: number; label: string }>
> = {
  "Web Development": {
    Beginner: { min: 500, max: 1500, label: "$500 – $1,500 for starter web builds" },
    Intermediate: { min: 2000, max: 6000, label: "$2,000 – $6,000 for production apps" },
    Expert: { min: 5000, max: 15000, label: "$5,000 – $15,000 for complex platforms" },
  },
  "Mobile Apps": {
    Beginner: { min: 800, max: 2500, label: "$800 – $2,500 for simple MVPs" },
    Intermediate: { min: 3000, max: 8000, label: "$3,000 – $8,000 for feature-rich apps" },
    Expert: { min: 8000, max: 20000, label: "$8,000 – $20,000 for enterprise mobile" },
  },
  Design: {
    Beginner: { min: 200, max: 800, label: "$200 – $800 for landing pages" },
    Intermediate: { min: 800, max: 3000, label: "$800 – $3,000 for product design" },
    Expert: { min: 3000, max: 10000, label: "$3,000 – $10,000 for full design systems" },
  },
  AI: {
    Beginner: { min: 1000, max: 3000, label: "$1,000 – $3,000 for basic integrations" },
    Intermediate: { min: 4000, max: 10000, label: "$4,000 – $10,000 for custom models" },
    Expert: { min: 10000, max: 25000, label: "$10,000 – $25,000 for AI products" },
  },
  Writing: {
    Beginner: { min: 100, max: 400, label: "$100 – $400 for short-form content" },
    Intermediate: { min: 400, max: 1500, label: "$400 – $1,500 for content packages" },
    Expert: { min: 1500, max: 5000, label: "$1,500 – $5,000 for strategy + writing" },
  },
  Marketing: {
    Beginner: { min: 300, max: 1000, label: "$300 – $1,000 for campaign setup" },
    Intermediate: { min: 1000, max: 4000, label: "$1,000 – $4,000 for growth campaigns" },
    Expert: { min: 4000, max: 12000, label: "$4,000 – $12,000 for full-funnel marketing" },
  },
};

export function formatClientBudget(min: number, max: number): string {
  return `$${min.toLocaleString()} – $${max.toLocaleString()}`;
}

export function formDataToProject(
  data: ClientProjectFormData,
  existing?: ClientManagedProject
): ClientManagedProject {
  const budgetMin = Number(data.budgetMin);
  const budgetMax = Number(data.budgetMax);
  const now = new Date();
  const id = existing?.id ?? `cp-${Date.now()}`;

  return {
    id,
    title: data.title.trim(),
    description: data.description.trim(),
    category: data.category as ProjectCategory,
    skills: data.skills,
    budgetMin,
    budgetMax,
    budget: formatClientBudget(budgetMin, budgetMax),
    projectType: data.projectType as ClientManagedProject["projectType"],
    experienceLevel: data.experienceLevel as ExperienceLevel,
    timeline: data.timeline as ProjectDuration,
    status: existing?.status ?? "open",
    proposalCount: existing?.proposalCount ?? 0,
    views: existing?.views ?? 0,
    postedDate: existing?.postedDate ?? now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    postedAt: existing?.postedAt ?? now.toISOString(),
    progress: existing?.progress ?? 0,
    attachments: data.attachments,
    analytics: existing?.analytics ?? {
      views: 0,
      applications: 0,
      shortlisted: 0,
      hiringProgress: 0,
    },
    proposalSummary: existing?.proposalSummary ?? {
      total: 0,
      shortlisted: 0,
      accepted: 0,
      rejected: 0,
    },
    timelineSteps: existing?.timelineSteps ?? [
      { label: "Project Posted", date: now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), status: "completed" },
      { label: "Applications Received", date: "Awaiting proposals", status: "current" },
      { label: "Freelancer Selected", date: "Pending", status: "upcoming" },
      { label: "Project Started", date: "Pending", status: "upcoming" },
      { label: "Project Completed", date: "Pending", status: "upcoming" },
    ],
    activities: existing?.activities ?? [
      {
        id: `act-${Date.now()}`,
        type: "project_posted",
        title: "Project Posted",
        description: `"${data.title.trim()}" is now live on the marketplace`,
        timestamp: "Just now",
      },
    ],
  };
}

export function projectToFormData(project: ClientManagedProject): ClientProjectFormData {
  return {
    title: project.title,
    description: project.description,
    category: project.category,
    skills: project.skills,
    budgetMin: String(project.budgetMin),
    budgetMax: String(project.budgetMax),
    projectType: project.projectType,
    experienceLevel: project.experienceLevel,
    timeline: project.timeline,
    attachments: project.attachments,
  };
}

export const SEED_CLIENT_PROJECTS: ClientManagedProject[] = [
  {
    id: "cp-seed-1",
    title: "E-commerce Platform Redesign",
    description:
      "Redesign and rebuild a modern e-commerce storefront with improved UX, faster load times, and mobile-first responsive design.",
    category: "Web Development",
    skills: ["React", "Next.js", "UI/UX"],
    budgetMin: 5000,
    budgetMax: 8000,
    budget: "$5,000 – $8,000",
    projectType: "Fixed Price",
    experienceLevel: "Expert",
    timeline: "1-3 months",
    status: "active",
    proposalCount: 14,
    views: 248,
    postedDate: "Jun 1, 2026",
    postedAt: "2026-06-01T10:00:00Z",
    progress: 65,
    attachments: [{ id: "a1", name: "brand-guidelines.pdf", size: "2.4 MB" }],
    analytics: { views: 248, applications: 14, shortlisted: 3, hiringProgress: 60 },
    proposalSummary: { total: 14, shortlisted: 3, accepted: 1, rejected: 4 },
    timelineSteps: [
      { label: "Project Posted", date: "Jun 1, 2026", status: "completed" },
      { label: "Applications Received", date: "Jun 1 – Jun 14", status: "completed" },
      { label: "Freelancer Selected", date: "Jun 15, 2026", status: "completed" },
      { label: "Project Started", date: "Jun 18, 2026", status: "current" },
      { label: "Project Completed", date: "Aug 1, 2026", status: "upcoming" },
    ],
    activities: [
      { id: "a1", type: "freelancer_hired", title: "Freelancer Hired", description: "Sarah Chen was hired for this project", timestamp: "2 days ago" },
      { id: "a2", type: "proposal_received", title: "New Proposal Received", description: "Marcus Johnson submitted a proposal", timestamp: "4 hours ago" },
      { id: "a3", type: "contract_created", title: "Contract Created", description: "Milestone contract generated and sent for review", timestamp: "1 day ago" },
    ],
  },
  {
    id: "cp-seed-2",
    title: "SaaS Dashboard UI",
    description:
      "Design and build a responsive admin dashboard for our B2B SaaS product with analytics widgets and user management.",
    category: "Design",
    skills: ["Figma", "UI/UX", "React"],
    budgetMin: 3200,
    budgetMax: 4500,
    budget: "$3,200 – $4,500",
    projectType: "Fixed Price",
    experienceLevel: "Intermediate",
    timeline: "1-4 weeks",
    status: "open",
    proposalCount: 9,
    views: 156,
    postedDate: "Jun 5, 2026",
    postedAt: "2026-06-05T14:00:00Z",
    progress: 0,
    attachments: [],
    analytics: { views: 156, applications: 9, shortlisted: 0, hiringProgress: 10 },
    proposalSummary: { total: 9, shortlisted: 0, accepted: 0, rejected: 2 },
    timelineSteps: [
      { label: "Project Posted", date: "Jun 5, 2026", status: "completed" },
      { label: "Applications Received", date: "Jun 5 – Jun 19", status: "current" },
      { label: "Freelancer Selected", date: "Pending", status: "upcoming" },
      { label: "Project Started", date: "Pending", status: "upcoming" },
      { label: "Project Completed", date: "Pending", status: "upcoming" },
    ],
    activities: [
      { id: "b1", type: "project_posted", title: "Project Posted", description: "Project is live and accepting proposals", timestamp: "Jun 5, 2026" },
      { id: "b2", type: "proposal_received", title: "New Proposal Received", description: "3 proposals received in the last 24 hours", timestamp: "6 hours ago" },
    ],
  },
  {
    id: "cp-seed-3",
    title: "Mobile App Landing Page",
    description:
      "Create a high-converting landing page for our fitness app launch with animations and mobile optimization.",
    category: "Web Development",
    skills: ["Next.js", "Tailwind CSS", "UI/UX"],
    budgetMin: 800,
    budgetMax: 1200,
    budget: "$800 – $1,200",
    projectType: "Fixed Price",
    experienceLevel: "Intermediate",
    timeline: "Less than 1 week",
    status: "active",
    proposalCount: 22,
    views: 312,
    postedDate: "May 28, 2026",
    postedAt: "2026-05-28T09:00:00Z",
    progress: 90,
    attachments: [{ id: "c1", name: "wireframes.fig", size: "8.1 MB" }],
    analytics: { views: 312, applications: 22, shortlisted: 5, hiringProgress: 85 },
    proposalSummary: { total: 22, shortlisted: 5, accepted: 1, rejected: 8 },
    timelineSteps: [
      { label: "Project Posted", date: "May 28, 2026", status: "completed" },
      { label: "Applications Received", date: "May 28 – Jun 10", status: "completed" },
      { label: "Freelancer Selected", date: "Jun 11, 2026", status: "completed" },
      { label: "Project Started", date: "Jun 12, 2026", status: "completed" },
      { label: "Project Completed", date: "Jun 20, 2026", status: "current" },
    ],
    activities: [
      { id: "c1", type: "project_updated", title: "Project Updated", description: "Timeline extended by 3 days for final QA", timestamp: "1 day ago" },
      { id: "c2", type: "freelancer_shortlisted", title: "Freelancer Shortlisted", description: "David Kim added to shortlist", timestamp: "3 days ago" },
    ],
  },
  {
    id: "cp-seed-4",
    title: "AI Customer Support Chatbot",
    description:
      "Build an AI-powered chatbot integrated with our help desk to handle tier-1 support queries automatically.",
    category: "AI",
    skills: ["Python", "OpenAI", "NLP"],
    budgetMin: 4000,
    budgetMax: 6000,
    budget: "$4,000 – $6,000",
    projectType: "Hourly",
    experienceLevel: "Expert",
    timeline: "1-3 months",
    status: "paused",
    proposalCount: 11,
    views: 189,
    postedDate: "May 20, 2026",
    postedAt: "2026-05-20T11:00:00Z",
    progress: 25,
    attachments: [],
    analytics: { views: 189, applications: 11, shortlisted: 2, hiringProgress: 30 },
    proposalSummary: { total: 11, shortlisted: 2, accepted: 0, rejected: 3 },
    timelineSteps: [
      { label: "Project Posted", date: "May 20, 2026", status: "completed" },
      { label: "Applications Received", date: "May 20 – Jun 3", status: "completed" },
      { label: "Freelancer Selected", date: "Paused", status: "current" },
      { label: "Project Started", date: "Pending", status: "upcoming" },
      { label: "Project Completed", date: "Pending", status: "upcoming" },
    ],
    activities: [
      { id: "d1", type: "project_updated", title: "Project Paused", description: "Project paused while budget is reviewed", timestamp: "5 days ago" },
    ],
  },
  {
    id: "cp-seed-5",
    title: "Brand Identity Package",
    description:
      "Complete brand identity including logo, color palette, typography, and brand guidelines document.",
    category: "Design",
    skills: ["Figma", "Branding", "Adobe XD"],
    budgetMin: 1500,
    budgetMax: 2000,
    budget: "$1,500 – $2,000",
    projectType: "Fixed Price",
    experienceLevel: "Expert",
    timeline: "1-4 weeks",
    status: "completed",
    proposalCount: 18,
    views: 276,
    postedDate: "Apr 12, 2026",
    postedAt: "2026-04-12T08:00:00Z",
    progress: 100,
    attachments: [{ id: "e1", name: "brief.docx", size: "1.2 MB" }],
    analytics: { views: 276, applications: 18, shortlisted: 4, hiringProgress: 100 },
    proposalSummary: { total: 18, shortlisted: 4, accepted: 1, rejected: 10 },
    timelineSteps: [
      { label: "Project Posted", date: "Apr 12, 2026", status: "completed" },
      { label: "Applications Received", date: "Apr 12 – Apr 26", status: "completed" },
      { label: "Freelancer Selected", date: "Apr 28, 2026", status: "completed" },
      { label: "Project Started", date: "May 1, 2026", status: "completed" },
      { label: "Project Completed", date: "May 28, 2026", status: "completed" },
    ],
    activities: [
      { id: "e1", type: "payment_released", title: "Payment Released", description: "Final milestone payment of $2,000 released", timestamp: "2 weeks ago" },
    ],
  },
  {
    id: "cp-seed-6",
    title: "SEO Content Strategy",
    description:
      "Develop a 6-month SEO content strategy with keyword research, content calendar, and 12 blog post outlines.",
    category: "Marketing",
    skills: ["SEO", "Copywriting", "Analytics"],
    budgetMin: 600,
    budgetMax: 900,
    budget: "$600 – $900",
    projectType: "Fixed Price",
    experienceLevel: "Intermediate",
    timeline: "1-4 weeks",
    status: "archived",
    proposalCount: 7,
    views: 98,
    postedDate: "Mar 8, 2026",
    postedAt: "2026-03-08T10:00:00Z",
    progress: 100,
    attachments: [],
    analytics: { views: 98, applications: 7, shortlisted: 2, hiringProgress: 100 },
    proposalSummary: { total: 7, shortlisted: 2, accepted: 1, rejected: 4 },
    timelineSteps: [
      { label: "Project Posted", date: "Mar 8, 2026", status: "completed" },
      { label: "Applications Received", date: "Mar 8 – Mar 22", status: "completed" },
      { label: "Freelancer Selected", date: "Mar 24, 2026", status: "completed" },
      { label: "Project Started", date: "Mar 25, 2026", status: "completed" },
      { label: "Project Completed", date: "Apr 18, 2026", status: "completed" },
    ],
    activities: [
      { id: "f1", type: "project_updated", title: "Project Archived", description: "Project moved to archive after completion", timestamp: "Mar 30, 2026" },
    ],
  },
  {
    id: "cp-seed-7",
    title: "Stripe Payment Integration",
    description:
      "Integrate Stripe subscriptions and one-time payments into our existing Next.js application with webhook handling.",
    category: "Web Development",
    skills: ["Next.js", "Node.js", "Stripe"],
    budgetMin: 1200,
    budgetMax: 1800,
    budget: "$1,200 – $1,800",
    projectType: "Fixed Price",
    experienceLevel: "Expert",
    timeline: "1-4 weeks",
    status: "open",
    proposalCount: 6,
    views: 87,
    postedDate: "Jun 8, 2026",
    postedAt: "2026-06-08T16:00:00Z",
    progress: 0,
    attachments: [{ id: "g1", name: "api-specs.pdf", size: "540 KB" }],
    analytics: { views: 87, applications: 6, shortlisted: 0, hiringProgress: 5 },
    proposalSummary: { total: 6, shortlisted: 0, accepted: 0, rejected: 1 },
    timelineSteps: [
      { label: "Project Posted", date: "Jun 8, 2026", status: "completed" },
      { label: "Applications Received", date: "Jun 8 – Jun 22", status: "current" },
      { label: "Freelancer Selected", date: "Pending", status: "upcoming" },
      { label: "Project Started", date: "Pending", status: "upcoming" },
      { label: "Project Completed", date: "Pending", status: "upcoming" },
    ],
    activities: [
      { id: "g1", type: "project_posted", title: "Project Posted", description: "Now accepting freelancer proposals", timestamp: "Jun 8, 2026" },
    ],
  },
];

export const CLIENT_BUDGET_FILTER_OPTIONS = [
  { value: "under-1k", label: "Under $1,000", min: 0, max: 1000 },
  { value: "1k-5k", label: "$1,000 – $5,000", min: 1000, max: 5000 },
  { value: "5k-10k", label: "$5,000 – $10,000", min: 5000, max: 10000 },
  { value: "10k-plus", label: "$10,000+", min: 10000, max: Infinity },
];
