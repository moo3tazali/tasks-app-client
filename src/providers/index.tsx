import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { CookiesProvider } from 'react-cookie';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { AuthProvider } from '@/providers/auth-provider';
import { ServicesProvider } from '@/providers/services-provider';
import { services } from '@/services';

// app services
const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

export const AppProviders = ({ children }: Props) => {
  const userPromise = services.userService.getUser();

  return (
    <ServicesProvider services={services}>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <Suspense>
          <AuthProvider userPromise={userPromise}>
            <QueryClientProvider client={queryClient}>
              {children}
              <Toaster
                toastOptions={{
                  className: '!text-foreground !bg-background',
                }}
              />
              <ReactQueryDevtools />
            </QueryClientProvider>
          </AuthProvider>
        </Suspense>
      </CookiesProvider>
    </ServicesProvider>
  );
};
