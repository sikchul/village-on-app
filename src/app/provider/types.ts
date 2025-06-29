import type { Profile } from '@shared/api/supabase';
import { type DefaultProviderProps } from '@shared/types/props';

export interface AuthProviderProps extends DefaultProviderProps {}
export interface AuthProviderCtx {
  user: Profile | null;
  isAuthenticated: boolean;
  signInForKakao: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfileInfo: (profileId: string) => Promise<void>;
}
