import { useReadingStreak } from '@/features/streak/hooks/useReadingStreak'
import type { GrassCell } from '@/features/streak/utils/build-grass'
import { EmptyState } from '@/shared/ui/EmptyState'
import { ErrorState } from '@/shared/ui/ErrorState'
import { Spinner } from '@/shared/ui/Spinner'
import { dayjs } from '@/shared/lib/dayjs'

const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'] as const
const CELL = 11
const GAP = 3
const WEEK_STRIDE = CELL + GAP

const LEVEL_CLASS: Record<GrassCell['level'], string> = {
  0: 'bg-[var(--grass-0)]',
  1: 'bg-[var(--grass-1)]',
  2: 'bg-[var(--grass-2)]',
  3: 'bg-[var(--grass-3)]',
  4: 'bg-[var(--grass-4)]',
}

function cellTitle(cell: GrassCell) {
  const label = dayjs(cell.dateKey).format('YYYY년 M월 D일')
  if (cell.isFuture) return `${label} · 아직 오지 않은 날`
  if (cell.count === 0) return `${label} · 기록 없음`
  return `${label} · 메모 ${cell.count}개`
}

export function StreakGrass() {
  const {
    weeks,
    monthLabels,
    isLoading,
    isError,
    refetch,
    activeDays,
    wroteToday,
  } = useReadingStreak()

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    )
  }

  if (isError) {
    return <ErrorState onRetry={() => void refetch()} />
  }

  if (activeDays === 0) {
    return (
      <EmptyState
        title="아직 잔디가 없습니다"
        description="오늘 메모를 작성하면 첫 잔디가 생겨요. 연속으로 쓰면 스트릭이 쌓입니다."
      />
    )
  }

  const gridWidth = weeks.length * WEEK_STRIDE - GAP

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-[var(--color-muted)]">최근 1년 · 작성일 기준</p>
        <p className="text-xs font-medium text-[var(--color-accent)]">
          {wroteToday ? '오늘 잔디 ✓' : '오늘 아직 미작성'}
        </p>
      </div>

      <div className="-mx-1 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:thin]">
        <div className="inline-flex gap-1.5 pr-2">
          <div className="flex w-5 shrink-0 flex-col justify-end gap-[3px] pb-0 pt-5">
            {WEEKDAY_LABELS.map((label, index) => (
              <div
                key={label}
                className="flex h-[11px] items-center justify-end text-[9px] leading-none text-[var(--color-muted)]"
              >
                {index % 2 === 1 ? label : ''}
              </div>
            ))}
          </div>

          <div style={{ width: gridWidth }}>
            <div className="relative mb-1 h-4">
              {monthLabels.map((item) => (
                <span
                  key={`${item.label}-${item.weekIndex}`}
                  className="absolute top-0 text-[10px] leading-none text-[var(--color-muted)]"
                  style={{ left: item.weekIndex * WEEK_STRIDE }}
                >
                  {item.label}
                </span>
              ))}
            </div>

            <div className="flex gap-[3px]">
              {weeks.map((week, weekIndex) => (
                <div
                  key={week[0]?.dateKey ?? weekIndex}
                  className="flex flex-col gap-[3px]"
                >
                  {week.map((cell) => (
                    <div
                      key={cell.dateKey}
                      title={cellTitle(cell)}
                      aria-label={cellTitle(cell)}
                      className={[
                        'h-[11px] w-[11px] rounded-[2px]',
                        cell.isFuture ? 'bg-transparent' : LEVEL_CLASS[cell.level],
                      ].join(' ')}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-1.5 text-[10px] text-[var(--color-muted)]">
        <span>적음</span>
        {([0, 1, 2, 3, 4] as const).map((level) => (
          <span
            key={level}
            className={`inline-block h-[11px] w-[11px] rounded-[2px] ${LEVEL_CLASS[level]}`}
          />
        ))}
        <span>많음</span>
      </div>
    </div>
  )
}
