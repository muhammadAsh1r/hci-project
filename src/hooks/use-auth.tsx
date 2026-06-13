"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { AUTH_SESSION_KEY } from "@/lib/auth-data";
import {
  findUserByEmail,
  getInitials,
  isValidEmail,
  isValidPassword,
  readStoredUsers,
  toAuthUser,
  writeStoredUsers,
} from "@/lib/auth-utils";
import type {
  AuthSession,
  AuthUser,
  SignInCredentials,
  SignUpCredentials,
  StoredUser,
} from "@/lib/types/auth";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  signIn: (credentials: SignInCredentials) => Promise<{ success: boolean; error?: string }>;
  signUp: (credentials: SignUpCredentials) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const authListeners = new Set<() => void>();
let sessionCache: { raw: string; session: AuthSession | null } | null = null;

function subscribeAuth(callback: () => void) {
  authListeners.add(callback);
  const onStorage = (e: StorageEvent) => {
    if (e.key === AUTH_SESSION_KEY || e.key === null) callback();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    authListeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function notifyAuth() {
  authListeners.forEach((cb) => cb());
}

function readSessionFromStorage(storage: Storage): AuthSession | null {
  try {
    const raw = storage.getItem(AUTH_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

function getSessionSnapshot(): AuthSession | null {
  if (typeof window === "undefined") return null;

  const localRaw = localStorage.getItem(AUTH_SESSION_KEY);
  const sessionRaw = sessionStorage.getItem(AUTH_SESSION_KEY);
  const raw = localRaw ?? sessionRaw ?? "";

  if (sessionCache?.raw === raw) return sessionCache.session;

  const session =
    readSessionFromStorage(localStorage) ?? readSessionFromStorage(sessionStorage);
  sessionCache = { raw, session };
  return session;
}

function persistSession(session: AuthSession | null) {
  localStorage.removeItem(AUTH_SESSION_KEY);
  sessionStorage.removeItem(AUTH_SESSION_KEY);

  if (session) {
    const storage = session.rememberMe ? localStorage : sessionStorage;
    storage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
  }

  sessionCache = {
    raw: session ? JSON.stringify(session) : "",
    session,
  };
  notifyAuth();
}

function resolveUser(session: AuthSession | null): AuthUser | null {
  if (!session) return null;
  const stored = readStoredUsers().find((user) => user.id === session.userId);
  return stored ? toAuthUser(stored) : null;
}

function useStoredSession() {
  return useSyncExternalStore(
    subscribeAuth,
    getSessionSnapshot,
    () => null
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const session = useStoredSession();
  const [isHydrated, setIsHydrated] = useState(() => typeof window !== "undefined");

  useEffect(() => {
    readStoredUsers();
    setIsHydrated(true);
  }, []);

  const user = useMemo(() => resolveUser(session), [session]);

  const signIn = useCallback(async (credentials: SignInCredentials) => {
    const email = credentials.email.trim();
    const password = credentials.password;

    if (!email || !password) {
      return { success: false, error: "Email and password are required." };
    }

    if (!isValidEmail(email)) {
      return { success: false, error: "Please enter a valid email address." };
    }

    const storedUser = findUserByEmail(email);
    if (!storedUser || storedUser.password !== password) {
      return { success: false, error: "Invalid email or password." };
    }

    persistSession({
      userId: storedUser.id,
      rememberMe: credentials.rememberMe ?? false,
      signedInAt: new Date().toISOString(),
    });

    return { success: true };
  }, []);

  const signUp = useCallback(async (credentials: SignUpCredentials) => {
    const name = credentials.name.trim();
    const email = credentials.email.trim();
    const password = credentials.password;

    if (!name || !email || !password) {
      return { success: false, error: "All fields are required." };
    }

    if (!isValidEmail(email)) {
      return { success: false, error: "Please enter a valid email address." };
    }

    if (!isValidPassword(password)) {
      return {
        success: false,
        error: "Password must be at least 6 characters.",
      };
    }

    const users = readStoredUsers();
    if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "An account with this email already exists." };
    }

    const newUser: StoredUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      avatar: getInitials(name),
      role: credentials.role,
      title:
        credentials.role === "freelancer"
          ? "Freelance Professional"
          : "Client",
    };

    writeStoredUsers([...users, newUser]);

    persistSession({
      userId: newUser.id,
      rememberMe: true,
      signedInAt: new Date().toISOString(),
    });

    return { success: true };
  }, []);

  const signOut = useCallback(() => {
    persistSession(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      isHydrated,
      signIn,
      signUp,
      signOut,
    }),
    [user, isHydrated, signIn, signUp, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
