import { createClient } from '@supabase/supabase-js'
import { assertSupabaseEnv, env } from '@/shared/config/env'
import type { Database } from '@/shared/lib/supabase/types'

const { ok, missing } = assertSupabaseEnv()

export const isSupabaseConfigured = ok

if (!isSupabaseConfigured) {
  console.warn(
    `[supabase] 환경변수가 없습니다: ${missing.join(', ')}. .env 파일을 확인해 주세요.`,
  )
}

export const supabase = createClient<Database>(
  env.supabaseUrl || 'http://localhost',
  env.supabaseAnonKey || 'public-anon-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
  },
)

export function getOAuthRedirectTo() {
  return `${window.location.origin}/auth/callback`
}
