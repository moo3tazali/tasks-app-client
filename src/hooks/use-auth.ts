import { useContext } from 'react';

import { AuthContext } from '@/providers/auth-provider';

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error(
      'useAuth should be used within <AuthProvider>'
    );
  }

  return auth;
};
