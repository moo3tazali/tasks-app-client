import toast from 'react-hot-toast';

import { useAuth } from '@/hooks/use-auth';
import { useServices } from './use-services';

export const useLogout = () => {
  const reset = useAuth((s) => s.reset);

  const { authService } = useServices();

  const onLogout = async () => {
    const loading = toast.loading('Logging out...');

    // simulate logout delay
    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    await authService.logout();
    reset();
    toast.dismiss(loading);
    toast.success('You have been logged out');
  };

  return { onLogout };
};
