'use client';

import Link from 'next/link';
import { Server } from 'lucide-react';
import { ROUTES } from '@/lib/routes';
import LocaleSwitcher from './LocaleSwitcher';
import { useTranslations } from 'next-intl';
import AuthButtons from '../AuthButtons';
import { useEffect, useState } from 'react';

const Header = () => {
  const t = useTranslations('Header');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`w-full sticky z-50 top-0 border-b backdrop-contrast-0
        ${
          scrolled
            ? 'bg-gradient-to-b from-neutral-900 dark:from-gray-900/90'
            : 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-primary'
        }`}
    >
      <nav className="container xl:w-7xl mx-auto flex flex-wrap p-2.5 items-center justify-between gap-4">
        <Link
          href={ROUTES.main}
          aria-label={t('linkAriaLabel')}
          className="flex items-center gap-2 font-semibold text-xl sm:text-2xl hover:text-black/60 transition-colors"
        >
          <Server size={32} />
          <h1>{t('title')}</h1>
        </Link>
        <div className="flex sm:gap-5 gap-2">
          <LocaleSwitcher />
          <AuthButtons />
        </div>
      </nav>
    </header>
  );
};

export default Header;
