import { useMemo } from 'react';
import { useLocation } from '@tanstack/react-router';
import {
  Calendar,
  ClipboardList,
  Home,
  Inbox,
  Search,
  Settings,
} from 'lucide-react';

import { ROUTES } from '@/router';

export const useNavItems = () => {
  const { pathname } = useLocation();

  const items = useMemo(
    () => [
      {
        title: 'Home',
        url: ROUTES.DASHBOARD.HOME,
        icon: Home,
        isActive: pathname === ROUTES.DASHBOARD.HOME,
      },
      {
        title: 'Boards',
        url: ROUTES.DASHBOARD.BOARDS.HOME,
        icon: ClipboardList,
        isActive: pathname.includes(ROUTES.DASHBOARD.BOARDS.HOME),
      },
      {
        title: 'Inbox',
        url: '#',
        icon: Inbox,
        isActive: false,
      },
      {
        title: 'Calendar',
        url: '#',
        icon: Calendar,
        isActive: false,
      },
      {
        title: 'Search',
        url: '#',
        icon: Search,
        isActive: false,
      },
      {
        title: 'Settings',
        url: ROUTES.DASHBOARD.SETTINGS,
        icon: Settings,
        isActive: pathname === ROUTES.DASHBOARD.SETTINGS,
      },
    ],
    [pathname]
  );

  return { items };
};
