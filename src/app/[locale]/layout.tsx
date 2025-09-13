import type { Metadata } from 'next';
import '@/styles/globals.css';
import { ReactNode } from 'react';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import Providers from '@/components/shared/Providers';
import Layout from '@/components/shared/layout/Layout';
import { routing } from '@/i18n/routing';
import NotFound from '../not-found';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Rest Client App',
  description: 'A simple REST client app with history and variables management'
};

const RootLayout = ({ children, params }: { children: ReactNode; params: { locale: string } }) => {
  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) {
    NotFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
