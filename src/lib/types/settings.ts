export type NotificationCategory =
  | "projects"
  | "proposals"
  | "payments"
  | "messages"
  | "system";

export type NotificationPriority = "high" | "medium" | "low";

export type NotificationStatus = "unread" | "read";

export interface AppNotification {
  id: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  status: NotificationStatus;
  title: string;
  description: string;
  timestamp: string;
  actionLabel: string;
  actionHref: string;
  icon: string;
}

export type ThemeMode = "light" | "dark" | "system";

export type AccentColor = "blue" | "indigo" | "violet" | "emerald";

export type FontSize = "sm" | "md" | "lg";

export type LayoutDensity = "compact" | "comfortable" | "spacious";

export type SettingsSection =
  | "profile"
  | "account"
  | "notifications"
  | "security"
  | "appearance"
  | "accessibility"
  | "privacy"
  | "preferences"
  | "dashboard";

export interface NotificationToggles {
  projectRecommendations: boolean;
  proposalUpdates: boolean;
  paymentAlerts: boolean;
  messages: boolean;
  marketingEmails: boolean;
  systemNotifications: boolean;
}

export interface PrivacySettings {
  profileVisibility: "public" | "clients" | "private";
  portfolioVisibility: "public" | "clients" | "private";
  showEarnings: boolean;
  showAvailability: boolean;
  showContactInfo: boolean;
}

export interface ProfileSettings {
  avatar: string;
  name: string;
  bio: string;
  skills: string[];
  location: string;
  portfolioLink: string;
  website: string;
}

export interface UserPreferences {
  profile: ProfileSettings;
  notificationToggles: NotificationToggles;
  privacy: PrivacySettings;
  theme: ThemeMode;
  accentColor: AccentColor;
  fontSize: FontSize;
  layoutDensity: LayoutDensity;
  increaseFontSize: boolean;
  reduceMotion: boolean;
  highContrast: boolean;
  keyboardNavigation: boolean;
  screenReaderOptimized: boolean;
  enhancedFocus: boolean;
  preferredCategories: string[];
  preferredSkills: string[];
  preferredBudgetMin: number;
  preferredBudgetMax: number;
  preferredProjectTypes: string[];
  availabilityPreference: "full-time" | "part-time" | "flexible";
  dashboardWidgets: string[];
  dashboardLayout: "default" | "compact" | "expanded";
  quickActions: string[];
  favoriteSections: string[];
}

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  profile: {
    avatar: "SC",
    name: "Sarah Chen",
    bio: "Senior frontend developer passionate about React, design systems, and performance.",
    skills: ["React", "Next.js", "TypeScript", "UI/UX"],
    location: "San Francisco, US",
    portfolioLink: "/dashboard/portfolio",
    website: "https://sarahchen.dev",
  },
  notificationToggles: {
    projectRecommendations: true,
    proposalUpdates: true,
    paymentAlerts: true,
    messages: true,
    marketingEmails: false,
    systemNotifications: true,
  },
  privacy: {
    profileVisibility: "public",
    portfolioVisibility: "public",
    showEarnings: false,
    showAvailability: true,
    showContactInfo: false,
  },
  theme: "system",
  accentColor: "blue",
  fontSize: "md",
  layoutDensity: "comfortable",
  increaseFontSize: false,
  reduceMotion: false,
  highContrast: false,
  keyboardNavigation: false,
  screenReaderOptimized: false,
  enhancedFocus: false,
  preferredCategories: ["Web Development", "UI/UX Design", "Mobile Apps"],
  preferredSkills: ["React", "Next.js", "TypeScript"],
  preferredBudgetMin: 2000,
  preferredBudgetMax: 15000,
  preferredProjectTypes: ["Fixed Price", "Hourly"],
  availabilityPreference: "flexible",
  dashboardWidgets: ["analytics", "active-projects", "earnings", "recommendations"],
  dashboardLayout: "default",
  quickActions: ["generate-proposal", "view-escrow", "add-portfolio"],
  favoriteSections: ["proposals", "escrow", "portfolio"],
};

export const SETTINGS_SECTIONS: {
  id: SettingsSection;
  label: string;
  description: string;
}[] = [
  { id: "profile", label: "Profile", description: "Photo, bio, skills, links" },
  { id: "account", label: "Account", description: "Email, username, membership" },
  { id: "notifications", label: "Notifications", description: "Email and push alerts" },
  { id: "security", label: "Security", description: "Password, 2FA, sessions" },
  { id: "appearance", label: "Appearance", description: "Theme, colors, layout" },
  { id: "accessibility", label: "Accessibility", description: "Contrast, motion, focus" },
  { id: "privacy", label: "Privacy", description: "Visibility and data sharing" },
  { id: "preferences", label: "Preferences", description: "Project and skill preferences" },
  { id: "dashboard", label: "Dashboard", description: "Widgets and layout" },
];

export const ACCENT_COLORS: { value: AccentColor; label: string; swatch: string }[] = [
  { value: "blue", label: "Blue", swatch: "#2563eb" },
  { value: "indigo", label: "Indigo", swatch: "#6366f1" },
  { value: "violet", label: "Violet", swatch: "#8b5cf6" },
  { value: "emerald", label: "Emerald", swatch: "#10b981" },
];

export const FONT_SIZE_OPTIONS: { value: FontSize; label: string }[] = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
];

export const DENSITY_OPTIONS: { value: LayoutDensity; label: string }[] = [
  { value: "compact", label: "Compact" },
  { value: "comfortable", label: "Comfortable" },
  { value: "spacious", label: "Spacious" },
];

export const CATEGORY_OPTIONS = [
  "Web Development", "Mobile Apps", "UI/UX Design", "AI/ML",
  "DevOps", "Content Writing", "Digital Marketing", "Blockchain",
];

export const PROJECT_TYPE_OPTIONS = ["Fixed Price", "Hourly", "Milestone-based", "Retainer"];

export const DASHBOARD_WIDGET_OPTIONS = [
  { id: "analytics", label: "Analytics Overview" },
  { id: "active-projects", label: "Active Projects" },
  { id: "earnings", label: "Earnings Chart" },
  { id: "recommendations", label: "Recommended Projects" },
  { id: "recent-activity", label: "Recent Activity" },
  { id: "profile-strength", label: "Profile Strength" },
];

export const QUICK_ACTION_OPTIONS = [
  { id: "generate-proposal", label: "Generate Proposal" },
  { id: "view-escrow", label: "View Escrow" },
  { id: "add-portfolio", label: "Add Portfolio Item" },
  { id: "find-projects", label: "Find Projects" },
];

export const FAVORITE_SECTION_OPTIONS = [
  { id: "proposals", label: "AI Proposals" },
  { id: "escrow", label: "Escrow" },
  { id: "portfolio", label: "Portfolio" },
  { id: "dashboard", label: "Dashboard" },
];
