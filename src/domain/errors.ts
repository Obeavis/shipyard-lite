export type ErrorCode =
  | "UNAUTHENTICATED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION"
  | "INVALID_TRANSITION"

const statusByCode: Record<ErrorCode, 401 | 403 | 404 | 422> = {
  UNAUTHENTICATED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  VALIDATION: 422,
  INVALID_TRANSITION: 422,
}

export interface ApiErrorBody {
  code: ErrorCode
  message: string
  fields?: Record<string, string>
}

export class AppError extends Error {
  readonly code: ErrorCode
  readonly status: 401 | 403 | 404 | 422
  readonly fields?: Record<string, string>

  constructor(code: ErrorCode, message: string, fields?: Record<string, string>) {
    super(message)
    this.name = "AppError"
    this.code = code
    this.status = statusByCode[code]
    this.fields = fields
  }

  toBody(): ApiErrorBody {
    return {
      code: this.code,
      message: this.message,
      ...(this.fields && { fields: this.fields }),
    }
  }
}

export const unauthenticated = (message = "Authentication required") =>
  new AppError("UNAUTHENTICATED", message)

export const forbidden = (message = "You do not have permission to do this") =>
  new AppError("FORBIDDEN", message)

export const notFound = (resource: string) =>
  new AppError("NOT_FOUND", `${resource} not found`)
