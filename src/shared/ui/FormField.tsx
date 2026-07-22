import type { PropsWithChildren, ReactNode } from 'react'

type FormFieldProps = PropsWithChildren<{
  label: string
  error?: string
  hint?: ReactNode
}>

export function FormField({ label, error, hint, children }: FormFieldProps) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-[var(--color-ink)]">{label}</span>
      {children}
      {hint ? <span className="text-xs text-[var(--color-muted)]">{hint}</span> : null}
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  )
}
