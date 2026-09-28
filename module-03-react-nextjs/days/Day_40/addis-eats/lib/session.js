import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";

export const DEMO_SESSION_COOKIE = "addis-eats-demo-session";

export async function getOrCreateDemoSession() {
  const cookieStore = await cookies();
  const existingSession = cookieStore.get(DEMO_SESSION_COOKIE)?.value;

  if (existingSession) {
    return existingSession;
  }

  const sessionId = randomUUID();
  cookieStore.set(DEMO_SESSION_COOKIE, sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return sessionId;
}