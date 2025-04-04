import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useNavigate,
  useSearch,
  useRouter,
} from '@tanstack/react-router';

import { Auth } from '@/services/auth';
import { useMutation } from '@/hooks/use-mutation';
import { useAuth } from '@/hooks/use-auth';

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

  const set = useAuth((s) => s.set);

  const navigate = useNavigate();

  const router = useRouter();

  const redirect = useSearch({
    strict: false,
    select: (s: { redirect?: string }) => s?.redirect ?? '',
  });

  const { mutate: login, isPending } = useMutation({
    operationName: 'login',
    mutationFn: Auth.login,
    formControl: form.control,
    onSuccess: async (res) => {
      const accessToken = res.data.accessToken;
      set(accessToken, () => {
        if (redirect) {
          return router.history.push(redirect);
        }

        navigate({
          to: '/dashboard',
          replace: true,
        });
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
