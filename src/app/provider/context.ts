import { createContext } from 'react';

import type { AuthProviderCtx } from './types';

export const AuthProviderContext = createContext<AuthProviderCtx>({
  user: null,
  isAuthenticated: false,
  signInForKakao: async () => {},
  signOut: async () => {},
  updateProfileInfo: async () => {}
});
