import {
  createFileRoute,
  Outlet,
  redirect,
} from '@tanstack/react-router';

import { Auth } from '@/services/auth';

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
    <div>
      <header>Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  );
}
