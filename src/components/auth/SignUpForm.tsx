'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';
import * as Yup from 'yup';
import { AuthSchema } from '@/lib/validationSchemas';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import GithubIcon from '../shared/icons/Github';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Form } from '../ui/form';
import FieldWrapper from '../shared/FieldWrapper';
import { signIn } from 'next-auth/react';
import { registerUser } from '@/lib/actions/registerUser';
import ProviderButton from './ProviderButton';
import { useTranslations } from 'next-intl';

export function SignUpForm() {
  const t = useTranslations('SignUpPage');
  const f = useTranslations('form');

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
    try {
      const user = await registerUser(values.email, values.password);

      const result = await signIn('credentials', {
        email: user.email,
        password: values.password,
        redirect: false
      });

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      toast.success(`Signed in as ${values.email}`);
      router.push(ROUTES.main);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Sign Up failed';
      toast.error(message);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="mx-auto max-w-100 w-full ">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <FieldWrapper
                    form={form}
                    name="email"
                    label={f('email')}
                    placeholder={f('emailPlaceholder')}
                    type="email"
                    autocomplete="email"
                  />
                  <FieldWrapper
                    form={form}
                    name="password"
                    label={f('password')}
                    placeholder={f('passwordPlaceholder')}
                    type="password"
                    autocomplete="current-password"
                  />
                  <Button type="submit" className="w-full cursor-pointer">
                    {t('submit')}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
          <div className="flex flex-col gap-3">
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                {t('continue')}
              </span>
            </div>
            <ProviderButton provider="github" icon={<GithubIcon />} label={t('github')} />
            <div className="text-center text-sm">
              {t('haveAccount')}
              <Link href={ROUTES.signin} className="underline underline-offset-4">
                {t('signInLink')}
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
