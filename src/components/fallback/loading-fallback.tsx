import { ComponentProps } from 'react';
import { LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const LoadingFallback = ({
  className,
  ...props
}: ComponentProps<'div'>) => {
  return (
    <div
      {...props}
      className={cn(
        'flex h-full w-full items-center justify-center',
        className
      )}
    >
      <LoaderCircle className='animate-spin size-1/6' />
    </div>
  );
};
