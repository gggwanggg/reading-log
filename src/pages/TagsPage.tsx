import { TagList } from '@/features/tags'
import { AppHeader } from '@/shared/ui/AppHeader'

export function TagsPage() {
  return (
    <div>
      <AppHeader title="태그" />
      <div className="p-4">
        <TagList />
      </div>
    </div>
  )
}
