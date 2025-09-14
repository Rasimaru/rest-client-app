'use client';

import ErrorBoundary from '@/components/shared/error/ErrorBoundary';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ErrorBoundary>
      <SessionProvider>{children}</SessionProvider>
    </ErrorBoundary>
  );
};

export default Providers;
