import {
  createRootRouteWithContext,
  Outlet,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { QueryClient } from '@tanstack/react-query';

import type { TUser } from '@/interfaces/user';
import { NotFoundFallback } from '@/components/fallback';

interface MyRouterContext {
  auth: TUser;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Routes,
  notFoundComponent: NotFoundFallback,
});

function Routes() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position='bottom-right' />
    </>
  );
}
