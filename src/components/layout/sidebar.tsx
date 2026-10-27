"use client"

import { Anchor, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { isActive, navSections } from "@/components/layout/nav"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()
  const [panelOpen, setPanelOpen] = useState(true)

  const section =
    navSections.find((s) => s.items.some((item) => isActive(pathname, item.href))) ??
    navSections[0]

  return (
    <aside className="sticky top-0 flex h-dvh shrink-0">
      <nav
        aria-label="Sections"
        className="flex w-18 flex-col items-center gap-2 border-r bg-card py-5"
      >
        <Link
          href="/"
          aria-label="Shipyard Lite home"
          className="mb-5 grid size-11 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Anchor className="size-5" />
        </Link>

        {navSections.map((item) => {
          const current = item.id === section.id
          return (
            <Link
              key={item.id}
              href={item.items[0].href}
              title={item.label}
              aria-label={item.label}
              aria-current={current ? "true" : undefined}
              className={cn(
                "grid size-11 place-items-center rounded-2xl text-muted-foreground transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                current
                  ? "bg-pastel-blue text-pastel-blue-ink"
                  : "hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="size-5" />
            </Link>
          )
        })}

        <div className="mt-auto flex flex-col items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon-lg"
            className="hidden size-11 rounded-2xl text-muted-foreground lg:inline-flex"
            aria-label={panelOpen ? "Collapse menu" : "Expand menu"}
            aria-expanded={panelOpen}
            aria-controls="secondary-panel"
            onClick={() => setPanelOpen((open) => !open)}
          >
            {panelOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
          </Button>
        </div>
      </nav>

      <div
        id="secondary-panel"
        className={cn(
          "hidden w-60 flex-col gap-4 border-r bg-sidebar px-4 py-7",
          panelOpen && "lg:flex"
        )}
      >
        <p className="px-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          {section.label}
        </p>
        <ul className="flex flex-col gap-1">
          {section.items.map((item) => {
            const current = isActive(pathname, item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                    current
                      ? "bg-pastel-blue text-pastel-blue-ink"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="size-4.5" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
