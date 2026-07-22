import { PixelPanel } from '@/shared/ui/PixelPanel'
import { PixelTitle } from '@/shared/ui/PixelTitle'

type EmptyStateProps = {
  title: string
  description?: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <PixelPanel tone="sky" className="flex flex-col items-center gap-3 px-6 py-12 text-center">
      <div
        className="h-10 w-10 border-2 border-[var(--color-pixel)] bg-[var(--color-sun)] shadow-[2px_2px_0_0_var(--color-pixel)]"
        aria-hidden
      />
      <PixelTitle as="h2" size="sm">
        {title}
      </PixelTitle>
      {description ? (
        <p className="max-w-xs text-sm leading-relaxed text-[var(--color-muted)]">
          {description}
        </p>
      ) : null}
    </PixelPanel>
  )
}
