export type UserRole = "freelancer" | "client";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  title?: string;
}

export interface AuthSession {
  userId: string;
  rememberMe: boolean;
  signedInAt: string;
}

export interface StoredUser extends AuthUser {
  password: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
