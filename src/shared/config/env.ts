/**
 * 타입 안전한 환경변수 접근.
 * Vite는 `VITE_` prefix만 클라이언트에 노출합니다.
 */
export const env = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL ?? '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? '',
  appEnv: import.meta.env.MODE,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const

export function assertSupabaseEnv() {
  const missing: string[] = []

  if (!env.supabaseUrl) missing.push('VITE_SUPABASE_URL')
  if (!env.supabaseAnonKey) missing.push('VITE_SUPABASE_ANON_KEY')

  return {
    ok: missing.length === 0,
    missing,
  }
}
