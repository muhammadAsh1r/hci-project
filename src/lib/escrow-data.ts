import type {
  EscrowContract,
  EscrowDispute,
  EscrowNotification,
  EscrowOverviewStat,
  EscrowReceipt,
  EscrowTransaction,
  MonthlyEscrowData,
} from "@/lib/types/escrow";

export const escrowOverviewStats: EscrowOverviewStat[] = [
  {
    id: "escrow-balance",
    label: "Total Escrow Balance",
    value: "$12,450",
    change: 8.2,
    trend: "up",
    icon: "Wallet",
    progress: 72,
  },
  {
    id: "released",
    label: "Funds Released",
    value: "$48,250",
    change: 12.5,
    trend: "up",
    icon: "ArrowUpRight",
  },
  {
    id: "pending",
    label: "Pending Approval",
    value: "$3,200",
    change: -4.1,
    trend: "down",
    icon: "Clock",
    progress: 45,
  },
  {
    id: "milestones",
    label: "Active Milestones",
    value: "7",
    change: 0,
    trend: "neutral",
    icon: "Target",
    progress: 58,
  },
];

export const escrowSummary = {
  totalInEscrow: 12450,
  releasedPayments: 48250,
  pendingPayments: 3200,
  completedTransactions: 36,
  activeContracts: 4,
};

export const escrowContracts: EscrowContract[] = [
  {
    id: "esc-001",
    projectName: "E-commerce Platform Redesign",
    clientName: "Michael Torres",
    freelancerName: "Sarah Chen",
    contractValue: 6500,
    escrowAmount: 6500,
    milestoneStatus: "2 of 3 completed",
    paymentStatus: "In Progress",
    currentTimelineStep: "work-submitted",
    createdAt: "May 15, 2026",
    description:
      "Full redesign and rebuild of e-commerce storefront with Next.js, including checkout flow and performance optimization.",
    milestones: [
      { id: "m1", number: 1, title: "UI Design", amount: 2000, dueDate: "Jun 1, 2026", status: "Released", progress: 100 },
      { id: "m2", number: 2, title: "Frontend Development", amount: 3000, dueDate: "Jul 1, 2026", status: "Awaiting Review", progress: 100 },
      { id: "m3", number: 3, title: "Final Delivery", amount: 1500, dueDate: "Jul 15, 2026", status: "In Progress", progress: 40 },
    ],
    timelineSteps: [
      { step: "project-funded", label: "Project Funded", date: "May 15, 2026", status: "completed" },
      { step: "funds-held", label: "Funds Held in Escrow", date: "May 15, 2026", status: "completed" },
      { step: "work-submitted", label: "Work Submitted", date: "Jun 10, 2026", status: "current" },
      { step: "client-review", label: "Client Review", date: "Pending", status: "upcoming" },
      { step: "payment-released", label: "Payment Released", date: "Pending", status: "upcoming" },
    ],
  },
  {
    id: "esc-002",
    projectName: "SaaS Dashboard UI",
    clientName: "Jessica Park",
    freelancerName: "Sarah Chen",
    contractValue: 4200,
    escrowAmount: 4200,
    milestoneStatus: "1 of 2 completed",
    paymentStatus: "Funded",
    currentTimelineStep: "funds-held",
    createdAt: "Jun 1, 2026",
    description: "Design and build a comprehensive SaaS analytics dashboard with real-time data visualization.",
    milestones: [
      { id: "m1", number: 1, title: "Wireframes & Design", amount: 1500, dueDate: "Jun 20, 2026", status: "In Progress", progress: 65 },
      { id: "m2", number: 2, title: "Dashboard Implementation", amount: 2700, dueDate: "Jul 20, 2026", status: "Funded", progress: 0 },
    ],
    timelineSteps: [
      { step: "project-funded", label: "Project Funded", date: "Jun 1, 2026", status: "completed" },
      { step: "funds-held", label: "Funds Held in Escrow", date: "Jun 1, 2026", status: "current" },
      { step: "work-submitted", label: "Work Submitted", date: "Pending", status: "upcoming" },
      { step: "client-review", label: "Client Review", date: "Pending", status: "upcoming" },
      { step: "payment-released", label: "Payment Released", date: "Pending", status: "upcoming" },
    ],
  },
  {
    id: "esc-003",
    projectName: "Mobile App Landing Page",
    clientName: "David Kim",
    freelancerName: "Sarah Chen",
    contractValue: 1200,
    escrowAmount: 1200,
    milestoneStatus: "3 of 3 completed",
    paymentStatus: "Completed",
    currentTimelineStep: "payment-released",
    createdAt: "Apr 10, 2026",
    description: "High-converting landing page for mobile app launch with animations and responsive design.",
    milestones: [
      { id: "m1", number: 1, title: "Design Mockups", amount: 400, dueDate: "Apr 20, 2026", status: "Released", progress: 100 },
      { id: "m2", number: 2, title: "Development", amount: 500, dueDate: "May 5, 2026", status: "Released", progress: 100 },
      { id: "m3", number: 3, title: "Launch & QA", amount: 300, dueDate: "May 15, 2026", status: "Completed", progress: 100 },
    ],
    timelineSteps: [
      { step: "project-funded", label: "Project Funded", date: "Apr 10, 2026", status: "completed" },
      { step: "funds-held", label: "Funds Held in Escrow", date: "Apr 10, 2026", status: "completed" },
      { step: "work-submitted", label: "Work Submitted", date: "May 12, 2026", status: "completed" },
      { step: "client-review", label: "Client Review", date: "May 14, 2026", status: "completed" },
      { step: "payment-released", label: "Payment Released", date: "May 15, 2026", status: "completed" },
    ],
  },
  {
    id: "esc-004",
    projectName: "Design System Documentation",
    clientName: "Elena Rodriguez",
    freelancerName: "Sarah Chen",
    contractValue: 2800,
    escrowAmount: 2800,
    milestoneStatus: "0 of 2 started",
    paymentStatus: "Funded",
    currentTimelineStep: "project-funded",
    createdAt: "Jun 8, 2026",
    description: "Create comprehensive design system documentation with component library and usage guidelines.",
    milestones: [
      { id: "m1", number: 1, title: "Component Audit", amount: 800, dueDate: "Jun 25, 2026", status: "Funded", progress: 0 },
      { id: "m2", number: 2, title: "Documentation & Storybook", amount: 2000, dueDate: "Jul 25, 2026", status: "Funded", progress: 0 },
    ],
    timelineSteps: [
      { step: "project-funded", label: "Project Funded", date: "Jun 8, 2026", status: "current" },
      { step: "funds-held", label: "Funds Held in Escrow", date: "Pending", status: "upcoming" },
      { step: "work-submitted", label: "Work Submitted", date: "Pending", status: "upcoming" },
      { step: "client-review", label: "Client Review", date: "Pending", status: "upcoming" },
      { step: "payment-released", label: "Payment Released", date: "Pending", status: "upcoming" },
    ],
  },
];

export const escrowTransactions: EscrowTransaction[] = [
  { id: "TXN-2026-0042", project: "E-commerce Platform Redesign", contractId: "esc-001", amount: 2000, date: "Jun 1, 2026", status: "Released", method: "Escrow Release", receiptId: "RCP-0042" },
  { id: "TXN-2026-0041", project: "Mobile App Landing Page", contractId: "esc-003", amount: 300, date: "May 15, 2026", status: "Completed", method: "Escrow Release", receiptId: "RCP-0041" },
  { id: "TXN-2026-0040", project: "Mobile App Landing Page", contractId: "esc-003", amount: 500, date: "May 5, 2026", status: "Released", method: "Escrow Release", receiptId: "RCP-0040" },
  { id: "TXN-2026-0039", project: "Mobile App Landing Page", contractId: "esc-003", amount: 400, date: "Apr 20, 2026", status: "Released", method: "Escrow Release", receiptId: "RCP-0039" },
  { id: "TXN-2026-0038", project: "E-commerce Platform Redesign", contractId: "esc-001", amount: 6500, date: "May 15, 2026", status: "Funded", method: "Credit Card", receiptId: "RCP-0038" },
  { id: "TXN-2026-0037", project: "SaaS Dashboard UI", contractId: "esc-002", amount: 4200, date: "Jun 1, 2026", status: "Funded", method: "Bank Transfer", receiptId: "RCP-0037" },
  { id: "TXN-2026-0036", project: "Design System Documentation", contractId: "esc-004", amount: 2800, date: "Jun 8, 2026", status: "Funded", method: "PayPal", receiptId: "RCP-0036" },
  { id: "TXN-2026-0035", project: "FinTech Dashboard", contractId: "esc-001", amount: 3500, date: "Apr 2, 2026", status: "Completed", method: "Escrow Release", receiptId: "RCP-0035" },
  { id: "TXN-2026-0034", project: "Brand Identity Design", contractId: "esc-002", amount: 1800, date: "Mar 18, 2026", status: "Completed", method: "Escrow Release", receiptId: "RCP-0034" },
  { id: "TXN-2026-0033", project: "API Integration", contractId: "esc-003", amount: 900, date: "Mar 5, 2026", status: "Cancelled", method: "Credit Card" },
];

export const escrowReceipts: EscrowReceipt[] = [
  { id: "RCP-0042", receiptNumber: "RCP-2026-0042", client: "Michael Torres", freelancer: "Sarah Chen", project: "E-commerce Platform Redesign", amount: 2000, transactionDate: "Jun 1, 2026", status: "Released", method: "Escrow Release", contractId: "esc-001" },
  { id: "RCP-0041", receiptNumber: "RCP-2026-0041", client: "David Kim", freelancer: "Sarah Chen", project: "Mobile App Landing Page", amount: 300, transactionDate: "May 15, 2026", status: "Completed", method: "Escrow Release", contractId: "esc-003" },
  { id: "RCP-0040", receiptNumber: "RCP-2026-0040", client: "David Kim", freelancer: "Sarah Chen", project: "Mobile App Landing Page", amount: 500, transactionDate: "May 5, 2026", status: "Released", method: "Escrow Release", contractId: "esc-003" },
  { id: "RCP-0039", receiptNumber: "RCP-2026-0039", client: "David Kim", freelancer: "Sarah Chen", project: "Mobile App Landing Page", amount: 400, transactionDate: "Apr 20, 2026", status: "Released", method: "Escrow Release", contractId: "esc-003" },
  { id: "RCP-0038", receiptNumber: "RCP-2026-0038", client: "Michael Torres", freelancer: "Sarah Chen", project: "E-commerce Platform Redesign", amount: 6500, transactionDate: "May 15, 2026", status: "Funded", method: "Credit Card", contractId: "esc-001" },
  { id: "RCP-0037", receiptNumber: "RCP-2026-0037", client: "Jessica Park", freelancer: "Sarah Chen", project: "SaaS Dashboard UI", amount: 4200, transactionDate: "Jun 1, 2026", status: "Funded", method: "Bank Transfer", contractId: "esc-002" },
  { id: "RCP-0036", receiptNumber: "RCP-2026-0036", client: "Elena Rodriguez", freelancer: "Sarah Chen", project: "Design System Documentation", amount: 2800, transactionDate: "Jun 8, 2026", status: "Funded", method: "PayPal", contractId: "esc-004" },
];

export const escrowDisputes: EscrowDispute[] = [
  {
    id: "DSP-001",
    contractId: "esc-001",
    projectName: "E-commerce Platform Redesign",
    status: "Under Review",
    reason: "Client requested additional revisions beyond original scope for Milestone 2.",
    openedDate: "Jun 11, 2026",
    updates: [
      { id: "u1", date: "Jun 11, 2026", message: "Dispute opened by client regarding scope of Milestone 2 deliverables.", author: "System" },
      { id: "u2", date: "Jun 12, 2026", message: "Freelancer submitted evidence of original scope agreement.", author: "Sarah Chen" },
      { id: "u3", date: "Jun 12, 2026", message: "Case assigned to mediation team for review.", author: "FreelanceAI Support" },
    ],
  },
];

export const escrowNotifications: EscrowNotification[] = [
  { id: "n1", type: "funds-added", title: "Funds Added to Escrow", message: "$2,800 funded for Design System Documentation", timestamp: "2 hours ago", read: false },
  { id: "n2", type: "milestone-approved", title: "Milestone Approved", message: "UI Design milestone approved for E-commerce Redesign", timestamp: "5 hours ago", read: false },
  { id: "n3", type: "payment-released", title: "Payment Released", message: "$2,000 released for E-commerce Platform Redesign", timestamp: "1 day ago", read: true },
  { id: "n4", type: "contract-completed", title: "Contract Completed", message: "Mobile App Landing Page contract fully completed", timestamp: "3 days ago", read: true },
];

export const monthlyEscrowData: MonthlyEscrowData[] = [
  { month: "Jan", revenue: 4200, released: 3800, pending: 400 },
  { month: "Feb", revenue: 5100, released: 4500, pending: 600 },
  { month: "Mar", revenue: 6800, released: 5200, pending: 1600 },
  { month: "Apr", revenue: 7400, released: 6100, pending: 1300 },
  { month: "May", revenue: 9200, released: 7800, pending: 1400 },
  { month: "Jun", revenue: 8500, released: 5300, pending: 3200 },
];

export const projectEarningsData = [
  { project: "E-commerce", earnings: 8500 },
  { project: "SaaS Dashboard", earnings: 4200 },
  { project: "Landing Page", earnings: 1200 },
  { project: "Design System", earnings: 2800 },
  { project: "FinTech", earnings: 3500 },
];

export function getContractById(id: string) {
  return escrowContracts.find((c) => c.id === id);
}

export function getReceiptById(id: string) {
  return escrowReceipts.find((r) => r.id === id);
}

export function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString()}`;
}
