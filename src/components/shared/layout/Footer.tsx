'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Github } from 'lucide-react';
import RS_LOGO from 'public/rss-logo.svg';
import { Button } from '@/components/ui/button';
import { JSX } from 'react';
import { FOOTER_LINKS } from '@/lib/constants';

const Footer = (): JSX.Element => {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 bg-gray-300 dark:bg-gray-900">
      <div className="container mx-auto py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Button variant="default" size="icon" className="rounded-full" asChild>
          <Link
            href={FOOTER_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="hover:opacity-80 transition-opacity"
          >
            <Github
              size={36}
              className="text-gray-100 dark:text-gray-950 hover:text-amber-400 transition-colors"
            />
          </Link>
        </Button>
        <span className="text-sm text-black dark:text-gray-400">© 2025</span>
        <Button size="icon" className="rounded-full" asChild>
          <Link
            href={FOOTER_LINKS.school}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="RS School"
            className="hover:opacity-80 transition-opacity"
          >
            <Image src={RS_LOGO} alt="School logo" width={36} height={36} />
          </Link>
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
