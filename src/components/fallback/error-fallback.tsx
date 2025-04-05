import { ErrorRes } from '@/interfaces/api-res';

export function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: ErrorRes;
  resetErrorBoundary: () => void;
}) {
  const { status } = error;

  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{status.message}</pre>
      <button onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  );
}
