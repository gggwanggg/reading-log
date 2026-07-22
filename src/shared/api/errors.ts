export class AppError extends Error {
  readonly code: string
  readonly status?: number

  constructor(message: string, code = 'APP_ERROR', status?: number) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.status = status
  }
}

export function toAppError(
  error: unknown,
  fallback = '요청 처리 중 오류가 발생했습니다.',
) {
  if (error instanceof AppError) return error

  if (typeof error === 'object' && error !== null) {
    const maybe = error as { message?: string; code?: string; status?: number }
    return new AppError(maybe.message ?? fallback, maybe.code ?? 'UNKNOWN', maybe.status)
  }

  return new AppError(fallback)
}
