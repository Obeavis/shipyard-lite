import type {
  CreateIssueInput,
  Issue,
  IssueStatus,
  MoveIssueInput,
} from "@/domain/issues/schema"
import type { IssueRepository } from "@/server/repositories/issue-repository"

const columns: readonly IssueStatus[] = ["TODO", "DOING", "DONE"]

export class InMemoryIssueRepository implements IssueRepository {
  private issues: Issue[]

  constructor(seed: Issue[] = []) {
    this.issues = seed.map((item) => ({ ...item }))
  }

  async list(): Promise<Issue[]> {
    return columns.flatMap((status) =>
      this.column(status).map((item) => ({ ...item }))
    )
  }

  async findById(id: string): Promise<Issue | null> {
    const found = this.issues.find((item) => item.id === id)
    return found ? { ...found } : null
  }

  async create(input: CreateIssueInput): Promise<Issue> {
    const now = new Date().toISOString()
    const created: Issue = {
      id: crypto.randomUUID(),
      title: input.title,
      description: input.description,
      status: "TODO",
      position: this.column("TODO").length,
      createdAt: now,
      updatedAt: now,
    }
    this.issues.push(created)
    return { ...created }
  }

  async move(id: string, input: MoveIssueInput): Promise<Issue | null> {
    const moving = this.issues.find((item) => item.id === id)
    if (!moving) return null

    const from = moving.status
    const target = this.column(input.status).filter((item) => item.id !== id)
    const index = Math.min(input.position, target.length)

    moving.status = input.status
    moving.updatedAt = new Date().toISOString()
    target.splice(index, 0, moving)

    this.renumber(target)
    if (from !== input.status) this.renumber(this.column(from))

    return { ...moving }
  }

  async remove(id: string): Promise<boolean> {
    const before = this.issues.length
    this.issues = this.issues.filter((item) => item.id !== id)
    const removed = this.issues.length < before
    if (removed) columns.forEach((status) => this.renumber(this.column(status)))
    return removed
  }

  private column(status: IssueStatus): Issue[] {
    return this.issues
      .filter((item) => item.status === status)
      .sort((a, b) => a.position - b.position)
  }

  private renumber(column: Issue[]): void {
    column.forEach((item, position) => {
      item.position = position
    })
  }
}
