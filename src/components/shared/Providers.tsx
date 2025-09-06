'use client';

import ErrorBoundary from '@/components/shared/error/ErrorBoundary';
import { ReactNode } from 'react';

const Providers = ({ children }: { children: ReactNode }) => {
  return <ErrorBoundary>{children}</ErrorBoundary>;
};

export default Providers;
