import type { PropsWithChildren } from 'react'
import { cn } from '@/shared/utils/cn'

type ChipProps = PropsWithChildren<{
  active?: boolean
  onClick?: () => void
}>

export function Chip({ children, active, onClick }: ChipProps) {
  const className = cn(
    'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
    active
      ? 'bg-[var(--color-accent)] text-white'
      : 'bg-[var(--color-accent-soft)] text-[var(--color-accent)]',
  )

  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick}>
        {children}
      </button>
    )
  }

  return <span className={className}>{children}</span>
}
