export type Theme = "light" | "dark"

export const THEME_STORAGE_KEY = "theme"

// Runs before the first paint so the page never flashes the wrong theme.
// Without a saved choice it follows the OS preference.
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`

export function setTheme(theme: Theme): void {
  document.documentElement.classList.toggle("dark", theme === "dark")
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Private mode or blocked storage: the choice just won't persist.
  }
}

export function toggleTheme(): void {
  setTheme(document.documentElement.classList.contains("dark") ? "light" : "dark")
}
