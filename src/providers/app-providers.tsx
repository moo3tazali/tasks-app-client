import { use } from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { CookiesProvider } from 'react-cookie';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { AuthProvider } from '@/providers/auth-provider';
import { User } from '@/services/auth';

// Create a client
const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
  userPromise: Promise<User>;
};
export const AppProviders = ({
  children,
  userPromise,
}: Props) => {
  const initialUser = use(userPromise);

  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <AuthProvider initialUser={initialUser}>
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </AuthProvider>
    </CookiesProvider>
  );
};
