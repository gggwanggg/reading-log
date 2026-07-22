import { Chip } from '@/shared/ui/Chip'
import { useTagsQuery } from '@/features/tags/hooks/useTags'

type TagPickerProps = {
  value: string[]
  onChange: (next: string[]) => void
}

export function TagPicker({ value, onChange }: TagPickerProps) {
  const { data = [] } = useTagsQuery()

  const toggle = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((item) => item !== id))
      return
    }
    onChange([...value, id])
  }

  return (
    <div className="flex flex-wrap gap-2">
      {data.map((tag) => (
        <Chip key={tag.id} active={value.includes(tag.id)} onClick={() => toggle(tag.id)}>
          {tag.name}
        </Chip>
      ))}
    </div>
  )
}
