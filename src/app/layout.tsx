import type { Metadata } from 'next';
import '@/styles/globals.css';
import { ReactNode } from 'react';
import Providers from '@/components/shared/Providers';

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
          <div className="flex justify-center items-center h-full">{children}</div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
