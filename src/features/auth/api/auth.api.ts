import { AppError } from '@/shared/api/errors'
import {
  getOAuthRedirectTo,
  isSupabaseConfigured,
  supabase,
} from '@/shared/lib/supabase/client'
import { toAuthError } from '@/features/auth/api/auth.errors'

export const authApi = {
  async signInWithGoogle() {
    if (!isSupabaseConfigured) {
      throw new AppError(
        '인증 설정이 필요합니다. 환경 변수를 확인해 주세요.',
        'AUTH_CONFIG',
      )
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getOAuthRedirectTo(),
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) throw toAuthError(error, 'Google 로그인에 실패했습니다.')
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut({ scope: 'local' })
    if (error) throw toAuthError(error, '로그아웃에 실패했습니다.')
  },

  async getSession() {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw toAuthError(error, '세션을 불러오지 못했습니다.')
    return data.session
  },

  async refreshSession() {
    const { data, error } = await supabase.auth.refreshSession()
    if (error) throw toAuthError(error, '세션 갱신에 실패했습니다.')
    return data.session
  },
}
