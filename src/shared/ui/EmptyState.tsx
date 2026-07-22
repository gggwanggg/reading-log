type EmptyStateProps = {
  title: string
  description?: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
      <p className="text-base font-medium text-[var(--color-ink)]">{title}</p>
      {description ? (
        <p className="text-sm text-[var(--color-muted)]">{description}</p>
      ) : null}
    </div>
  )
}
