import { KnowledgeGardenGraph } from '@/features/graph'
import { AppHeader } from '@/shared/ui/AppHeader'
import { PixelPanel } from '@/shared/ui/PixelPanel'

export function GraphPage() {
  return (
    <div>
      <AppHeader title="정원" />
      <div className="p-4 pb-6 animate-fade-up">
        <PixelPanel tone="mint" className="mb-4 py-3">
          <p className="text-sm font-semibold text-[var(--color-muted)]">
            메모가 점이고, 같은 태그를 공유하면 선으로 이어집니다.
          </p>
        </PixelPanel>
        <KnowledgeGardenGraph />
      </div>
    </div>
  )
}
