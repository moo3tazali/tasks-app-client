import { Navigate } from '@tanstack/react-router';

import { ROUTES } from '@/router';
import { useAuth } from '@/hooks/use-auth';

type Props = {
  children: React.ReactNode;
};
export const AuthGuard = ({ children }: Props) => {
  const isAuthenticated = useAuth((s) => s.isAuthenticated);

  return isAuthenticated ? (
    children
  ) : (
    <Navigate
      to={ROUTES.AUTH.LOGIN}
      search={{ redirect: location.pathname }}
    />
  );
};
