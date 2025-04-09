import { router } from './router';
import { RouterProvider } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/hooks/use-auth';
import { AppProviders } from '@/providers';

export function App() {
  return (
    <AppProviders>
      <InnerApp />
    </AppProviders>
  );
}

function InnerApp() {
  const auth = useAuth((s) => s);
  const queryClient = useQueryClient();

  return (
    <RouterProvider
      router={router}
      context={{ auth, queryClient }}
    />
  );
}
