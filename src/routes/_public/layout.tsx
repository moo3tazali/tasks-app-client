import {
  createFileRoute,
  Outlet,
} from '@tanstack/react-router';

import { PublicHeader } from './-components/public-header';

export const Route = createFileRoute('/_public')({
  component: PublicLayout,
});

function PublicLayout() {
  return (
    <div className='h-full bg-gray-100'>
      <div className='h-full container mx-auto'>
        <PublicHeader />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
