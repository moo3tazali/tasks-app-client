import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';

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
  const auth = useAuth((s) => s.user);
  return (
    <RouterProvider router={router} context={{ auth }} />
  );
}
