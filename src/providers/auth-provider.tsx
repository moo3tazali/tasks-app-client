import {
  createContext,
  use,
  useEffect,
  useState,
} from 'react';
import { createStore, StoreApi } from 'zustand';

import { useServices } from '@/hooks';
import type { UserPayload } from '@/interfaces/user';

export type TAuth = {
  isAuthenticated: boolean;
  user: UserPayload | null;
  reset: () => void;
  set: (user: UserPayload) => void;
};

const AuthContext = createContext<StoreApi<TAuth> | null>(
  null
);

interface AuthProviderProps {
  children: React.ReactNode;
  userPromise: Promise<UserPayload | null>;
}

const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  userPromise,
}) => {
  const user = use(userPromise);

  const [store] = useState(() =>
    createStore<TAuth>((setState) => ({
      isAuthenticated: !!user,
      user,
      reset: () =>
        setState({
          isAuthenticated: false,
          user: null,
        }),
      set: (user) => {
        setState({
          isAuthenticated: true,
          user,
        });
      },
    }))
  );

  const { userService } = useServices();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated =
        await userService.isAuthenticated();

      if (isAuthenticated) return;

      store.setState({
        isAuthenticated: false,
        user: null,
      });
    };

    // check auth every 1 minute
    const checkAuthInterval = setInterval(
      checkAuth,
      1000 * 60 * 1
    );

    return () => clearInterval(checkAuthInterval);
  }, [store, userService]);

  return (
    <AuthContext.Provider value={store}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
