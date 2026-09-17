import { useCallback, useState } from "react";

export const ADMIN_SESSION_KEY = "addis-eats-admin-session";

function readSession() {
  return sessionStorage.getItem(ADMIN_SESSION_KEY);
}

export default function useAdminAuth() {
  const [session, setSession] = useState(readSession);
  const login = useCallback((username) => {
    const value = JSON.stringify({ username });
    sessionStorage.setItem(ADMIN_SESSION_KEY, value);
    setSession(value);
  }, []);
  const logout = useCallback(() => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setSession(null);
  }, []);
  return { session, isAuthenticated: Boolean(session), login, logout };
}