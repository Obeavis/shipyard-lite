import { z } from "zod"

export const role = z.enum(["ADMIN", "DEVELOPER", "VIEWER"])

export type Role = z.infer<typeof role>
