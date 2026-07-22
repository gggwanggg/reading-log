import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { memosApi } from '@/features/memos/api/memos.api'
import { ROOT_QUERY_KEYS } from '@/shared/constants/query-keys'
import { dayjs } from '@/shared/lib/dayjs'
import {
  buildActivityMapFromNotes,
  buildGrassMonthLabels,
  buildGrassWeeks,
} from '@/features/streak/utils/build-grass'
import { calcCurrentStreak, calcLongestStreak } from '@/features/streak/utils/calc-streak'

export function useReadingStreak() {
  const query = useQuery({
    queryKey: [...ROOT_QUERY_KEYS.streak, 'grass'] as const,
    queryFn: async () => {
      const memos = await memosApi.list()
      return buildActivityMapFromNotes(memos)
    },
    staleTime: 1000 * 60,
  })

  const activityDates = useMemo(
    () => Object.keys(query.data ?? {}).filter((key) => (query.data?.[key] ?? 0) > 0),
    [query.data],
  )

  const weeks = useMemo(
    () => buildGrassWeeks(query.data ?? {}, dayjs()),
    [query.data],
  )

  const monthLabels = useMemo(() => buildGrassMonthLabels(weeks), [weeks])

  const wroteToday = Boolean(query.data?.[dayjs().format('YYYY-MM-DD')])

  return {
    ...query,
    weeks,
    monthLabels,
    activityDates,
    wroteToday,
    currentStreak: calcCurrentStreak(activityDates),
    longestStreak: calcLongestStreak(activityDates),
    activeDays: activityDates.length,
  }
}

/** @deprecated useReadingStreak 사용 */
export function useStreakCalendar(_monthValue?: string) {
  return useReadingStreak()
}
