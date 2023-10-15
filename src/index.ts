import { useEffect, useState } from "react";



export type Theme = "light" | "dark" | "system";

function enableTheme(localTheme: Theme) {
  if (localTheme === "dark") {
    document.documentElement.classList.add("dark");
    return true
  } else if (localTheme === "light") {
    document.documentElement.classList.remove("dark");
    return false
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

export function useTheme() {
  const [_theme, setLocalTheme] = useState<Theme>((localStorage.theme || "system") as Theme);

  const handleTheme = (theme: Theme) => {
    enableTheme(theme)
    localStorage.setItem("theme", theme)
    setLocalTheme(theme)
  }

  return { theme: _theme, setTheme: handleTheme };
}

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    enableTheme((localStorage.theme || "system") as Theme)
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark');

    const handleChange = (e: MediaQueryListEvent) => {
      console.log("theme changed", window.matchMedia("(prefers-color-scheme: dark)").matches);
      const isDark = enableTheme((localStorage.theme || "system") as Theme)
      setIsDarkMode(isDark)
    };

    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, []);

  return isDarkMode;
}
