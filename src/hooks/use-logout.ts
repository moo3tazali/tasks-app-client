import toast from 'react-hot-toast';

import { useAuth } from '@/hooks/use-auth';

export const useLogout = () => {
  const clear = useAuth((s) => s.clear);

  const onLogout = async () => {
    const loading = toast.loading('Logging out...');

    // simulate logout delay
    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    clear(() => {
      toast.dismiss(loading);
      toast.success('You have been logged out');
    });
  };

  return { onLogout };
};
