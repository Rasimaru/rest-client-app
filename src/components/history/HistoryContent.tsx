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

  //Mock requests
  const mockRequests = [
    {
      id: '1',
      method: 'GET',
      url: '/api/example',
      createdAt: new Date().toLocaleString('en-US'),
      latency: 120,
      statusCode: 200,
      requestSize: 512,
      responseSize: 1024,
      error: null
    },
    {
      id: '2',
      method: 'POST',
      url: '/api/test',
      createdAt: new Date().toLocaleString('en-US'),
      latency: 250,
      statusCode: 500,
      requestSize: 1024,
      responseSize: 0,
      error: 'Internal server error'
    }
  ];

  return (
    <div className="flex flex-col gap-10 sm:w-200 w-full p-2">
      <div className="flex justify-center items-center flex-col gap-10 bg-white text-black p-10 rounded-md">
        {!requests.length ? (
          <>
            <div className="flex flex-col gap-2 ">
              <h2 className="text-2xl">{t('emptyTitle')}</h2>
              <p className="">{t('description')}</p>
            </div>
            <Button variant="default" size="sm" asChild>
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
                <li key={req.id} className="border-b py-2 flex gap-2">
                  <div className="flex-1/4 text-start">
                    <strong>[{req.method}]</strong> {req.url}
                  </div>
                  <div className="text-sm text-gray-600 flex-2/4">
                    {req.createdAt} • Status: {req.statusCode ?? '-'} • Latency:{' '}
                    {req.latency ?? '-'}ms
                  </div>
                  <div className="text-red-600 text-sm flex-1/4">
                    {req.error ? `Error: ${req.error}` : ''}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="flex justify-center items-center flex-col gap-10 bg-white text-black p-10 rounded-md">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl">Mock history version</h2>
        </div>
        <ul className="w-full flex flex-col gap-2">
          {mockRequests.map((req) => (
            <li key={req.id} className="border-b py-2 flex gap-2">
              <div className="flex-1/4 text-start">
                <strong>[{req.method}]</strong> {req.url}
              </div>
              <div className="text-sm text-gray-600 flex-2/4">
                {req.createdAt} • Status: {req.statusCode ?? '-'} • Latency: {req.latency ?? '-'}ms
              </div>
              <div className="text-red-600 text-sm flex-1/4">
                {req.error ? `Error: ${req.error}` : ''}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HistoryContent;
