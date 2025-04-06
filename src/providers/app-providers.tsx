import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { CookiesProvider } from 'react-cookie';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { AuthProvider } from '@/providers/auth-provider';
import { Auth } from '@/services/auth';

// Create a client
export const queryClient = new QueryClient();

// load user from indexDB
const user = await Auth.getUser();

type Props = {
  children: React.ReactNode;
};
export const AppProviders = ({ children }: Props) => {
  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <AuthProvider initialUser={user}>
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
    </CookiesProvider>
  );
};
