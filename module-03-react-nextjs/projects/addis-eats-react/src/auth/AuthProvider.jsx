import { useState } from "react";

import { AuthContext, AUTH_STORAGE_KEY } from "./authContext.js";

const CUSTOMER_USERNAME = "customer";
const CUSTOMER_PASSWORD = "customer123";

function readUser() {
  try {
    const savedUser = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY));

    if (savedUser?.username?.toLowerCase() === CUSTOMER_USERNAME) {
      return savedUser;
    }

    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser);

  function signIn(username, password) {
    const trimmedUsername = username.trim();

    if (trimmedUsername.toLowerCase() !== CUSTOMER_USERNAME || password !== CUSTOMER_PASSWORD) {
      return false;
    }

    const nextUser = { username: trimmedUsername };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    return true;
  }

  function signOut() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;