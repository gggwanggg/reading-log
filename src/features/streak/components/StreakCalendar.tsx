import { CalendarGrid } from '@/shared/ui/CalendarGrid'
import { ErrorState } from '@/shared/ui/ErrorState'
import { Spinner } from '@/shared/ui/Spinner'
import { useStreakCalendar } from '@/features/streak/hooks/useStreakCalendar'

type StreakCalendarProps = {
  month?: string
}

export function StreakCalendar({ month }: StreakCalendarProps) {
  const { weeks, isLoading, isError, refetch } = useStreakCalendar(month)

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

  return <CalendarGrid weeks={weeks} />
}
