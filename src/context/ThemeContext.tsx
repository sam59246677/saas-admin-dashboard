import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { ThemeContext } from "./ThemeContext";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] =
    useState(() => {
      const savedTheme =
        localStorage.getItem("theme");

      return savedTheme === "dark";
    });

  useEffect(() => {
    const html = document.documentElement;

    if (isDarkMode) {
      html.classList.add("dark");

      localStorage.setItem(
        "theme",
        "dark",
      );
    } else {
      html.classList.remove("dark");

      localStorage.setItem(
        "theme",
        "light",
      );
    }
  }, [isDarkMode]);

  function toggleTheme() {
    setIsDarkMode(
      (current) => !current,
    );
  }

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}