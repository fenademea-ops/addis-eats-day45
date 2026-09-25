import { cookies } from "next/headers";

const SESSION_COOKIE = "addis-eats-session";

export async function getSession() {
  const cookieStore = await cookies();
  const userId = cookieStore.get(SESSION_COOKIE)?.value;

  return userId ? { user: { id: userId } } : null;
}

export async function getOrCreateSession() {
  const cookieStore = await cookies();
  const existingUserId = cookieStore.get(SESSION_COOKIE)?.value;

  if (existingUserId) {
    return { user: { id: existingUserId } };
  }

  const userId = "demo-user";
  cookieStore.set(SESSION_COOKIE, userId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  return { user: { id: userId } };
}
