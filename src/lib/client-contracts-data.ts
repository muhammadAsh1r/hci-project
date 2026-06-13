import type {
  ClientContract,
  ClientContractStats,
  ClientEscrowNotification,
  ClientEscrowStats,
  ClientReceipt,
  ClientTransaction,
} from "@/lib/types/client-contract";

export function formatClientCurrency(amount: number): string {
  return `$${amount.toLocaleString()}`;
}

export const SEED_CLIENT_CONTRACTS: ClientContract[] = [
  {
    id: "cc-001",
    projectId: "cp-seed-1",
    projectName: "E-commerce Platform Redesign",
    freelancerId: "sarah-chen",
    freelancerName: "Sarah Chen",
    freelancerAvatar: "SC",
    freelancerTitle: "Senior Frontend Developer",
    contractValue: 6500,
    escrowBalance: 4500,
    startDate: "May 15, 2026",
    deadline: "Jul 15, 2026",
    status: "Awaiting Review",
    description:
      "Full redesign and rebuild of e-commerce storefront with Next.js, including checkout flow and performance optimization.",
    currentTimelineStep: "review-phase",
    milestones: [
      {
        id: "cc-001-m1",
        number: 1,
        title: "UI Design & Wireframes",
        description: "Complete UI/UX design system and responsive wireframes for all storefront pages.",
        amount: 2000,
        dueDate: "Jun 1, 2026",
        progress: 100,
        status: "Paid",
      },
      {
        id: "cc-001-m2",
        number: 2,
        title: "Frontend Development",
        description: "Build Next.js storefront with component library, product pages, and cart functionality.",
        amount: 3000,
        dueDate: "Jul 1, 2026",
        progress: 100,
        status: "Under Review",
        submission: {
          notes:
            "Completed all frontend pages including product listing, detail views, cart, and checkout. Lighthouse score 96 on mobile. Demo link included in deliverables.",
          submittedDate: "Jun 10, 2026",
          files: [
            { id: "f1", name: "frontend-build-v2.zip", size: "24.5 MB", type: "archive" },
            { id: "f2", name: "lighthouse-report.pdf", size: "1.2 MB", type: "pdf" },
            { id: "f3", name: "demo-walkthrough.mp4", size: "48 MB", type: "video" },
          ],
        },
      },
      {
        id: "cc-001-m3",
        number: 3,
        title: "Final Delivery & QA",
        description: "Shopify integration, performance optimization, and final QA before launch.",
        amount: 1500,
        dueDate: "Jul 15, 2026",
        progress: 40,
        status: "In Progress",
      },
    ],
  },
  {
    id: "cc-002",
    projectId: "cp-seed-2",
    projectName: "SaaS Dashboard UI",
    freelancerId: "sarah-chen",
    freelancerName: "Sarah Chen",
    freelancerAvatar: "SC",
    freelancerTitle: "Senior Frontend Developer",
    contractValue: 4200,
    escrowBalance: 4200,
    startDate: "Jun 1, 2026",
    deadline: "Jul 20, 2026",
    status: "In Progress",
    description:
      "Design and build a comprehensive SaaS analytics dashboard with real-time data visualization.",
    currentTimelineStep: "funds-held",
    milestones: [
      {
        id: "cc-002-m1",
        number: 1,
        title: "Wireframes & Design",
        description: "Dashboard wireframes, design system, and interactive prototypes.",
        amount: 1500,
        dueDate: "Jun 20, 2026",
        progress: 65,
        status: "In Progress",
      },
      {
        id: "cc-002-m2",
        number: 2,
        title: "Dashboard Implementation",
        description: "Full dashboard build with charts, filters, and real-time data integration.",
        amount: 2700,
        dueDate: "Jul 20, 2026",
        progress: 0,
        status: "Pending",
      },
    ],
  },
  {
    id: "cc-003",
    projectId: "cp-seed-3",
    projectName: "Mobile App Landing Page",
    freelancerId: "elena-rodriguez",
    freelancerName: "Elena Rodriguez",
    freelancerAvatar: "ER",
    freelancerTitle: "UI/UX Designer",
    contractValue: 1200,
    escrowBalance: 0,
    startDate: "Apr 10, 2026",
    deadline: "May 15, 2026",
    status: "Completed",
    description:
      "High-converting landing page for mobile app launch with animations and responsive design.",
    currentTimelineStep: "project-completed",
    milestones: [
      {
        id: "cc-003-m1",
        number: 1,
        title: "Design Mockups",
        description: "Hero section, feature blocks, and CTA designs.",
        amount: 400,
        dueDate: "Apr 20, 2026",
        progress: 100,
        status: "Paid",
      },
      {
        id: "cc-003-m2",
        number: 2,
        title: "Development",
        description: "Responsive landing page with scroll animations.",
        amount: 500,
        dueDate: "May 5, 2026",
        progress: 100,
        status: "Paid",
      },
      {
        id: "cc-003-m3",
        number: 3,
        title: "Launch & QA",
        description: "Cross-browser testing and deployment.",
        amount: 300,
        dueDate: "May 15, 2026",
        progress: 100,
        status: "Paid",
      },
    ],
  },
  {
    id: "cc-004",
    projectId: "cp-seed-4",
    projectName: "Design System Documentation",
    freelancerId: "sarah-chen",
    freelancerName: "Sarah Chen",
    freelancerAvatar: "SC",
    freelancerTitle: "Senior Frontend Developer",
    contractValue: 2800,
    escrowBalance: 0,
    startDate: "Jun 8, 2026",
    deadline: "Jul 25, 2026",
    status: "Draft",
    description:
      "Create comprehensive design system documentation with component library and usage guidelines.",
    currentTimelineStep: "project-funded",
    milestones: [
      {
        id: "cc-004-m1",
        number: 1,
        title: "Component Audit",
        description: "Audit existing components and define documentation structure.",
        amount: 800,
        dueDate: "Jun 25, 2026",
        progress: 0,
        status: "Pending",
      },
      {
        id: "cc-004-m2",
        number: 2,
        title: "Documentation & Storybook",
        description: "Full Storybook setup with usage guidelines.",
        amount: 2000,
        dueDate: "Jul 25, 2026",
        progress: 0,
        status: "Pending",
      },
    ],
  },
  {
    id: "cc-005",
    projectId: "cp-seed-5",
    projectName: "Brand Identity Package",
    freelancerId: "elena-rodriguez",
    freelancerName: "Elena Rodriguez",
    freelancerAvatar: "ER",
    freelancerTitle: "UI/UX Designer",
    contractValue: 3500,
    escrowBalance: 3500,
    startDate: "May 20, 2026",
    deadline: "Jun 30, 2026",
    status: "Active",
    description:
      "Complete brand identity including logo, color palette, typography, and brand guidelines.",
    currentTimelineStep: "work-submitted",
    milestones: [
      {
        id: "cc-005-m1",
        number: 1,
        title: "Logo Concepts",
        description: "Three logo concepts with brand direction exploration.",
        amount: 1200,
        dueDate: "Jun 5, 2026",
        progress: 100,
        status: "Submitted",
        submission: {
          notes:
            "Presenting three logo directions: minimalist wordmark, geometric icon, and combined lockup. Brand guidelines draft included.",
          submittedDate: "Jun 4, 2026",
          files: [
            { id: "f4", name: "logo-concepts-v3.pdf", size: "8.4 MB", type: "pdf" },
            { id: "f5", name: "brand-direction.fig", size: "12 MB", type: "design" },
          ],
        },
      },
      {
        id: "cc-005-m2",
        number: 2,
        title: "Brand Guidelines",
        description: "Final brand book with color, typography, and usage rules.",
        amount: 2300,
        dueDate: "Jun 30, 2026",
        progress: 0,
        status: "Pending",
      },
    ],
  },
  {
    id: "cc-006",
    projectId: "cp-seed-6",
    projectName: "API Integration Module",
    freelancerId: "marcus-johnson",
    freelancerName: "Marcus Johnson",
    freelancerAvatar: "MJ",
    freelancerTitle: "Full Stack Engineer",
    contractValue: 1800,
    escrowBalance: 0,
    startDate: "Mar 1, 2026",
    deadline: "Apr 15, 2026",
    status: "Cancelled",
    description: "REST API integration module for third-party payment gateway.",
    currentTimelineStep: "project-funded",
    milestones: [
      {
        id: "cc-006-m1",
        number: 1,
        title: "API Design",
        description: "API specification and integration architecture.",
        amount: 600,
        dueDate: "Mar 20, 2026",
        progress: 30,
        status: "Pending",
      },
      {
        id: "cc-006-m2",
        number: 2,
        title: "Implementation",
        description: "Full integration with error handling and tests.",
        amount: 1200,
        dueDate: "Apr 15, 2026",
        progress: 0,
        status: "Pending",
      },
    ],
  },
];

export const SEED_CLIENT_TRANSACTIONS: ClientTransaction[] = [
  { id: "TXN-2026-0052", project: "E-commerce Platform Redesign", freelancer: "Sarah Chen", contractId: "cc-001", amount: 2000, date: "Jun 1, 2026", status: "Released", method: "Escrow Release", receiptId: "cr-001" },
  { id: "TXN-2026-0051", project: "E-commerce Platform Redesign", freelancer: "Sarah Chen", contractId: "cc-001", amount: 6500, date: "May 15, 2026", status: "Funded", method: "Credit Card", receiptId: "cr-002" },
  { id: "TXN-2026-0050", project: "Mobile App Landing Page", freelancer: "Elena Rodriguez", contractId: "cc-003", amount: 300, date: "May 15, 2026", status: "Completed", method: "Escrow Release", receiptId: "cr-003" },
  { id: "TXN-2026-0049", project: "Mobile App Landing Page", freelancer: "Elena Rodriguez", contractId: "cc-003", amount: 500, date: "May 5, 2026", status: "Released", method: "Escrow Release", receiptId: "cr-004" },
  { id: "TXN-2026-0048", project: "Mobile App Landing Page", freelancer: "Elena Rodriguez", contractId: "cc-003", amount: 400, date: "Apr 20, 2026", status: "Released", method: "Escrow Release", receiptId: "cr-005" },
  { id: "TXN-2026-0047", project: "SaaS Dashboard UI", freelancer: "Sarah Chen", contractId: "cc-002", amount: 4200, date: "Jun 1, 2026", status: "Funded", method: "Bank Transfer", receiptId: "cr-006" },
  { id: "TXN-2026-0046", project: "Brand Identity Package", freelancer: "Elena Rodriguez", contractId: "cc-005", amount: 3500, date: "May 20, 2026", status: "Funded", method: "PayPal", receiptId: "cr-007" },
  { id: "TXN-2026-0045", project: "API Integration Module", freelancer: "Marcus Johnson", contractId: "cc-006", amount: 900, date: "Mar 5, 2026", status: "Cancelled", method: "Credit Card" },
  { id: "TXN-2026-0044", project: "E-commerce Platform Redesign", freelancer: "Sarah Chen", contractId: "cc-001", amount: 3000, date: "Jun 12, 2026", status: "Pending", method: "Escrow Release" },
];

export const SEED_CLIENT_RECEIPTS: ClientReceipt[] = [
  { id: "cr-001", receiptNumber: "RCP-2026-0052", project: "E-commerce Platform Redesign", freelancer: "Sarah Chen", amount: 2000, date: "Jun 1, 2026", status: "Released", method: "Escrow Release", contractId: "cc-001" },
  { id: "cr-002", receiptNumber: "RCP-2026-0051", project: "E-commerce Platform Redesign", freelancer: "Sarah Chen", amount: 6500, date: "May 15, 2026", status: "Funded", method: "Credit Card", contractId: "cc-001" },
  { id: "cr-003", receiptNumber: "RCP-2026-0050", project: "Mobile App Landing Page", freelancer: "Elena Rodriguez", amount: 300, date: "May 15, 2026", status: "Completed", method: "Escrow Release", contractId: "cc-003" },
  { id: "cr-004", receiptNumber: "RCP-2026-0049", project: "Mobile App Landing Page", freelancer: "Elena Rodriguez", amount: 500, date: "May 5, 2026", status: "Released", method: "Escrow Release", contractId: "cc-003" },
  { id: "cr-005", receiptNumber: "RCP-2026-0048", project: "Mobile App Landing Page", freelancer: "Elena Rodriguez", amount: 400, date: "Apr 20, 2026", status: "Released", method: "Escrow Release", contractId: "cc-003" },
  { id: "cr-006", receiptNumber: "RCP-2026-0047", project: "SaaS Dashboard UI", freelancer: "Sarah Chen", amount: 4200, date: "Jun 1, 2026", status: "Funded", method: "Bank Transfer", contractId: "cc-002" },
  { id: "cr-007", receiptNumber: "RCP-2026-0046", project: "Brand Identity Package", freelancer: "Elena Rodriguez", amount: 3500, date: "May 20, 2026", status: "Funded", method: "PayPal", contractId: "cc-005" },
];

export const CLIENT_ESCROW_NOTIFICATIONS: ClientEscrowNotification[] = [
  { id: "en1", type: "milestone-submitted", title: "Milestone Submitted", message: "Sarah Chen submitted Frontend Development for E-commerce Redesign", timestamp: "2 hours ago", read: false },
  { id: "en2", type: "work-approved", title: "Work Approved", message: "UI Design milestone approved for E-commerce Platform Redesign", timestamp: "5 hours ago", read: false },
  { id: "en3", type: "payment-released", title: "Payment Released", message: "$2,000 released to Sarah Chen for E-commerce Redesign", timestamp: "1 day ago", read: true },
  { id: "en4", type: "contract-completed", title: "Contract Completed", message: "Mobile App Landing Page contract fully completed", timestamp: "3 days ago", read: true },
];

export const clientMonthlySpendingData = [
  { month: "Jan", spending: 3200, released: 2800, escrow: 400 },
  { month: "Feb", spending: 4100, released: 3600, escrow: 500 },
  { month: "Mar", spending: 5800, released: 4200, escrow: 1600 },
  { month: "Apr", spending: 6400, released: 5100, escrow: 1300 },
  { month: "May", spending: 8200, released: 6800, escrow: 1400 },
  { month: "Jun", spending: 7500, released: 4300, escrow: 3200 },
];

export const clientProjectCostsData = [
  { project: "E-commerce", cost: 6500 },
  { project: "SaaS Dashboard", cost: 4200 },
  { project: "Landing Page", cost: 1200 },
  { project: "Brand Identity", cost: 3500 },
  { project: "Design System", cost: 2800 },
];

export function getClientContractStats(contracts: ClientContract[]): ClientContractStats {
  return {
    active: contracts.filter((c) =>
      ["Active", "In Progress", "Awaiting Review"].includes(c.status)
    ).length,
    pendingApprovals: contracts.reduce(
      (sum, c) =>
        sum + c.milestones.filter((m) => m.status === "Under Review" || m.status === "Submitted").length,
      0
    ),
    fundsInEscrow: contracts.reduce((sum, c) => sum + c.escrowBalance, 0),
    completed: contracts.filter((c) => c.status === "Completed").length,
    cancelled: contracts.filter((c) => c.status === "Cancelled").length,
    totalValue: contracts
      .filter((c) => c.status !== "Cancelled" && c.status !== "Draft")
      .reduce((sum, c) => sum + c.contractValue, 0),
  };
}

export function getClientEscrowStats(contracts: ClientContract[]): ClientEscrowStats {
  const upcoming = contracts.reduce(
    (sum, c) =>
      sum + c.milestones.filter((m) => m.status === "Pending" || m.status === "In Progress").length,
    0
  );
  const released = SEED_CLIENT_TRANSACTIONS
    .filter((t) => t.status === "Released" || t.status === "Completed")
    .reduce((sum, t) => sum + t.amount, 0);
  const pending = SEED_CLIENT_TRANSACTIONS
    .filter((t) => t.status === "Pending")
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalEscrowBalance: contracts.reduce((sum, c) => sum + c.escrowBalance, 0),
    pendingPayments: pending,
    releasedFunds: released,
    upcomingMilestones: upcoming,
  };
}

export function getClientContractById(id: string, contracts = SEED_CLIENT_CONTRACTS) {
  return contracts.find((c) => c.id === id);
}

export function getClientReceiptById(id: string) {
  return SEED_CLIENT_RECEIPTS.find((r) => r.id === id);
}

export function getReviewableMilestone(contract: ClientContract) {
  return contract.milestones.find(
    (m) => m.status === "Under Review" || m.status === "Submitted"
  );
}
