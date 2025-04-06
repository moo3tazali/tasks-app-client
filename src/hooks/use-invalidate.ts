import { useQueryClient } from '@tanstack/react-query';

type Props = {
  queryKey: readonly unknown[];
};
export const useInvalidate = ({ queryKey }: Props) => {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey });
  };

  return { invalidate };
};
