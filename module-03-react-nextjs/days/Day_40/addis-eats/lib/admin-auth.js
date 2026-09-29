import "server-only";

import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_ROLE_COOKIE = "addis-eats-admin-role";
export const DEMO_ADMIN_EMAIL = "admin@addiseats.com";
export const DEMO_ADMIN_PASSWORD = "Admin123!";

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "addis-eats-day40-demo-session-secret";

export function getAdminCredentials() {
  const email = process.env.ADMIN_LOGIN_EMAIL || DEMO_ADMIN_EMAIL;
  const password = process.env.ADMIN_LOGIN_PASSWORD || DEMO_ADMIN_PASSWORD;

  return {
    email,
    password,
    isDemo: !process.env.ADMIN_LOGIN_EMAIL || !process.env.ADMIN_LOGIN_PASSWORD,
  };
}

export function createAdminSessionToken(expiresAt) {
  const expiration = String(expiresAt);
  const signature = createHmac("sha256", SESSION_SECRET).update(expiration).digest("base64url");
  return `${expiration}.${signature}`;
}

function isValidAdminSessionToken(token) {
  if (!token) return false;

  const separator = token.lastIndexOf(".");
  if (separator === -1) return false;

  const expiration = token.slice(0, separator);
  const providedSignature = Buffer.from(token.slice(separator + 1), "base64url");
  const expectedSignature = createHmac("sha256", SESSION_SECRET).update(expiration).digest();
  const expiresAt = Number(expiration);

  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Date.now()) return false;
  if (providedSignature.length !== expectedSignature.length) return false;

  return timingSafeEqual(providedSignature, expectedSignature);
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_ROLE_COOKIE)?.value ?? "";
  const isAdmin = isValidAdminSessionToken(token);

  return {
    role: isAdmin ? "admin" : "",
    isAdmin,
  };
}

export async function requireAdmin() {
  const session = await getAdminSession();
  return session.isAdmin ? session : null;
}
