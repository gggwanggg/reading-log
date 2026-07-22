export function Spinner() {
  return (
    <div
      className="h-8 w-8 animate-spin border-2 border-[var(--color-border)] border-t-[var(--color-accent)] shadow-[2px_2px_0_0_var(--color-pixel)]"
      role="status"
      aria-label="로딩 중"
    />
  )
}
