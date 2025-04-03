import toast from 'react-hot-toast';

import { Button, Logo } from '@/components/ui';
import { useAuth } from '@/hooks/use-auth';

export const DashboardHeader = () => {
  return (
    <header className='p-4 flex items-center justify-between gap-5'>
      <Logo />

      <LogoutButton />
    </header>
  );
};

const LogoutButton = () => {
  const { clear } = useAuth();

  const onLogout = async () => {
    const loading = toast.loading('Logging out...');

    // simulate logout delay
    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    toast.dismiss(loading);
    clear();
    toast.success('You have been logged out');
  };
  return <Button onClick={onLogout}>Logout</Button>;
};
