import { createRouter } from '@tanstack/react-router';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { defaultUser } from '@/services/auth';

// Create a new router instance
export const router = createRouter({
  routeTree,
  context: {
    auth: defaultUser,
  },
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
  },
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
} as const;

export const ROUTES_VALUES = Object.values(ROUTES).flatMap(
  (route) => Object.values(route)
);

export type ToRoute = (typeof ROUTES_VALUES)[number];
