import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { parseOAuthRedirectError } from '@/features/auth/api/auth.errors'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { supabase } from '@/shared/lib/supabase/client'
import { ROUTES } from '@/shared/constants/routes'
import { Spinner } from '@/shared/ui/Spinner'

const CALLBACK_TIMEOUT_MS = 10_000

export function AuthCallbackPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { isAuthenticated, isLoading } = useAuth()
  const handledRef = useRef(false)

  const message = searchParams.get('code')
    ? 'Google 인증을 완료하는 중…'
    : '로그인 확인 중…'

  useEffect(() => {
    const redirectError = parseOAuthRedirectError(window.location.search)
    if (redirectError) {
      navigate(`${ROUTES.login}?error=${encodeURIComponent(redirectError.code)}`, {
        replace: true,
      })
      return
    }

    const timer = window.setTimeout(() => {
      if (handledRef.current) return
      handledRef.current = true
      navigate(`${ROUTES.login}?error=AUTH_CALLBACK_TIMEOUT`, { replace: true })
    }, CALLBACK_TIMEOUT_MS)

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (handledRef.current) return
      if (event === 'SIGNED_IN' || (session && event === 'INITIAL_SESSION')) {
        handledRef.current = true
        window.clearTimeout(timer)
        navigate(ROUTES.home, { replace: true })
      }
    })

    void supabase.auth.getSession().then(({ data, error }) => {
      if (handledRef.current) return
      if (error) {
        handledRef.current = true
        window.clearTimeout(timer)
        navigate(`${ROUTES.login}?error=AUTH_CALLBACK_FAILED`, { replace: true })
        return
      }
      if (data.session) {
        handledRef.current = true
        window.clearTimeout(timer)
        navigate(ROUTES.home, { replace: true })
      }
    })

    return () => {
      window.clearTimeout(timer)
      subscription.unsubscribe()
    }
  }, [navigate])

  useEffect(() => {
    if (!isLoading && isAuthenticated && !handledRef.current) {
      handledRef.current = true
      navigate(ROUTES.home, { replace: true })
    }
  }, [isAuthenticated, isLoading, navigate])

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-3">
      <Spinner />
      <p className="text-sm text-[var(--color-muted)]">{message}</p>
    </div>
  )
}
