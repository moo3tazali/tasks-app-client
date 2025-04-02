import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/(home)/')({
  component: Index,
});

function Index() {
  return <div>DASHBOARD</div>;
}
