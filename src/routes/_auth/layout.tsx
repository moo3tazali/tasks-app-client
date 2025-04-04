import {
  createFileRoute,
  Outlet,
  redirect,
} from '@tanstack/react-router';

import { ROUTES } from '@/router';
import { AuthHeader } from './-components/auth-header';

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
  beforeLoad: ({ context }) => {
    const isAuthenticated = context.auth.isAuthenticated;

    if (isAuthenticated) {
      throw redirect({
        to: ROUTES.DASHBOARD.HOME,
      });
    }
  },
});

function AuthLayout() {
  return (
    <div className='h-full container mx-auto flex flex-col'>
      <AuthHeader />
      <main className='flex-1 flex items-center justify-center'>
        <Outlet />
      </main>
    </div>
  );
}
