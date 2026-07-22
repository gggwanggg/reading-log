import { useReadingStreak } from '@/features/streak/hooks/useReadingStreak'
import { PixelPanel } from '@/shared/ui/PixelPanel'

export function StreakSummary() {
  const { currentStreak, longestStreak, activeDays, isLoading } = useReadingStreak()

  if (isLoading) return null

  const cells = [
    { label: '현재', value: currentStreak, unit: '일 연속', tone: 'mint' as const },
    { label: '최장', value: longestStreak, unit: '일', tone: 'peach' as const },
    { label: '활동일', value: activeDays, unit: '일', tone: 'sky' as const },
  ]

  return (
    <div className="grid grid-cols-3 gap-2">
      {cells.map((cell) => (
        <PixelPanel key={cell.label} tone={cell.tone} className="p-3 text-center">
          <p className="text-[10px] font-bold text-[var(--color-muted)]">{cell.label}</p>
          <p className="mt-1 text-xl font-extrabold tabular-nums">{cell.value}</p>
          <p className="mt-0.5 text-[10px] text-[var(--color-muted)]">{cell.unit}</p>
        </PixelPanel>
      ))}
    </div>
  )
}
