import type {
  CreateIssueInput,
  Issue,
  MoveIssueInput,
} from "@/domain/issues/schema"

export interface IssueRepository {
  /** Issues ordered by column, then by position inside the column. */
  list(): Promise<Issue[]>
  findById(id: string): Promise<Issue | null>
  /** Appends the new issue to the end of the TODO column. */
  create(input: CreateIssueInput): Promise<Issue>
  /** Returns `null` when the issue does not exist. */
  move(id: string, input: MoveIssueInput): Promise<Issue | null>
  remove(id: string): Promise<boolean>
}
