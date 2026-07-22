export function Spinner() {
  return (
    <div
      className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-accent)]"
      role="status"
      aria-label="로딩 중"
    />
  )
}
