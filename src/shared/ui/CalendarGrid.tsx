export type CalendarCell = {
  dateKey: string
  day: number
  inCurrentMonth: boolean
  intensity?: number
}

type CalendarGridProps = {
  weeks: CalendarCell[][]
  onSelectDate?: (dateKey: string) => void
}

export function CalendarGrid({ weeks, onSelectDate }: CalendarGridProps) {
  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-7 text-center text-xs text-[var(--color-muted)]">
        {['일', '월', '화', '수', '목', '금', '토'].map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      <div className="grid gap-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-1">
            {week.map((cell) => (
              <button
                key={cell.dateKey}
                type="button"
                disabled={!cell.inCurrentMonth}
                onClick={() => onSelectDate?.(cell.dateKey)}
                className="aspect-square rounded-lg text-xs disabled:opacity-30"
                style={{
                  backgroundColor:
                    cell.intensity && cell.intensity > 0
                      ? `color-mix(in srgb, var(--color-accent) ${Math.min(cell.intensity * 25, 100)}%, transparent)`
                      : 'transparent',
                }}
              >
                {cell.day}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
