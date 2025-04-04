import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createStore, StoreApi } from 'zustand';

import {
  Auth,
  defaultUser,
  type User,
  type AuthType,
} from '@/services/auth';

const AuthContext =
  createContext<StoreApi<AuthType> | null>(null);

interface AuthProviderProps {
  initialUser: User;
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  initialUser,
}) => {
  const [store] = useState(() =>
    createStore<AuthType>((setState) => ({
      isAuthenticated: initialUser.isAuthenticated,
      user: initialUser,

      clear: (cb) => {
        Auth.clearToken()
          .then(() => {
            setState({
              isAuthenticated: false,
              user: defaultUser,
            });

            if (cb) {
              cb();
            }
          })
          .catch(console.error);
      },

      set(token, cb) {
        Auth.setToken(token)
          .then(() => {
            return Auth.getUser();
          })
          .then((user) => {
            setState({
              isAuthenticated: user.isAuthenticated,
              user,
            });
            if (cb) {
              cb();
            }
          })
          .catch(console.error);
      },
    }))
  );

  const clear = useMemo(
    () => store.subscribe((s) => s.clear),
    [store]
  );

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await Auth.isAuthenticated();

      if (isAuthenticated) return;

      clear();
    };

    // check auth every 1 minute
    const checkAuthInterval = setInterval(
      checkAuth,
      1000 * 60 * 1
    );

    return () => clearInterval(checkAuthInterval);
  }, [clear]);

  return (
    <AuthContext.Provider value={store}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
