import { forbidden, unauthenticated } from "@/domain/errors"
import type { Role } from "@/domain/roles/schema"

export type Permission =
  | "issue:read"
  | "issue:create"
  | "issue:move"
  | "issue:delete"

const permissionsByRole: Record<Role, readonly Permission[]> = {
  ADMIN: ["issue:read", "issue:create", "issue:move", "issue:delete"],
  DEVELOPER: ["issue:read", "issue:create", "issue:move"],
  VIEWER: ["issue:read"],
}

export function can(role: Role, permission: Permission): boolean {
  return permissionsByRole[role].includes(permission)
}

/** Throws 401 without a role and 403 when the role lacks the permission. */
export function assertCan(role: Role | null, permission: Permission): void {
  if (!role) throw unauthenticated()
  if (!can(role, permission)) throw forbidden()
}
