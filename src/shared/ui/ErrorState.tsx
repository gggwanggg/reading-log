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
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <p className="text-base font-medium text-[var(--color-ink)]">{title}</p>
      <p className="text-sm text-[var(--color-muted)]">{description}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="text-sm font-medium text-[var(--color-accent)]"
        >
          다시 시도
        </button>
      ) : null}
    </div>
  )
}
