import type {
  ClientCompanyProfile,
  FreelancerReviewOfClient,
} from "@/lib/types/client-profile";

export const SEED_CLIENT_PROFILE: ClientCompanyProfile = {
  id: "client-profile-1",
  logo: "RD",
  companyName: "Rivera Digital",
  industry: "Technology / SaaS",
  location: "Austin, TX",
  verified: true,
  memberSince: "March 2024",
  description:
    "Product-led startup building innovative SaaS solutions for mid-market businesses. We partner with top freelancers worldwide for design, development, and growth projects. Our team values clear communication, milestone-based delivery, and long-term freelancer relationships.",
  businessType: "Startup / Product Company",
  website: "https://riveradigital.io",
  projectsPosted: 12,
  freelancersHired: 8,
  averageRating: 4.9,
  paymentsReleased: 24,
  totalSpent: 48200,
};

export const SEED_CLIENT_REVIEWS: FreelancerReviewOfClient[] = [
  { id: "r1", freelancerName: "Sarah Chen", freelancerAvatar: "SC", rating: 5, review: "Alex was an excellent client — clear requirements, fast feedback, and fair milestone approvals. Would love to work together again.", projectName: "E-commerce Platform Redesign", date: "Jun 2026" },
  { id: "r2", freelancerName: "Elena Rodriguez", freelancerAvatar: "ER", rating: 5, review: "Great communication throughout the brand identity project. Rivera Digital provided detailed creative direction.", projectName: "Brand Identity Package", date: "May 2026" },
  { id: "r3", freelancerName: "David Kim", freelancerAvatar: "DK", rating: 5, review: "Smooth project from start to finish. Payments were always on time via escrow.", projectName: "Mobile App Landing Page", date: "May 2026" },
  { id: "r4", freelancerName: "James Wilson", freelancerAvatar: "JW", rating: 4, review: "Professional client with well-defined scope. Minor delays on feedback but overall a positive experience.", projectName: "Cloud Infrastructure Audit", date: "Apr 2026" },
];
