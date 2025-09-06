import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import { ROUTES } from '@/lib/routes';
import { JSX } from 'react';

const MainContent = (): JSX.Element => {
  const t = useTranslations('MainContent');
  const buttonLabels = useTranslations('button');

  return (
    <>
      <div className="flex flex-col gap-10 bg-white text-black px-20 py-10 rounded-md">
        <h2>{t('title')}</h2>
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="sm" asChild>
            <Link href={ROUTES.signin} aria-label={buttonLabels('signInAriaLabel')}>
              {buttonLabels('signIn')}
            </Link>
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link href={ROUTES.signup} aria-label={buttonLabels('signUpAriaLabel')}>
              {buttonLabels('signUp')}
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex gap-5 p-5 bg-white rounded-md">
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
    </>
  );
};
export default MainContent;
