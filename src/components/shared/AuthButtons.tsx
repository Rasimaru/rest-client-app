'use client';

import { Link } from '@/i18n/navigation';
import { Button } from '../ui/button';
import { ROUTES } from '@/lib/routes';
import { useTranslations } from 'next-intl';
import { signOut, useSession } from 'next-auth/react';

const AuthButtons = () => {
  const { data: session } = useSession();

  const t = useTranslations('button');

  return (
    <div className="flex items-center gap-3">
      {!session ? (
        <>
          <Button variant="outline" size="sm" asChild>
            <Link href={ROUTES.signin} aria-label={t('signInAriaLabel')}>
              {t('signIn')}
            </Link>
          </Button>
          <span className="h-full w-0.5 bg-black"></span>
          <Button variant="default" size="sm" asChild>
            <Link href={ROUTES.signup} aria-label={t('signUpAriaLabel')}>
              {t('signUp')}
            </Link>
          </Button>
        </>
      ) : (
        <>
          <Button variant="outline" size="sm" asChild>
            <Link href={ROUTES.main} aria-label={t('signInAriaLabel')}>
              {t('mainPage')}
            </Link>
          </Button>
          <span className="h-full w-0.5 bg-black"></span>
          <Button
            size="sm"
            onClick={() => signOut()}
            className="cursor-pointer"
            aria-label={t('mainPageAriaLabel')}
          >
            {t('signOut')}
          </Button>
        </>
      )}
    </div>
  );
};
export default AuthButtons;
