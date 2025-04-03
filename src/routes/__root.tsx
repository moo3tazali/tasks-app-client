import {
  createRootRoute,
  Outlet,
} from '@tanstack/react-router';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { AuthProvider } from '@/providers/auth-provider';

// Create a client
const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
        <Toaster />
        <ReactQueryDevtools />
        <TanStackRouterDevtools />
      </AuthProvider>
    </QueryClientProvider>
  ),
});
