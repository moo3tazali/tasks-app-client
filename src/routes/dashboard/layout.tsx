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
  Card,
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
    <NotFoundFallback data={data} to='/dashboard' />
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
          <Card className='flex-1 bg-white mb-2 me-2 p-2 md:p-4'>
            <Outlet />
          </Card>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}
