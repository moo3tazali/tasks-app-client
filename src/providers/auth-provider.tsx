import {
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  Auth,
  defaultUser,
  type AuthType,
} from '@/services/auth';
import {
  useLocation,
  useNavigate,
} from '@tanstack/react-router';

const AuthContext = createContext<AuthType | null>(null);

const user = await Auth.getUser();

const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [auth, setAuth] = useState(user);

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const clear = useCallback(() => {
    const currentPathname = pathname;
    const isDashboardRoute =
      currentPathname.startsWith('/dashboard');

    Auth.clearToken();
    setAuth(defaultUser);

    if (isDashboardRoute) {
      navigate({
        to: '/login',
        search: {
          redirect: currentPathname,
        },
      });
    }
  }, [pathname, navigate]);

  const set = useCallback(
    async (token: string, cb?: () => void) => {
      await Auth.setToken(token);

      const user = await Auth.getUser();

      setAuth(user);

      if (cb) {
        cb();
      }
    },
    []
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: auth.isAuthenticated,
        user: auth,
        clear,
        set,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
