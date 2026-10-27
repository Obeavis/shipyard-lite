import { z } from "zod"

export const issueStatus = z.enum(["TODO", "DOING", "DONE"])

export const issue = z.object({
  id: z.string().min(1),
  title: z.string(),
  description: z.string(),
  status: issueStatus,
  position: z.number().int().min(0),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const createIssueInput = z.object({
  title: z.string().trim().min(1, "Title is required").max(120, "Use at most 120 characters"),
  description: z.string().trim().max(2000, "Use at most 2000 characters").default(""),
})

export const moveIssueInput = z.object({
  status: issueStatus,
  position: z.number().int().min(0),
})

export type IssueStatus = z.infer<typeof issueStatus>
export type Issue = z.infer<typeof issue>
export type CreateIssueInput = z.infer<typeof createIssueInput>
export type MoveIssueInput = z.infer<typeof moveIssueInput>
