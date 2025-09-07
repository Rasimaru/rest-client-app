'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Server } from 'lucide-react';
import { ROUTES } from '@/lib/routes';
import { JSX } from 'react';
import LocaleSwitcher from './LocaleSwitcher';
import { useTranslations } from 'next-intl';

const Header = (): JSX.Element => {
  const t = useTranslations('Header');
  const buttonLabels = useTranslations('button');

  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-700 bg-gray-300 dark:bg-gray-900 text-primary">
      <nav className="container mx-auto flex flex-wrap py-3 items-center justify-between gap-4">
        <Link
          href={ROUTES.main}
          aria-label={t('linkAriaLabel')}
          className="flex items-center gap-2 font-semibold text-xl sm:text-2xl hover:text-black/60 transition-colors"
        >
          <Server size={32} />
          <h1>{t('title')}</h1>
        </Link>
        <LocaleSwitcher />
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="sm" asChild>
            <Link href={ROUTES.signin} aria-label={buttonLabels('signInAriaLabel')}>
              {buttonLabels('signIn')}
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href={ROUTES.signup} aria-label={buttonLabels('signUpAriaLabel')}>
              {buttonLabels('signUp')}
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
