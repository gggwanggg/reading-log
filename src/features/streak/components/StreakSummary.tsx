import { useStreakCalendar } from '@/features/streak/hooks/useStreakCalendar'

export function StreakSummary() {
  const { currentStreak, longestStreak, activeDays, isLoading } = useStreakCalendar()

  if (isLoading) return null

  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="rounded-2xl bg-[var(--color-surface)] p-3 text-center">
        <p className="text-xs text-[var(--color-muted)]">현재 스트릭</p>
        <p className="mt-1 text-xl font-semibold">{currentStreak}</p>
      </div>
      <div className="rounded-2xl bg-[var(--color-surface)] p-3 text-center">
        <p className="text-xs text-[var(--color-muted)]">최장 스트릭</p>
        <p className="mt-1 text-xl font-semibold">{longestStreak}</p>
      </div>
      <div className="rounded-2xl bg-[var(--color-surface)] p-3 text-center">
        <p className="text-xs text-[var(--color-muted)]">활동일</p>
        <p className="mt-1 text-xl font-semibold">{activeDays}</p>
      </div>
    </div>
  )
}
