import {
  createFileRoute,
  Outlet,
  redirect,
} from '@tanstack/react-router';

import { Auth } from '@/services/auth';
import { DashboardHeader } from './-components/dashboard-header';

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
  beforeLoad: async ({ location }) => {
    const isAuthenticated = await Auth.isAuthenticated();

    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
});

function DashboardLayout() {
  return (
    <div className='h-full bg-gray-100'>
      <DashboardHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
