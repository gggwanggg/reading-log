import { StreakCalendar, StreakSummary } from '@/features/streak'
import { AppHeader } from '@/shared/ui/AppHeader'
import { PixelPanel } from '@/shared/ui/PixelPanel'

export function StreakPage() {
  return (
    <div>
      <AppHeader title="달력" />
      <div className="flex flex-col gap-5 p-4 pb-8 animate-fade-up">
        <PixelPanel tone="lilac" className="py-3">
          <p className="text-sm font-semibold text-[var(--color-muted)]">
            메모를 쓴 날마다 잔디가 자라고, 연속 일수가 스트릭이 됩니다.
          </p>
        </PixelPanel>
        <StreakSummary />
        <StreakCalendar />
      </div>
    </div>
  )
}
