import { connection } from "next/server"

import { IssueCard } from "@/components/issues/issue-card"
import { statusMeta, statusOrder } from "@/components/issues/status"
import { cn } from "@/lib/utils"
import { getIssueRepository } from "@/server/repositories"

export async function Board() {
  await connection()
  const issues = await getIssueRepository().list()

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {statusOrder.map((status) => {
        const { label, icon: Icon, tone } = statusMeta[status]
        const column = issues.filter((issue) => issue.status === status)
        return (
          <section
            key={status}
            aria-labelledby={`column-${status}`}
            className="flex flex-col gap-4 rounded-card bg-muted/60 p-4"
          >
            <h2
              id={`column-${status}`}
              className={cn(
                "flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold",
                tone
              )}
            >
              <Icon className="size-4" aria-hidden />
              {label}
              <span className="opacity-70">{column.length}</span>
            </h2>
            <ul className="flex flex-col gap-3">
              {column.map((issue) => (
                <li key={issue.id}>
                  <IssueCard issue={issue} />
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}

export function BoardSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-3" aria-hidden>
      {statusOrder.map((status) => (
        <div key={status} className="h-96 animate-pulse rounded-card bg-muted" />
      ))}
    </div>
  )
}
