'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import { ROUTES } from '@/lib/routes';

export type HistoryItem = {
  id: string;
  method: string;
  url: string;
  createdAt: string | null;
  latency?: number | null;
  statusCode?: number | null;
  requestSize?: number | null;
  responseSize?: number | null;
  error?: string | null;
};

type Props = { requests: HistoryItem[] };

const HistoryContent = ({ requests }: Props) => {
  const t = useTranslations('HistoryPage');

  return (
    <div className="flex flex-col gap-10 sm:w-100 w-full p-2">
      <div className="flex justify-center items-center flex-col gap-10 bg-white text-black p-10 rounded-md">
        {!requests.length ? (
          <>
            <div className="flex flex-col gap-2 self-start">
              <h2 className="text-2xl">{t('emptyTitle')}</h2>
              <p className="">{t('description')}</p>
            </div>
            <Button variant="default" size="sm" asChild className="self-start">
              <Link href={ROUTES.client} aria-label={t('buttonRestClientAriaLabel')}>
                {t('buttonRestClient')}
              </Link>
            </Button>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl">{t('title')}</h2>
            </div>
            <ul className="w-full flex flex-col gap-2">
              {requests.map((req) => (
                <li key={req.id} className="border-b py-2">
                  <div>
                    <strong>[{req.method}]</strong> {req.url}
                  </div>
                  <div className="text-sm text-gray-600">
                    {req.createdAt} • Status: {req.statusCode ?? '-'} • Latency:{' '}
                    {req.latency ?? '-'}ms
                  </div>
                  {req.error && <div className="text-red-600 text-sm">Error: {req.error}</div>}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default HistoryContent;
