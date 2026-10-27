import type { z } from "zod"

import { AppError } from "@/domain/errors"

/** Parses unknown input and throws a 422 `AppError` with per-field messages. */
export function parseInput<T extends z.ZodType>(
  schema: T,
  data: unknown
): z.infer<T> {
  const result = schema.safeParse(data)
  if (result.success) return result.data

  const fields: Record<string, string> = {}
  for (const issue of result.error.issues) {
    const path = issue.path.join(".") || "_root"
    // Keep the first message per field.
    fields[path] ??= issue.message
  }
  throw new AppError("VALIDATION", "Invalid input", fields)
}
