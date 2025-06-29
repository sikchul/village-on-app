import { useContext } from 'react';

import { AuthProviderContext } from './context';

export const useAuth = () => {
  const context = useContext(AuthProviderContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
