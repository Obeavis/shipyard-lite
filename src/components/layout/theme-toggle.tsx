"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import { THEME_STORAGE_KEY, toggleTheme } from "@/lib/theme"

export function ThemeToggle() {
  // While the user has not picked a theme, keep following the OS.
  useEffect(() => {
    const query = matchMedia("(prefers-color-scheme: dark)")
    const follow = (event: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(THEME_STORAGE_KEY)) return
      } catch {
        return
      }
      document.documentElement.classList.toggle("dark", event.matches)
    }
    query.addEventListener("change", follow)
    return () => query.removeEventListener("change", follow)
  }, [])

  // Icons swap with CSS so the server and client markup always match.
  return (
    <Button
      variant="ghost"
      size="icon-lg"
      className="size-11 rounded-2xl text-muted-foreground"
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
    >
      <Sun className="dark:hidden" />
      <Moon className="hidden dark:block" />
    </Button>
  )
}
