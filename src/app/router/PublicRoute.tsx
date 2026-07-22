import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { Spinner } from '@/shared/ui/Spinner'
import { ROUTES } from '@/shared/constants/routes'

type LocationState = {
  from?: {
    pathname?: string
    search?: string
    hash?: string
  }
}

export function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()
  const state = location.state as LocationState | null
  const redirectTo =
    state?.from?.pathname != null
      ? `${state.from.pathname}${state.from.search ?? ''}${state.from.hash ?? ''}`
      : ROUTES.home

  if (isLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  return <Outlet />
}
