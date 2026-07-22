import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { Dayjs } from 'dayjs'
import { memosApi } from '@/features/memos/api/memos.api'
import { ROOT_QUERY_KEYS } from '@/shared/constants/query-keys'
import { dayjs } from '@/shared/lib/dayjs'
import type { CalendarCell } from '@/shared/ui/CalendarGrid'
import { calcCurrentStreak, calcLongestStreak } from '@/features/streak/utils/calc-streak'
import type { Memo } from '@/features/memos/types/memo'

function buildMonthWeeks(
  month: Dayjs,
  activityMap: Record<string, number>,
): CalendarCell[][] {
  const start = month.startOf('month').startOf('week')
  const end = month.endOf('month').endOf('week')
  const weeks: CalendarCell[][] = []
  let cursor = start

  while (cursor.isSameOrBefore(end, 'day')) {
    const week: CalendarCell[] = []
    for (let i = 0; i < 7; i += 1) {
      const dateKey = cursor.format('YYYY-MM-DD')
      week.push({
        dateKey,
        day: cursor.date(),
        inCurrentMonth: cursor.month() === month.month(),
        intensity: activityMap[dateKey] ?? 0,
      })
      cursor = cursor.add(1, 'day')
    }
    weeks.push(week)
  }

  return weeks
}

export function useStreakCalendar(monthValue: string = dayjs().format('YYYY-MM')) {
  const query = useQuery({
    queryKey: [...ROOT_QUERY_KEYS.streak, 'calendar', monthValue] as const,
    queryFn: async () => {
      const memos = (await memosApi.list()) as Memo[]
      const activityMap: Record<string, number> = {}
      for (const memo of memos) {
        activityMap[memo.note_date] = (activityMap[memo.note_date] ?? 0) + 1
      }
      return activityMap
    },
  })

  const activityDates = useMemo(
    () => Object.keys(query.data ?? {}).filter((key) => (query.data?.[key] ?? 0) > 0),
    [query.data],
  )

  const weeks = useMemo(
    () => buildMonthWeeks(dayjs(`${monthValue}-01`), query.data ?? {}),
    [monthValue, query.data],
  )

  return {
    ...query,
    weeks,
    currentStreak: calcCurrentStreak(activityDates),
    longestStreak: calcLongestStreak(activityDates),
    activeDays: activityDates.length,
  }
}
