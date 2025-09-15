'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import GithubIcon from '../shared/icons/Github';
import { toast } from 'sonner';
import { AuthSchema } from '@/lib/validationSchemas';
import FieldWrapper from '../shared/FieldWrapper';
import { signIn } from 'next-auth/react';

export function SignInForm() {
  const router = useRouter();
  const formSchema = AuthSchema;

  const form = useForm<Yup.InferType<typeof AuthSchema>>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  async function onSubmit(values: Yup.InferType<typeof formSchema>) {
    const result = await signIn('credentials', {
      ...values,
      redirect: false
    });

    if (result?.error) {
      toast.error(result.error === 'CredentialsSignin' ? 'Invalid credentials' : result.error);
    } else {
      toast.success(`Signed in as ${values.email}`);
      router.push(ROUTES.main);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="mx-auto max-w-100 w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Let&apos;s get started. Sign In into your account with Email and Password.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <FieldWrapper
                    form={form}
                    name="email"
                    label="Email"
                    placeholder="johndoe@mail.com"
                    type="email"
                    autocomplete="email"
                  />
                  <FieldWrapper
                    form={form}
                    name="password"
                    label="Password"
                    placeholder="********"
                    type="password"
                    autocomplete="current-password"
                  >
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm underline"
                      onClick={() => toast.info("Feature isn't ready yet")}
                    >
                      Forgot your password?
                    </Link>
                  </FieldWrapper>
                  <Button type="submit" className="w-full cursor-pointer">
                    Sign In
                  </Button>
                </div>
              </div>
            </form>
          </Form>
          <div className="flex flex-col gap-3">
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                className="w-full cursor-pointer"
                onClick={() => signIn('github', { callbackUrl: ROUTES.main })}
              >
                <GithubIcon className="flex" />
                Sign In with Github
              </Button>
            </div>
            <div className="text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href={ROUTES.signup} className="underline underline-offset-4">
                Sign Up
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
