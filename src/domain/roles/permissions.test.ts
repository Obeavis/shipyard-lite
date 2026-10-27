import { describe, expect, it } from "vitest"

import { AppError } from "@/domain/errors"
import { assertCan, can } from "@/domain/roles/permissions"

describe("can", () => {
  it("lets admins do everything", () => {
    expect(can("ADMIN", "issue:read")).toBe(true)
    expect(can("ADMIN", "issue:create")).toBe(true)
    expect(can("ADMIN", "issue:move")).toBe(true)
    expect(can("ADMIN", "issue:delete")).toBe(true)
  })

  it("lets developers work on issues but not delete them", () => {
    expect(can("DEVELOPER", "issue:create")).toBe(true)
    expect(can("DEVELOPER", "issue:move")).toBe(true)
    expect(can("DEVELOPER", "issue:delete")).toBe(false)
  })

  it("keeps viewers read-only", () => {
    expect(can("VIEWER", "issue:read")).toBe(true)
    expect(can("VIEWER", "issue:create")).toBe(false)
    expect(can("VIEWER", "issue:move")).toBe(false)
    expect(can("VIEWER", "issue:delete")).toBe(false)
  })
})

describe("assertCan", () => {
  it("passes when the role has the permission", () => {
    expect(() => assertCan("DEVELOPER", "issue:move")).not.toThrow()
  })

  it("throws 401 when there is no role", () => {
    expect.assertions(2)
    try {
      assertCan(null, "issue:read")
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
      expect((error as AppError).status).toBe(401)
    }
  })

  it("throws 403 when the role lacks the permission", () => {
    expect.assertions(2)
    try {
      assertCan("VIEWER", "issue:create")
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
      expect((error as AppError).status).toBe(403)
    }
  })
})
