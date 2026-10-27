import { describe, expect, it } from "vitest"

import { AppError } from "@/domain/errors"
import { assertCanTransition, canTransition } from "@/domain/issues/rules"

describe("canTransition", () => {
  it("allows moving one column at a time", () => {
    expect(canTransition("TODO", "DOING")).toBe(true)
    expect(canTransition("DOING", "DONE")).toBe(true)
    expect(canTransition("DONE", "DOING")).toBe(true)
    expect(canTransition("DOING", "TODO")).toBe(true)
  })

  it("allows reordering inside the same column", () => {
    expect(canTransition("TODO", "TODO")).toBe(true)
    expect(canTransition("DONE", "DONE")).toBe(true)
  })

  it("blocks skipping a column", () => {
    expect(canTransition("TODO", "DONE")).toBe(false)
    expect(canTransition("DONE", "TODO")).toBe(false)
  })
})

describe("assertCanTransition", () => {
  it("throws a 422 for an invalid transition", () => {
    expect.assertions(3)
    try {
      assertCanTransition("TODO", "DONE")
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
      expect((error as AppError).status).toBe(422)
      expect((error as AppError).code).toBe("INVALID_TRANSITION")
    }
  })
})
