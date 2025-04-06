import { createRouter } from '@tanstack/react-router';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { queryClient } from './providers/app-providers';

// Create a new router instance
export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const ROUTES = {
  PUBLIC: {
    HOME: '/',
    ABOUT: '/about',
  },
  DASHBOARD: {
    HOME: '/dashboard',
    SETTINGS: '/dashboard/settings',
    BOARDS: {
      HOME: '/dashboard/boards',
      CREATE: '/dashboard/boards/create',
      VIEW: '/dashboard/boards/$boardId',
      EDIT: '/dashboard/boards/$boardId/edit',
    },
  },
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
} as const;
