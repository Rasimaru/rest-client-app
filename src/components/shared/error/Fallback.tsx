'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/routes';

type FallbackProps = {
  onReset: () => void;
};

const Fallback = ({ onReset }: FallbackProps) => {
  return (
    <div className="flex items-center justify-center w-full h-screen px-4 sm:p-6">
      <div className="flex flex-col md:flex-row items-center gap-6 max-w-3xl">
        <h1 className="text-6xl sm:text-8xl font-extrabold text-gray-900">😵</h1>
        <div className="hidden md:block md:border-l border-gray-300 h-24 sm:h-32" />
        <div className="flex flex-col gap-4 text-center md:text-left">
          <h2 className="text-lg sm:text-2xl font-semibold text-gray-900">Something went wrong</h2>
          <p className="text-gray-600">
            An unexpected error occurred. Please try again or go back to the main page.
          </p>
          <div className="flex gap-4 flex-col sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto" onClick={onReset}>
              Retry
            </Button>
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href={ROUTES.main}>Go back to Main</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fallback;
