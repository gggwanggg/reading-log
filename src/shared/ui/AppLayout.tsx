import { Outlet } from 'react-router-dom'
import { BottomNav } from '@/shared/ui/BottomNav'

export function AppLayout() {
  return (
    <div className="relative mx-auto min-h-dvh w-full max-w-lg pb-16">
      <Outlet />
      <BottomNav />
    </div>
  )
}
