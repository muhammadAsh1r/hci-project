export interface ClientCompanyProfile {
  id: string;
  logo: string;
  companyName: string;
  industry: string;
  location: string;
  verified: boolean;
  memberSince: string;
  description: string;
  businessType: string;
  website: string;
  projectsPosted: number;
  freelancersHired: number;
  averageRating: number;
  paymentsReleased: number;
  totalSpent: number;
}

export interface FreelancerReviewOfClient {
  id: string;
  freelancerName: string;
  freelancerAvatar: string;
  rating: number;
  review: string;
  projectName: string;
  date: string;
}

export const CLIENT_PROFILE_STORAGE_KEY = "freelanceai-client-profile";
