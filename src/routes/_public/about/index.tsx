import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/about/')({
  component: About,
});

function About() {
  return <div>Hello "/_public/about/"!</div>;
}
