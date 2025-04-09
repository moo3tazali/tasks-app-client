import { useContext } from 'react';

import {
  AuthContext,
  TAuth,
} from '@/providers/auth-provider';
import { useStore } from 'zustand';

export const useAuth = <T>(
  selector: (state: TAuth) => T
) => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth should be used within <AuthProvider>'
    );
  }

  return useStore(context, selector);
};
