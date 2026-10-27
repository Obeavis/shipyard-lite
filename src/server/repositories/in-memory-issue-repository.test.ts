import { beforeEach, describe, expect, it } from "vitest"

import type { Issue } from "@/domain/issues/schema"
import { InMemoryIssueRepository } from "@/server/repositories/in-memory-issue-repository"
import { seedIssues } from "@/server/repositories/seed"

let repository: InMemoryIssueRepository

const idsIn = async (status: Issue["status"]) =>
  (await repository.list())
    .filter((item) => item.status === status)
    .map((item) => item.id)

beforeEach(() => {
  repository = new InMemoryIssueRepository(seedIssues)
})

describe("list", () => {
  it("orders by column, then by position", async () => {
    const statuses = (await repository.list()).map((item) => item.status)
    expect(statuses).toEqual([
      "TODO", "TODO", "TODO", "DOING", "DOING", "DONE", "DONE",
    ])
  })

  it("returns copies, so callers cannot mutate the store", async () => {
    const [first] = await repository.list()
    first.title = "changed"
    expect((await repository.findById(first.id))?.title).not.toBe("changed")
  })
})

describe("create", () => {
  it("appends to the end of the TODO column", async () => {
    const created = await repository.create({ title: "New", description: "" })
    expect(created.status).toBe("TODO")
    expect(created.position).toBe(3)
    expect((await idsIn("TODO")).at(-1)).toBe(created.id)
  })
})

describe("move", () => {
  it("returns null for an unknown issue", async () => {
    expect(await repository.move("nope", { status: "DONE", position: 0 })).toBeNull()
  })

  it("moves to another column at the given position and renumbers both", async () => {
    await repository.move("issue-1", { status: "DOING", position: 1 })

    expect(await idsIn("TODO")).toEqual(["issue-2", "issue-3"])
    expect(await idsIn("DOING")).toEqual(["issue-4", "issue-1", "issue-5"])

    const positions = (await repository.list()).map((item) => `${item.status}:${item.position}`)
    expect(positions).toEqual([
      "TODO:0", "TODO:1", "DOING:0", "DOING:1", "DOING:2", "DONE:0", "DONE:1",
    ])
  })

  it("reorders inside the same column", async () => {
    await repository.move("issue-3", { status: "TODO", position: 0 })
    expect(await idsIn("TODO")).toEqual(["issue-3", "issue-1", "issue-2"])
  })

  it("clamps a position past the end of the column", async () => {
    const moved = await repository.move("issue-1", { status: "DONE", position: 99 })
    expect(moved?.position).toBe(2)
  })
})

describe("remove", () => {
  it("removes the issue and closes the gap", async () => {
    expect(await repository.remove("issue-1")).toBe(true)
    expect((await repository.list()).filter((item) => item.status === "TODO").map((item) => item.position)).toEqual([0, 1])
  })

  it("returns false for an unknown issue", async () => {
    expect(await repository.remove("nope")).toBe(false)
  })
})
