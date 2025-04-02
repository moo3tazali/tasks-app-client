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
} from '@/components/ui';
import { useLogin } from './_hooks/use-login';

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const { form } = useLogin();

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
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Enter your username or email below to login to
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
                name='identifier'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identifier</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='exampleUser | user@example.com'
                        {...field}
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
                    <div className='flex items-center gap-3 justify-between'>
                      <FormLabel>Password</FormLabel>
                      <Button
                        variant='link'
                        effect='hoverUnderline'
                        asChild
                        className='p-0 text-sm m-0 h-auto'
                        type='button'
                      >
                        <a href='#'>
                          Forgot your password?
                        </a>
                      </Button>
                    </div>
                    <FormControl>
                      <PasswordInput
                        placeholder='********'
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full'>
                Login
              </Button>
            </form>
          </Form>

          <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Button
              variant={'link'}
              effect={'hoverUnderline'}
              asChild
              className='p-0 text-sm h-auto'
              type='button'
            >
              <Link to='/register'>Sign up</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
