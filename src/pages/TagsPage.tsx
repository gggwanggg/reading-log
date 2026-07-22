import { TagManager } from '@/features/tags'
import { useNavigate } from 'react-router-dom'
import { AppHeader } from '@/shared/ui/AppHeader'
import { PixelPanel } from '@/shared/ui/PixelPanel'

export function TagsPage() {
  const navigate = useNavigate()

  return (
    <div>
      <AppHeader title="태그" onBack={() => navigate(-1)} />
      <div className="p-4 pb-6 animate-fade-up">
        <PixelPanel tone="lilac" className="mb-4 py-3">
          <p className="text-sm font-semibold text-[var(--color-muted)]">
            메모를 연결하는 작은 이름표예요.
          </p>
        </PixelPanel>
        <TagManager />
      </div>
    </div>
  )
}
