import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { AppHeader } from '@/shared/ui/AppHeader'
import { Button } from '@/shared/ui/Button'
import { PixelBadge } from '@/shared/ui/PixelBadge'
import { PixelBrandMark } from '@/shared/ui/PixelBrandMark'
import { PixelPanel } from '@/shared/ui/PixelPanel'
import { PixelTitle } from '@/shared/ui/PixelTitle'
import { ROUTES } from '@/shared/constants/routes'

/** Profile — 계정·설정 허브 */
export function ProfileView() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut()
    } finally {
      navigate(ROUTES.login, { replace: true })
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 pb-8 animate-fade-up">
      <PixelPanel tone="mint" className="flex items-center gap-4">
        <PixelBrandMark size="md" />
        <div className="min-w-0 flex-1">
          <PixelTitle as="h2" size="sm" className="mb-1">
            나의 정원
          </PixelTitle>
          <p className="truncate text-xs text-[var(--color-muted)]">
            {user?.email ?? '손님'}
          </p>
          <PixelBadge tone="sun" className="mt-2">
            HEALING READER
          </PixelBadge>
        </div>
      </PixelPanel>

      <PixelPanel className="flex flex-col gap-2 p-2">
        <Link
          to={ROUTES.tags}
          className="flex items-center justify-between border-2 border-transparent px-3 py-3 text-sm font-bold hover:border-[var(--color-pixel)] hover:bg-[var(--color-sky-soft)]"
        >
          <span>태그 관리</span>
          <span className="text-[var(--color-muted)]">→</span>
        </Link>
        <Link
          to={ROUTES.streak}
          className="flex items-center justify-between border-2 border-transparent px-3 py-3 text-sm font-bold hover:border-[var(--color-pixel)] hover:bg-[var(--color-peach-soft)]"
        >
          <span>독서 달력</span>
          <span className="text-[var(--color-muted)]">→</span>
        </Link>
        <Link
          to={ROUTES.graph}
          className="flex items-center justify-between border-2 border-transparent px-3 py-3 text-sm font-bold hover:border-[var(--color-pixel)] hover:bg-[var(--color-lilac-soft)]"
        >
          <span>지식 정원</span>
          <span className="text-[var(--color-muted)]">→</span>
        </Link>
      </PixelPanel>

      <Button type="button" variant="secondary" onClick={() => void handleSignOut()}>
        로그아웃
      </Button>
    </div>
  )
}

export function ProfilePage() {
  return (
    <div>
      <AppHeader title="프로필" />
      <ProfileView />
    </div>
  )
}
