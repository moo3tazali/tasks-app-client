import { Link } from '@tanstack/react-router';

import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  PasswordInput,
  FormErrorMessage,
} from '@/components/ui';
import { useRegister } from '../-hooks/use-register';

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const { form } = useRegister();

  return (
    <div
      className={cn(
        'flex flex-col gap-6 w-full max-w-md',
        className
      )}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>
            Register
          </CardTitle>
          <CardDescription>
            Enter your username or email below to register
            your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.onSubmit}
              className='flex flex-col gap-5'
            >
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='exampleUser'
                        disabled={form.isPending}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='user@example.com'
                        disabled={form.isPending}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        placeholder='********'
                        disabled={form.isPending}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormErrorMessage>
                {form.formState.errors.root?.message}
              </FormErrorMessage>

              <Button
                type='submit'
                className='w-full'
                disabled={form.isPending}
              >
                {form.isPending
                  ? 'Loading...'
                  : 'Register Now'}
              </Button>
            </form>
          </Form>

          <div className='mt-4 text-center text-sm'>
            Already have an account?{' '}
            <Button
              variant='link'
              asChild
              className='p-0 text-sm h-auto'
              type='button'
              disabled={form.isPending}
            >
              <Link to='/login'>Login</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
