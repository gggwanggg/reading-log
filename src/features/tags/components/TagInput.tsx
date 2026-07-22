import { useMemo, useRef, useState, type KeyboardEvent } from 'react'
import {
  isSameTagName,
  normalizeTagName,
  type TagOption,
} from '@/features/tags/api/tags.api'
import { cn } from '@/shared/utils/cn'

export type TagInputProps = {
  value: TagOption[]
  onChange: (next: TagOption[]) => void
  /** 자동완성 후보 (기존 tags) */
  suggestions?: TagOption[]
  placeholder?: string
  disabled?: boolean
  /** 새 태그 생성 허용 (기본 true) */
  allowCreate?: boolean
  className?: string
  /**
   * id가 있는 태그를 인라인 수정했을 때 호출.
   * 반환된 TagOption으로 목록을 갱신합니다.
   */
  onEditTag?: (tag: TagOption, nextName: string) => Promise<TagOption> | TagOption
}

function dedupeTags(tags: TagOption[]) {
  const result: TagOption[] = []
  for (const tag of tags) {
    const name = normalizeTagName(tag.name)
    if (!name) continue
    if (result.some((item) => isSameTagName(item.name, name))) continue
    result.push({ ...tag, name })
  }
  return result
}

export function TagInput({
  value,
  onChange,
  suggestions = [],
  placeholder = '태그 입력 후 Enter',
  disabled = false,
  allowCreate = true,
  className,
  onEditTag,
}: TagInputProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingName, setEditingName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredSuggestions = useMemo(() => {
    const q = normalizeTagName(query).toLowerCase()
    return suggestions.filter((suggestion) => {
      const alreadySelected = value.some((tag) => isSameTagName(tag.name, suggestion.name))
      if (alreadySelected) return false
      if (!q) return true
      return suggestion.name.toLowerCase().includes(q)
    })
  }, [query, suggestions, value])

  const canCreate =
    allowCreate &&
    normalizeTagName(query).length > 0 &&
    !value.some((tag) => isSameTagName(tag.name, query)) &&
    !suggestions.some((tag) => isSameTagName(tag.name, query))

  const addTag = (option: TagOption) => {
    const name = normalizeTagName(option.name)
    if (!name) return
    if (value.some((tag) => isSameTagName(tag.name, name))) {
      setError('이미 추가된 태그입니다.')
      return
    }
    setError(null)
    onChange(dedupeTags([...value, { ...option, name }]))
    setQuery('')
    setOpen(false)
    inputRef.current?.focus()
  }

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
    setError(null)
  }

  const commitQuery = () => {
    const name = normalizeTagName(query)
    if (!name) return

    const suggested = suggestions.find((tag) => isSameTagName(tag.name, name))
    if (suggested) {
      addTag(suggested)
      return
    }

    if (!allowCreate) {
      setError('목록에 있는 태그만 선택할 수 있습니다.')
      return
    }

    addTag({ name })
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      commitQuery()
      return
    }
    if (event.key === 'Backspace' && query === '' && value.length > 0) {
      removeTag(value.length - 1)
    }
    if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  const startEdit = (index: number) => {
    setEditingIndex(index)
    setEditingName(value[index]?.name ?? '')
    setError(null)
  }

  const cancelEdit = () => {
    setEditingIndex(null)
    setEditingName('')
  }

  const commitEdit = async () => {
    if (editingIndex == null) return
    const current = value[editingIndex]
    if (!current) return

    const nextName = normalizeTagName(editingName)
    if (!nextName) {
      setError('태그 이름을 입력해 주세요.')
      return
    }

    const duplicated = value.some(
      (tag, index) => index !== editingIndex && isSameTagName(tag.name, nextName),
    )
    if (duplicated) {
      setError('이미 추가된 태그입니다.')
      return
    }

    try {
      let nextTag: TagOption = { ...current, name: nextName }
      if (current.id && onEditTag && !isSameTagName(current.name, nextName)) {
        nextTag = await onEditTag(current, nextName)
      }

      const next = [...value]
      next[editingIndex] = { ...nextTag, name: normalizeTagName(nextTag.name) }
      onChange(dedupeTags(next))
      cancelEdit()
      setError(null)
    } catch (unknownError) {
      setError(
        unknownError instanceof Error ? unknownError.message : '태그 수정에 실패했습니다.',
      )
    }
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div
        className={cn(
          'flex min-h-11 flex-wrap items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-2',
          disabled && 'opacity-60',
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((tag, index) =>
          editingIndex === index ? (
            <input
              key={`edit-${tag.id ?? tag.name}-${index}`}
              value={editingName}
              autoFocus
              disabled={disabled}
              onChange={(event) => setEditingName(event.target.value)}
              onBlur={() => void commitEdit()}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  void commitEdit()
                }
                if (event.key === 'Escape') {
                  event.preventDefault()
                  cancelEdit()
                }
              }}
              className="h-7 min-w-24 rounded-full border border-[var(--color-accent)] bg-white px-2 text-xs outline-none"
            />
          ) : (
            <span
              key={`${tag.id ?? tag.name}-${index}`}
              className="inline-flex max-w-full items-center gap-1 rounded-full bg-[var(--color-accent-soft)] px-2 py-1 text-xs font-medium text-[var(--color-accent)]"
            >
              <button
                type="button"
                disabled={disabled}
                className="max-w-[10rem] truncate"
                onClick={(event) => {
                  event.stopPropagation()
                  startEdit(index)
                }}
                title="탭하여 수정"
              >
                {tag.name}
              </button>
              <button
                type="button"
                disabled={disabled}
                aria-label={`${tag.name} 삭제`}
                className="rounded-full px-1 text-[10px] opacity-70 hover:opacity-100"
                onClick={(event) => {
                  event.stopPropagation()
                  removeTag(index)
                }}
              >
                ✕
              </button>
            </span>
          ),
        )}

        <div className="relative min-w-[8rem] flex-1">
          <input
            ref={inputRef}
            value={query}
            disabled={disabled}
            placeholder={value.length === 0 ? placeholder : '추가 입력'}
            className="h-7 w-full bg-transparent text-sm outline-none"
            onChange={(event) => {
              setQuery(event.target.value)
              setOpen(true)
              setError(null)
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => {
              window.setTimeout(() => setOpen(false), 120)
            }}
            onKeyDown={handleKeyDown}
          />

          {open && (filteredSuggestions.length > 0 || canCreate) ? (
            <ul className="absolute left-0 right-0 top-full z-20 mt-1 max-h-48 overflow-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-1 shadow-lg">
              {filteredSuggestions.map((suggestion) => (
                <li key={suggestion.id ?? suggestion.name}>
                  <button
                    type="button"
                    className="flex w-full px-3 py-2 text-left text-sm hover:bg-[var(--color-accent-soft)]"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => addTag(suggestion)}
                  >
                    {suggestion.name}
                  </button>
                </li>
              ))}
              {canCreate ? (
                <li>
                  <button
                    type="button"
                    className="flex w-full px-3 py-2 text-left text-sm text-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => addTag({ name: query })}
                  >
                    “{normalizeTagName(query)}” 새 태그 추가
                  </button>
                </li>
              ) : null}
            </ul>
          ) : null}
        </div>
      </div>

      {error ? <p className="text-xs text-red-600">{error}</p> : null}
      <p className="text-[11px] text-[var(--color-muted)]">
        Enter로 추가 · 태그 탭하여 수정 · ✕로 삭제
      </p>
    </div>
  )
}
