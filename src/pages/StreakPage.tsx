import { StreakCalendar, StreakSummary } from '@/features/streak'
import { AppHeader } from '@/shared/ui/AppHeader'

export function StreakPage() {
  return (
    <div>
      <AppHeader title="스트릭" />
      <div className="flex flex-col gap-6 p-4">
        <StreakSummary />
        <StreakCalendar />
      </div>
    </div>
  )
}
