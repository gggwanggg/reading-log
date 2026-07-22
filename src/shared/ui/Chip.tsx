import type { PropsWithChildren } from 'react'
import { cn } from '@/shared/utils/cn'

type ChipProps = PropsWithChildren<{
  active?: boolean
  onClick?: () => void
}>

export function Chip({ children, active, onClick }: ChipProps) {
  const className = cn(
    'inline-flex items-center border-2 border-[var(--color-pixel)] px-3 py-1 text-xs font-bold',
    active
      ? 'bg-[var(--color-accent)] text-white shadow-[2px_2px_0_0_var(--color-pixel)]'
      : 'bg-[var(--color-accent-soft)] text-[var(--color-accent-deep)]',
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
