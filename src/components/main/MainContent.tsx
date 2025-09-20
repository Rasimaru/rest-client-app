'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import { ROUTES } from '@/lib/routes';
import { JSX, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import AuthButtons from '../shared/AuthButtons';
import { useRouter } from 'next/navigation';

const MainContent = (): JSX.Element => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const name = session?.user?.name || session?.user?.email;

  const t = useTranslations('MainContent');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(ROUTES.main);
    }
  }, [status, router]);

  if (status === 'loading') {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex flex-col gap-10 sm:w-100 w-full p-2">
      <div className="flex justify-center items-center flex-col gap-10 bg-white text-black p-10 rounded-md">
        <h2>
          {t('title')}
          {name ? `, ${name}!` : '!'}
        </h2>
        {!session && <AuthButtons />}
      </div>
      {session && (
        <div className="flex justify-center items-center max-[510]:flex-col gap-5 p-5 bg-white rounded-md">
          <Button variant="default" size="sm" asChild>
            <Link href={ROUTES.client} aria-label={t('buttonRestClientAriaLabel')}>
              {t('buttonRestClient')}
            </Link>
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link href={ROUTES.history} aria-label={t('buttonHistoryAriaLabel')}>
              {t('buttonHistory')}
            </Link>
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link href={ROUTES.variables} aria-label={t('buttonVariablesAriaLabel')}>
              {t('buttonVariables')}
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};
export default MainContent;
