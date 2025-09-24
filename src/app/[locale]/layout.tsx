import type { Metadata } from 'next';
import '@/styles/globals.css';
import { ReactNode } from 'react';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import Providers from '@/components/shared/Providers';
import Layout from '@/components/shared/layout/Layout';
import { routing } from '@/i18n/routing';
import NotFound from '../not-found';
import { Toaster } from '@/components/ui/sonner';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Rest Client App',
  description: 'A simple REST client app with history and variables management'
};

const RootLayout = async ({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    NotFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <Providers>
            <Layout>{children}</Layout>
            <Toaster position="top-right" />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
