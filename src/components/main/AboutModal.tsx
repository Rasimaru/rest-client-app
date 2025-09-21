'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import GithubIcon from '../shared/icons/Github';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FOOTER_LINKS } from '@/lib/constants';

const AboutModal = () => {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('ProjectInfo');
  const team = t('teamList').split(', ');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) document.addEventListener('mousedown', handleClickOutside);
    else document.removeEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        {t('button')}
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fadeIn text-start">
          <div
            ref={modalRef}
            className="bg-white dark:bg-gray-900 text-black dark:text-white rounded-md max-w-2xl w-full p-6 relative flex flex-col gap-2 animate-slideIn"
          >
            <Button
              className="absolute top-3  right-3 text-lg font-bold cursor-pointer"
              onClick={() => setOpen(false)}
              aria-label={t('close')}
            >
              ×
            </Button>
            <h2 className="text-2xl font-semibold">{t('title')}</h2>
            <p>{t('description')}</p>
            <p>
              <strong>{t('technologies')}:</strong> {t('techList')}
            </p>
            <p>
              <strong>{t('features')}:</strong> {t('featuresList')}
            </p>
            <ul className="flex flex-col gap-1.5">
              <strong>{t('team')}:</strong>
              {team.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
            <p className="mb-2">
              <strong>{t('course')}:</strong> {t('courseYear')}
            </p>
            <Button variant="outline" asChild>
              <Link href={FOOTER_LINKS.github} target="_blank" className="flex items-center gap-2">
                <GithubIcon /> {t('repository')}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutModal;
