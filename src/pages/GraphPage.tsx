import { TagForceGraph } from '@/features/graph'
import { AppHeader } from '@/shared/ui/AppHeader'

export function GraphPage() {
  return (
    <div>
      <AppHeader title="지식 그래프" />
      <div className="p-4">
        <TagForceGraph />
      </div>
    </div>
  )
}
