import type { AccentColor, FontSize, LayoutDensity, ThemeMode } from "@/lib/types/settings";

export type ClientSettingsSection =
  | "profile"
  | "account"
  | "notifications"
  | "security"
  | "appearance"
  | "privacy"
  | "dashboard";

export interface ClientCompanySettings {
  companyName: string;
  logo: string;
  description: string;
  location: string;
  website: string;
  industry: string;
}

export interface ClientNotificationToggles {
  proposalAlerts: boolean;
  messages: boolean;
  paymentAlerts: boolean;
  contractUpdates: boolean;
  marketingEmails: boolean;
  systemUpdates: boolean;
}

export interface ClientPrivacySettings {
  companyVisibility: "public" | "verified-only" | "private";
  profileVisibility: "public" | "freelancers" | "private";
  projectVisibility: "public" | "invite-only" | "private";
  contactVisibility: "public" | "hired-only" | "private";
}

export interface ClientSettings {
  company: ClientCompanySettings;
  notificationToggles: ClientNotificationToggles;
  privacy: ClientPrivacySettings;
  theme: ThemeMode;
  accentColor: AccentColor;
  fontSize: FontSize;
  layoutDensity: LayoutDensity;
  dashboardWidgets: string[];
  dashboardLayout: "default" | "compact" | "expanded";
  favoriteSections: string[];
}

export const CLIENT_SETTINGS_STORAGE_KEY = "freelanceai-client-settings";

export const DEFAULT_CLIENT_SETTINGS: ClientSettings = {
  company: {
    companyName: "Rivera Digital",
    logo: "RD",
    description:
      "Product-led startup building innovative SaaS solutions. We hire top freelancers for design, development, and marketing projects.",
    location: "Austin, TX",
    website: "https://riveradigital.io",
    industry: "Technology / SaaS",
  },
  notificationToggles: {
    proposalAlerts: true,
    messages: true,
    paymentAlerts: true,
    contractUpdates: true,
    marketingEmails: false,
    systemUpdates: true,
  },
  privacy: {
    companyVisibility: "public",
    profileVisibility: "freelancers",
    projectVisibility: "public",
    contactVisibility: "hired-only",
  },
  theme: "system",
  accentColor: "blue",
  fontSize: "md",
  layoutDensity: "comfortable",
  dashboardWidgets: ["stats", "recent-projects", "activity", "deadlines", "recommendations"],
  dashboardLayout: "default",
  favoriteSections: ["proposals", "contracts", "messages"],
};

export const CLIENT_SETTINGS_SECTIONS: {
  id: ClientSettingsSection;
  label: string;
  description: string;
}[] = [
  { id: "profile", label: "Profile", description: "Company information" },
  { id: "account", label: "Account", description: "Email and account details" },
  { id: "notifications", label: "Notifications", description: "Alert preferences" },
  { id: "security", label: "Security", description: "Password and sessions" },
  { id: "appearance", label: "Appearance", description: "Theme and display" },
  { id: "privacy", label: "Privacy", description: "Visibility controls" },
  { id: "dashboard", label: "Dashboard", description: "Layout customization" },
];

export type ClientNotificationCategory =
  | "projects"
  | "proposals"
  | "contracts"
  | "payments"
  | "messages"
  | "system";

export type ClientNotificationPriority = "high" | "medium" | "low";
export type ClientNotificationStatus = "unread" | "read";

export interface ClientNotification {
  id: string;
  category: ClientNotificationCategory;
  priority: ClientNotificationPriority;
  status: ClientNotificationStatus;
  title: string;
  description: string;
  timestamp: string;
  actionLabel: string;
  actionHref: string;
  icon: string;
}

export const CLIENT_NOTIFICATIONS_STORAGE_KEY = "freelanceai-client-notifications";
