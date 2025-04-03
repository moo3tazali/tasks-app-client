import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Auth } from '@/api/auth';
import { useMutation } from '@/hooks/use-mutation';

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
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { mutate: login, isPending } = useMutation({
    operationName: 'login',
    mutationFn: Auth.login,
    formControl: form.control,
    onSuccess: (res) => {
      const accessToken = res.data.accessToken;

      console.log(accessToken);
    },
  });

  function onSubmit(values: FormData) {
    form.clearErrors();
    login(values);
  }

  return {
    form: {
      ...form,
      isPending,
      onSubmit: form.handleSubmit(onSubmit),
    },
  };
};
