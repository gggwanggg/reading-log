import { LoginForm } from '@/features/auth'
import { AppHeader } from '@/shared/ui/AppHeader'

export function LoginPage() {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-lg">
      <AppHeader title="로그인" />
      <div className="p-4">
        <p className="mb-6 text-sm text-[var(--color-muted)]">
          독서 기록과 한 줄 메모를 이어 가세요.
        </p>
        <LoginForm />
      </div>
    </div>
  )
}
