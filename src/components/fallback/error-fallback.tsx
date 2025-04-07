import { Button } from '@/components/ui';
import { ErrorRes } from '@/interfaces/api-res';
import { TriangleAlert } from 'lucide-react';

interface ErrorFallbackProps {
  error: ErrorRes | Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  const message =
    error instanceof Error
      ? error?.message
      : error.status.message;

  return (
    <div
      role='alert'
      className='w-full flex flex-col justify-center items-center gap-4'
    >
      <TriangleAlert className='text-red-500 size-40' />
      <p className='text-red-600 text-sm md:text-xl'>
        {message}
      </p>
      <Button
        size='lg'
        onClick={resetErrorBoundary}
        className='w-full max-w-sm font-bold'
      >
        Try again
      </Button>
    </div>
  );
}
