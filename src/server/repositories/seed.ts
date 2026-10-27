import type { Issue, IssueStatus } from "@/domain/issues/schema"

const seededAt = "2026-01-05T09:00:00.000Z"

function seed(
  id: string,
  title: string,
  description: string,
  status: IssueStatus,
  position: number
): Issue {
  return {
    id,
    title,
    description,
    status,
    position,
    createdAt: seededAt,
    updatedAt: seededAt,
  }
}

export const seedIssues: Issue[] = [
  seed("issue-1", "Design the sign-in screen", "Layout, empty and error states.", "TODO", 0),
  seed("issue-2", "Write the API error contract", "Standard 401, 403, 404 and 422 bodies.", "TODO", 1),
  seed("issue-3", "Add rate limiting to login", "", "TODO", 2),
  seed("issue-4", "Build the kanban board", "Three columns with drag and drop.", "DOING", 0),
  seed("issue-5", "Stream board updates over SSE", "Fan changes out to every open tab.", "DOING", 1),
  seed("issue-6", "Set up the project structure", "Layers, aliases and test tooling.", "DONE", 0),
  seed("issue-7", "Define roles and permissions", "ADMIN, DEVELOPER and VIEWER.", "DONE", 1),
]
