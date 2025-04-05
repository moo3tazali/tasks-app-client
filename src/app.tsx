import { Suspense } from 'react';
import { router } from './router';
import { RouterProvider } from '@tanstack/react-router';

import { Auth } from '@/services/auth';
import { useAuth } from '@/hooks/use-auth';
import { AppProviders } from '@/providers/app-providers';
import { LoadingFallback } from '@/components/fallback';

export function App() {
  const userPromise = Auth.getUser();

  return (
    <Suspense fallback={<LoadingFallback />}>
      <AppProviders userPromise={userPromise}>
        <InnerApp />
      </AppProviders>
    </Suspense>
  );
}

function InnerApp() {
  const auth = useAuth((s) => s.user);
  return <RouterProvider router={router} context={{ auth }} />;
}
