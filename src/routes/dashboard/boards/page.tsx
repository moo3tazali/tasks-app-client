import { Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import {
  ErrorFallback,
  LoadingFallback,
} from '@/components/fallback';
import { Board } from '@/services/boards';
import { useInvalidate } from '@/hooks/use-invalidate';

export const Route = createFileRoute('/dashboard/boards/')({
  component: Boards,
});

function Boards() {
  const { invalidate } = useInvalidate({
    queryKey: [Board.queryKey],
  });

  return (
    <div>
      <button>Create Board</button>

      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={invalidate}>
        <Suspense fallback={<LoadingFallback />}>
          <BoardList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

const BoardList = () => {
  const { data } = useSuspenseQuery(
    Board.listQueryOptions()
  );
  return <div>Board List</div>;
};
