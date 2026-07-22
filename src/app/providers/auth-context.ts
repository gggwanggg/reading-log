import { createContext } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import type { AppError } from '@/shared/api/errors'

export type AuthContextValue = {
  session: Session | null
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  error: AppError | null
  clearError: () => void
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  refreshSession: () => Promise<Session | null>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
