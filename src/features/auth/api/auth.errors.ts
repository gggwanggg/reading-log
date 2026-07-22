import { AppError } from '@/shared/api/errors'

const AUTH_MESSAGE_MAP: Record<string, string> = {
  access_denied: '로그인이 취소되었습니다.',
  server_error: '인증 서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
  temporarily_unavailable: '인증 서비스가 일시적으로 불가합니다.',
  invalid_request: '잘못된 로그인 요청입니다.',
  unauthorized_client: '앱 인증 설정이 올바르지 않습니다.',
  refresh_token_not_found: '세션이 만료되었습니다. 다시 로그인해 주세요.',
  refresh_token_already_used: '세션이 만료되었습니다. 다시 로그인해 주세요.',
  session_not_found: '세션을 찾을 수 없습니다. 다시 로그인해 주세요.',
  user_banned: '이용이 제한된 계정입니다.',
  AUTH_CONFIG: '인증 설정이 필요합니다. 환경 변수를 확인해 주세요.',
  AUTH_CALLBACK_TIMEOUT: '세션을 확인하지 못했습니다. 다시 로그인해 주세요.',
  AUTH_CALLBACK_FAILED: '로그인 인증에 실패했습니다.',
  AUTH_SIGNED_OUT_LOCAL: '로그아웃되었습니다.',
}

export function toAuthError(
  error: unknown,
  fallback = '인증 처리 중 오류가 발생했습니다.',
) {
  if (error instanceof AppError) return error

  if (typeof error === 'object' && error !== null) {
    const maybe = error as {
      message?: string
      code?: string
      status?: number
      name?: string
    }
    const code = maybe.code ?? maybe.name ?? 'AUTH_ERROR'
    const mapped = AUTH_MESSAGE_MAP[code]
    return new AppError(mapped ?? maybe.message ?? fallback, code, maybe.status)
  }

  if (typeof error === 'string') {
    return new AppError(AUTH_MESSAGE_MAP[error] ?? error, error)
  }

  return new AppError(fallback, 'AUTH_ERROR')
}

export function parseOAuthRedirectError(search: string) {
  const params = new URLSearchParams(search)
  const code = params.get('error') ?? params.get('error_code')
  if (!code) return null

  const description = params.get('error_description')?.replace(/\+/g, ' ')
  return new AppError(
    AUTH_MESSAGE_MAP[code] ?? description ?? '로그인 인증에 실패했습니다.',
    code,
  )
}

export function getAuthErrorMessage(code: string | null | undefined) {
  if (!code) return null
  return AUTH_MESSAGE_MAP[code] ?? decodeURIComponent(code)
}
