import { Link } from 'react-router-dom'
import { MemoList } from '@/features/memos'
import { StreakSummary } from '@/features/streak'
import { AppHeader } from '@/shared/ui/AppHeader'
import { Button } from '@/shared/ui/Button'
import { PixelPanel } from '@/shared/ui/PixelPanel'
import { PixelTitle } from '@/shared/ui/PixelTitle'
import { ROUTES } from '@/shared/constants/routes'

/** Memo 홈 — 최근 기록 + 스트릭 요약 */
export function HomePage() {
  return (
    <div>
      <AppHeader title="메모" />
      <div className="flex flex-col gap-5 p-4 pb-8 animate-fade-up">
        <PixelPanel tone="peach" className="py-3">
          <p className="text-xs font-bold text-[var(--color-muted)]">오늘의 한 페이지</p>
          <PixelTitle as="h2" size="sm" className="mt-1">
            기록을 남겨보세요
          </PixelTitle>
        </PixelPanel>

        <StreakSummary />

        <div className="flex items-center justify-between gap-2">
          <PixelTitle as="h2" size="sm">
            최근 메모
          </PixelTitle>
          <Link to={ROUTES.memoNew}>
            <Button variant="peach" className="h-9 px-3 text-xs">
              + 작성
            </Button>
          </Link>
        </div>

        <MemoList />
      </div>
    </div>
  )
}
