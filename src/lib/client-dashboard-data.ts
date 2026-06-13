import type {
  ClientActivityItem,
  ClientDashboardStat,
  ClientDeadline,
  ClientMonthlySpending,
  ClientProject,
  ClientRecommendedFreelancer,
} from "@/lib/types/client-dashboard";

export interface ClientNavItem {
  label: string;
  href: string;
  icon:
    | "LayoutDashboard"
    | "PlusCircle"
    | "FolderKanban"
    | "FileText"
    | "Users"
    | "FileSignature"
    | "Shield"
    | "MessageSquare"
    | "Bell"
    | "User"
    | "Settings";
}

export const clientNavItems: ClientNavItem[] = [
  { label: "Dashboard", href: "/client/dashboard", icon: "LayoutDashboard" },
  { label: "Post Project", href: "/client/post-project", icon: "PlusCircle" },
  { label: "Manage Projects", href: "/client/projects", icon: "FolderKanban" },
  { label: "Proposals", href: "/client/proposals", icon: "FileText" },
  { label: "Hire Freelancers", href: "/client/hire", icon: "Users" },
  { label: "Contracts", href: "/client/contracts", icon: "FileSignature" },
  { label: "Escrow", href: "/client/escrow", icon: "Shield" },
  { label: "Messages", href: "/client/messages", icon: "MessageSquare" },
  { label: "Notifications", href: "/client/notifications", icon: "Bell" },
  { label: "Profile", href: "/client/profile", icon: "User" },
  { label: "Settings", href: "/client/settings", icon: "Settings" },
];

export const clientDashboardStats: ClientDashboardStat[] = [
  {
    id: "active",
    label: "Active Projects",
    value: "5",
    change: 8.3,
    trend: "up",
    icon: "FolderKanban",
  },
  {
    id: "open",
    label: "Open Projects",
    value: "3",
    change: 0,
    trend: "neutral",
    icon: "FolderOpen",
  },
  {
    id: "proposals",
    label: "Pending Proposals",
    value: "18",
    change: 22.4,
    trend: "up",
    icon: "Send",
  },
  {
    id: "hired",
    label: "Hired Freelancers",
    value: "12",
    change: 14.2,
    trend: "up",
    icon: "Users",
  },
  {
    id: "escrow",
    label: "Escrow Balance",
    value: "$24,800",
    change: 5.6,
    trend: "up",
    icon: "Shield",
  },
  {
    id: "completed",
    label: "Completed Projects",
    value: "31",
    change: 11.1,
    trend: "up",
    icon: "CheckCircle",
  },
];

export const monthlySpending: ClientMonthlySpending[] = [
  { month: "Jan", spending: 4200, projects: 2 },
  { month: "Feb", spending: 6800, projects: 3 },
  { month: "Mar", spending: 5100, projects: 2 },
  { month: "Apr", spending: 9200, projects: 4 },
  { month: "May", spending: 7400, projects: 3 },
  { month: "Jun", spending: 10800, projects: 5 },
];

export const projectsCreatedData = [
  { month: "Jan", created: 2 },
  { month: "Feb", created: 3 },
  { month: "Mar", created: 2 },
  { month: "Apr", created: 4 },
  { month: "May", created: 3 },
  { month: "Jun", created: 5 },
];

export const hiringActivityData = [
  { month: "Jan", hires: 1, interviews: 4 },
  { month: "Feb", hires: 2, interviews: 6 },
  { month: "Mar", hires: 1, interviews: 5 },
  { month: "Apr", hires: 3, interviews: 8 },
  { month: "May", hires: 2, interviews: 7 },
  { month: "Jun", hires: 3, interviews: 9 },
];

export const clientRecentProjects: ClientProject[] = [
  {
    id: "cp-seed-1",
    name: "E-commerce Platform Redesign",
    status: "Active",
    budget: "$5,000 – $8,000",
    proposalCount: 14,
    postedDate: "Jun 1, 2026",
  },
  {
    id: "cp-seed-2",
    name: "SaaS Dashboard UI",
    status: "Open",
    budget: "$3,200 – $4,500",
    proposalCount: 9,
    postedDate: "Jun 5, 2026",
  },
  {
    id: "cp-seed-3",
    name: "Mobile App Landing Page",
    status: "In Review",
    budget: "$800 – $1,200",
    proposalCount: 22,
    postedDate: "May 28, 2026",
  },
  {
    id: "cp-seed-4",
    name: "AI Customer Support Chatbot",
    status: "In Review",
    budget: "$4,000 – $6,000",
    proposalCount: 11,
    postedDate: "May 20, 2026",
  },
  {
    id: "cp-seed-5",
    name: "Brand Identity Package",
    status: "Completed",
    budget: "$1,500 – $2,000",
    proposalCount: 18,
    postedDate: "Apr 12, 2026",
  },
];

export const clientRecentActivity: ClientActivityItem[] = [
  {
    id: "ca1",
    type: "project_posted",
    title: "Project Posted",
    description: "SaaS Dashboard UI project is now live and accepting proposals",
    timestamp: "2 hours ago",
    href: "/client/projects/cp-seed-2",
  },
  {
    id: "ca2",
    type: "proposal_received",
    title: "Proposal Received",
    description: "Sarah Chen submitted a proposal for E-commerce Platform Redesign",
    timestamp: "4 hours ago",
    href: "/client/proposals/prop-1",
  },
  {
    id: "ca3",
    type: "freelancer_hired",
    title: "Freelancer Hired",
    description: "David Kim was hired for Mobile App Landing Page",
    timestamp: "1 day ago",
    href: "/client/projects/cp-seed-3",
  },
  {
    id: "ca4",
    type: "payment_released",
    title: "Payment Released",
    description: "$2,500 released from escrow for Brand Identity Package milestone",
    timestamp: "2 days ago",
    href: "/client/escrow/receipts/cr-001",
  },
  {
    id: "ca5",
    type: "proposal_received",
    title: "Proposal Received",
    description: "3 new proposals received for AI Customer Support Chatbot",
    timestamp: "3 days ago",
    href: "/client/projects/cp-seed-4",
  },
];

export const clientRecommendedFreelancers: ClientRecommendedFreelancer[] = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    avatar: "SC",
    skills: ["React", "Next.js", "UI/UX"],
    rating: 4.9,
    hourlyRate: 85,
  },
  {
    id: "marcus-johnson",
    name: "Marcus Johnson",
    avatar: "MJ",
    skills: ["Node.js", "Python", "AWS"],
    rating: 4.8,
    hourlyRate: 75,
  },
  {
    id: "elena-rodriguez",
    name: "Elena Rodriguez",
    avatar: "ER",
    skills: ["Figma", "UI/UX", "Design Systems"],
    rating: 5.0,
    hourlyRate: 70,
  },
  {
    id: "david-kim",
    name: "David Kim",
    avatar: "DK",
    skills: ["React Native", "iOS", "Android"],
    rating: 4.7,
    hourlyRate: 80,
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    avatar: "PS",
    skills: ["Python", "Machine Learning", "AI"],
    rating: 4.9,
    hourlyRate: 95,
  },
  {
    id: "james-wilson",
    name: "James Wilson",
    avatar: "JW",
    skills: ["SEO", "Content Strategy", "Marketing"],
    rating: 4.6,
    hourlyRate: 55,
  },
];

export const clientUpcomingDeadlines: ClientDeadline[] = [
  {
    id: "ud1",
    projectName: "E-commerce Platform Redesign",
    deadline: "Jul 15, 2026",
    progress: 65,
    status: "In Progress",
  },
  {
    id: "ud2",
    projectName: "SaaS Dashboard UI",
    deadline: "Aug 2, 2026",
    progress: 40,
    status: "In Progress",
  },
  {
    id: "ud3",
    projectName: "Mobile App Landing Page",
    deadline: "Jun 20, 2026",
    progress: 90,
    status: "Review",
  },
  {
    id: "ud4",
    projectName: "AI Customer Support Chatbot",
    deadline: "Aug 18, 2026",
    progress: 25,
    status: "In Progress",
  },
];
