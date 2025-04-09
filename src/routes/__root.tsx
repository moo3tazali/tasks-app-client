import {
  createRootRouteWithContext,
  Outlet,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { QueryClient } from '@tanstack/react-query';

import { TAuth } from '@/providers/auth-provider';
import { NotFoundFallback } from '@/components/fallback';

interface MyRouterContext {
  auth: TAuth;
  queryClient: QueryClient;
}

export const Route =
  createRootRouteWithContext<MyRouterContext>()({
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
