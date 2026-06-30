"use client";

import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} mode`}
      className="inline-flex h-10 items-center justify-center rounded-full border border-stone-900/10 bg-white px-4 text-sm font-semibold capitalize text-stone-800 shadow-sm transition hover:bg-stone-50 dark:border-white/10 dark:bg-white/10 dark:text-stone-100 dark:hover:bg-white/15"
    >
      {nextTheme}
    </button>
  );
}
