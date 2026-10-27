import { Kanban, LayoutDashboard, type LucideIcon } from "lucide-react"

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
}

export interface NavSection {
  id: string
  label: string
  icon: LucideIcon
  items: NavItem[]
}

// Each section gets an icon in the rail; its items fill the secondary panel.
export const navSections: NavSection[] = [
  {
    id: "workspace",
    label: "Workspace",
    icon: LayoutDashboard,
    items: [
      { label: "Overview", href: "/", icon: LayoutDashboard },
      { label: "Board", href: "/board", icon: Kanban },
    ],
  },
]

export function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href)
}
