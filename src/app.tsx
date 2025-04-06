import { Suspense } from 'react';
import { router } from './router';
import { RouterProvider } from '@tanstack/react-router';

import { useAuth } from '@/hooks/use-auth';
import { AppProviders } from '@/providers/app-providers';
import { LoadingFallback } from '@/components/fallback';

export function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AppProviders>
        <InnerApp />
      </AppProviders>
    </Suspense>
  );
}

function InnerApp() {
  const auth = useAuth((s) => s.user);
  return <RouterProvider router={router} context={{ auth }} />;
}
