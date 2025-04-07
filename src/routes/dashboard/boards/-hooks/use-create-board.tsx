import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@/hooks/use-mutation';
import { Board } from '@/services/boards';

const formSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters long'),
  description: z
    .string()
    .min(
      10,
      'Description must be at least 10 characters long'
    ),
});

type FormData = z.infer<typeof formSchema>;

export const useCreateBoard = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const { mutateAsync, isPending } = useMutation({
    operationName: 'Create Board',
    mutationFn: Board.create,
    refetchQueries: [[Board.queryKey]],
    formControl: form.control,
    onSuccess: () => {
      closeModal();
      form.reset();
    },
  });

  const onSubmit = async (data: FormData) => {
    await mutateAsync(data);
  };

  return {
    form: {
      ...form,
      onSubmit: form.handleSubmit(onSubmit),
      isPending: form.formState.isSubmitting || isPending,
    },
  };
};
