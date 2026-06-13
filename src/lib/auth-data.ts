import type { StoredUser } from "@/lib/types/auth";

export const AUTH_SESSION_KEY = "freelanceai-auth-session";
export const AUTH_USERS_KEY = "freelanceai-auth-users";

export const DEMO_CREDENTIALS = {
  freelancer: {
    email: "freelancer@demo.com",
    password: "demo123",
  },
  client: {
    email: "client@demo.com",
    password: "demo123",
  },
} as const;

export const DEMO_USERS: StoredUser[] = [
  {
    id: "user-freelancer-demo",
    name: "Sarah Chen",
    email: DEMO_CREDENTIALS.freelancer.email,
    password: DEMO_CREDENTIALS.freelancer.password,
    avatar: "SC",
    role: "freelancer",
    title: "Senior Frontend Developer",
  },
  {
    id: "user-client-demo",
    name: "Alex Rivera",
    email: DEMO_CREDENTIALS.client.email,
    password: DEMO_CREDENTIALS.client.password,
    avatar: "AR",
    role: "client",
    title: "Product Manager",
  },
];
