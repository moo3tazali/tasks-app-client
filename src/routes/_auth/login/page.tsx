import { createFileRoute } from '@tanstack/react-router';
import { LoginForm } from '../-components/login-form';

export const Route = createFileRoute('/_auth/login/')({
  component: Login,
});

function Login() {
  return <LoginForm />;
}
