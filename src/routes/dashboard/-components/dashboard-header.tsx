import { Button, Logo } from '@/components/ui';
import { useLogout } from '@/hooks/use-logout';

export const DashboardHeader = () => {
  return (
    <header className='p-4 flex items-center justify-between gap-5'>
      <Logo />

      <LogoutButton />
    </header>
  );
};

const LogoutButton = () => {
  const { onLogout } = useLogout();

  return <Button onClick={onLogout}>Logout</Button>;
};
