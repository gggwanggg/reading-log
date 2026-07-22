import { dayjs } from '@/shared/lib/dayjs'
import type { Dayjs } from 'dayjs'

/** 오늘(또는 어제까지) 기준 연속 활동일 수 — Dayjs */
export function calcCurrentStreak(activityDates: string[], today: Dayjs = dayjs()) {
  const set = new Set(activityDates)
  let cursor = today.startOf('day')

  // 오늘 잔디가 없으면 어제부터 (오늘 아직 안 써도 어제까지 이어진 스트릭 유지)
  if (!set.has(cursor.format('YYYY-MM-DD'))) {
    cursor = cursor.subtract(1, 'day')
  }

  let streak = 0
  while (set.has(cursor.format('YYYY-MM-DD'))) {
    streak += 1
    cursor = cursor.subtract(1, 'day')
  }
  return streak
}

/** 전체 기간 최장 연속일 */
export function calcLongestStreak(activityDates: string[]) {
  if (activityDates.length === 0) return 0

  const sorted = [...new Set(activityDates)].sort()
  let longest = 1
  let current = 1

  for (let i = 1; i < sorted.length; i += 1) {
    const prev = dayjs(sorted[i - 1])
    const next = dayjs(sorted[i])
    if (next.diff(prev, 'day') === 1) {
      current += 1
      longest = Math.max(longest, current)
    } else {
      current = 1
    }
  }

  return longest
}
