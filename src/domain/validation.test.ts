import { describe, expect, it } from "vitest"

import { AppError } from "@/domain/errors"
import { createIssueInput, moveIssueInput } from "@/domain/issues/schema"
import { parseInput } from "@/domain/validation"

describe("parseInput", () => {
  it("returns parsed data, applying trim and defaults", () => {
    expect(parseInput(createIssueInput, { title: "  Fix bug  " })).toEqual({
      title: "Fix bug",
      description: "",
    })
  })

  it("throws a 422 with per-field messages", () => {
    expect.assertions(4)
    try {
      parseInput(createIssueInput, { title: "   " })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
      const appError = error as AppError
      expect(appError.status).toBe(422)
      expect(appError.code).toBe("VALIDATION")
      expect(appError.fields).toEqual({ title: "Title is required" })
    }
  })

  it("rejects an unknown status and a negative position", () => {
    expect.assertions(2)
    try {
      parseInput(moveIssueInput, { status: "BLOCKED", position: -1 })
    } catch (error) {
      const fields = (error as AppError).fields ?? {}
      expect(fields).toHaveProperty("status")
      expect(fields).toHaveProperty("position")
    }
  })
})

describe("AppError.toBody", () => {
  it("omits fields when there are none", () => {
    expect(new AppError("NOT_FOUND", "Issue not found").toBody()).toEqual({
      code: "NOT_FOUND",
      message: "Issue not found",
    })
  })
})
