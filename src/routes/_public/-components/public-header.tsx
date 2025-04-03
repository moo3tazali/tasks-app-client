import { Link } from '@tanstack/react-router';
import { Button, Logo } from '../../../components/ui';

export const PublicHeader = () => {
  return (
    <header className='p-4 flex items-center justify-between gap-5'>
      <Logo />

      <div className='space-x-4'>
        <Button variant='outline' asChild>
          <Link to='/login'>Login</Link>
        </Button>
        <Button asChild>
          <Link to='/register'>Register</Link>
        </Button>
      </div>
    </header>
  );
};
