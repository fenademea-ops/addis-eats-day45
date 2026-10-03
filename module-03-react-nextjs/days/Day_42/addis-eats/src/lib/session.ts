import "server-only";

import { cookies } from "next/headers";
import {
  createHmac,
  randomUUID,
  timingSafeEqual,
} from "node:crypto";
import { getAccountById, type AccountRole } from "@/lib/users";

export const SESSION_COOKIE_NAME = "addis-eats-session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

export type Session = {
  sessionId: string;
  userId: string;
  email: string;
  name: string;
  role: AccountRole;
  expiresAt: number;
};

type SessionClaims = {
  sid: string;
  sub: string;
  exp: number;
};

function getSessionSecret(): string {
  const secret = process.env.AUTH_SESSION_SECRET;
  if (process.env.NODE_ENV === "production") {
    if (!secret || Buffer.byteLength(secret) < 32) {
      throw new Error(
        "AUTH_SESSION_SECRET must be configured with at least 32 bytes in production.",
      );
    }
    return secret;
  }

  return secret ?? "local-day42-session-secret-replace-before-deployment";
}

function sign(payload: string): Buffer {
  return createHmac("sha256", getSessionSecret()).update(payload).digest();
}

function isSessionClaims(value: unknown): value is SessionClaims {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const claims = value as Record<string, unknown>;
  return (
    typeof claims.sid === "string" &&
    typeof claims.sub === "string" &&
    Number.isSafeInteger(claims.exp)
  );
}

function verifyToken(token: string): SessionClaims | null {
  const parts = token.split(".");
  if (parts.length !== 2) {
    return null;
  }

  const [payload, signature] = parts;
  let providedSignature: Buffer;
  let decodedClaims: unknown;
  try {
    providedSignature = Buffer.from(signature, "base64url");
    decodedClaims = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return null;
    }
    throw error;
  }

  const expectedSignature = sign(payload);
  if (
    providedSignature.length !== expectedSignature.length ||
    !timingSafeEqual(providedSignature, expectedSignature) ||
    !isSessionClaims(decodedClaims) ||
    decodedClaims.exp <= Math.floor(Date.now() / 1000)
  ) {
    return null;
  }

  return decodedClaims;
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }

  const claims = verifyToken(token);
  if (!claims) {
    return null;
  }

  const account = getAccountById(claims.sub);
  if (!account) {
    return null;
  }

  return {
    sessionId: claims.sid,
    userId: account.id,
    email: account.email,
    name: account.name,
    role: account.role,
    expiresAt: claims.exp,
  };
}

export async function createSession(
  account: Pick<Session, "userId">,
): Promise<void> {
  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(
    JSON.stringify({
      sid: randomUUID(),
      sub: account.userId,
      exp: now + SESSION_TTL_SECONDS,
    }),
  ).toString("base64url");
  const token = `${payload}.${sign(payload).toString("base64url")}`;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
