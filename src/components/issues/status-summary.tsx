import { connection } from "next/server"

import { statusMeta, statusOrder } from "@/components/issues/status"
import { cn } from "@/lib/utils"
import { getIssueRepository } from "@/server/repositories"

export async function StatusSummary() {
  // The repository lives in memory, so this must run per request.
  await connection()
  const issues = await getIssueRepository().list()

  return (
    <ul className="grid gap-5 sm:grid-cols-3">
      {statusOrder.map((status) => {
        const { label, icon: Icon, tone } = statusMeta[status]
        const count = issues.filter((issue) => issue.status === status).length
        return (
          <li
            key={status}
            className={cn("flex flex-col gap-6 rounded-card p-6 shadow-soft", tone)}
          >
            <Icon className="size-6" aria-hidden />
            <div>
              <p className="text-4xl font-semibold tracking-tight">{count}</p>
              <p className="mt-1 text-sm font-medium opacity-80">{label}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export function StatusSummarySkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-3" aria-hidden>
      {statusOrder.map((status) => (
        <div
          key={status}
          className="h-40 animate-pulse rounded-card bg-muted"
        />
      ))}
    </div>
  )
}
