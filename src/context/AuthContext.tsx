import {
  useState,
  type ReactNode,
} from "react";

import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] =
    useState(
      () =>
        localStorage.getItem(
          "isAuthenticated",
        ) === "true",
    );

  function login() {
    localStorage.setItem(
      "isAuthenticated",
      "true",
    );

    setIsAuthenticated(true);
  }

  function logout() {
    localStorage.removeItem(
      "isAuthenticated",
    );

    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}