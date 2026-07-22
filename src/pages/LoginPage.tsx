import { LoginForm } from '@/features/auth'
import { PixelBrandMark } from '@/shared/ui/PixelBrandMark'
import { PixelPanel } from '@/shared/ui/PixelPanel'
import { PixelTitle } from '@/shared/ui/PixelTitle'

export function LoginPage() {
  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-lg flex-col">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,var(--color-sky-soft)_0%,transparent_40%,var(--color-peach-soft)_100%)]"
        aria-hidden
      />

      <div className="relative z-10 flex flex-1 flex-col justify-center gap-8 px-5 py-10">
        <div className="flex flex-col items-center gap-4 text-center animate-pixel-pop">
          <PixelBrandMark size="lg" className="animate-soft-float" />
          <PixelTitle size="lg">Reading Log</PixelTitle>
          <p className="max-w-xs text-sm font-semibold text-[var(--color-muted)]">
            파스텔 정원에서 천천히 쌓는 나의 독서 기록
          </p>
        </div>

        <PixelPanel tone="cream" className="animate-fade-up">
          <p className="mb-4 text-sm font-semibold text-[var(--color-ink)]">
            오늘도 한 줄 남겨볼까요?
          </p>
          <LoginForm />
        </PixelPanel>
      </div>
    </div>
  )
}
