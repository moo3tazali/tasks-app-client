import {
  createFileRoute,
  Outlet,
  redirect,
} from '@tanstack/react-router';

import { ROUTES } from '@/router';
import { AuthGuard } from '@/providers/auth-guard';
import { DashboardHeader } from './-components/dashboard-header';

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
  beforeLoad: ({ location, context }) => {
    const isAuthenticated = context.auth.isAuthenticated;

    if (!isAuthenticated) {
      throw redirect({
        to: ROUTES.AUTH.LOGIN,
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
});

function DashboardLayout() {
  return (
    <AuthGuard>
      <DashboardHeader />
      <main>
        <Outlet />
      </main>
    </AuthGuard>
  );
}
