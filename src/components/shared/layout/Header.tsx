'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Server } from 'lucide-react';
import { ROUTES } from '@/lib/routes';
import { JSX } from 'react';
import LocaleSwitcher from './LocaleSwitcher';

const Header = (): JSX.Element => {
  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-700 bg-gray-300 dark:bg-gray-900 text-primary">
      <nav className="container mx-auto flex flex-wrap py-3 items-center justify-between gap-4">
        <Link
          href={ROUTES.main}
          aria-label="Go to main page"
          className="flex items-center gap-2 font-semibold text-xl sm:text-2xl hover:text-black/60 transition-colors"
        >
          <Server size={32} />
          <h1>Rest Client App</h1>
        </Link>
        <LocaleSwitcher />
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="sm" asChild>
            <Link href={ROUTES.signin} aria-label="Go to sign-in page">
              Sign In
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href={ROUTES.signup} aria-label="Go to sign-up page">
              Sign Up
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
