import { Preferences } from '@capacitor/preferences';
import { getUserProfile } from '@entities/profiles/queries';
import { supabase } from '@shared/api/supabase';
import type { Profile } from '@shared/api/supabase';
import { ROUTE_PATH } from '@shared/constants/route';
import type { Session, User } from '@supabase/supabase-js';
import { AuthError } from '@supabase/supabase-js';
import { useQueryClient } from '@tanstack/react-query';
import { KakaoLoginPlugin } from 'capacitor-kakao-login-plugin';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthProviderContext } from './context';
import type { AuthProviderProps } from './types';

const Provider = {
  Kakao: 'kakao'
};

const SessionKey = 'supabase-session';

export default function AuthProvider({ children }: AuthProviderProps) {
  const history = useHistory();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<Profile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signInForKakao = async () => {
    const { idToken } = await KakaoLoginPlugin.goLogin();

    if (!idToken) {
      throw new Error('Kakao login failed');
    }

    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: Provider.Kakao,
      token: idToken
    });

    if (error) {
      throw new Error(error.message);
    }

    await Preferences.set({
      key: SessionKey,
      value: JSON.stringify(data.session)
    });

    await updateUserInfo(data.user);
    history.replace(ROUTE_PATH.ROOT);
  };

  const signOut = async () => {
    await KakaoLoginPlugin.goLogout();
    await supabase.auth.signOut();
    await clearSession();
    queryClient.clear();
    history.replace(ROUTE_PATH.HOME);
  };

  const clearSession = async () => {
    await Preferences.remove({ key: SessionKey });
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUserInfo = useCallback(
    async (user: User) => {
      const profile = await getUserProfile(user.id);

      if (profile) {
        setUser(profile);
        setIsAuthenticated(true);
        queryClient.clear();
      }
    },
    [queryClient]
  );

  const updateProfileInfo = async (profileId: string) => {
    const profile = await getUserProfile(profileId);
    if (profile) {
      setUser(profile);
      setIsAuthenticated(true);
    }
  };

  const restoreSession = useCallback(async () => {
    const { value } = await Preferences.get({ key: SessionKey });

    if (!value) return;

    const parsedSession = JSON.parse(value) as Session;
    const { data, error } = await supabase.auth.setSession({
      access_token: parsedSession.access_token,
      refresh_token: parsedSession.refresh_token
    });

    if (error) {
      if (error instanceof AuthError && error.code === 'refresh_token_already_used') {
        await clearSession();
        return;
      }
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error('User not found');
    }

    await updateUserInfo(data.user);
  }, [updateUserInfo]);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  return (
    <AuthProviderContext.Provider
      value={{ user, isAuthenticated, signInForKakao, signOut, updateProfileInfo }}
    >
      {children}
    </AuthProviderContext.Provider>
  );
}
