import type { Issue } from "@/domain/issues/schema"

export function IssueCard({ issue }: { issue: Issue }) {
  return (
    <article className="flex flex-col gap-1.5 rounded-3xl bg-card p-5 shadow-soft">
      <h3 className="text-sm font-semibold">{issue.title}</h3>
      {issue.description && (
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {issue.description}
        </p>
      )}
    </article>
  )
}
