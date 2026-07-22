import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { PixelBrandMark } from '@/shared/ui/PixelBrandMark'
import { PixelTitle } from '@/shared/ui/PixelTitle'
import { ROUTES } from '@/shared/constants/routes'

const SPLASH_MS = 1800

/** Splash — 브랜드 히어로 + 짧은 대기 후 로그인/홈 이동 */
export function SplashScreen() {
  const navigate = useNavigate()
  const { user, isLoading } = useAuth()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), SPLASH_MS)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!ready || isLoading) return
    navigate(user ? ROUTES.books : ROUTES.login, { replace: true })
  }, [ready, isLoading, user, navigate])

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6">
      {/* full-bleed soft sky plane */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,var(--color-sky-soft)_0%,var(--color-bg)_45%,var(--color-peach-soft)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:repeating-linear-gradient(0deg,transparent,transparent_11px,rgb(92_122_114/0.08)_11px,rgb(92_122_114/0.08)_12px),repeating-linear-gradient(90deg,transparent,transparent_11px,rgb(92_122_114/0.08)_11px,rgb(92_122_114/0.08)_12px)]"
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <PixelBrandMark size="lg" className="animate-soft-float" />
        <div className="animate-pixel-pop flex flex-col gap-3">
          <PixelTitle size="lg">Reading Log</PixelTitle>
          <p className="max-w-[16rem] text-sm font-semibold text-[var(--color-muted)]">
            한 페이지씩, 천천히 자라는 독서 정원
          </p>
        </div>
        <div className="mt-4 flex gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2 w-2 border border-[var(--color-pixel)] bg-[var(--color-accent)]"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
