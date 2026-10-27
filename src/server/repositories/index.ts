import "server-only"

import type { IssueRepository } from "@/server/repositories/issue-repository"
import { InMemoryIssueRepository } from "@/server/repositories/in-memory-issue-repository"
import { seedIssues } from "@/server/repositories/seed"

// Kept on globalThis so dev hot reloads do not reset the data.
const globalForRepositories = globalThis as unknown as {
  issueRepository?: IssueRepository
}

export function getIssueRepository(): IssueRepository {
  globalForRepositories.issueRepository ??= new InMemoryIssueRepository(seedIssues)
  return globalForRepositories.issueRepository
}
