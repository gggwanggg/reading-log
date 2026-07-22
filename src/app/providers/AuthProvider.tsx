import { useCallback, useEffect, useMemo, useState, type PropsWithChildren } from 'react'
import type { Session } from '@supabase/supabase-js'
import { authApi } from '@/features/auth/api/auth.api'
import { toAuthError } from '@/features/auth/api/auth.errors'
import { AppError } from '@/shared/api/errors'
import { supabase } from '@/shared/lib/supabase/client'
import { AuthContext, type AuthContextValue } from '@/app/providers/auth-context'

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<AppError | null>(null)

  const clearError = useCallback(() => setError(null), [])

  useEffect(() => {
    let mounted = true

    void supabase.auth
      .getSession()
      .then(({ data, error: sessionError }) => {
        if (!mounted) return
        if (sessionError) {
          setError(toAuthError(sessionError, '세션을 불러오지 못했습니다.'))
          setSession(null)
        } else {
          setSession(data.session)
        }
      })
      .catch((unknownError) => {
        if (!mounted) return
        setError(toAuthError(unknownError, '세션을 불러오지 못했습니다.'))
        setSession(null)
      })
      .finally(() => {
        if (mounted) setIsLoading(false)
      })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      setSession(nextSession)
      setIsLoading(false)

      if (event === 'SIGNED_OUT') {
        setError(null)
      }

      if (event === 'TOKEN_REFRESHED' && !nextSession) {
        setError(
          new AppError(
            '세션이 만료되었습니다. 다시 로그인해 주세요.',
            'refresh_token_not_found',
          ),
        )
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    clearError()
    try {
      await authApi.signInWithGoogle()
    } catch (unknownError) {
      const authError = toAuthError(unknownError, 'Google 로그인에 실패했습니다.')
      setError(authError)
      throw authError
    }
  }, [clearError])

  const signOut = useCallback(async () => {
    clearError()
    try {
      await authApi.signOut()
      setSession(null)
    } catch (unknownError) {
      setSession(null)
      try {
        await supabase.auth.signOut({ scope: 'local' })
      } catch {
        // ignore secondary failure
      }
      const authError = toAuthError(unknownError, '로그아웃에 실패했습니다.')
      setError(authError)
      throw authError
    }
  }, [clearError])

  const refreshSession = useCallback(async () => {
    clearError()
    try {
      const next = await authApi.refreshSession()
      setSession(next)
      return next
    } catch (unknownError) {
      const authError = toAuthError(unknownError, '세션 갱신에 실패했습니다.')
      setError(authError)
      setSession(null)
      throw authError
    }
  }, [clearError])

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      isLoading,
      isAuthenticated: Boolean(session?.user),
      error,
      clearError,
      signInWithGoogle,
      signOut,
      refreshSession,
    }),
    [session, isLoading, error, clearError, signInWithGoogle, signOut, refreshSession],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
