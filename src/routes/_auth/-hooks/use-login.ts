import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useNavigate,
  useSearch,
  useRouter,
} from '@tanstack/react-router';

import { useMutation } from '@/hooks/use-mutation';
import { useAuth, useServices } from '@/hooks';

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

  const setUser = useAuth((s) => s.set);

  const { authService } = useServices();

  const navigate = useNavigate();

  const router = useRouter();

  const redirect = useSearch({
    strict: false,
    select: (s: { redirect?: string }) => s?.redirect ?? '',
  });

  const { mutate: login, isPending } = useMutation({
    operationName: 'login',
    mutationFn: authService.login,
    formControl: form.control,
    onSuccess: (user) => {
      setUser(user);

      if (redirect) {
        return router.history.push(redirect);
      }

      navigate({
        to: '/dashboard',
        replace: true,
      });
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
