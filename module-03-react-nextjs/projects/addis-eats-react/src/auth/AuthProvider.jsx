import { useState } from "react";

import { AuthContext, AUTH_STORAGE_KEY } from "./authContext.js";

function readUser() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY)) || null;
  } catch {
    return null;
  }
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser);

  function signIn(name) {
    const nextUser = { name: name.trim() };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  }

  function signOut() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;