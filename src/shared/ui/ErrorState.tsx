import { Button } from '@/shared/ui/Button'
import { PixelPanel } from '@/shared/ui/PixelPanel'
import { PixelTitle } from '@/shared/ui/PixelTitle'

type ErrorStateProps = {
  title?: string
  description?: string
  onRetry?: () => void
}

export function ErrorState({
  title = '문제가 발생했습니다',
  description = '잠시 후 다시 시도해 주세요.',
  onRetry,
}: ErrorStateProps) {
  return (
    <PixelPanel tone="peach" className="flex flex-col items-center gap-3 px-6 py-12 text-center">
      <PixelTitle as="h2" size="sm">
        {title}
      </PixelTitle>
      <p className="text-sm text-[var(--color-muted)]">{description}</p>
      {onRetry ? (
        <Button type="button" variant="secondary" className="h-9 px-3 text-xs" onClick={onRetry}>
          다시 시도
        </Button>
      ) : null}
    </PixelPanel>
  )
}
