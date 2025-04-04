import { Link } from '@tanstack/react-router';
import { Button, Logo } from '@/components/ui';

import { useAuth } from '@/hooks/use-auth';

export const PublicHeader = () => {
  return (
    <header className='p-4 flex items-center justify-between gap-5'>
      <Logo />

      <Actions />
    </header>
  );
};

const Actions = () => {
  const isAuthenticated = useAuth((s) => s.isAuthenticated);

  if (isAuthenticated) {
    return (
      <Button variant='outline' effect='ringHover' asChild>
        <Link to='/dashboard'>Dashboard</Link>
      </Button>
    );
  }
  return (
    <div className='space-x-4'>
      <Button variant='outline' asChild>
        <Link to='/login'>Login</Link>
      </Button>
      <Button asChild>
        <Link to='/register'>Register</Link>
      </Button>
    </div>
  );
};
