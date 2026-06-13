import type { UserRole } from "@/lib/types/auth";

export const FREELANCER_DASHBOARD_PATH = "/dashboard";
export const CLIENT_DASHBOARD_PATH = "/client/dashboard";
export const FREELANCER_NOTIFICATIONS_PATH = "/notifications";
export const CLIENT_NOTIFICATIONS_PATH = "/client/notifications";
export const FREELANCER_SETTINGS_PATH = "/settings";
export const CLIENT_SETTINGS_PATH = "/client/settings";

export function getDashboardPathForRole(role: UserRole): string {
  return role === "client" ? CLIENT_DASHBOARD_PATH : FREELANCER_DASHBOARD_PATH;
}

export function getNotificationsPathForRole(role: UserRole | undefined): string {
  return role === "client" ? CLIENT_NOTIFICATIONS_PATH : FREELANCER_NOTIFICATIONS_PATH;
}

export function getSettingsPathForRole(role: UserRole | undefined): string {
  return role === "client" ? CLIENT_SETTINGS_PATH : FREELANCER_SETTINGS_PATH;
}
