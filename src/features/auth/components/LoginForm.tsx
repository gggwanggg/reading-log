import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { getAuthErrorMessage } from '@/features/auth/api/auth.errors'
import { isSupabaseConfigured } from '@/shared/lib/supabase/client'
import { Button } from '@/shared/ui/Button'

export function LoginForm() {
  const { signInWithGoogle, error, clearError, isLoading } = useAuth()
  const [searchParams] = useSearchParams()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  const queryError = getAuthErrorMessage(searchParams.get('error'))
  const displayError = localError ?? error?.message ?? queryError

  const handleGoogleLogin = async () => {
    clearError()
    setLocalError(null)

    if (!isSupabaseConfigured) {
      setLocalError('인증 설정이 필요합니다. 환경 변수를 확인해 주세요.')
      return
    }

    try {
      setIsRedirecting(true)
      await signInWithGoogle()
      // OAuth는 외부로 리다이렉트되므로 여기 도달하면 URL만 받은 상태일 수 있음
    } catch (unknownError) {
      setIsRedirecting(false)
      setLocalError(
        unknownError instanceof Error
          ? unknownError.message
          : 'Google 로그인에 실패했습니다.',
      )
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Button
        type="button"
        onClick={() => void handleGoogleLogin()}
        disabled={isLoading || isRedirecting || !isSupabaseConfigured}
      >
        {isRedirecting ? 'Google로 이동 중…' : 'Google로 로그인'}
      </Button>

      {!isSupabaseConfigured ? (
        <p className="text-sm text-amber-700">
          `.env`에 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`를 설정해 주세요.
        </p>
      ) : null}

      {displayError ? <p className="text-sm text-red-600">{displayError}</p> : null}

      <p className="text-xs leading-relaxed text-[var(--color-muted)]">
        로그인 시 Google 계정으로 인증되며, 독서 기록은 본인 계정에만 저장됩니다.
      </p>
    </div>
  )
}
