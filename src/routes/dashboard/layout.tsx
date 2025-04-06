import {
  createFileRoute,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import { useCookies } from 'react-cookie';

import { ROUTES } from '@/router';
import { AuthGuard } from '@/providers/auth-guard';
import { DashboardSidebar } from './-components/dashboard-sidebar';
import {
  SIDEBAR_COOKIE_NAME,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui';
import { DashboardHeader } from './-components/dashboard-header';
import { NotFoundFallback } from '@/components/fallback';

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
  notFoundComponent: (data) => (
    <NotFoundFallback
      data={data}
      to={ROUTES.DASHBOARD.HOME}
    />
  ),
});

function DashboardLayout() {
  const [{ sidebar_state }] = useCookies([
    SIDEBAR_COOKIE_NAME,
  ]);

  return (
    <AuthGuard>
      <SidebarProvider defaultOpen={sidebar_state}>
        <DashboardSidebar />
        <SidebarInset>
          <DashboardHeader />
          <div className='flex-1 p-4 border-t'>
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}
