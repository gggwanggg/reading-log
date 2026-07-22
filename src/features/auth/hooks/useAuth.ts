import { useAuthContext } from '@/app/providers/useAuthContext'

/**
 * Auth 상태·액션 단일 진입점.
 * - session / user / isLoading / isAuthenticated
 * - signInWithGoogle / signOut / refreshSession
 * - error / clearError
 */
export function useAuth() {
  return useAuthContext()
}
