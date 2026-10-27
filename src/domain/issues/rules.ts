import { AppError } from "@/domain/errors"
import type { IssueStatus } from "@/domain/issues/schema"

// Work moves one column at a time; reordering inside a column is always fine.
const allowedTransitions: Record<IssueStatus, readonly IssueStatus[]> = {
  TODO: ["TODO", "DOING"],
  DOING: ["TODO", "DOING", "DONE"],
  DONE: ["DOING", "DONE"],
}

export function canTransition(from: IssueStatus, to: IssueStatus): boolean {
  return allowedTransitions[from].includes(to)
}

export function assertCanTransition(from: IssueStatus, to: IssueStatus): void {
  if (!canTransition(from, to)) {
    throw new AppError(
      "INVALID_TRANSITION",
      `An issue cannot move from ${from} to ${to}`
    )
  }
}
