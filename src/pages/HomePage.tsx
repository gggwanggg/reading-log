import { useNavigate } from 'react-router-dom'
import { MemoList } from '@/features/memos'
import { StreakSummary } from '@/features/streak'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { AppHeader } from '@/shared/ui/AppHeader'
import { Button } from '@/shared/ui/Button'
import { ROUTES } from '@/shared/constants/routes'
import { Link } from 'react-router-dom'

export function HomePage() {
  const navigate = useNavigate()
  const { signOut, user } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } finally {
      navigate(ROUTES.login, { replace: true })
    }
  }

  return (
    <div>
      <AppHeader
        title="Reading Log"
        rightSlot={
          <button
            type="button"
            className="text-xs text-[var(--color-muted)]"
            onClick={() => void handleSignOut()}
            aria-label="로그아웃"
          >
            나가기
          </button>
        }
      />
      <div className="flex flex-col gap-6 p-4">
        {user?.email ? (
          <p className="text-xs text-[var(--color-muted)]">{user.email}</p>
        ) : null}
        <StreakSummary />
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">최근 메모</h2>
          <Link to={ROUTES.memoNew}>
            <Button variant="secondary">메모 작성</Button>
          </Link>
        </div>
        <MemoList />
      </div>
    </div>
  )
}
