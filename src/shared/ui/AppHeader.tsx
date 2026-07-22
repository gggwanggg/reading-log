import type { ReactNode } from 'react'
import { IconButton } from '@/shared/ui/IconButton'
import { PixelTitle } from '@/shared/ui/PixelTitle'
import { cn } from '@/shared/utils/cn'

type AppHeaderProps = {
  title: string
  onBack?: () => void
  rightSlot?: ReactNode
  className?: string
}

export function AppHeader({ title, onBack, rightSlot, className }: AppHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-10 flex h-14 items-center gap-2 border-b-2 border-[var(--color-pixel)]',
        'bg-[var(--color-surface)]/90 px-3 backdrop-blur-sm',
        className,
      )}
    >
      {onBack ? (
        <IconButton aria-label="뒤로가기" onClick={onBack}>
          ←
        </IconButton>
      ) : (
        <span className="w-10" />
      )}
      <PixelTitle as="h1" size="sm" className="flex-1 text-center">
        {title}
      </PixelTitle>
      <div className="flex min-w-10 justify-end">{rightSlot}</div>
    </header>
  )
}
