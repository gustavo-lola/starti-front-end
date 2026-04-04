import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = localStorage.getItem(STORAGE_KEY);

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((previous) => (previous === "dark" ? "light" : "dark"));
  }

  return { theme, setTheme, toggleTheme };
}
