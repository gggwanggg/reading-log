import { StreakGrass } from '@/features/streak/components/StreakGrass'
import { PixelTitle } from '@/shared/ui/PixelTitle'

/** GitHub Grass 스타일 독서 스트릭 캘린더 */
export function StreakCalendar() {
  return (
    <section className="border-2 border-[var(--color-pixel)] bg-[var(--color-surface)] p-3 shadow-[3px_3px_0_0_var(--color-pixel)] sm:p-4">
      <PixelTitle as="h2" size="sm" className="mb-3">
        독서 잔디
      </PixelTitle>
      <StreakGrass />
    </section>
  )
}
