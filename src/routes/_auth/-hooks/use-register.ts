import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';

import { useMutation } from '@/hooks/use-mutation';
import { useAuth, useServices } from '@/hooks';

const formSchema = z.object({
  username: z
    .string()
    .min(
      3,
      'Username should be at least 3 characters long and contain only alphanumeric characters and underscores'
    ),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password should be at least 6 characters long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      'Password should contain at least one lowercase letter, one uppercase letter, one number, and one special character'
    ),
});

type FormData = z.infer<typeof formSchema>;

export const useRegister = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const setUser = useAuth((s) => s.set);

  const { authService } = useServices();

  const navigate = useNavigate();

  const { mutate: signUp, isPending } = useMutation({
    operationName: 'register',
    mutationFn: authService.register,
    formControl: form.control,
    onSuccess: (user) => {
      setUser(user);

      navigate({
        to: '/dashboard',
        replace: true,
      });
    },
  });

  function onSubmit(values: FormData) {
    form.clearErrors();
    signUp(values);
  }

  return {
    form: {
      ...form,
      isPending,
      onSubmit: form.handleSubmit(onSubmit),
    },
  };
};
