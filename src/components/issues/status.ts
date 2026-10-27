import { CircleCheck, CircleDashed, LoaderCircle, type LucideIcon } from "lucide-react"

import type { IssueStatus } from "@/domain/issues/schema"

export interface StatusMeta {
  label: string
  icon: LucideIcon
  // Full class names so Tailwind can see them.
  tone: string
}

export const statusOrder: readonly IssueStatus[] = ["TODO", "DOING", "DONE"]

export const statusMeta: Record<IssueStatus, StatusMeta> = {
  TODO: {
    label: "To do",
    icon: CircleDashed,
    tone: "bg-pastel-blue text-pastel-blue-ink",
  },
  DOING: {
    label: "Doing",
    icon: LoaderCircle,
    tone: "bg-pastel-amber text-pastel-amber-ink",
  },
  DONE: {
    label: "Done",
    icon: CircleCheck,
    tone: "bg-pastel-mint text-pastel-mint-ink",
  },
}
