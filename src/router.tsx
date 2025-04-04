import { createRouter } from '@tanstack/react-router';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
export const router = createRouter({
  routeTree,
  context: {
    auth: null,
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
};
