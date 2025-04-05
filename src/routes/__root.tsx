import {
  createRootRouteWithContext,
  Outlet,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { type User } from '@/services/auth';
import { NotFoundFallback } from '@/components/fallback';

interface MyRouterContext {
  auth: User;
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
