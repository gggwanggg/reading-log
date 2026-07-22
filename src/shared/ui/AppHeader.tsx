import type { ReactNode } from 'react'
import { IconButton } from '@/shared/ui/IconButton'

type AppHeaderProps = {
  title: string
  onBack?: () => void
  rightSlot?: ReactNode
}

export function AppHeader({ title, onBack, rightSlot }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 px-3 backdrop-blur">
      {onBack ? (
        <IconButton aria-label="뒤로가기" onClick={onBack}>
          ←
        </IconButton>
      ) : (
        <span className="w-10" />
      )}
      <h1 className="flex-1 text-center text-base font-semibold">{title}</h1>
      <div className="flex w-10 justify-end">{rightSlot}</div>
    </header>
  )
}
