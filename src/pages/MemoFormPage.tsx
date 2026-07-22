import { useNavigate } from 'react-router-dom'
import { MemoForm } from '@/features/memos'
import { AppHeader } from '@/shared/ui/AppHeader'
import { ROUTES } from '@/shared/constants/routes'

export function MemoFormPage() {
  const navigate = useNavigate()

  return (
    <div>
      <AppHeader title="메모 작성" onBack={() => navigate(-1)} />
      <div className="p-4">
        <MemoForm onSuccess={() => navigate(ROUTES.home)} />
      </div>
    </div>
  )
}
