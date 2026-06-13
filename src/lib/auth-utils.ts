import {
  AUTH_USERS_KEY,
  DEMO_USERS,
} from "@/lib/auth-data";
import type { AuthUser, StoredUser } from "@/lib/types/auth";

export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPassword(password: string): boolean {
  return password.length >= 6;
}

export function toAuthUser(user: StoredUser): AuthUser {
  const { password: _password, ...authUser } = user;
  return authUser;
}

export function readStoredUsers(): StoredUser[] {
  if (typeof window === "undefined") return DEMO_USERS;

  try {
    const raw = localStorage.getItem(AUTH_USERS_KEY);
    if (!raw) {
      localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(DEMO_USERS));
      return DEMO_USERS;
    }

    const parsed = JSON.parse(raw) as StoredUser[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(DEMO_USERS));
      return DEMO_USERS;
    }

    return parsed;
  } catch {
    localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(DEMO_USERS));
    return DEMO_USERS;
  }
}

export function writeStoredUsers(users: StoredUser[]) {
  localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

export function findUserByEmail(email: string): StoredUser | undefined {
  const normalized = email.trim().toLowerCase();
  return readStoredUsers().find(
    (user) => user.email.trim().toLowerCase() === normalized
  );
}
