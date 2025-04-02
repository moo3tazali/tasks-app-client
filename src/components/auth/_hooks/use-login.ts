import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  identifier: z
    .string()
    .min(1, 'Username or email is required'),
  password: z.string().min(1, 'Password is required'),
});

type FormData = z.infer<typeof formSchema>;

export const useLogin = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: FormData) {
    try {
      console.log(values);
    } catch (error) {
      console.error('Form submission error', error);
    }
  }

  return {
    form: {
      ...form,
      onSubmit: form.handleSubmit(onSubmit),
    },
  };
};
