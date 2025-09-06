import type { Metadata } from 'next';
import '@/styles/globals.css';
import { ReactNode } from 'react';
import Providers from '@/components/shared/Providers';
import Layout from '@/components/shared/layout/Layout';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Rest Client App',
  description: 'A simple REST client app with history and variables management'
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
