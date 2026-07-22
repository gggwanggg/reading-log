import { dayjs } from '@/shared/lib/dayjs'
import type { Dayjs } from 'dayjs'

/** 일별 메모 수 → GitHub 잔디 레벨 (0~4) */
export function toGrassLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0
  if (count === 1) return 1
  if (count === 2) return 2
  if (count <= 4) return 3
  return 4
}

export type GrassCell = {
  dateKey: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
  isFuture: boolean
}

export type GrassMonthLabel = {
  weekIndex: number
  label: string
}

/** book_note.created_at → YYYY-MM-DD 활동일 맵 */
export function buildActivityMapFromNotes(
  notes: Array<{ created_at: string }>,
): Record<string, number> {
  const map: Record<string, number> = {}

  for (const note of notes) {
    const dateKey = dayjs(note.created_at).format('YYYY-MM-DD')
    map[dateKey] = (map[dateKey] ?? 0) + 1
  }

  return map
}

function startOfWeekSunday(date: Dayjs) {
  return date.subtract(date.day(), 'day').startOf('day')
}

/**
 * GitHub contribution graph용 주 단위 셀
 * - 주 시작: 일요일
 * - 최근 53주 (오늘이 속한 주까지)
 */
export function buildGrassWeeks(
  activityMap: Record<string, number>,
  today: Dayjs = dayjs(),
  weekCount = 53,
): GrassCell[][] {
  const todayStart = today.startOf('day')
  const weekStart = startOfWeekSunday(todayStart)
  const rangeStart = weekStart.subtract(weekCount - 1, 'week')

  const weeks: GrassCell[][] = []
  let cursor = rangeStart

  for (let w = 0; w < weekCount; w += 1) {
    const week: GrassCell[] = []
    for (let d = 0; d < 7; d += 1) {
      const dateKey = cursor.format('YYYY-MM-DD')
      const count = activityMap[dateKey] ?? 0
      week.push({
        dateKey,
        count,
        level: toGrassLevel(count),
        isFuture: cursor.isAfter(todayStart, 'day'),
      })
      cursor = cursor.add(1, 'day')
    }
    weeks.push(week)
  }

  return weeks
}

/** 잔디 상단 월 라벨 (해당 주에 그 달의 첫날이 있으면 표시) */
export function buildGrassMonthLabels(weeks: GrassCell[][]): GrassMonthLabel[] {
  const labels: GrassMonthLabel[] = []
  let lastMonth = -1

  weeks.forEach((week, weekIndex) => {
    for (const cell of week) {
      const date = dayjs(cell.dateKey)
      if (date.date() === 1 && date.month() !== lastMonth) {
        labels.push({
          weekIndex,
          label: date.format('M월'),
        })
        lastMonth = date.month()
        break
      }
    }
  })

  return labels
}
