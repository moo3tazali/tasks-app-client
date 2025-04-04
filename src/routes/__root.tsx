import {
  createRootRouteWithContext,
  Outlet,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { type User } from '@/services/auth';

interface MyRouterContext {
  auth: User;
}

export const Route =
  createRootRouteWithContext<MyRouterContext>()({
    component: Routes,
  });

function Routes() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position='bottom-right' />
    </>
  );
}
