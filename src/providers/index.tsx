import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { AuthProvider } from '@/providers/auth-provider';
import { Auth } from '@/services/auth';
import { Suspense, use } from 'react';

// Create a client
const queryClient = new QueryClient();

// initial user
const user = Auth.getUser();

type Props = {
  children: React.ReactNode;
};
export const AppProviders = ({ children }: Props) => {
  const initialUser = use(user);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthProvider initialUser={initialUser}>
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </AuthProvider>
    </Suspense>
  );
};
