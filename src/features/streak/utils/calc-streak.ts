import { dayjs } from '@/shared/lib/dayjs'

export function calcCurrentStreak(activityDates: string[], today = dayjs()) {
  const set = new Set(activityDates)
  let cursor = today.startOf('day')
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
