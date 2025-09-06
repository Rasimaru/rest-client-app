'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Github } from 'lucide-react';
import RS_LOGO from 'public/rss-logo.svg';
import { Button } from '@/components/ui/button';
import { FOOTER_LINKS } from '@/lib/constants';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('Footer');

  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
      <div className="container xl:w-7xl mx-auto p-2.5 flex flex-row items-center justify-between gap-4">
        <Button variant="default" size="icon" className="rounded-full" asChild>
          <Link
            href={FOOTER_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('githubLinkAriaLabel')}
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
            aria-label={t('schoolLinkAriaLabel')}
            className="hover:opacity-80 transition-opacity"
          >
            <Image src={RS_LOGO} alt={t('schoolImgAlt')} width={36} height={36} />
          </Link>
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
