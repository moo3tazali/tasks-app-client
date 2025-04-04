import { useContext } from 'react';

import { AuthContext } from '@/providers/auth-provider';
import { AuthType } from '@/services/auth';
import { useStore } from 'zustand';

export const useAuth = <T>(
  selector: (state: AuthType) => T
) => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth should be used within <AuthProvider>'
    );
  }

  return useStore(context, selector);
};
