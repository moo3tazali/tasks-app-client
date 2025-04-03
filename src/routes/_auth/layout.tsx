import {
  createFileRoute,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import { AuthHeader } from './-components/auth-header';
import { Auth } from '@/services/auth';

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
  beforeLoad: async () => {
    const isAuthenticated = await Auth.isAuthenticated();

    if (isAuthenticated) {
      throw redirect({
        to: '/dashboard',
      });
    }
  },
});

function AuthLayout() {
  return (
    <div className='h-full bg-gray-100'>
      <div className='h-full container mx-auto flex flex-col'>
        <AuthHeader />
        <main className='flex-1 flex items-center justify-center'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
